import React, { useEffect, useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { useRequest } from '../../hooks/useRequest';
import { useAuth } from '../../context/AuthContext';

export function MeusTitulos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { user } = useAuth();

  const [rifas, setRifas] = useState({});
  const { error, loading, request } = useRequest();

  const fetchData = async () => {
    try {
      const response = await request('GET', `/api/auth/dash-comprador/${user?.cliente_id}`);
      setRifas(response?.dashboard || {})
    } catch {
      console.log('erro na api')
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Apenas uma vez
  // In a real app, you'd filter by user ID
  const meusTitulos = rifas?.titulos || []; // For demo purposes

  const filteredTitulos = meusTitulos.filter(titulo => {
    const matchesSearch = titulo?.rifa_id?.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || titulo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalInvestido = rifas?.total_investido || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Meus Títulos</h2>
        <p className="text-gray-600">Acompanhe todos os seus títulos de rifas</p>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold">{meusTitulos.length}</p>
            <p className="text-green-100 mt-1">Total de Títulos</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">R$ {totalInvestido.toLocaleString('pt-BR')}</p>
            <p className="text-green-100 mt-1">Total Investido</p>
          </div>
          {/* <div className="text-center">
            <p className="text-3xl font-bold">
              {meusTitulos.filter(t => t.status === 'ativa').length}
            </p>
            <p className="text-green-100 mt-1">Títulos Ativos</p>
          </div> */}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome da rifa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativos</option>
            <option value="winner">Vencedores</option>
            <option value="loser">Perdedores</option>
          </select>
        </div>
      </div>

      {/* Titles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTitulos.map((titulo) => (
          <div key={titulo.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{titulo?.rifa_id?.nome}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${titulo?.rifa_id?.status === 'aguardando'
                ? 'bg-blue-100 text-blue-800'
                : titulo.rifa_id?.status === 'winner'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                }`}>
                {titulo?.rifa_id?.status === 'aguardando' ? 'Ativo' :
                  titulo?.rifa_id?.status === 'winner' ? 'Vencedor' : 'Perdedor'}
              </span>
            </div>

            <div className="space-y-3">
              {/* <div className="flex justify-between">
                <span className="text-sm text-gray-500">Números Sorteados:</span>
                <span className="font-medium text-gray-900">
                  {titulo?.numbers?.join(', ')}
                </span>
              </div> */}

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Valor Pago:</span>
                <span className="font-medium text-green-600">
                  R$ {titulo?.valor_total?.toLocaleString('pt-BR')}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Data da Compra:</span>
                <span className="font-medium text-gray-900">
                  {new Date(titulo?.data_compra).toLocaleDateString('pt-BR')}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Quantidade de Números:</span>
                <span className="font-medium text-gray-900">
                  {titulo?.quantidade_cotas}
                </span>
              </div>
            </div>

            {titulo.status === 'winner' && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">
                  🎉 Parabéns! Você foi contemplado nesta rifa!
                </p>
              </div>
            )}

            {titulo.status === 'active' && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Aguardando sorteio
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTitulos.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Nenhum título encontrado</p>
          <p className="text-sm text-gray-400 mt-1">
            {searchTerm || statusFilter !== 'all'
              ? 'Tente ajustar os filtros de busca'
              : 'Você ainda não possui títulos de rifas'
            }
          </p>
        </div>
      )}
    </div>
  );
}