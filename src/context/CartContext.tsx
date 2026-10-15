"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Product, CartItem } from "@/types/store";
import { getStoredSettings } from "@/lib/storeStorage";

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  totalMrp: number;
  savings: number;
  shippingFee: number;
  couponCode: string | null;
  couponDiscount: number;
  total: number;
  isCartOpen: boolean;
  toastMessage: string | null;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  isInitialized: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "suntech_cart_v1";
const COUPON_STORAGE_KEY = "suntech_coupon_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(999);
  const [standardShippingFee, setStandardShippingFee] = useState(99);

  // Sync settings
  const refreshSettings = useCallback(() => {
    const s = getStoredSettings();
    setFreeShippingThreshold(s.freeShippingThreshold);
    setStandardShippingFee(s.shippingFee);
  }, []);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) {
        setCouponCode(storedCoupon);
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    refreshSettings();
    setIsInitialized(true);

    const handleStorageUpdate = () => {
      refreshSettings();
    };
    window.addEventListener("suntech_storage_update", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);
    return () => {
      window.removeEventListener("suntech_storage_update", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, [refreshSettings]);

  // Persist to LocalStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to persist cart", e);
    }
  }, [items, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      if (couponCode) {
        localStorage.setItem(COUPON_STORAGE_KEY, couponCode);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to persist coupon", e);
    }
  }, [couponCode, isInitialized]);

  // Show auto-dismissing toast
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.product.id === product.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          const newQty = updated[existingIndex].quantity + quantity;
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
          };
          return updated;
        }
        return [...prev, { product, quantity }];
      });
      showToast(`Added "${product.name.slice(0, 32)}..." to cart`);
    },
    [showToast]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => {
      const filtered = prev.filter((item) => item.product.id !== productId);
      return filtered;
    });
    showToast("Item removed from cart");
  }, [showToast]);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode(null);
  }, []);

  // Calculate pricing
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  const totalMrp = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  }, [items]);

  const cartCount = useMemo(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  const savings = Math.max(0, totalMrp - subtotal);

  const shippingFee = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= freeShippingThreshold ? 0 : standardShippingFee;
  }, [items.length, subtotal, freeShippingThreshold, standardShippingFee]);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Coupons logic: 'SUNTECH10' gives 10% off (max 500), 'SOLAR50' gives flat 50 off
  const couponDiscount = useMemo(() => {
    if (!couponCode || subtotal === 0) return 0;
    const code = couponCode.trim().toUpperCase();
    if (code === "SUNTECH10") {
      return Math.min(Math.round(subtotal * 0.1), 1000);
    }
    if (code === "SUNTECH50") {
      return Math.min(subtotal, 50);
    }
    if (code === "FIRSTORDER") {
      return Math.min(Math.round(subtotal * 0.15), 500);
    }
    return 0;
  }, [couponCode, subtotal]);

  const applyCoupon = useCallback(
    (code: string) => {
      const clean = code.trim().toUpperCase();
      if (clean === "SUNTECH10" || clean === "SUNTECH50" || clean === "FIRSTORDER") {
        setCouponCode(clean);
        return { success: true, message: `Coupon "${clean}" applied successfully!` };
      }
      return { success: false, message: "Invalid coupon code. Try SUNTECH10 or FIRSTORDER" };
    },
    []
  );

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
  }, []);

  const total = Math.max(0, subtotal - couponDiscount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        totalMrp,
        savings,
        shippingFee,
        couponCode,
        couponDiscount,
        total,
        isCartOpen,
        toastMessage,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        isInitialized,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
