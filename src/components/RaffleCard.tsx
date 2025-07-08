import React, { useState } from 'react';
import { Calendar, Users, Trophy } from 'lucide-react';
import { PurchaseModal } from './PurchaseModal';
import { WinnersModal } from './WinnersModal';
import { Raffle } from '../types';

interface RaffleCardProps extends Raffle {
  isHighlighted?: boolean;
}

export const RaffleCard: React.FC<RaffleCardProps> = ({
  _id,
  nome,
  image,
  valor,
  quantidade_numeros,
  data_fim,
  status,
  winner,
  instantWinners,
}) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showWinnersModal, setShowWinnersModal] = useState(false);

  const statusColors = {
    aguardando: 'bg-emerald-500 text-white',
    completa: 'bg-blue-500 text-white',
    finalizada: 'bg-yellow-500 text-white'
  };

  const statusLabels = {
    aguardando: 'Adquira já',
    completa: 'Concluída',
    finalizada: 'Aguardando'
  };

  const handleCardClick = () => {
    if (status === 'aguardando') {
      setShowPurchaseModal(true);
    } else if (status === 'completa') {
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
            src={`data:image/jpeg;base64,${image}`}
            alt={nome}
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
          <h3 className="font-semibold text-sm text-gray-800 mb-3 line-clamp-2">{nome}</h3>
          {/* Mobile: Column layout */}
          <div className="flex flex-col space-y-3 sm:hidden">
            <div className="text-center">
              <p className="text-lg font-bold text-emerald-600">R$ {valor}</p>
              <p className="text-xs text-gray-500">por título</p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              {/* <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{availableNumbers}</span>
              </div> */}
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{data_fim}</span>
              </div>
            </div>

            <button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 rounded-lg transition-colors text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              {status === 'aguardando' ? 'Adquira já' : status === 'completa' ? 'Ver ganhadores' : 'Finalizada'}
            </button>
          </div>

          {/* Desktop: Row layout */}
          <div className="hidden sm:block">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-lg font-bold text-emerald-600">R$ {valor}</p>
                <p className="text-xs text-gray-500">por título</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{quantidade_numeros}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{data_fim}</span>
              </div>
            </div>

            <button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 rounded-lg transition-colors text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              {status === 'aguardando' ? 'Adquira já' : status === 'completa' ? 'Ver ganhadores' : 'Finalizada'}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        raffle={{ _id, nome, image, valor, quantidade_numeros }}
      />

      <WinnersModal
        isOpen={showWinnersModal}
        onClose={() => setShowWinnersModal(false)}
        raffleTitle={nome}
        winner={winner}
        instantWinners={instantWinners}
      />
    </>
  );
};