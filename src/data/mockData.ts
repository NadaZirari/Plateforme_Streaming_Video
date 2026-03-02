import type { Video } from '../types';

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Inception',
    description: 'Un voleur qui subtilise des secrets d\'entreprise à travers l\'utilisation de la technologie de partage de rêves se voit offrir la tâche inverse : planter une idée dans l\'esprit d\'un C.E.O.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000',
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    duration: '2h 28min',
    releaseYear: 2010,
    type: 'FILM',
    category: 'Science-Fiction',
    rating: 8.8,
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page']
  },
  {
    id: '2',
    title: 'Stranger Things',
    description: 'Lorsqu\'un jeune garçon disparaît, sa mère, un chef de police et ses amis doivent affronter des forces surnaturelles terrifiantes afin de le retrouver.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=1000',
    trailerUrl: 'https://www.youtube.com/embed/b9EkMc79ZSU',
    duration: '4 Saisons',
    releaseYear: 2016,
    type: 'SERIE',
    category: 'Horreur',
    rating: 8.7,
    director: 'The Duffer Brothers',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder']
  },
  {
    id: '3',
    title: 'The Dark Knight',
    description: 'Quand la menace connue sous le nom du Joker sème le chaos dans Gotham City, Batman doit accepter l\'un des plus grands tests psychologiques et physiques de sa capacité à combattre l\'injustice.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1000',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWaywY',
    duration: '2h 32min',
    releaseYear: 2008,
    type: 'FILM',
    category: 'Action',
    rating: 9.0,
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart']
  },
  {
    id: '4',
    title: 'Cosmos: A Spacetime Odyssey',
    description: 'Une exploration des mondes connus et inconnus de l\'univers à travers les yeux de l\'astrophysicien Neil deGrasse Tyson.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000',
    trailerUrl: 'https://www.youtube.com/embed/hO2_F67rDTo',
    duration: '1 Saison',
    releaseYear: 2014,
    type: 'DOCUMENTAIRE',
    category: 'Documentaire',
    rating: 9.3,
    director: 'Brannon Braga',
    cast: ['Neil deGrasse Tyson']
  },
  {
    id: '5',
    title: 'Interstellar',
    description: 'Une équipe d\'explorateurs voyage à travers un trou de ver dans l\'espace pour tenter de sauver l\'humanité.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    duration: '2h 49min',
    releaseYear: 2014,
    type: 'FILM',
    category: 'Science-Fiction',
    rating: 8.7,
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain']
  },
  {
    id: '6',
    title: 'Breaking Bad',
    description: 'Un professeur de chimie atteint d\'un cancer décide de fabriquer de la méthamphétamine pour assurer le futur financier de sa famille.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=1000',
    trailerUrl: 'https://www.youtube.com/embed/HhesaQXLuRY',
    duration: '5 Saisons',
    releaseYear: 2008,
    type: 'SERIE',
    category: 'Drame',
    rating: 9.5,
    director: 'Vince Gilligan',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn']
  },
  {
    id: '7',
    title: 'The Silence of the Lambs',
    description: 'Une jeune stagiaire du FBI doit demander l\'aide d\'un tueur anthropophage incarcéré pour arrêter un autre tueur en série.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=1000',
    trailerUrl: 'https://www.youtube.com/embed/W6Mm8SbeRIw',
    duration: '1h 58min',
    releaseYear: 1991,
    type: 'FILM',
    category: 'Thriller',
    rating: 8.6,
    director: 'Jonathan Demme',
    cast: ['Jodie Foster', 'Anthony Hopkins', 'Lawrence A. Bonney']
  },
  {
    id: '8',
    title: 'Planet Earth II',
    description: 'Une immersion exceptionnelle au cœur des paysages les plus spectaculaires de notre planète, à la rencontre de la faune sauvage.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1000',
    trailerUrl: 'https://www.youtube.com/embed/c8aFcHFu8QM',
    duration: '1 Saison',
    releaseYear: 2016,
    type: 'DOCUMENTAIRE',
    category: 'Documentaire',
    rating: 9.5,
    director: 'Justin Anderson',
    cast: ['David Attenborough']
  }
];

export const CATEGORIES = [
  'Tous', 'Action', 'Comédie', 'Drame', 'Science-Fiction', 'Thriller', 'Documentaire', 'Horreur'
];
