import React, { useState } from 'react';
import { Calendar, Users, Target } from 'lucide-react';
import { PurchaseModal } from './PurchaseModal';

interface FeaturedRaffleProps {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  originalPrice: string;
  totalNumbers: number;
  availableNumbers: number;
  drawDate: string;
  instantNumbers: number;
}

export const FeaturedRaffle: React.FC<FeaturedRaffleProps> = ({
  id,
  title,
  subtitle,
  image,
  price,
  originalPrice,
  totalNumbers,
  availableNumbers,
  drawDate,
  instantNumbers
}) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
        <div className="relative">
          {/* Background Image */}
          <div className="h-64 md:h-80 relative overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Content Overlay - Column layout on mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
              <div className="flex flex-col space-y-3 md:space-y-2">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    POR APENAS
                  </span>
                  <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-bold">
                    {instantNumbers}k INSTANTÂNEOS
                  </span>
                </div>
                
                <h2 className="text-xl md:text-3xl font-bold mb-1">{title}</h2>
                <p className="text-sm text-gray-200 mb-3">{subtitle}</p>
                
                {/* Mobile: Column layout */}
                <div className="flex flex-col space-y-2 md:hidden">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-2xl font-bold text-emerald-400">
                      R$ {price}
                    </span>
                    <span className="text-gray-300 line-through">R$ {originalPrice}</span>
                  </div>
                  
                  <div className="flex flex-col space-y-1 text-xs">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{availableNumbers.toLocaleString()} disponíveis</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Sorteio: {drawDate}</span>
                    </div>
                  </div>
                </div>

                {/* Desktop: Row layout */}
                <div className="hidden md:block">
                  <div className="flex items-baseline space-x-3 mb-3">
                    <span className="text-3xl md:text-4xl font-bold text-emerald-400">
                      R$ {price}
                    </span>
                    <span className="text-gray-300 line-through">R$ {originalPrice}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{availableNumbers.toLocaleString()} disponíveis</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Sorteio: {drawDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-4">
            <button 
              onClick={() => setShowPurchaseModal(true)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Target className="w-5 h-5" />
              <span>Adquire já</span>
            </button>
            
            <p className="text-center text-xs text-gray-500 mt-2">
              Vic: 15414.620533/2025-08
            </p>
          </div>
        </div>
      </div>

      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        raffle={{ id, title, image, price, availableNumbers }}
      />
    </>
  );
};