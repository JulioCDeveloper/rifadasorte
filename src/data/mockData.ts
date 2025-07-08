import { Raffle, Winner, InstantWinner } from '../types';
import Banner1 from '../assets/banner1.png';
import Banner2 from '../assets/banner2.png';
import Banner3 from '../assets/banner3.png';
import { User, Associado, Rifa, Titulo } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@sortedanorte.com',
    role: 'admin'
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao@email.com',
    role: 'associado'
  },
  {
    id: '3',
    name: 'Maria Santos',
    email: 'maria@email.com',
    role: 'comprador'
  }
];
export const mockRifasWinners: Rifa[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max',
    description: 'Sorteio de iPhone 15 Pro Max 256GB',
    price: 50,
    discount: 10,
    isMainBanner: true,
    totalNumbers: 1000,
    soldNumbers: 750,
    drawDate: '2024-12-25',
    status: 'active',
    associadoId: '2',
    associadoName: 'João Silva',
    shareLink: 'https://sorteданорte.com/rifa/iphone-15-pro-max',
    image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' // Sample base64 image
  },
  {
    id: '2',
    title: 'Moto G84 5G',
    description: 'Smartphone Moto G84 5G 256GB',
    price: 25,
    discount: 0,
    isMainBanner: false,
    totalNumbers: 500,
    soldNumbers: 500,
    drawDate: '2024-12-20',
    status: 'completed',
    winnerName: 'Ana Costa',
    winnerNumber: 347,
    completedDate: '2024-12-20',
    associadoId: '2',
    associadoName: 'João Silva',
    shareLink: 'https://sorteданорte.com/rifa/moto-g84-5g',
    image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' // Sample base64 image
  },
  {
    id: '3',
    title: 'Notebook Dell',
    description: 'Notebook Dell Inspiron 15 3000',
    price: 75,
    discount: 5,
    isMainBanner: false,
    totalNumbers: 800,
    soldNumbers: 320,
    drawDate: '2024-12-30',
    status: 'active',
    associadoId: '4',
    associadoName: 'Carlos Oliveira',
    shareLink: 'https://sorteданорte.com/rifa/notebook-dell'
    // Esta rifa não tem imagem para demonstrar o comportamento sem imagem
  },
  {
    id: '4',
    title: 'Smart TV 55" Samsung',
    description: 'Smart TV Samsung 55" 4K UHD',
    price: 30,
    discount: 15,
    isMainBanner: false,
    totalNumbers: 600,
    soldNumbers: 600,
    drawDate: '2024-11-30',
    status: 'completed',
    winnerName: 'Pedro Oliveira',
    winnerNumber: 123,
    completedDate: '2024-11-30',
    associadoId: '2',
    associadoName: 'João Silva',
    shareLink: 'https://sorteданорte.com/rifa/smart-tv-samsung',
    image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  },
  {
    id: '5',
    title: 'PlayStation 5',
    description: 'Console PlayStation 5 + 2 Controles',
    price: 40,
    discount: 20,
    isMainBanner: false,
    totalNumbers: 750,
    soldNumbers: 750,
    drawDate: '2024-10-15',
    status: 'completed',
    winnerName: 'Lucas Silva',
    winnerNumber: 456,
    completedDate: '2024-10-15',
    associadoId: '4',
    associadoName: 'Carlos Oliveira',
    shareLink: 'https://sorteданорte.com/rifa/playstation-5',
    image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  }
];

export const mockAssociados: Associado[] = [
  {
    id: '2',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    document: '123.456.789-00',
    status: 'ativo',
    createdAt: '2024-01-15',
    totalSales: 150000,
    totalEarnings: 15000, // 10% de comissão
    totalWithdrawn: 10000,
    rifasSales: [
      { rifaId: '1', rifaTitle: 'iPhone 15 Pro Max', soldNumbers: 750, totalRevenue: 37500, commission: 3750 },
      { rifaId: '2', rifaTitle: 'Moto G84 5G', soldNumbers: 500, totalRevenue: 12500, commission: 1250 }
    ]
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    email: 'carlos@email.com',
    phone: '(11) 88888-8888',
    document: '987.654.321-00',
    status: 'ativo',
    createdAt: '2024-02-10',
    totalSales: 75000,
    totalEarnings: 7500, // 10% de comissão
    totalWithdrawn: 5000,
    rifasSales: [
      { rifaId: '3', rifaTitle: 'Notebook Dell', soldNumbers: 320, totalRevenue: 24000, commission: 2400 }
    ]
  }
];

export const mockRifas: Rifa[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max',
    description: 'Sorteio de iPhone 15 Pro Max 256GB',
    price: 50,
    totalNumbers: 1000,
    soldNumbers: 750,
    drawDate: '2024-12-25',
    status: 'active',
    associadoId: '2',
    associadoName: 'João Silva',
    shareLink: 'https://sorteданорte.com/rifa/iphone-15-pro-max'
  },
  {
    id: '2',
    title: 'Moto G84 5G',
    description: 'Smartphone Moto G84 5G 256GB',
    price: 25,
    totalNumbers: 500,
    soldNumbers: 500,
    drawDate: '2024-12-20',
    status: 'completed',
    associadoId: '2',
    associadoName: 'João Silva',
    shareLink: 'https://sorteданорte.com/rifa/moto-g84-5g'
  },
  {
    id: '3',
    title: 'Notebook Dell',
    description: 'Notebook Dell Inspiron 15 3000',
    price: 75,
    totalNumbers: 800,
    soldNumbers: 320,
    drawDate: '2024-12-30',
    status: 'active',
    associadoId: '4',
    associadoName: 'Carlos Oliveira',
    shareLink: 'https://sorteданорte.com/rifa/notebook-dell'
  }
];

