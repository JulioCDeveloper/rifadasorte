import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  raffle: {
    id: string;
    title: string;
    image: string;
    price: string;
    availableNumbers: number;
  };
}

const quickSelectOptions = [250, 500, 750, 1000, 1500, 2000];

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, raffle }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const pricePerTicket = parseFloat(raffle.price.replace(',', '.'));
  const totalPrice = quantity * pricePerTicket;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 20000 && newQuantity <= raffle.availableNumbers) {
      setQuantity(newQuantity);
    }
  };

  const handleQuickSelect = (amount: number) => {
    if (amount <= raffle.availableNumbers) {
      setQuantity(amount);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      raffleId: raffle.id,
      raffleTitle: raffle.title,
      quantity,
      price: pricePerTicket,
      image: raffle.image
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-800">Selecionar Títulos</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Raffle Info */}
          <div className="flex items-center space-x-3 mb-6">
            <img
              src={raffle.image}
              alt={raffle.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-sm">{raffle.title}</h3>
              <p className="text-emerald-600 font-bold">R$ {raffle.price}</p>
              <p className="text-xs text-gray-500">{raffle.availableNumbers} disponíveis</p>
            </div>
          </div>

          {/* Quick Select */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Quanto mais títulos, mais chances de ganhar!
            </p>
            <div className="grid grid-cols-3 gap-2">
              {quickSelectOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleQuickSelect(amount)}
                  disabled={amount > raffle.availableNumbers}
                  className={`
                    p-3 rounded-lg border-2 transition-all text-center
                    ${amount === 750 ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-black text-white border-black hover:bg-gray-800'}
                    ${amount > raffle.availableNumbers ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="font-bold">+{amount}</div>
                  <div className="text-xs">SELECIONAR</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Quantity */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4 bg-gray-50 rounded-lg p-4">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <div className="flex-1 text-center">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  min="1"
                  max={Math.min(20000, raffle.availableNumbers)}
                  className="w-20 text-center text-2xl font-bold bg-transparent border-none outline-none"
                />
              </div>
              
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="bg-emerald-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total:</span>
              <span className="text-2xl font-bold text-emerald-600">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Participar - R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
          </button>

          {/* Info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              Máximo de 20.000 títulos por compra
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};