import { Raffle, Winner, InstantWinner } from '../types';
import Banner1 from '../assets/banner1.png';
import Banner2 from '../assets/banner2.png';
import Banner3 from '../assets/banner3.png';

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