import React, { useEffect, useState } from 'react';
import { Users, TicketIcon, DollarSign, TrendingUp, CheckIcon } from 'lucide-react';
import { mockAssociados, mockRifas } from '../../data/mockData';
import { useRequest } from '../../hooks/useRequest';
import { useAuth } from '../../context/AuthContext';

export function AdminOverview() {
  const { user } = useAuth();

  const [rifas, setRifas] = useState([]);

  const { error, loading, request } = useRequest();

  const fetchData = async () => {
    try {
      const data = await request('GET', `/api/auth/dash-admin-painel-all/${user?.cliente_id}`);
      setRifas(data?.dashboard || [])
    } catch {
      console.log('erro na api')
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Apenas uma vez


  const totalAssociados = rifas?.total_associados;
  const totalUsuarios = rifas?.total_usuarios;
  const totalRifas = rifas?.rifas?.length;
  const rifasAtivas = rifas?.rifas?.filter(r => r.status === 'finalizada').length;
  const rifasAguardando = rifas?.rifas?.filter(r => r.status === 'aguardando').length;
  const totalFaturamento = rifas?.faturamento_total || 0;

  const stats = [
    {
      title: 'Total de Usuários',
      value: totalUsuarios,
      icon: <Users className="h-8 w-8 text-blue-600" />,
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total de Associados',
      value: totalAssociados,
      icon: <Users className="h-8 w-8 text-green-600" />,
      bgColor: 'bg-green-100',
    },
    {
      title: 'Rifas Concluídas',
      value: rifasAtivas,
      icon: <CheckIcon className="h-8 w-8 text-blue-600" />,
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Rifas Aguardando',
      value: rifasAguardando,
      icon: <TicketIcon className="h-8 w-8 text-blue-600" />,
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total de Rifas',
      value: totalRifas,
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Faturamento Total',
      value: `R$ ${totalFaturamento?.toLocaleString('pt-BR')}`,
      icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="space-y-6">
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Associados */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Associados</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {rifas?.top_associados?.sort((a, b) => b.totalSales - a.totalSales)
                .slice(0, 5)
                .map((associado) => (
                  <div key={associado._id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{associado.nome}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">
                        {associado?.total_pagamentos.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-gray-500">vendas</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Rifas Recentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Rifas Recentes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {rifas?.rifas?.slice(0, 5).map((rifa) => (
                <div key={rifa._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{rifa.nome}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${rifa.status === 'ativa'
                      ? 'bg-green-100 text-green-800'
                      : rifa.status === 'aguardando'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                      {rifa.status === 'ativa' ? 'Ativa' :
                        rifa.status === 'finalizada' ? 'Finalizada' : 'Aguardando'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}