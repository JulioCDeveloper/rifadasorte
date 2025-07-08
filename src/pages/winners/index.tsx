import React, { useState } from 'react';
import { Trophy, Calendar, User, Hash, Search, Filter, Medal, Star, Gift } from 'lucide-react';
import { mockRifasWinners } from '../../data/mockData';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { CartModal } from '../../components/CartModal';
import { CartProvider } from '../../context/CartContext';

export function WinnersScreen() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('recent'); // recent, oldest, prize
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    // Filtrar apenas rifas finalizadas com ganhadores
    const completedRifas = mockRifasWinners.filter(rifa =>
        rifa.status === 'completed' && rifa.winnerName && rifa.winnerNumber
    );

    // Aplicar filtros e ordenação
    let filteredWinners = completedRifas.filter(rifa =>
        rifa.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rifa.winnerName!.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ordenação
    filteredWinners = filteredWinners.sort((a, b) => {
        switch (sortBy) {
            case 'recent':
                return new Date(b.completedDate!).getTime() - new Date(a.completedDate!).getTime();
            case 'oldest':
                return new Date(a.completedDate!).getTime() - new Date(b.completedDate!).getTime();
            case 'prize':
                return (b.price * b.totalNumbers) - (a.price * a.totalNumbers);
            default:
                return 0;
        }
    });

    const totalPrizesAwarded = filteredWinners.length;
    const totalValueAwarded = filteredWinners.reduce((sum, rifa) => sum + (rifa.price * rifa.totalNumbers), 0);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);
    const toggleCart = () => setCartOpen(!cartOpen);

    return (
        <CartProvider>
            <div className="space-y-8">
                <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                <Header onMenuToggle={toggleSidebar} onCartToggle={toggleCart} />

                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="relative px-8 py-12 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                                <Trophy className="h-16 w-16 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            🎉 Hall da Fama
                        </h1>
                        <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
                            Conheça os sortudos que já foram contemplados em nossas rifas!
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
                                <div className="flex items-center justify-center space-x-2 mb-2">
                                    <Medal className="h-6 w-6 text-yellow-200" />
                                    <span className="text-2xl font-bold text-white">{totalPrizesAwarded}</span>
                                </div>
                                <p className="text-yellow-100 text-sm">Prêmios Entregues</p>
                            </div>
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
                                <div className="flex items-center justify-center space-x-2 mb-2">
                                    <Gift className="h-6 w-6 text-yellow-200" />
                                    <span className="text-2xl font-bold text-white">
                                        R$ {totalValueAwarded.toLocaleString('pt-BR')}
                                    </span>
                                </div>
                                <p className="text-yellow-100 text-sm">Valor Total</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por prêmio ou nome do ganhador..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white min-w-[200px]"
                            >
                                <option value="recent">Mais Recentes</option>
                                <option value="oldest">Mais Antigos</option>
                                <option value="prize">Maior Valor</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Winners Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWinners.map((rifa, index) => {
                        const prizeValue = rifa.price * rifa.totalNumbers;
                        const isTopPrize = index < 3; // Destacar os 3 primeiros

                        return (
                            <div
                                key={rifa.id}
                                className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isTopPrize ? 'border-yellow-300 ring-2 ring-yellow-100' : 'border-gray-200'
                                    }`}
                            >
                                {/* Top Badge for Featured Winners */}
                                {isTopPrize && (
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Star className="h-4 w-4 text-white" />
                                            <span className="text-white text-sm font-medium">
                                                {index === 0 ? '🥇 Maior Prêmio' : index === 1 ? '🥈 Segundo Lugar' : '🥉 Terceiro Lugar'}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Prize Image */}
                                <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center relative">
                                    {rifa.image ? (
                                        <img
                                            src={`data:image/jpeg;base64,${rifa.image}`}
                                            alt={rifa.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                target.parentElement!.innerHTML = `
                        <div class="flex flex-col items-center justify-center h-full text-gray-400">
                          <svg class="h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span class="text-sm">Imagem não disponível</span>
                        </div>
                      `;
                                            }}
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                            <Gift className="h-12 w-12 mb-2" />
                                            <span className="text-sm">Sem imagem</span>
                                        </div>
                                    )}

                                    {/* Prize Value Badge */}
                                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                        R$ {prizeValue.toLocaleString('pt-BR')}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{rifa.title}</h3>

                                    {/* Winner Info */}
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-200">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="p-2 bg-green-100 rounded-full">
                                                <Trophy className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-green-800">{rifa.winnerName}</p>
                                                <p className="text-sm text-green-600">Ganhador(a)</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center space-x-1 text-green-700">
                                                <Hash className="h-4 w-4" />
                                                <span>Número: <strong>{rifa.winnerNumber}</strong></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">ID da Rifa:</span>
                                            <span className="font-mono text-gray-900">#{rifa.id}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Data do Sorteio:</span>
                                            <div className="flex items-center space-x-1 text-gray-900">
                                                <Calendar className="h-4 w-4" />
                                                <span>{new Date(rifa.completedDate!).toLocaleDateString('pt-BR')}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Associado:</span>
                                            <span className="font-medium text-gray-900">{rifa.associadoName}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Total de Números:</span>
                                            <span className="font-medium text-gray-900">{rifa.totalNumbers}</span>
                                        </div>
                                    </div>

                                    {/* Celebration Footer */}
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500 mb-1">🎊 Parabéns ao ganhador! 🎊</p>
                                            <div className="flex justify-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className="text-yellow-400 text-xs">⭐</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredWinners.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-gray-100 rounded-full">
                                <Trophy className="h-12 w-12 text-gray-400" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum ganhador encontrado</h3>
                        <p className="text-gray-500">
                            {searchTerm
                                ? 'Tente ajustar os filtros de busca'
                                : 'Ainda não temos ganhadores registrados'
                            }
                        </p>
                    </div>
                )}

                {/* Footer Message */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                        🍀 Sua sorte pode ser a próxima!
                    </h3>
                    <p className="text-blue-700">
                        Participe das nossas rifas e concorra a prêmios incríveis.
                        Todos os sorteios são realizados de forma transparente e justa.
                    </p>
                </div>
                <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
            </div>
        </CartProvider>
    );
}