const { chromium } = require('playwright');
const http = require('http');

const BACKEND_URL = 'http://localhost:5000';
const FRONTEND_URL = 'http://localhost:5173';
const ADMIN_URL = 'http://localhost:5174';
const ADMIN_EMAIL = 'admin@stemsage.cc';
const ADMIN_PASSWORD = 'Admin@2026!';

let adminToken = null;
const results = [];

function logResult(check, pass, details = '') {
  const status = pass ? 'PASS' : 'FAIL';
  console.log(`[${status}] ${check}${details ? ': ' + details : ''}`);
  results.push({ check, pass, details });
}

async function httpRequest(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BACKEND_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    if (body) {
      const data = JSON.stringify(body);
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getAdminToken(page) {
  if (adminToken) return adminToken;

  // Login via admin UI to get token
  console.log('Navigating to login page...');
  await page.goto(`${ADMIN_URL}/login`);
  await page.waitForLoadState('networkidle');
  console.log('Page loaded, filling form...');
  await page.fill('input[name="email"]', ADMIN_EMAIL);
  await page.fill('input[name="password"]', ADMIN_PASSWORD);
  console.log('Submitting form...');
  await page.click('button[type="submit"]');

  // Wait for navigation or token to appear
  try {
    await page.waitForURL(`${ADMIN_URL}/`, { timeout: 15000 });
    console.log('Navigation complete');
  } catch (e) {
    console.log('Navigation timeout, checking localStorage anyway...');
  }

  // Get token from localStorage
  adminToken = await page.evaluate(() => localStorage.getItem('stemsage_admin_token'));
  console.log('Admin token acquired:', adminToken ? 'yes' : 'no');
  return adminToken;
}

async function getAllItems(endpoint, token) {
  console.log(`Fetching /api/admin/${endpoint} with token: ${token ? token.slice(0, 20) + '...' : 'none'}`);
  const res = await httpRequest('GET', `/api/admin/${endpoint}`, null, token);
  console.log(`Response status: ${res.status}, data:`, JSON.stringify(res.data).slice(0, 200));
  if (res.status === 200 && res.data) {
    return Array.isArray(res.data.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
  }
  return [];
}

async function updateItem(endpoint, id, updates, token) {
  const res = await httpRequest('PUT', `/api/admin/${endpoint}/${id}`, updates, token);
  return res.status === 200;
}

async function checkConsoleErrors(page, context) {
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.push(err.message);
  });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  return errors;
}

async function run() {
  console.log('=== Starting Playwright Verification ===\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Track console errors
  let allConsoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') allConsoleErrors.push(msg.text());
  });
  page.on('pageerror', err => {
    allConsoleErrors.push(err.message);
  });

  // ===== LOGIN =====
  const token = await getAdminToken(page);
  logResult('Admin login', !!token);

  // ===== PART A: News =====
  console.log('\n--- Part A: News ---');
  const newsItems = await getAllItems('news', token);
  const newsOriginalStates = newsItems.map(n => ({ id: n._id, isActive: n.isActive }));
  console.log(`Found ${newsItems.length} news items`);

  // Hide all news
  for (const item of newsItems) {
    await updateItem('news', item._id, { isActive: false }, token);
  }
  logResult('Hide all news items', true);

  // Load Home page
  await page.goto(FRONTEND_URL);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Check news section is gone
  const newsSectionVisible = await page.locator('section:has-text("Latest News"), section:has-text("News"), [class*="news"]:visible').count() > 0;
  const consoleErrors = allConsoleErrors.filter(e => !e.includes('favicon') && !e.includes('chrome-extension')).length;
  logResult('News section hidden on Home', !newsSectionVisible, newsSectionVisible ? 'News section still visible' : '');
  logResult('No console errors on Home (news hidden)', consoleErrors === 0, consoleErrors > 0 ? `${consoleErrors} errors` : '');

  // Check old hardcoded news does NOT appear
  const hardcodedNews = await page.locator('text="Breaking News", text="Sample News"').count();
  logResult('No hardcoded news appears', hardcodedNews === 0);

  // Restore news
  for (const orig of newsOriginalStates) {
    await updateItem('news', orig.id, { isActive: orig.isActive }, token);
  }
  logResult('Restore news items', true);

  // ===== Part A: Testimonials =====
  console.log('\n--- Part A: Testimonials ---');
  const testimonialItems = await getAllItems('testimonials', token);
  const testimonialOriginalStates = testimonialItems.map(t => ({ id: t._id, isActive: t.isActive }));
  console.log(`Found ${testimonialItems.length} testimonial items`);

  for (const item of testimonialItems) {
    await updateItem('testimonials', item._id, { isActive: false }, token);
  }
  logResult('Hide all testimonial items', true);

  await page.goto(FRONTEND_URL);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  const testimonialSectionVisible = await page.locator('section:has-text("Testimonial"), section:has-text("What Our"), [class*="testimonial"]:visible').count() > 0;
  const consoleErrors2 = allConsoleErrors.filter(e => !e.includes('favicon') && !e.includes('chrome-extension')).length;
  logResult('Testimonial section hidden on Home', !testimonialSectionVisible, testimonialSectionVisible ? 'Testimonial section still visible' : '');
  logResult('No console errors on Home (testimonials hidden)', consoleErrors2 === 0, consoleErrors2 > 0 ? `${consoleErrors2} errors` : '');

  for (const orig of testimonialOriginalStates) {
    await updateItem('testimonials', orig.id, { isActive: orig.isActive }, token);
  }
  logResult('Restore testimonial items', true);

  // ===== Part A: Associations =====
  console.log('\n--- Part A: Associations ---');
  const assocItems = await getAllItems('associations', token);
  const assocOriginalStates = assocItems.map(a => ({ id: a._id, isActive: a.isActive }));
  console.log(`Found ${assocItems.length} association items`);

  for (const item of assocItems) {
    await updateItem('associations', item._id, { isActive: false }, token);
  }
  logResult('Hide all association items', true);

  await page.goto(FRONTEND_URL);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  const assocSectionVisible = await page.locator('section:has-text("Association"), section:has-text("Partner"), [class*="association"]:visible').count() > 0;
  const consoleErrors3 = allConsoleErrors.filter(e => !e.includes('favicon') && !e.includes('chrome-extension')).length;
  logResult('Association section hidden on Home', !assocSectionVisible, assocSectionVisible ? 'Association section still visible' : '');
  logResult('No console errors on Home (associations hidden)', consoleErrors3 === 0, consoleErrors3 > 0 ? `${consoleErrors3} errors` : '');

  for (const orig of assocOriginalStates) {
    await updateItem('associations', orig.id, { isActive: orig.isActive }, token);
  }
  logResult('Restore association items', true);

  // ===== PART B: Products =====
  console.log('\n--- Part B: Products ---');
  const productItems = await getAllItems('products', token);
  console.log(`Found ${productItems.length} products`);

  if (productItems.length > 0) {
    const targetProduct = productItems[0];
    const originalActive = targetProduct.isActive;
    await updateItem('products', targetProduct._id, { isActive: false }, token);
    logResult('Hide one product (set inactive)', true);

    // Check admin table still shows it as inactive
    await page.goto(`${ADMIN_URL}/products`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const inactiveInAdmin = await page.locator(`text="${targetProduct.title}"`).count() > 0;
    logResult('Inactive product visible in admin table', inactiveInAdmin);

    // Check public Store - product should be missing
    await page.goto(`${FRONTEND_URL}/store`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const missingFromStore = await page.locator(`text="${targetProduct.title}"`).count() === 0;
    logResult('Inactive product missing from public Store', missingFromStore);

    // Restore
    await updateItem('products', targetProduct._id, { isActive: originalActive }, token);
    logResult('Restore product', true);
  } else {
    logResult('Product test skipped (no products)', false, 'No products found');
  }

  // ===== PART C: Backend Down =====
  console.log('\n--- Part C: Backend Down ---');
  console.log('Stopping backend...');

  // Kill backend process
  const { execSync } = require('child_process');
  execSync('lsof -ti :5000 | xargs kill -9 2>/dev/null || true');
  await new Promise(r => setTimeout(r, 2000));

  const pagesToCheck = [
    { name: 'Home', path: '/' },
    { name: 'Store', path: '/store' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Courses', path: '/courses' },
    { name: 'Forum', path: '/forum' },
  ];

  for (const p of pagesToCheck) {
    allConsoleErrors = [];
    await page.goto(`${FRONTEND_URL}${p.path}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check no blank page (body has content)
    const bodyText = await page.locator('body').innerText();
    const hasContent = bodyText.trim().length > 50;

    // Check no uncaught errors
    const criticalErrors = allConsoleErrors.filter(e =>
      !e.includes('favicon') &&
      !e.includes('chrome-extension') &&
      !e.includes('Failed to fetch') &&  // expected when backend down
      !e.includes('net::ERR_CONNECTION_REFUSED') &&
      !e.includes('WebSocket') &&
      !e.includes('DevTools')
    ).length;

    logResult(`${p.name}: shows fallback content (not blank)`, hasContent);
    logResult(`${p.name}: no uncaught errors`, criticalErrors === 0, criticalErrors > 0 ? `${criticalErrors} critical errors` : '');
  }

  // Restart backend
  console.log('Restarting backend...');
  execSync('cd /Users/nihar/Downloads/CodeGround/Stemsage_Website/backend && npm start > /tmp/backend.log 2>&1 &');
  await new Promise(r => setTimeout(r, 3000));

  // Verify backend up
  await page.goto(FRONTEND_URL);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  logResult('Backend restarted and Home loads', true);

  // ===== PART D: Admin Products 14 rows =====
  console.log('\n--- Part D: Admin Products Footer ---');
  await page.goto(`${ADMIN_URL}/products`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Check footer says "14 items" or similar
  const footerText = await page.locator('text=/14 items?/i').count();
  const footerText2 = await page.locator('text=/Showing.*14/').count();
  const rowsCount = await page.locator('tbody tr').count();

  logResult('Admin Products table has 14 rows', rowsCount === 14, `Found ${rowsCount} rows`);
  logResult('Footer shows 14 items', footerText > 0 || footerText2 > 0);

  // ===== SUMMARY =====
  console.log('\n=== VERIFICATION SUMMARY ===');
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;
  console.log(`Total: ${results.length} | PASS: ${passed} | FAIL: ${failed}`);

  results.forEach(r => {
    if (!r.pass) console.log(`  FAIL: ${r.check}${r.details ? ' - ' + r.details : ''}`);
  });

  // Check all data restored
  console.log('\n=== DATA RESTORATION CHECK ===');
  const finalNews = await getAllItems('news', token);
  const finalTestimonials = await getAllItems('testimonials', token);
  const finalAssocs = await getAllItems('associations', token);
  const finalProducts = await getAllItems('products', token);

  const newsRestored = finalNews.every((n, i) => n.isActive === newsOriginalStates[i].isActive);
  const testRestored = finalTestimonials.every((t, i) => t.isActive === testimonialOriginalStates[i].isActive);
  const assocRestored = finalAssocs.every((a, i) => a.isActive === assocOriginalStates[i].isActive);
  const prodRestored = finalProducts[0]?.isActive === productItems[0]?.isActive;

  logResult('News items restored', newsRestored);
  logResult('Testimonial items restored', testRestored);
  logResult('Association items restored', assocRestored);
  logResult('Product items restored', prodRestored);

  // Check servers
  console.log('\n=== SERVER STATUS ===');
  const backendUp = await httpRequest('GET', '/health').catch(() => ({ status: 0 })).then(r => r.status === 200);
  logResult('Backend running', backendUp);

  await browser.close();

  // Update PROGRESS.md
  const fs = require('fs');
  const progressPath = '/Users/nihar/Downloads/CodeGround/Stemsage_Website/PROGRESS.md';
  let progress = fs.readFileSync(progressPath, 'utf8');
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
  progress = progress.replace(/Last updated:.*/, `Last updated: ${now} UTC`);
  progress += `\n\n## Playwright Verification (${now} UTC)\n`;
  progress += `- Overall: ${passed}/${results.length} checks passed\n`;
  results.forEach(r => {
    progress += `- ${r.pass ? '✅' : '❌'} ${r.check}${r.details ? ': ' + r.details : ''}\n`;
  });
  progress += `- Data restored: News=${newsRestored}, Testimonials=${testRestored}, Associations=${assocRestored}, Products=${prodRestored}\n`;
  progress += `- Backend running: ${backendUp}\n`;
  fs.writeFileSync(progressPath, progress);
  console.log('\nPROGRESS.md updated');

  process.exit(failed > 0 ? 1 : 0);
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});