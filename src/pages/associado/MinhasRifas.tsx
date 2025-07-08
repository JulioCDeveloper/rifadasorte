import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockRifas } from '../../data/mockData';
import { Share2, Copy, Eye, BarChart3, Calendar, DollarSign } from 'lucide-react';
import { useRequest } from '../../hooks/useRequest';

export function MinhasRifas() {
  const { user } = useAuth();
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [rifas, setRifas] = useState([]);

  const { error, loading, request } = useRequest();
  const fetchData = async () => {
    try {
      const response = await request('GET', `/api/auth/dash-afflied/${user?.cliente_id}`);
      setRifas(response?.dashboard || [])
    } catch {
      console.log('erro na api')
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Apenas uma vez

  const handleCopyLink = async (link: string, rifaId: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(rifaId);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
    }
  };

  const calculateCommission = (soldNumbers: number, price: number) => {
    return (soldNumbers * price * 0.1); // 10% de comissão
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Minhas Rifas</h2>
        <p className="text-gray-600">Gerencie suas rifas, compartilhe links e acompanhe vendas</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{rifas?.rifas?.length}</p>
            <p className="text-sm text-gray-600 mt-1">Total de Rifas</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">
              {rifas?.total_vendas}
            </p>
            <p className="text-sm text-gray-600 mt-1">Números Vendidos</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">
              R$ {rifas?.comissao}
            </p>
            <p className="text-sm text-gray-600 mt-1">Comissão Total</p>
          </div>
        </div>
      </div>

      {/* Rifas List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Lista de Rifas</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {rifas?.rifas?.map((rifa) => {
            const comissao = calculateCommission(rifa.quantidade_vendidos, rifa.valor);
            const progressPercentage = Math.round((rifa.quantidade_vendidos / rifa.quantidade_numeros) * 100);

            return (
              <div key={rifa.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{rifa.nome}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${rifa.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : rifa.status === 'aguardando'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                        }`}>
                        {rifa.status === 'ativa' ? 'Ativa' :
                          rifa.status === 'finalizada' ? 'Completa' : 'Aguardando'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{rifa.descricao}</p>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-500">Preço</p>
                          <p className="font-medium text-green-600">R$ {rifa.valor}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Quantidade números</p>
                          <p className="font-medium">{rifa?.quantidade_numeros}</p>
                        </div>
                      </div>

                      {/* <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-purple-600" />
                        <div>
                          <p className="text-xs text-gray-500">Comissão (10%)</p>
                          <p className="font-medium text-purple-600">R$ {comissao.toLocaleString('pt-BR')}</p>
                        </div>
                      </div> */}

                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <div>
                          <p className="text-xs text-gray-500">Sorteio</p>
                          <p className="font-medium">{new Date(rifa.data_fim).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {/* <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progresso de Vendas</span>
                        <span className="text-gray-900 font-medium">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 rounded-full h-2 transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div> */}

                    {/* Share Link */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <p className="text-xs text-gray-500 mb-1">Link de Divulgação</p>
                          <p className="text-sm font-mono text-gray-700 truncate">
                            {rifa.shareLink || `https://sortedanorte.com/?ref_id=${user._id}`}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleCopyLink(rifa.shareLink || `https://sortedanorte.com/?ref_id=${user._id}`, rifa._id)}
                            className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${copiedLink === rifa._id
                              ? 'bg-green-100 text-green-700'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            {copiedLink === rifa._id ? 'Copiado!' : 'Copiar'}
                          </button>
                          <button className="flex items-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <Share2 className="h-4 w-4 mr-1" />
                            Compartilhar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {rifas?.rifas?.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Nenhuma rifa encontrada</p>
          <p className="text-sm text-gray-400 mt-1">Entre em contato com o administrador para criar suas rifas</p>
        </div>
      )}
    </div>
  );
}