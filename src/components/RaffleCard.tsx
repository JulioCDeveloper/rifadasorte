import React, { useState } from 'react';
import { Calendar, Users, Trophy } from 'lucide-react';
import { PurchaseModal } from './PurchaseModal';
import { WinnersModal } from './WinnersModal';
import { Raffle } from '../types';

interface RaffleCardProps extends Raffle {
  isHighlighted?: boolean;
}

export const RaffleCard: React.FC<RaffleCardProps> = ({
  id,
  title,
  image,
  price,
  totalNumbers,
  availableNumbers,
  drawDate,
  status,
  winner,
  instantWinners,
  isHighlighted = false
}) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showWinnersModal, setShowWinnersModal] = useState(false);

  const statusColors = {
    active: 'bg-emerald-500 text-white',
    completed: 'bg-blue-500 text-white',
    pending: 'bg-yellow-500 text-white'
  };

  const statusLabels = {
    active: 'Adquira já',
    completed: 'Concluída',
    pending: 'Aguardando'
  };

  const handleCardClick = () => {
    if (status === 'active') {
      setShowPurchaseModal(true);
    } else if (status === 'completed') {
      setShowWinnersModal(true);
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-32 sm:h-40">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
          </div>
          {status === 'completed' && winner && (
            <div className="absolute top-2 right-2">
              <div className="bg-yellow-500 text-white p-1 rounded-full">
                <Trophy className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>

        {/* Content - Column layout on mobile, row on larger screens */}
        <div className="p-4">
          <h3 className="font-semibold text-sm text-gray-800 mb-3 line-clamp-2">{title}</h3>
          
          {/* Mobile: Column layout */}
          <div className="flex flex-col space-y-3 sm:hidden">
            <div className="text-center">
              <p className="text-lg font-bold text-emerald-600">R$ {price}</p>
              <p className="text-xs text-gray-500">por título</p>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{availableNumbers}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{drawDate}</span>
              </div>
            </div>

            <button 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 rounded-lg transition-colors text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              {status === 'active' ? 'Adquira já' : status === 'completed' ? 'Ver ganhadores' : 'Ver detalhes'}
            </button>
          </div>

          {/* Desktop: Row layout */}
          <div className="hidden sm:block">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-lg font-bold text-emerald-600">R$ {price}</p>
                <p className="text-xs text-gray-500">por título</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{availableNumbers}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{drawDate}</span>
              </div>
            </div>

            <button 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 rounded-lg transition-colors text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              {status === 'active' ? 'Adquira já' : status === 'completed' ? 'Ver ganhadores' : 'Ver detalhes'}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        raffle={{ id, title, image, price, availableNumbers }}
      />

      <WinnersModal
        isOpen={showWinnersModal}
        onClose={() => setShowWinnersModal(false)}
        raffleTitle={title}
        winner={winner}
        instantWinners={instantWinners}
      />
    </>
  );
};