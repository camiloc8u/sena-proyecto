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
    <div className="fixed inset-0 bg-black/95 z-50 flex items-end md:items-center justify-end">
      <div className="w-full md:w-[450px] h-full bg-zinc-900 border-l-2 border-lime-400 flex flex-col">

        {/* Header */}
        <div className="bg-zinc-950 border-b-2 border-lime-400 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCartIcon className="w-6 h-6 text-lime-400" />
            <h2 className="text-2xl text-white">
              CARRITO <span className="text-lime-400">({cartItems.length})</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-white hover:text-lime-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCartIcon className="w-16 h-16 text-zinc-700 mb-4" />
              <p className="text-gray-400 text-lg mb-2">Tu carrito está vacío</p>
              <p className="text-gray-500 text-sm">
                Agrega productos del menú para continuar
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-950 border border-zinc-800 p-4 hover:border-lime-400 transition-all"
                >
                  <div className="flex gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}

                    <div className="flex-1">
                      <h3 className="text-white mb-1">{item.name}</h3>

                      {item.variant && (
                        <p className="text-gray-400 text-sm mb-2">
                          {item.variant}
                        </p>
                      )}

                      <p className="text-lime-400">
                        ${item.price.toLocaleString("es-CO")} COP
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-300 transition-colors h-fit"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="bg-zinc-800 hover:bg-zinc-700 text-white w-8 h-8 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="text-white w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="bg-zinc-800 hover:bg-zinc-700 text-white w-8 h-8 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    <span className="ml-auto text-white">
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
          <div className="bg-zinc-950 border-t-2 border-lime-400 p-6">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${total.toLocaleString("es-CO")} COP</span>
              </div>

              <div className="h-px bg-zinc-800"></div>

              <div className="flex justify-between text-white text-xl">
                <span>Total</span>
                <span className="text-lime-400">
                  ${total.toLocaleString("es-CO")} COP
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-lime-400 text-black py-3 hover:bg-lime-500 transition-colors flex items-center justify-center gap-2"
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