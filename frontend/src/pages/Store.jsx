import { useState } from "react";
import Footer from "../components/common/Footer";
import PageHero from "../components/mock/PageHero";
import FilterBar from "../components/mock/FilterBar";
import MockModal from "../components/mock/MockModal";
import StatusBadge from "../components/mock/StatusBadge";
import { products, productCategories } from "../data/products";

const ICON_MAP = {
  Electronics: "⚡", Robotics: "🤖", IoT: "📡",
  "3D Printing": "🖨️", Components: "🔩", Kits: "📦",
};

function ProductCard({ product, onView, onAddToCart }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", height: "130px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", position: "relative" }}>
        {ICON_MAP[product.category] || "📦"}
        <span style={{ position: "absolute", top: "12px", left: "12px", background: "#e11d48", color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "9999px" }}>
          {product.category}
        </span>
      </div>

      <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: "#0f172a" }}>{product.name}</h3>
        <p style={{ margin: 0, fontSize: "12px", color: "#64748b", lineHeight: 1.6 }}>{product.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {product.tags.map((t) => (
            <span key={t} style={{ fontSize: "10px", color: "#64748b", background: "#f1f5f9", padding: "2px 7px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>{t}</span>
          ))}
        </div>

        <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a" }}>₹{product.price.toLocaleString("en-IN")}</span>
            <StatusBadge status={product.availability} />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => onView(product)}
              style={{ flex: 1, padding: "8px", background: "white", color: "#0f172a", border: "2px solid #e2e8f0", borderRadius: "9999px", fontWeight: 700, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
            >
              View
            </button>
            <button
              onClick={() => onAddToCart(product)}
              style={{ flex: 2, padding: "8px", background: "#0f172a", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
              onMouseEnter={(e) => (e.target.style.background = "#e11d48")}
              onMouseLeave={(e) => (e.target.style.background = "#0f172a")}
            >
              + Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartPanel({ cartItems, onRemove, onQtyChange, onClose }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <MockModal isOpen title="🛒 Cart" onClose={onClose}>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "30px 0", color: "#94a3b8" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🛒</div>
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "24px" }}>{ICON_MAP[item.category] || "📦"}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "13px", color: "#0f172a" }}>{item.name}</div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>₹{item.price.toLocaleString("en-IN")} each</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={() => onQtyChange(item.id, item.qty - 1)} style={{ width: "26px", height: "26px", border: "1px solid #e2e8f0", borderRadius: "6px", background: "white", cursor: "pointer", fontWeight: 700, fontSize: "14px" }}>−</button>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => onQtyChange(item.id, item.qty + 1)} style={{ width: "26px", height: "26px", border: "1px solid #e2e8f0", borderRadius: "6px", background: "white", cursor: "pointer", fontWeight: 700, fontSize: "14px" }}>+</button>
              </div>
              <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "14px", minWidth: "70px", textAlign: "right" }}>
                ₹{(item.price * item.qty).toLocaleString("en-IN")}
              </div>
              <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "18px", padding: "0 4px" }}>×</button>
            </div>
          ))}

          <div style={{ borderTop: "2px solid #e2e8f0", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 800, fontSize: "16px", color: "#0f172a" }}>Subtotal</span>
            <span style={{ fontWeight: 900, fontSize: "20px", color: "#e11d48" }}>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          <button
            onClick={() => alert("Checkout is currently a demo feature. No real payment is processed.")}
            style={{ padding: "13px", background: "#e11d48", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
          >
            Checkout (Demo Only)
          </button>
          <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8", textAlign: "center" }}>Demo page — no real purchase is made</p>
        </div>
      )}
    </MockModal>
  );
}

function Store() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const changeQty = (id, qty) => {
    if (qty <= 0) removeFromCart(id);
    else setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  };

  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <PageHero
        label="STEMSAGE STORE // LAB EQUIPMENT"
        heading="Tools to"
        headingAccent="Build With."
        subtext="Explore educational kits, components, and tools designed for hands-on STEM learning."
      />

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 900, color: "#0f172a" }}>Products</h2>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: "10px 18px", border: "2px solid #e2e8f0", borderRadius: "9999px", fontSize: "13px", outline: "none", color: "#0f172a", minWidth: "180px" }}
            />
            <button
              onClick={() => setCartOpen(true)}
              style={{ padding: "10px 20px", background: "#0f172a", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", cursor: "pointer", position: "relative" }}
            >
              🛒 Cart {totalItems > 0 && <span style={{ background: "#e11d48", color: "white", borderRadius: "9999px", padding: "1px 6px", fontSize: "10px", marginLeft: "4px" }}>{totalItems}</span>}
            </button>
          </div>
        </div>

        <FilterBar categories={productCategories} active={activeCategory} onChange={setActiveCategory} />

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>No products found.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onView={setViewProduct} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      {viewProduct && (
        <MockModal isOpen={!!viewProduct} onClose={() => setViewProduct(null)} title={viewProduct.name}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ fontSize: "48px", textAlign: "center", padding: "20px", background: "#f8fafc", borderRadius: "12px" }}>
              {ICON_MAP[viewProduct.category] || "📦"}
            </div>
            <StatusBadge status={viewProduct.availability} />
            <p style={{ margin: 0, color: "#475569", fontSize: "14px", lineHeight: 1.7 }}>{viewProduct.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {viewProduct.tags.map((t) => <span key={t} style={{ fontSize: "11px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", padding: "3px 8px", borderRadius: "4px" }}>{t}</span>)}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a" }}>₹{viewProduct.price.toLocaleString("en-IN")}</span>
              <button
                onClick={() => { addToCart(viewProduct); setViewProduct(null); }}
                style={{ padding: "11px 24px", background: "#e11d48", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </MockModal>
      )}

      {cartOpen && (
        <CartPanel cartItems={cartItems} onRemove={removeFromCart} onQtyChange={changeQty} onClose={() => setCartOpen(false)} />
      )}

      <Footer />
    </div>
  );
}

export default Store;
