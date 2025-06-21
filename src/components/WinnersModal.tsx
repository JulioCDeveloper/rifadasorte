import React from 'react';
import { X, Trophy, Gift, MapPin, Calendar } from 'lucide-react';
import { Winner, InstantWinner } from '../types';

interface WinnersModalProps {
  isOpen: boolean;
  onClose: () => void;
  raffleTitle: string;
  winner?: Winner;
  instantWinners?: InstantWinner[];
}

export const WinnersModal: React.FC<WinnersModalProps> = ({
  isOpen,
  onClose,
  raffleTitle,
  winner,
  instantWinners = []
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-800">Ganhadores</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-4">{raffleTitle}</h3>

          {/* Main Winner */}
          {winner && (
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 mb-6 border border-yellow-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Ganhador Principal</h4>
                  <p className="text-sm text-gray-600">{winner.prize}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Nome:</span>
                  <span className="font-medium">{winner.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Título:</span>
                  <span className="font-medium">#{winner.ticketNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Localização:</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span className="font-medium">{winner.city}, {winner.state}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instant Winners */}
          {instantWinners.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gift className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-gray-800">Premiações Instantâneas</h4>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                  {instantWinners.length}
                </span>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {instantWinners.map((instantWinner) => (
                  <div
                    key={instantWinner.id}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">{instantWinner.name}</span>
                      <span className="text-xs text-gray-500 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{instantWinner.date}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-600 font-medium">{instantWinner.prize}</span>
                      <span className="text-gray-600">#{instantWinner.ticketNumber}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!winner && instantWinners.length === 0 && (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhum ganhador ainda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};