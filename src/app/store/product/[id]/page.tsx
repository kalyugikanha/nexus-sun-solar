"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  Package,
  Plus,
  Minus,
  ShoppingBag,
  Zap
} from "lucide-react";
import { Product } from "@/types/store";
import { getProductById, getStoredProducts, getStoredSettings } from "@/lib/storeStorage";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart, openCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(() => getProductById(resolvedParams.id) || null);
  const [selectedImage, setSelectedImage] = useState<string>(() => {
    const initP = getProductById(resolvedParams.id);
    return initP ? initP.image : "";
  });
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"specs" | "box" | "reviews">("specs");
  const [partPaymentAllowed, setPartPaymentAllowed] = useState(true);
  const [partPaymentPercent, setPartPaymentPercent] = useState(30);

  useEffect(() => {
    const p = getProductById(resolvedParams.id);
    if (p) {
      setProduct(p);
      setSelectedImage((prev) => prev || p.image);

      const all = getStoredProducts();
      const related = all.filter((item) => item.id !== p.id && item.category === p.category).slice(0, 4);
      if (related.length < 3) {
        const others = all.filter((item) => item.id !== p.id && !related.find((r) => r.id === item.id)).slice(0, 3);
        setRelatedProducts([...related, ...others].slice(0, 4));
      } else {
        setRelatedProducts(related);
      }
    }
    setLoading(false);

    const s = getStoredSettings();
    setPartPaymentAllowed(s.allowPartPayment);
    setPartPaymentPercent(s.minPartPaymentPercentage);

    const handleUpdate = () => {
      const refreshed = getProductById(resolvedParams.id);
      if (refreshed) setProduct(refreshed);
      const updatedS = getStoredSettings();
      setPartPaymentAllowed(updatedS.allowPartPayment);
      setPartPaymentPercent(updatedS.minPartPaymentPercentage);
    };
    window.addEventListener("suntech_storage_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("suntech_storage_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [resolvedParams.id]);

  if (loading && !product) {
    return (
      <div className="bg-gray-50 min-h-screen py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-semibold text-sm">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The requested solar equipment could not be found or has been moved.</p>
        <Link href="/store" className="btn-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>
    );
  }

  const depositAmount = Math.round((product.price * partPaymentPercent) / 100);
  const balanceAmount = product.price - depositAmount;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    openCart();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 py-3.5">
        <div className="container-custom flex items-center gap-2 text-xs text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/store" className="hover:text-primary">Store</Link>
          <span>/</span>
          <Link href={`/store?cat=${product.category}`} className="hover:text-primary">{product.categoryName}</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="container-custom pt-8">
        <Link
          href="/store"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to SunTech Catalog
        </Link>

        {/* Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-10">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square bg-gradient-to-b from-gray-50 to-gray-100/70 rounded-2xl border border-gray-200/60 p-8 flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-contain max-h-[380px]"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-black uppercase px-3 py-1 rounded-md shadow-xs">
                  {product.badge}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="absolute top-4 right-4 bg-yellow-400 text-primary-dark text-xs font-black px-2.5 py-1 rounded-md">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl bg-gray-50 p-2 border-2 transition-all flex-shrink-0 ${
                      selectedImage === img
                        ? "border-primary shadow-xs scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100 text-center text-xs text-gray-600">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <ShieldCheck className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="font-semibold block text-[11px] text-gray-900">ARC Safe</span>
                <span className="text-[10px] text-gray-500">Certified No-Scratch</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <Truck className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="font-semibold block text-[11px] text-gray-900">Fast Shipping</span>
                <span className="text-[10px] text-gray-500">Free over ₹999</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <CreditCard className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="font-semibold block text-[11px] text-gray-900">Part Payment</span>
                <span className="text-[10px] text-gray-500">30% Advance</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Purchase */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                  {product.categoryName}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviewCount} verified reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug mb-3">
                {product.name}
              </h1>

              {/* Short Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {product.shortDescription}
              </p>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 to-blue-50/20 border border-blue-100 mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-gray-900">₹{product.price}</span>
                  {product.mrp > product.price && (
                    <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
                  )}
                  <span className="text-xs bg-green-100 text-green-700 font-extrabold px-2.5 py-0.5 rounded-full ml-auto">
                    You Save ₹{product.mrp - product.price} ({product.discountPercent}%)
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Inclusive of all taxes. Free shipping applied on this item.</p>

                {/* Part Payment Calculation Box */}
                {partPaymentAllowed && (
                  <div className="mt-3 pt-3 border-t border-blue-200/50 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-1.5 text-primary-dark">
                      <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>
                        <strong>Part-Payment Available:</strong> Pay{" "}
                        <strong className="text-primary font-bold">₹{depositAmount * quantity}</strong> today
                      </span>
                    </div>
                    <span className="text-gray-500 text-[11px]">
                      Remaining ₹{balanceAmount * quantity} on Delivery
                    </span>
                  </div>
                )}
              </div>

              {/* Key Features List */}
              <div className="mb-6">
                <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-3">Key Features:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Add to Cart Actions */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-xl bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="w-9 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  ({product.stockCount} units left in stock)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Buy Now with Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specs, In The Box, Reviews */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs mb-12">
          {/* Tab Selector */}
          <div className="flex border-b border-gray-200 gap-6 mb-6">
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 font-bold text-sm transition-colors border-b-2 ${
                activeTab === "specs"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab("box")}
              className={`pb-3 font-bold text-sm transition-colors border-b-2 ${
                activeTab === "box"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              What&apos;s In The Box ({product.whatsInTheBox.length})
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 font-bold text-sm transition-colors border-b-2 ${
                activeTab === "reviews"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Customer Reviews ({product.reviewCount})
            </button>
          </div>

          {/* Tab 1: Specs */}
          {activeTab === "specs" && (
            <div>
              <div className="max-w-3xl mb-6">
                <h3 className="font-bold text-gray-900 text-base mb-2">Product Overview</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>

              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-3">Specifications Table:</h4>
              <div className="border border-gray-200 rounded-2xl overflow-hidden max-w-2xl">
                <table className="w-full text-xs text-left">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? "bg-gray-50/70" : "bg-white"}>
                        <td className="py-3 px-4 font-bold text-gray-700 w-1/3 border-b border-gray-100">{key}</td>
                        <td className="py-3 px-4 text-gray-900 border-b border-gray-100">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: In The Box */}
          {activeTab === "box" && (
            <div className="max-w-2xl">
              <h3 className="font-bold text-gray-900 text-base mb-3">Package Contents</h3>
              <p className="text-xs text-gray-500 mb-4">Every item is checked and quality-verified before dispatch from our Vadodara warehouse.</p>
              <div className="space-y-2.5">
                {product.whatsInTheBox.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <Package className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-6 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div className="text-center">
                  <span className="text-4xl font-black text-gray-900">{product.rating}</span>
                  <div className="flex justify-center text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">Based on {product.reviewCount} ratings</span>
                </div>
                <div className="flex-1 text-xs text-gray-600 border-l border-blue-100 pl-6 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span>5 Star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-yellow-400" />
                    </div>
                    <span className="w-8 text-right font-medium">85%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>4 Star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-[12%] h-full bg-yellow-400" />
                    </div>
                    <span className="w-8 text-right font-medium">12%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>3 Star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-[3%] h-full bg-yellow-400" />
                    </div>
                    <span className="w-8 text-right font-medium">3%</span>
                  </div>
                </div>
              </div>

              {/* Sample Verified Customer Reviews */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-100 bg-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-gray-900">Nirav Mehta (Vadodara)</span>
                    <span className="text-[11px] text-gray-400">Verified Buyer • 3 days ago</span>
                  </div>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    &ldquo;Exceptional build quality. Cleaned our 5kW rooftop array in under 20 minutes from the terrace floor without any ladders. Output jumped back by 22% immediately!&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-gray-100 bg-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-gray-900">Dr. Jayesh Trivedi (Anand)</span>
                    <span className="text-[11px] text-gray-400">Verified Buyer • 1 week ago</span>
                  </div>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    &ldquo;Used part-payment to pay 30% advance, delivery was prompt in 2 days and I paid the rest to the delivery executive. Very transparent and trustworthy.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Related Solar Equipment</h3>
              <Link href="/store" className="text-xs font-bold text-primary hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <Link href={`/store/product/${rel.id}`} className="block">
                    <div className="aspect-square bg-gray-50 rounded-xl p-4 flex items-center justify-center mb-3">
                      <img src={rel.image} alt={rel.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[10px] font-bold text-primary uppercase">{rel.categoryName}</span>
                    <h4 className="font-bold text-xs text-gray-900 line-clamp-2 mt-1 mb-2 hover:text-primary">
                      {rel.name}
                    </h4>
                    <div className="flex items-baseline gap-2">
                      <span className="font-extrabold text-sm text-gray-900">₹{rel.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{rel.mrp}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
