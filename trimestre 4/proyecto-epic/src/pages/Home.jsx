import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Routines from "../components/Routines";
import Pricing from "../components/Pricing";
import Menu from "../components/Menu";
import Contact from "../components/Contact";
import LoginModal from "../components/LoginModal";
import ShoppingCart from "../components/ShoppingCart";
import Checkout from "../components/Checkout";
import { ShoppingCart as CartIcon } from "lucide-react";

export default function Home({ setVista }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) =>
        cartItem.id === item.id ||
        (cartItem.name === item.name && cartItem.variant === item.variant)
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar onOpenAuth={() => setIsLoginModalOpen(true)} />
      <Hero onOpenAuth={() => setIsLoginModalOpen(true)} />
      <Services />
      <Routines />
      <Pricing onOpenAuth={() => setIsLoginModalOpen(true)} />
      <Menu onAddToCart={handleAddToCart} />
      <Contact />

      <LoginModal setVista={setVista} />

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={total}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Botón flotante del carrito */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-zinc-900 text-zinc-400 px-6 py-3 hover:text-lime-400 hover:border-lime-400 transition-all shadow-lg border-2 border-zinc-700 relative"
          title="Carrito de Compras"
        >
          <CartIcon className="w-5 h-5 mx-auto" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-lime-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
