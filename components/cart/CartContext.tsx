"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  _id: string;
  price: number;
  quantity: number;
  [key: string]: any;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (
    product: CartItem,
    quantity: number,
    options?: { openCart?: boolean }
  ) => void;
  removeFromCart: (_id: string) => void;
  updateQuantity: (_id: string, quantity: number) => void;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  loaded: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const saved = localStorage.getItem("cart");
        if (saved) {
          const parsed = JSON.parse(saved);
          let validCart = parsed;
          try {
            validCart = await validateCartStock(parsed);
          } catch (err) {
            console.warn("Stock validation failed, using local cart", err);
          }
          setCart(validCart);
        }
      } catch (err) {
        console.error("Cart init error:", err);
      } finally {
        setLoaded(true);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, loaded]);

  const validateCartStock = async (items: CartItem[]) => {
    const res = await fetch("/api/cart/validate", {
      method: "POST",
      body: JSON.stringify({ items }),
    });
    return res.json();
  };

  const addToCart = (product: CartItem, quantity: number, options?: { openCart?: boolean }) => {
    setCart((prev) => {
      const exist = prev.find((p) => p._id === product._id);

      if (exist) {
        return prev.map((p) =>
          p._id === product._id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }

      return [...prev, { ...product, quantity }];
    });

    if (options?.openCart !== false) {
      setIsOpen(true);
    }
  };

  const removeFromCart = (_id: string) => {
    setCart((prev) => prev.filter((p) => p._id !== _id));
  };

  const updateQuantity = (_id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((p) => (p._id === _id ? { ...p, quantity } : p))
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        isOpen,
        setIsOpen,
        loaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// hook seguro
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};