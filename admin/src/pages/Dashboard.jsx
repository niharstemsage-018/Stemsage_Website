import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Wrench,
  BookOpen,
  Calendar,
  MessageSquareQuote,
  Newspaper,
  Image,
  Building2,
  Compass,
  FileText,
  Mail,
  Loader2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { contentTypes } from '../config/contentTypes';

const statCards = [
  { key: 'products', label: 'Products', icon: Package, color: 'bg-red-100 text-red-600', path: '/products' },
  { key: 'services', label: 'Services', icon: Wrench, color: 'bg-blue-100 text-blue-600', path: '/services' },
  { key: 'courses', label: 'Courses', icon: BookOpen, color: 'bg-green-100 text-green-600', path: '/courses' },
  { key: 'workshops', label: 'Workshops', icon: Calendar, color: 'bg-amber-100 text-amber-600', path: '/workshops' },
  { key: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, color: 'bg-purple-100 text-purple-600', path: '/testimonials' },
  { key: 'news', label: 'News', icon: Newspaper, color: 'bg-orange-100 text-orange-600', path: '/news' },
  { key: 'gallery', label: 'Gallery', icon: Image, color: 'bg-pink-100 text-pink-600', path: '/gallery' },
  { key: 'associations', label: 'Associations', icon: Building2, color: 'bg-cyan-100 text-cyan-600', path: '/associations' },
  { key: 'innovations', label: 'Innovations', icon: Compass, color: 'bg-indigo-100 text-indigo-600', path: '/innovations' },
  { key: 'blogs', label: 'Blogs', icon: FileText, color: 'bg-teal-100 text-teal-600', path: '/blogs' },
];

// Count every item (active and hidden) via the admin endpoints, so the
// dashboard totals match what is actually stored, not just what is public.
async function fetchAdminCount(endpoint) {
  try {
    const res = await api.get(`/admin/${endpoint}`);
    const payload = res.data;
    if (Array.isArray(payload.data)) return payload.data.length;
    if (Array.isArray(payload)) return payload.length;
    if (typeof payload.count === 'number') return payload.count;
    return 0;
  } catch (err) {
    console.error(`Failed to load count for ${endpoint}:`, err);
    return 0;
  }
}

export default function Dashboard() {
  const [counts, setCounts] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const countResults = await Promise.all(
          statCards.map(async (card) => ({
            key: card.key,
            count: await fetchAdminCount(contentTypes[card.key].endpoint),
          }))
        );

        const messagesRes = await api.get('/admin/contact');

        const countMap = Object.fromEntries(countResults.map((r) => [r.key, r.count]));
        setCounts(countMap);
        setMessages(messagesRes.data.data?.slice(0, 5) || messagesRes.data?.slice(0, 5) || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your STEMSAGE content</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {statCards.map((card) => {
          const count = counts[card.key] || 0;
          const Icon = card.icon;
          return (
            <Link key={card.key} to={card.path} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold text-slate-900">{count}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-700">{card.label}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" />
                  Manage
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Mail className="h-5 w-5 text-red-600" />
            Latest Messages
          </h2>
          <Link to="/messages" className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1">
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase tracking-wider text-xs">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase tracking-wider text-xs">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase tracking-wider text-xs">Subject</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase tracking-wider text-xs">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600 uppercase tracking-wider text-xs">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-slate-500">No messages yet</td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg._id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3 text-slate-700 font-medium">{msg.name}</td>
                    <td className="px-4 py-3 text-slate-500">{msg.email}</td>
                    <td className="px-4 py-3 text-slate-700 max-w-xs truncate">{msg.subject}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        msg.status === 'NEW' ? 'bg-red-100 text-red-700' :
                        msg.status === 'IN_REVIEW' ? 'bg-amber-100 text-amber-700' :
                        msg.status === 'REPLIED' ? 'bg-green-100 text-green-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}