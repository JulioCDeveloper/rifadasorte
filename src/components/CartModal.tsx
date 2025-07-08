import React, { useState } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PaymentModal } from './PaymentModal';
import { useRequest } from '../hooks/useRequest';
import { AuthModal } from './AuthModal';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { error, loading, request } = useRequest();

  if (!isOpen) return null;

  const totalPrice = getTotalPrice();

  const ref_id = localStorage.getItem("ref_id")
  const authTokenSorte = JSON.parse(localStorage.getItem("authTokenSorte"))

  const handleCheckout = async () => {
    console.log(authTokenSorte)
    if (!authTokenSorte) {
      setShowAuthModal(true);
    }
    const payload = {
      ref_afflied: ref_id,
      cliente_id: authTokenSorte?.cliente_id,
      itens: cartItems.map(item => ({
        rifa__id: item.raffleId,
        quantidade_cotas: item.quantity,
        valor_total: item.quantity * item.price
      }))
    };

    try {
      const response = await request('POST', '/api/auth/gerar-compra', payload);

      if (response) {
        setShowPaymentModal(true);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-lg font-bold text-gray-800">Meus Títulos</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Seu carrinho está vazio</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.raffleId} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={`data:image/jpeg;base64,${item.image}`}
                          alt={item.raffleTitle}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm text-gray-800">{item.raffleTitle}</h3>
                          <p className="text-emerald-600 font-bold text-sm">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.raffleId)}
                          className="p-1 hover:bg-red-100 rounded text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.raffleId, item.quantity - 1)}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.raffleId, item.quantity + 1)}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-gray-800">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="bg-emerald-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Total:</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      R$ {totalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Finalizar Compra
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-lg transition-colors"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handlePaymentClose}
        totalAmount={totalPrice}
        pixCode={"00020126580014BR.GOV.BCB.PIX013636c4c14e-4b8a-4c4a-9c4a-1234567890ab5204000053039865802BR5925SORTE DA NORTE PREMIOS LTDA6009SAO PAULO62070503***6304A1B2"}
      />
    </>
  );
};