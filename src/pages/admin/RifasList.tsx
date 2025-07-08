import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, ImageIcon } from 'lucide-react';
import { RifaForm } from './RifaForm';
import { Rifa } from '../../types';
import { useRequest } from '../../hooks/useRequest';
import { toast } from 'react-toastify';

export function RifasList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRifa, setEditingRifa] = useState<Rifa | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rifaToDelete, setRifaToDelete] = useState<Rifa | null>(null);
  const [rifas, setRifas] = useState([]);

  const { error, loading, request } = useRequest();

  const fetchData = async () => {
    try {
      const data = await request('GET', '/api/auth/rifas');
      setRifas(data?.rifas || [])
    } catch {
      console.log('erro na api')
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Apenas uma vez

  const filteredRifas = rifas.filter(rifa =>
    rifa?.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (rifa: Rifa) => {
    setEditingRifa(rifa);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingRifa(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingRifa(null);
  };

  const handleDeleteClick = (rifa: Rifa) => {
    setRifaToDelete(rifa);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (rifaToDelete) {
      // Remove from mockRifas array (in a real app, this would be an API call)
      const data = await request('DELETE', `/api/auth/rifa/${rifaToDelete._id}`);
      if (data.success) {
        toast.success("Rifa removida com sucesso")
        setShowDeleteModal(false);
        setRifaToDelete(null);
        await fetchData()
      } else {
        toast.error("Error ao remover rifa")
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setRifaToDelete(null);
  };
  if (showForm) {
    return (
      <RifaForm
        rifa={editingRifa}
        onClose={handleCloseForm}
        fetchData={fetchData}
      />
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Rifas</h2>
            <p className="text-gray-600">Gerencie todas as rifas da plataforma</p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nova Rifa
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar rifas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRifas.map((rifa) => (
            <div key={rifa._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Image */}
              <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                {rifa.image ? (
                  <img
                    src={`data:image/jpeg;base64,${rifa.image}`}
                    alt={rifa.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
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
                    <ImageIcon className="h-12 w-12 mb-2" />
                    <span className="text-sm">Sem imagem</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{rifa.nome}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${rifa.status === 'ativa'
                    ? 'bg-green-100 text-green-800'
                    : rifa.status === 'aguardando'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                    }`}>
                    {rifa.status === 'ativa' ? 'Ativa' :
                      rifa.status === 'finalizada' ? 'Completa' : 'Aguardando'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{rifa?.descricao}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Preço por número:</span>
                    <span className="font-medium text-green-600">R$ {rifa?.valor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Vendidos:</span>
                    <span className="font-medium">{rifa?.quantidade_vendidos}/{rifa?.quantidade_numeros}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Sorteio:</span>
                    <span className="font-medium">{new Date(rifa.data_fim).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progresso</span>
                    <span className="text-gray-900">{Math.round((rifa?.quantidade_vendidos / rifa?.quantidade_numeros) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 rounded-full h-2 transition-all"
                      style={{ width: `${(rifa?.quantidade_vendidos / rifa?.quantidade_numeros) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    {/* <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button> */}
                    <button
                      onClick={() => handleEdit(rifa)}
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(rifa)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Excluir Rifa
            </h3>

            <p className="text-gray-600 text-center mb-6">
              Deseja realmente excluir a rifa <strong>"{rifaToDelete?.nome}"</strong>?
              Esta ação não pode ser desfeita.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}