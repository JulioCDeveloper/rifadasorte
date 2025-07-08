import React, { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, Target, CreditCard, Percent } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRequest } from '../../hooks/useRequest';

export function AssociadoOverview() {
  const { user } = useAuth();
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

  // Find current associado data
  const associado = user;
  const minhasRifas = user;
  const rifasAtivas = user;

  if (!associado) return null;

  const saldoDisponivel = 0;
  // const saldoDisponivel = associado.totalEarnings - associado.totalWithdrawn;
  const comissaoFixa = 10; // 10% fixo

  const stats = [
    {
      title: 'Total de Vendas',
      value: `R$ ${`${rifas?.total_vendas || 0}`.toLocaleString('pt-BR')}`,
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      bgColor: 'bg-green-100',
    },
    {
      title: 'Comissão (10%)',
      value: `R$ ${`${rifas?.comissao || 0}`.toLocaleString('pt-BR')}`,

      // value: `R$ ${associado.totalEarnings.toLocaleString('pt-BR')}`,
      icon: <Percent className="h-8 w-8 text-blue-600" />,
      bgColor: 'bg-blue-100',
    },
    // {
    //   title: 'Total Sacado',
    //   value: `R$ ${`${rifas?.total_sacado || 0}`.toLocaleString('pt-BR')}`,

    //   // value: `R$ ${associado.totalWithdrawn.toLocaleString('pt-BR')}`,
    //   icon: <CreditCard className="h-8 w-8 text-purple-600" />,
    //   bgColor: 'bg-purple-100',
    // },
    {
      title: 'Rifas Ativas',
      value: `${rifas?.rifas?.length || 0}`,

      // value: rifasAtivas,
      icon: <Target className="h-8 w-8 text-orange-600" />,
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo, {associado.nome}!</h2>
        <p className="text-green-100">Acompanhe seu desempenho e gerencie suas rifas</p>
        <div className="mt-4 p-3 bg-green-500 bg-opacity-30 rounded-lg">
          <p className="text-sm font-medium">Comissão Fixa: {comissaoFixa}% sobre todas as vendas</p>
        </div>
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

      {/* Saldo e Saque */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Saldo Disponível</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-green-600">
              R$ {saldoDisponivel.toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      </div> */}

      {/* Recent Activity */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Performance por Rifa</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {associado.rifasSales?.map((sale) => (
                <div key={sale.rifaId} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{sale.rifaTitle}</p>
                    <p className="text-sm text-gray-500">
                      {sale.soldNumbers} números vendidos
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">
                      R$ {sale.commission.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-500">comissão</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Resumo Geral</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Taxa de Comissão</span>
                <span className="font-semibold text-green-600">{comissaoFixa}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ticket Médio</span>
                <span className="font-semibold">
                  R$ {associado.rifasSales ?
                    Math.round(associado.totalSales / associado.rifasSales.reduce((sum, sale) => sum + sale.soldNumbers, 0)).toLocaleString('pt-BR')
                    : '0'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total de Rifas</span>
                <span className="font-semibold">{minhasRifas.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Números Vendidos</span>
                <span className="font-semibold">
                  {associado.rifasSales?.reduce((sum, sale) => sum + sale.soldNumbers, 0) || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}