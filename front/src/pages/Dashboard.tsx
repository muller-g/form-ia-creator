import React, { useCallback, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Plus,
  Search,
  Bell,
  User,
  TrendingUp,
  Users,
  BarChart3,
  Activity,
  SquareKanban,
  ChevronRight,
  Clock
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import fakeData from '../fakeData';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [kanbanData, setKanbanData] = useState(fakeData)

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'forms', label: 'Formulários', icon: FileText },
    { id: 'pipeline', label: 'Pipeline', icon: SquareKanban },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const stats = [
    { 
      label: 'Formulários Criados', 
      value: '12', 
      change: '+2', 
      changeType: 'positive',
      icon: FileText,
      color: 'bg-blue-500'
    },
    { 
      label: 'Respostas Recebidas', 
      value: '1,234', 
      change: '+15%', 
      changeType: 'positive',
      icon: Users,
      color: 'bg-green-500'
    },
    { 
      label: 'Taxa de Conversão', 
      value: '8.2%', 
      change: '+1.2%', 
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    { 
      label: 'Usuários Ativos', 
      value: '89', 
      change: '+5', 
      changeType: 'positive',
      icon: Activity,
      color: 'bg-orange-500'
    },
  ];

  const recentForms = [
    { id: 1, name: 'Pesquisa de Satisfação', responses: 45, status: 'Ativo', lastActivity: '2 horas atrás' },
    { id: 2, name: 'Formulário de Contato', responses: 23, status: 'Ativo', lastActivity: '1 dia atrás' },
    { id: 3, name: 'Avaliação de Produto', responses: 67, status: 'Inativo', lastActivity: '3 dias atrás' },
  ];

  const onBeforeCapture = useCallback((e: any) => {

  }, []);
  const onBeforeDragStart = useCallback((e: any) => {

  }, []);
  const onDragStart = useCallback((e: any) => {

 }, []);
  const onDragUpdate = useCallback((e: any) => {

  }, []);
  const onDragEnd = useCallback((e: any) => {
    let data: any = [...kanbanData]
    let source = parseInt(e.source.droppableId.split('-')[1])
    let index = parseInt(e.source.index)
    let destination = parseInt(e.destination.droppableId.split('-')[1])

    if (source < 0 || destination < 0 || !e.destination) return;

    let sourceLeads = data[source-1].leads
    let destLeads = data[destination-1].leads

    let removed = sourceLeads.splice(index-1, 1)
    destLeads.push(removed[0])

    data[source-1].leads = sourceLeads
    data[source].leads = destLeads

    setKanbanData(data)
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gradient">Form IA Creator</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`sidebar-item ${
                    activeTab === item.id
                      ? 'sidebar-item-active'
                      : 'sidebar-item-inactive'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center mb-4 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full sidebar-item sidebar-item-inactive"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar formulários..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        <main className="p-4 sm:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Visão Geral</h2>
                <p className="text-gray-600">Acompanhe o desempenho dos seus formulários</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="stat-card animate-slide-up bg-white rounded-xl" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`text-sm font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="card animate-slide-up" style={{animationDelay: '0.4s'}}>
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Formulários Recentes</h3>
                    <button className="btn-primary flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Formulário
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentForms.map((form, index) => (
                    <div key={form.id} className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {form.name}
                            </h4>
                            <ChevronRight className="h-4 w-4 text-gray-400 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {form.responses} respostas
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {form.lastActivity}
                            </span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          form.status === 'Ativo' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {form.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Plus className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Criar Formulário</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Crie um novo formulário personalizado com IA</p>
                  <button className="text-primary-600 text-sm font-medium group-hover:text-primary-700 cursor-pointer transition-colors">
                    Começar →
                  </button>
                </div>

                <div className="card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Ver Relatórios</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Analise o desempenho dos seus formulários</p>
                  <button className="text-primary-600 text-sm cursor-pointer font-medium group-hover:text-primary-700 transition-colors">
                    Ver relatórios →
                  </button>
                </div>

                <div className="card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <Settings className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Configurações</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Personalize suas preferências</p>
                  <button className="text-primary-600 cursor-pointer text-sm font-medium group-hover:text-primary-700 transition-colors">
                    Configurar →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'forms' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Formulários</h2>
                <p className="text-gray-600">Gerencie todos os seus formulários</p>
              </div>
              <div className="card p-6">
                <p className="text-gray-500">Lista de formulários será exibida aqui...</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Configurações</h2>
                <p className="text-gray-600">Configure suas preferências</p>
              </div>
              <div className="card p-6">
                <p className="text-gray-500">Configurações serão exibidas aqui...</p>
              </div>
            </div>
          )} 

          {activeTab === 'pipeline' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Pipeline</h2>
                <p className="text-gray-600">Gerencie o seu pipeline de formulários</p>
              </div>
              <div className="w-full h-full flex gap-4">
                <DragDropContext
                  onBeforeCapture={onBeforeCapture}
                  onBeforeDragStart={onBeforeDragStart}
                  onDragStart={onDragStart}
                  onDragUpdate={onDragUpdate}
                  onDragEnd={onDragEnd}
                >
                    {
                      kanbanData.map((col: any) => (
                        <Droppable droppableId={`droppable-${col?.id}`} type="PERSON" 
                          isDropDisabled={false} 
                          isCombineEnabled={false} 
                          ignoreContainerClipping
                        >
                          {(provided, snapshot) => (
                            <div
                              className="bg-white p-2 rounded-md w-full flex flex-col gap-2"
                              ref={provided.innerRef}
                              style={{ backgroundColor: 'white' }}
                              {...provided.droppableProps}
                            >
                              {
                                col.leads.map((lead: any, i: number) => (
                                  <Draggable draggableId={`draggable-${lead?.id}`} index={i}>
                                    {(provided, snapshot) => (
                                      <div
                                        className="bg-amber-300 p-2 rounded-md w-max"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <h4>{lead.name}</h4>
                                      </div>
                                    )}
                                  </Draggable>
                                ))
                              }
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      ))
                    }
                </DragDropContext>
              </div>
            </div>
          )}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard; 