export const mockTitulos: Titulo[] = [
  {
    id: '1',
    rifaId: '1',
    rifaTitle: 'iPhone 15 Pro Max',
    numbers: [123, 456, 789],
    purchaseDate: '2024-11-15',
    price: 150,
    status: 'active'
  },
  {
    id: '2',
    rifaId: '2',
    rifaTitle: 'Moto G84 5G',
    numbers: [321, 654],
    purchaseDate: '2024-11-10',
    price: 50,
    status: 'loser'
  }
];
export const featuredRaffle = {
  id: "featured",
  title: "Duas premiações Start 160 ou 10 Mil no Pix.",
  subtitletitle2: "Ou um Iphone 16 ou 5 Mil no Pix.",
  subtitle: "Concorra a dois sorteios uma Start 160 ou 10 mil no PIX ou Iphone 16 ou 5 mil no Pix.",
  image: Banner1,
  price: "0,99",
  originalPrice: "1,99",
  totalNumbers: 25000,
  availableNumbers: 75000,
  drawDate: "15/04.620533/2025-08",
  instantNumbers: 1.5
};

const winners: Winner[] = [
  // {
  //   id: "1",
  //   name: "João Silva Santos",
  //   prize: "R$ 127.468,00",
  //   ticketNumber: "08745",
  //   city: "São Paulo",
  //   state: "SP"
  // },
  // {
  //   id: "2", 
  //   name: "Maria Oliveira Costa",
  //   prize: "Novo Nivus GTS",
  //   ticketNumber: "15632",
  //   city: "Rio de Janeiro",
  //   state: "RJ"
  // }
];

const instantWinners: InstantWinner[] = [
  // {
  //   id: "1",
  //   name: "Carlos Mendes",
  //   prize: "R$ 500,00",
  //   ticketNumber: "12345",
  //   date: "15/03"
  // },
  // {
  //   id: "2",
  //   name: "Ana Paula Silva",
  //   prize: "R$ 1.000,00", 
  //   ticketNumber: "67890",
  //   date: "14/03"
  // },
  // {
  //   id: "3",
  //   name: "Roberto Lima",
  //   prize: "R$ 250,00",
  //   ticketNumber: "54321",
  //   date: "13/03"
  // },
  // {
  //   id: "4",
  //   name: "Fernanda Costa",
  //   prize: "R$ 750,00",
  //   ticketNumber: "98765",
  //   date: "12/03"
  // },
  // {
  //   id: "5",
  //   name: "Pedro Santos",
  //   prize: "R$ 300,00",
  //   ticketNumber: "11111",
  //   date: "11/03"
  // }
];

export const raffles: Raffle[] = [
  {
    id: "1",
    title: "Sorteio Iphone 16 Pro Max 256Gb ou 10 Mil no Pix",
    image: Banner2,
    price: "0,99",
    totalNumbers: 1000,
    availableNumbers: "30.000",
    drawDate: "14/09",
    status: "pending"
  },
  {
    id: "2",
    title: "Sorteio Start 160 ou 15 Mil no Pix",
    image: Banner3,
    price: "0,99",
    totalNumbers: 1000,
    availableNumbers: "75.000",
    drawDate: "22/10",
    status: "pending"
  },
  // {
  //   id: "2", 
  //   title: "EDIÇÃO 63 - NOVO NIVUS GTS",
  //   image: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=400",
  //   price: "2,50",
  //   totalNumbers: 50000,
  //   availableNumbers: 12350,
  //   drawDate: "20/06",
  //   status: "completed",
  //   winner: winners[1],
  //   instantWinners: instantWinners.slice(0, 3)
  // },
  // {
  //   id: "3",
  //   title: "EDIÇÃO 65 - 20MIW NO PATAÇO", 
  //   image: "https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400",
  //   price: "5.000,00",
  //   totalNumbers: 2000,
  //   availableNumbers: 890,
  //   drawDate: "14/06",
  //   status: "completed",
  //   winner: winners[0],
  //   instantWinners: instantWinners.slice(2, 5)
  // },
  // {
  //   id: "4",
  //   title: "EDIÇÃO 64 - 10 MIW NO PATAÇO",
  //   image: "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=400", 
  //   price: "1,50",
  //   totalNumbers: 15000,
  //   availableNumbers: 5670,
  //   drawDate: "22/06",
  //   status: "active"
  // },
  // {
  //   id: "5",
  //   title: "EDIÇÃO 68 - HONDA CBR 600RR",
  //   image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400",
  //   price: "5,00", 
  //   totalNumbers: 30000,
  //   availableNumbers: 8920,
  //   drawDate: "25/06",
  //   status: "active"
  // },
  // {
  //   id: "6",
  //   title: "EDIÇÃO 69 - YAMAHA R1M LIMITADA",
  //   image: "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400",
  //   price: "8,00",
  //   totalNumbers: 40000, 
  //   availableNumbers: 15680,
  //   drawDate: "30/06",
  //   status: "pending"
  // }
];