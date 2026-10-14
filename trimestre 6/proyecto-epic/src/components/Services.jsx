import { X, ShoppingCart as ShoppingCartIcon, Plus, Minus, Trash2 } from "lucide-react";

export default function ShoppingCart({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}) {
  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-end">
      <div 
        className="w-full md:w-[450px] h-full flex flex-col shadow-2xl transition-all"
        style={{ backgroundColor: "#1a1a1a", borderLeft: "1px solid #333333" }}
      >

        {/* Header */}
        <div className="p-6 flex items-center justify-between" style={{ backgroundColor: "#111111", borderBottom: "1px solid #333333" }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#1a1a1a] border border-[#333333]">
              <ShoppingCartIcon className="w-5 h-5" style={{ color: "#99FF00" }} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              CARRITO <span style={{ color: "#99FF00" }}>({cartItems.length})</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg bg-[#1a1a1a] border border-[#333333] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCartIcon className="w-16 h-16 text-gray-700 mb-4 stroke-1" />
              <p className="text-gray-300 text-lg font-semibold mb-1">Tu carrito está vacío</p>
              <p className="text-gray-500 text-sm max-w-xs">
                Agrega productos del menú para continuar con tu pedido de GYMZONE.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl transition-all"
                  style={{ backgroundColor: "#111111", border: "1px solid #333333" }}
                >
                  <div className="flex gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border border-[#333333]"
                      />
                    )}

                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm mb-1">{item.name}</h3>

                      {item.variant && (
                        <p className="text-gray-400 text-xs mb-2">
                          {item.variant}
                        </p>
                      )}

                      <p className="text-sm font-bold" style={{ color: "#99FF00" }}>
                        ${item.price.toLocaleString("es-CO")} COP
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-300 transition-colors h-fit p-1.5 rounded-lg bg-[#1a1a1a] border border-red-500/20 cursor-pointer"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#222222]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="text-white w-7 h-7 rounded flex items-center justify-center transition-colors cursor-pointer"
                        style={{ backgroundColor: "#222222", border: "1px solid #333333" }}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-white w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-white w-7 h-7 rounded flex items-center justify-center transition-colors cursor-pointer"
                        style={{ backgroundColor: "#222222", border: "1px solid #333333" }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-white font-bold text-sm">
                      ${(item.price * item.quantity).toLocaleString("es-CO")} COP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6" style={{ backgroundColor: "#111111", borderTop: "1px solid #333333" }}>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal</span>
                <span>${total.toLocaleString("es-CO")} COP</span>
              </div>

              <div className="h-px bg-[#333333]"></div>

              <div className="flex justify-between text-white text-lg font-bold">
                <span>Total</span>
                <span style={{ color: "#99FF00" }}>
                  ${total.toLocaleString("es-CO")} COP
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md uppercase tracking-wider text-sm"
              style={{ backgroundColor: "#99FF00", color: "#111111" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#8ce600"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#99FF00"}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              PROCEDER AL PAGO
            </button>
          </div>
        )}
      </div>
    </div>
  );
}