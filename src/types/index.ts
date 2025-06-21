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