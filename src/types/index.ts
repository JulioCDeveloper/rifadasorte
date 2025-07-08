export interface CartItem {
  raffleId: string;
  raffleTitle: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Winner {
  id: string;
  name: string;
  prize: string;
  ticketNumber: string;
  city: string;
  state: string;
}

export interface InstantWinner {
  id: string;
  name: string;
  prize: string;
  ticketNumber: string;
  date: string;
}

export interface Raffle {
  id: string;
  title: string;
  image: string;
  price: string;
  totalNumbers: number;
  availableNumbers: number;
  drawDate: string;
  status: 'active' | 'completed' | 'pending';
  winner?: Winner;
  instantWinners?: InstantWinner[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'associado' | 'comprador';
  cargo: 'admin' | 'associado' | 'comprador';
  avatar?: string;
}

export interface RifaSale {
  rifaId: string;
  rifaTitle: string;
  soldNumbers: number;
  totalRevenue: number;
  commission: number;
}

export interface Associado {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  status: 'ativo' | 'inativo';
  createdAt: string;
  totalSales: number;
  totalEarnings: number;
  totalWithdrawn: number;
  rifasSales?: RifaSale[];
}

export interface Rifa {
  id: string;
  title: string;
  description: string;
  price: number;
  totalNumbers: number;
  soldNumbers: number;
  drawDate: string;
  status: 'active' | 'completed' | 'cancelled';
  associadoId: string;
  associadoName: string;
  image?: string;
  shareLink?: string;
}

export interface Titulo {
  id: string;
  rifaId: string;
  rifaTitle: string;
  numbers: number[];
  purchaseDate: string;
  price: number;
  status: 'active' | 'winner' | 'loser';
}