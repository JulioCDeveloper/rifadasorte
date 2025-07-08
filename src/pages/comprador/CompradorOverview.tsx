import { TicketIcon, DollarSign, Trophy, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockTitulos } from '../../data/mockData';
import { useEffect, useState } from 'react';
import { useRequest } from '../../hooks/useRequest';

export function CompradorOverview() {
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
  const totalInvestido = rifas?.total_investido || 0;
  const titulosAtivos = meusTitulos?.filter(t => t?.rifa_id?.status === 'aguardando').length;
  const titulosVencedores = meusTitulos.filter(t => t.status === 'winner').length;

  const stats = [
    {
      title: 'Total Investido',
      value: `R$ ${totalInvestido.toLocaleString('pt-BR')}`,
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      bgColor: 'bg-green-100',
    },
    {
      title: 'Títulos Ativos',
      value: titulosAtivos,
      icon: <TicketIcon className="h-8 w-8 text-blue-600" />,
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Títulos Vencedores',
      value: titulosVencedores,
      icon: <Trophy className="h-8 w-8 text-yellow-600" />,
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Aguardando Sorteio',
      value: titulosAtivos,
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo, {user?.nome}!</h2>
        <p className="text-green-100">Acompanhe seus títulos e concorra aos prêmios</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Titles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Meus Títulos Recentes</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {meusTitulos?.slice(0, 5)?.map((titulo) => (
              <div key={titulo._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{titulo?.rifa_id?.nome}</p>
                  <p className="text-sm text-gray-500">
                    Números: {titulo?.quantidade_cotas}
                  </p>
                  <p className="text-sm text-gray-500">
                    Comprado em: {new Date(titulo?.data_compra).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">
                    R$ {titulo?.valor_total?.toLocaleString('pt-BR')}
                  </p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${titulo?.rifa_id?.status === 'aguardando'
                    ? 'bg-blue-100 text-blue-800'
                    : titulo?.rifa_id?.status === 'winner'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}>
                    {titulo?.rifa_id?.status === 'active' ? 'Ativo' :
                      titulo?.rifa_id?.status === 'winner' ? 'Vencedor' : 'Aguardando'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition-colors">
            <h4 className="font-medium text-gray-900">Explorar Rifas</h4>
            <p className="text-sm text-gray-500 mt-1">Descubra novas rifas disponíveis</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition-colors">
            <h4 className="font-medium text-gray-900">Histórico</h4>
            <p className="text-sm text-gray-500 mt-1">Veja todas suas participações</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition-colors">
            <h4 className="font-medium text-gray-900">Suporte</h4>
            <p className="text-sm text-gray-500 mt-1">Precisa de ajuda? Fale conosco</p>
          </button>
        </div>
      </div>
    </div>
  );
}