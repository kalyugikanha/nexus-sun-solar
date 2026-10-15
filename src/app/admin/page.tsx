"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  Truck,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  X,
  CreditCard,
  Save,
  Zap
} from "lucide-react";
import {
  Product,
  Order,
  OrderStatus,
  PaymentStatus,
  StoreSettings,
  ProductCategory
} from "@/types/store";
import {
  getStoredOrders,
  getStoredProducts,
  getStoredSettings,
  saveSettings,
  updateOrder,
  updateOrderStatus,
  updateOrderDetails,
  addProduct,
  updateProduct,
  deleteProduct,
  computeAnalytics,
  PRODUCT_IMAGE_SVG
} from "@/lib/storeStorage";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "settings" | "products">("dashboard");

  // State
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(getStoredSettings());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Orders filtering & detail modal
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");
  const [orderPaymentFilter, setOrderPaymentFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Order status & payment update state inside modal
  const [modalStatus, setModalStatus] = useState<OrderStatus>("pending");
  const [modalCourier, setModalCourier] = useState("");
  const [modalTracking, setModalTracking] = useState("");
  const [modalEstDelivery, setModalEstDelivery] = useState("");
  const [modalAdminNotes, setModalAdminNotes] = useState("");
  const [modalPaymentStatus, setModalPaymentStatus] = useState<PaymentStatus>("pending");
  const [modalPaidAmount, setModalPaidAmount] = useState<number>(0);
  const [modalRemainingAmount, setModalRemainingAmount] = useState<number>(0);

  // Product modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productFormData, setProductFormData] = useState({
    name: "",
    category: "cleaning-kits" as ProductCategory,
    price: 1999,
    mrp: 2999,
    stockCount: 50,
    shortDescription: "",
    description: "",
    badge: "" as any,
    image: PRODUCT_IMAGE_SVG.poleKit,
  });

  // Settings form
  const [settingsFormData, setSettingsFormData] = useState<StoreSettings>(getStoredSettings());

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const loadAllData = () => {
    const o = getStoredOrders();
    const p = getStoredProducts();
    const s = getStoredSettings();
    setOrders(o);
    setProducts(p);
    setSettings(s);
    setSettingsFormData(s);
  };

  useEffect(() => {
    loadAllData();

    const handleUpdate = () => {
      loadAllData();
    };
    window.addEventListener("suntech_storage_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("suntech_storage_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Compute live analytics
  const analytics = useMemo(() => computeAnalytics(orders), [orders]);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderStatusFilter !== "all") {
        if (orderStatusFilter === "due_today") {
          const isDue =
            o.status === "out_for_delivery" ||
            (o.estimatedDelivery && o.estimatedDelivery.toLowerCase().includes("today"));
          if (!isDue) return false;
        } else if (o.status !== orderStatusFilter) {
          return false;
        }
      }
      if (orderPaymentFilter !== "all" && o.paymentMethod !== orderPaymentFilter) return false;
      if (orderSearch.trim()) {
        const q = orderSearch.toLowerCase();
        const matchesId = o.id.toLowerCase().includes(q);
        const matchesName = o.customer.fullName.toLowerCase().includes(q);
        const matchesPhone = o.customer.phone.toLowerCase().includes(q);
        const matchesCity = o.customer.city.toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesPhone && !matchesCity) return false;
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderPaymentFilter, orderSearch]);

  // Open order detail modal
  const openOrderModal = (ord: Order) => {
    setSelectedOrder(ord);
    setModalStatus(ord.status);
    setModalCourier(ord.courierPartner || "");
    setModalTracking(ord.trackingNumber || "");
    setModalEstDelivery(ord.estimatedDelivery || "");
    setModalAdminNotes(ord.adminNotes || "");
    setModalPaymentStatus(ord.paymentStatus);
    setModalPaidAmount(ord.paidAmount);
    setModalRemainingAmount(ord.remainingAmount);
  };

  // Save order updates atomically
  const handleSaveOrderUpdate = () => {
    if (!selectedOrder) return;

    updateOrder(selectedOrder.id, {
      status: modalStatus,
      courierPartner: modalCourier || undefined,
      trackingNumber: modalTracking || undefined,
      estimatedDelivery: modalEstDelivery || undefined,
      adminNotes: modalAdminNotes || undefined,
      paymentStatus: modalPaymentStatus,
      paidAmount: modalPaidAmount,
      remainingAmount: modalRemainingAmount,
    });

    loadAllData();
    showToast(`Order ${selectedOrder.id} successfully updated!`);
    setSelectedOrder(null);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settingsFormData);
    setSettings(settingsFormData);
    showToast("Store & Part-Payment settings saved successfully!");
  };

  // Open Add Product Modal
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductFormData({
      name: "",
      category: "cleaning-kits",
      price: 1499,
      mrp: 2499,
      stockCount: 50,
      shortDescription: "",
      description: "",
      badge: "New Arrival",
      image: PRODUCT_IMAGE_SVG.poleKit,
    });
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const openEditProductModal = (prod: Product) => {
    setEditingProduct(prod);
    setProductFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      mrp: prod.mrp,
      stockCount: prod.stockCount,
      shortDescription: prod.shortDescription,
      description: prod.description,
      badge: prod.badge || "",
      image: prod.image,
    });
    setIsProductModalOpen(true);
  };

  // Handle Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.name.trim()) {
      alert("Product name is required");
      return;
    }

    const discount = Math.round(((productFormData.mrp - productFormData.price) / productFormData.mrp) * 100);

    const categoryNames: Record<ProductCategory, string> = {
      all: "All",
      "cleaning-kits": "Solar Cleaning Kits",
      brushes: "Solar Cleaning Brushes",
      "cleaning-liquids": "Cleaning Solutions",
      "drain-clips": "Drainage Clips",
      accessories: "Solar Accessories & Tools",
      spares: "Spare Parts & Replacements",
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productFormData.name,
        category: productFormData.category,
        categoryName: categoryNames[productFormData.category],
        price: Number(productFormData.price),
        mrp: Number(productFormData.mrp),
        discountPercent: Math.max(0, discount),
        stockCount: Number(productFormData.stockCount),
        inStock: Number(productFormData.stockCount) > 0,
        shortDescription: productFormData.shortDescription,
        description: productFormData.description,
        badge: productFormData.badge || undefined,
        image: productFormData.image,
      });
      showToast(`Product "${productFormData.name.slice(0, 24)}..." updated`);
    } else {
      addProduct({
        name: productFormData.name,
        slug: productFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: productFormData.category,
        categoryName: categoryNames[productFormData.category],
        price: Number(productFormData.price),
        mrp: Number(productFormData.mrp),
        discountPercent: Math.max(0, discount),
        rating: 4.8,
        reviewCount: 1,
        image: productFormData.image,
        gallery: [productFormData.image],
        shortDescription: productFormData.shortDescription || "High performance solar maintenance tool.",
        description: productFormData.description || "Designed for solar panels.",
        features: ["Certified safe for solar panel glass", "Durable weatherproof construction"],
        specifications: { "Warranty": "1 Year Manufacturer Warranty" },
        whatsInTheBox: ["1x Standard Packaging Unit"],
        inStock: Number(productFormData.stockCount) > 0,
        stockCount: Number(productFormData.stockCount),
        badge: productFormData.badge || undefined,
      });
      showToast(`New product created!`);
    }

    setIsProductModalOpen(false);
    loadAllData();
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from store catalog?`)) {
      deleteProduct(id);
      loadAllData();
      showToast("Product removed from catalog");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-4 px-4 sm:px-8">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold text-white shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-wide flex items-center gap-2">
                <span>SunTech Executive Portal</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold uppercase px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Live Operations
                </span>
              </h1>
              <p className="text-xs text-slate-400">Order Booking, Delivery Tracking, Part-Payment &amp; Catalog Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/store"
              className="text-xs font-bold text-yellow-400 hover:text-yellow-300 bg-white/10 hover:bg-white/15 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>🛒 View Live Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-xs">
        <div className="container-custom">
          <div className="flex gap-2 sm:gap-6 overflow-x-auto py-2.5">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all flex-shrink-0 ${
                activeTab === "dashboard"
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard &amp; Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all flex-shrink-0 ${
                activeTab === "orders"
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders &amp; Bookings ({orders.length})</span>
              {analytics.pendingOrders > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-black">
                  {analytics.pendingOrders}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all flex-shrink-0 ${
                activeTab === "settings"
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Part Payment &amp; Store Rules</span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all flex-shrink-0 ${
                activeTab === "products"
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Products Catalog ({products.length})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom pt-8">
        {/* ============================================================== */}
        {/* TAB 1: DASHBOARD & ANALYTICS */}
        {/* ============================================================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Metric 1: Total Revenue */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Sales Volume</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-0.5">₹{analytics.totalRevenue.toLocaleString("en-IN")}</h3>
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                    <TrendingUp className="w-3 h-3" /> {analytics.totalOrders} total bookings
                  </span>
                </div>
              </div>

              {/* Metric 2: Collected vs Pending */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue Collected</span>
                  <h3 className="text-2xl font-black text-emerald-700 mt-0.5">₹{analytics.totalCollected.toLocaleString("en-IN")}</h3>
                  <span className="text-[11px] text-amber-700 font-semibold block mt-0.5">
                    ₹{analytics.totalPendingBalance.toLocaleString("en-IN")} due on delivery
                  </span>
                </div>
              </div>

              {/* Metric 3: In Transit & Pending */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">In Transit / Out</span>
                  <h3 className="text-2xl font-black text-amber-600 mt-0.5">{analytics.inTransitOrders}</h3>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                    {analytics.pendingOrders} pending verification
                  </span>
                </div>
              </div>

              {/* Metric 4: Successfully Delivered */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Deliveries</span>
                  <h3 className="text-2xl font-black text-purple-700 mt-0.5">{analytics.deliveredOrders}</h3>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                    Avg. Order Value: ₹{analytics.averageOrderValue.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary Delivery Pipeline & Payment Channels Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Delivery Schedule Widget */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Due / Out For Delivery</span>
                  <h4 className="text-xl font-black text-slate-900 mt-0.5">{analytics.dueTodayCount} Orders</h4>
                  <button
                    onClick={() => {
                      setActiveTab("orders");
                      setOrderStatusFilter("due_today");
                    }}
                    className="text-xs font-bold text-primary hover:underline mt-1 block text-left"
                  >
                    View Due Deliveries &rarr;
                  </button>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                  🚚
                </div>
              </div>

              {/* Pre-Paid vs Part-Payment Volume */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Payment Channels</span>
                  <div className="flex items-center gap-2 mt-1 text-xs flex-wrap">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {analytics.prepaidOrdersCount} Pre-Paid
                    </span>
                    <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                      {analytics.partPaymentOrdersCount} Part-Pay
                    </span>
                    <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      {analytics.codOrdersCount} COD
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1.5 block">
                    {Math.round((analytics.prepaidOrdersCount / (analytics.totalOrders || 1)) * 100)}% cashless prepayment
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                  💳
                </div>
              </div>

              {/* Delivery Completion Success Rate */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fulfillment Success</span>
                  <h4 className="text-xl font-black text-emerald-600 mt-0.5">{analytics.deliverySuccessRate}%</h4>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {analytics.deliveredOrders} of {analytics.totalOrders} fulfilled successfully
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                  🎯
                </div>
              </div>
            </div>

            {/* Part Payment Notice Highlight */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-amber-950">
                    Part-Payment Module Active ({settings.minPartPaymentPercentage}% Advance)
                  </h4>
                  <p className="text-xs text-amber-800">
                    {analytics.partPaymentOrdersCount} customer orders opted for part payment. Total ₹{analytics.totalPendingBalance.toLocaleString("en-IN")} balance will be collected by delivery executives.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab("settings")}
                className="btn-primary text-xs py-2 px-4 whitespace-nowrap bg-amber-600 hover:bg-amber-700"
              >
                Configure Settings
              </button>
            </div>

            {/* Visual Analytics Chart (SVG Graphic) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sales Trend Chart */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Weekly Revenue Velocity</h3>
                    <p className="text-xs text-slate-400">Order revenue over the last 7 calendar days</p>
                  </div>
                  <span className="text-xs font-extrabold text-primary bg-blue-50 px-3 py-1 rounded-full">
                    Gujarat Hub
                  </span>
                </div>

                {/* SVG Area Chart */}
                <div className="w-full h-56 relative pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#275b82" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#275b82" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="40" x2="700" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="90" x2="700" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="140" x2="700" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="190" x2="700" y2="190" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Area fill */}
                    <path
                      d="M 20,160 Q 120,120 220,140 T 420,80 T 560,95 T 680,45 L 680,190 L 20,190 Z"
                      fill="url(#chartGrad)"
                    />
                    {/* Trend Line */}
                    <path
                      d="M 20,160 Q 120,120 220,140 T 420,80 T 560,95 T 680,45"
                      fill="none"
                      stroke="#275b82"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    {[
                      { x: 20, y: 160, label: "₹3.8k" },
                      { x: 140, y: 130, label: "₹5.2k" },
                      { x: 260, y: 140, label: "₹4.4k" },
                      { x: 380, y: 90, label: "₹9.1k" },
                      { x: 500, y: 95, label: "₹8.8k" },
                      { x: 620, y: 55, label: "₹14.2k" },
                      { x: 680, y: 45, label: "Today" },
                    ].map((pt, idx) => (
                      <g key={idx}>
                        <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#275b82" strokeWidth="3" />
                      </g>
                    ))}
                  </svg>
                  {/* Day Labels */}
                  <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Today</span>
                  </div>
                </div>
              </div>

              {/* Status Breakdown Card */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Order Pipeline</h3>
                  <p className="text-xs text-slate-400 mb-6">Fulfillment stages breakdown</p>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-bold text-slate-700 mb-1">
                        <span>Delivered</span>
                        <span className="text-emerald-600">{analytics.deliveredOrders}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{
                            width: `${analytics.totalOrders ? (analytics.deliveredOrders / analytics.totalOrders) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-slate-700 mb-1">
                        <span>Out For Delivery / Shipped</span>
                        <span className="text-amber-600">{analytics.inTransitOrders}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{
                            width: `${analytics.totalOrders ? (analytics.inTransitOrders / analytics.totalOrders) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-slate-700 mb-1">
                        <span>Pending Processing</span>
                        <span className="text-blue-600">{analytics.pendingOrders}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${analytics.totalOrders ? (analytics.pendingOrders / analytics.totalOrders) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6">
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Manage All Orders</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Orders Quick Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Recent Customer Bookings</h3>
                  <p className="text-xs text-slate-400">Latest equipment orders received</p>
                </div>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-primary font-bold hover:underline"
                >
                  View Full Table &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4 rounded-l-xl">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 rounded-r-xl text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">{ord.id}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-900 block">{ord.customer.fullName}</span>
                          <span className="text-slate-400 text-[11px]">{ord.customer.city}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {ord.items.length} item{ord.items.length > 1 ? "s" : ""} (₹{ord.total})
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              ord.paymentMethod === "part_payment"
                                ? "bg-amber-100 text-amber-800"
                                : ord.paymentMethod === "prepaid"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {ord.paymentMethod.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                              ord.status === "delivered"
                                ? "bg-emerald-100 text-emerald-800"
                                : ord.status === "out_for_delivery"
                                ? "bg-amber-100 text-amber-800"
                                : ord.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {ord.status.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => openOrderModal(ord)}
                            className="text-primary hover:underline font-bold text-xs"
                          >
                            Manage &rarr;
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: ORDERS & BOOKINGS MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Filter Bar */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-80 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by ID, Customer name, Phone, City..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="due_today">🚚 Due / Out For Delivery ({analytics.dueTodayCount})</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="out_for_delivery">Out For Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={orderPaymentFilter}
                  onChange={(e) => setOrderPaymentFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none"
                >
                  <option value="all">All Payment Modes</option>
                  <option value="prepaid">100% Pre-Paid</option>
                  <option value="part_payment">Part Payment</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">
                  Active Customer Orders ({filteredOrders.length})
                </h3>
                <span className="text-xs text-slate-400">Click &ldquo;Edit &amp; Track&rdquo; to update status</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order ID &amp; Date</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Equipment Ordered</th>
                      <th className="py-3 px-4">Payment Breakdown</th>
                      <th className="py-3 px-4">Status &amp; Delivery</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-10 text-slate-400">
                          No orders match the specified filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                          {/* Order ID */}
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-slate-900 block">{ord.id}</span>
                            <span className="text-[11px] text-slate-400">
                              {new Date(ord.createdAt).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </td>

                          {/* Customer */}
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block">{ord.customer.fullName}</span>
                            <span className="text-slate-500 text-[11px] block">{ord.customer.phone}</span>
                            <span className="text-slate-400 text-[11px]">{ord.customer.city}, {ord.customer.pincode}</span>
                          </td>

                          {/* Equipment */}
                          <td className="py-3.5 px-4 max-w-xs">
                            <p className="font-medium text-slate-800 line-clamp-2">
                              {ord.items.map((i) => `${i.productName} (${i.quantity}x)`).join(", ")}
                            </p>
                          </td>

                          {/* Payment */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">₹{ord.total} Total</div>
                            {ord.paymentMethod === "part_payment" ? (
                              <div className="text-[11px] mt-0.5">
                                <span className="text-emerald-700 font-semibold">Paid: ₹{ord.paidAmount}</span>
                                <span className="text-amber-800 block font-bold">Due: ₹{ord.remainingAmount} (COD)</span>
                              </div>
                            ) : ord.paymentMethod === "prepaid" ? (
                              <span className="text-[11px] text-emerald-700 font-semibold block">100% Pre-Paid</span>
                            ) : (
                              <span className="text-[11px] text-slate-600 block">Due ₹{ord.total} on COD</span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md inline-block mb-1 ${
                                ord.status === "delivered"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : ord.status === "out_for_delivery"
                                  ? "bg-amber-100 text-amber-800"
                                  : ord.status === "shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : ord.status === "confirmed"
                                  ? "bg-indigo-100 text-indigo-800"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {ord.status.replace(/_/g, " ")}
                            </span>
                            {ord.courierPartner && (
                              <span className="text-[10px] text-slate-400 block font-medium">
                                via {ord.courierPartner}
                              </span>
                            )}
                          </td>

                          {/* Action */}
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => openOrderModal(ord)}
                              className="px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-bold text-xs"
                            >
                              Edit &amp; Track
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: PART PAYMENT & STORE SETTINGS */}
        {/* ============================================================== */}
        {activeTab === "settings" && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">Part Payment Configuration</h2>
                  <p className="text-xs text-slate-400">Control partial advance deposit rules for checkout</p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* Part Payment Master Switch */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Allow Part Payment at Checkout</h4>
                    <p className="text-xs text-slate-500">
                      When enabled, customers can pay an upfront deposit online and settle remaining balance upon delivery.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsFormData.allowPartPayment}
                      onChange={(e) =>
                        setSettingsFormData({ ...settingsFormData, allowPartPayment: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Percentage slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Minimum Upfront Partial Payment Percentage
                    </label>
                    <span className="font-black text-sm text-primary">
                      {settingsFormData.minPartPaymentPercentage}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={settingsFormData.minPartPaymentPercentage}
                    onChange={(e) =>
                      setSettingsFormData({
                        ...settingsFormData,
                        minPartPaymentPercentage: Number(e.target.value),
                      })
                    }
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>10% (Low Commitment)</span>
                    <span>30% (Recommended Standard)</span>
                    <span>80% (High Security)</span>
                  </div>
                </div>

                {/* Shipping rules */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Free Shipping Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={settingsFormData.freeShippingThreshold}
                      onChange={(e) =>
                        setSettingsFormData({
                          ...settingsFormData,
                          freeShippingThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-bold"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Orders above this get free delivery</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Standard Shipping Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={settingsFormData.shippingFee}
                      onChange={(e) =>
                        setSettingsFormData({
                          ...settingsFormData,
                          shippingFee: Number(e.target.value),
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-bold"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Applied when below free threshold</span>
                  </div>
                </div>

                {/* Store Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Support Phone</label>
                    <input
                      type="text"
                      value={settingsFormData.supportPhone}
                      onChange={(e) =>
                        setSettingsFormData({ ...settingsFormData, supportPhone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Support Email</label>
                    <input
                      type="email"
                      value={settingsFormData.supportEmail}
                      onChange={(e) =>
                        setSettingsFormData({ ...settingsFormData, supportEmail: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary text-xs py-3 px-6 shadow-md shadow-primary/20"
                  >
                    <Save className="w-4 h-4" /> Save Configuration Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: PRODUCTS CATALOG MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">SunTech Store Catalog Inventory</h3>
                <p className="text-xs text-slate-400">Add, edit prices, update stock, and control visibility</p>
              </div>

              <button
                onClick={openAddProductModal}
                className="btn-primary text-xs py-2.5 px-5 shadow-xs"
              >
                <Plus className="w-4 h-4" /> Add New Solar Product
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price / MRP</th>
                      <th className="py-3 px-4">Stock Status</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 p-1 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 truncate max-w-xs">{prod.name}</h4>
                            <span className="text-[11px] text-slate-400">SKU: {prod.id}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {prod.categoryName}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-black text-slate-900">₹{prod.price}</span>
                          <span className="text-slate-400 line-through text-[11px] block">₹{prod.mrp}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          {prod.inStock ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              In Stock ({prod.stockCount})
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                              Out of Stock
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 font-bold text-slate-800">
                          ⭐ {prod.rating} ({prod.reviewCount})
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditProductModal(prod)}
                              className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.name)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* ORDER DETAILS & STATUS UPDATE MODAL */}
      {/* ============================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-primary">{selectedOrder.id}</span>
                <h3 className="text-lg font-black text-slate-900">Manage Order &amp; Delivery</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Location summary */}
            <div className="p-4 bg-slate-50 rounded-2xl mb-6 text-xs text-slate-600 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <strong className="text-slate-900 block font-bold">{selectedOrder.customer.fullName}</strong>
                <span>{selectedOrder.customer.phone}</span>
                <span className="block">{selectedOrder.customer.email}</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Delivery Address:</span>
                <p>{selectedOrder.customer.address}, {selectedOrder.customer.city} - {selectedOrder.customer.pincode}</p>
              </div>
            </div>

            {/* Interactive Payment Management Controls */}
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 mb-6 text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200/60">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-primary" />
                  Payment Management ({selectedOrder.paymentMethod.replace(/_/g, " ").toUpperCase()})
                </span>
                <span className="font-black text-slate-900 text-sm">Total: ₹{selectedOrder.total}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Payment Status</label>
                  <select
                    value={modalPaymentStatus}
                    onChange={(e) => {
                      const next = e.target.value as PaymentStatus;
                      setModalPaymentStatus(next);
                      if (next === "paid") {
                        setModalPaidAmount(selectedOrder.total);
                        setModalRemainingAmount(0);
                      } else if (next === "pending") {
                        setModalPaidAmount(0);
                        setModalRemainingAmount(selectedOrder.total);
                      }
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none focus:border-primary"
                  >
                    <option value="pending">Pending</option>
                    <option value="partially_paid">Partially Paid (Deposit Received)</option>
                    <option value="paid">100% Fully Paid</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Paid Amount (₹)</label>
                  <input
                    type="number"
                    value={modalPaidAmount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setModalPaidAmount(val);
                      setModalRemainingAmount(Math.max(0, selectedOrder.total - val));
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold text-emerald-700 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Remaining Balance (₹)</label>
                  <input
                    type="number"
                    value={modalRemainingAmount}
                    onChange={(e) => setModalRemainingAmount(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold text-amber-800 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Quick Payment Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {modalPaymentStatus !== "paid" && (
                  <button
                    type="button"
                    onClick={() => {
                      setModalPaymentStatus("paid");
                      setModalPaidAmount(selectedOrder.total);
                      setModalRemainingAmount(0);
                    }}
                    className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[11px] hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    ✓ Settle &amp; Mark Full Payment (₹{selectedOrder.total})
                  </button>
                )}
                {selectedOrder.paymentMethod === "part_payment" && modalPaymentStatus === "pending" && (
                  <button
                    type="button"
                    onClick={() => {
                      const deposit = Math.round((selectedOrder.total * (selectedOrder.partPaymentPercentage || 30)) / 100);
                      setModalPaymentStatus("partially_paid");
                      setModalPaidAmount(deposit);
                      setModalRemainingAmount(selectedOrder.total - deposit);
                    }}
                    className="px-2.5 py-1 bg-amber-500 text-white font-bold rounded-lg text-[11px] hover:bg-amber-600 transition-colors shadow-xs"
                  >
                    ✓ Mark Advance Deposit Collected
                  </button>
                )}
              </div>
            </div>

            {/* Status Update Controls */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Update Order Pipeline Status
                </label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value as OrderStatus)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-primary"
                >
                  <option value="pending">Pending Review</option>
                  <option value="confirmed">Confirmed &amp; Packed</option>
                  <option value="shipped">Shipped / Dispatched</option>
                  <option value="out_for_delivery">Out For Delivery</option>
                  <option value="delivered">Delivered Successfully</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Carrier Partner</label>
                  <input
                    type="text"
                    placeholder="e.g. Delhivery / BlueDart / SunTech Fleet"
                    value={modalCourier}
                    onChange={(e) => setModalCourier(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Tracking Number</label>
                  <input
                    type="text"
                    placeholder="e.g. DEL-8891240"
                    value={modalTracking}
                    onChange={(e) => setModalTracking(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Estimated Delivery Date</label>
                <input
                  type="text"
                  placeholder="e.g. Oct 18, 2026 or Today by 5 PM"
                  value={modalEstDelivery}
                  onChange={(e) => setModalEstDelivery(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Internal Private Admin Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Customer verified balance ₹4,549 to pay via UPI upon arrival"
                  value={modalAdminNotes}
                  onChange={(e) => setModalAdminNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveOrderUpdate}
                className="btn-primary text-xs py-2.5 px-5"
              >
                <Save className="w-4 h-4" /> Save Order Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PRODUCT CREATE / EDIT MODAL */}
      {/* ============================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-black text-slate-900">
                {editingProduct ? "Edit Product" : "Add New Solar Equipment"}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Product Title *</label>
                <input
                  type="text"
                  required
                  value={productFormData.name}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  placeholder="e.g. SunTech Solar Glass Hydro Brush 40cm"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) =>
                      setProductFormData({
                        ...productFormData,
                        category: e.target.value as ProductCategory,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                  >
                    <option value="cleaning-kits">Solar Cleaning Kits</option>
                    <option value="brushes">Solar Cleaning Brushes</option>
                    <option value="cleaning-liquids">Cleaning Solutions</option>
                    <option value="drain-clips">Drainage Clips</option>
                    <option value="accessories">Solar Accessories &amp; Tools</option>
                    <option value="spares">Spare Parts &amp; Replacements</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Promo Badge</label>
                  <select
                    value={productFormData.badge}
                    onChange={(e) => setProductFormData({ ...productFormData, badge: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                  >
                    <option value="">None</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="Top Rated">Top Rated</option>
                    <option value="Hot Deal">Hot Deal</option>
                    <option value="New Arrival">New Arrival</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productFormData.price}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, price: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productFormData.mrp}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, mrp: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-bold text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Stock Count *</label>
                  <input
                    type="number"
                    required
                    value={productFormData.stockCount}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, stockCount: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Short Summary Description</label>
                <textarea
                  rows={2}
                  value={productFormData.shortDescription}
                  onChange={(e) =>
                    setProductFormData({ ...productFormData, shortDescription: e.target.value })
                  }
                  placeholder="Highlights for catalog card..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2.5 px-5"
                >
                  <Save className="w-4 h-4" /> Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
