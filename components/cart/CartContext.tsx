"use client";

import { createContext, useContext, useEffect, useState } from "react";

// 👇 tipos (evita errores después)
type CartItem = {
  _id: string;
  price: number;
  quantity: number;
  [key: string]: any;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: CartItem, quantity: number) => void;
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

  // ✅ cargar SOLO en cliente (NO SSR)
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  // ✅ guardar SOLO después de cargar
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, loaded]);

  const addToCart = (product: CartItem, quantity: number) => {
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

    setIsOpen(true);
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