export interface NavItems {
  id: number;
  link: string;
  name: string;
  active: boolean;
  subItems?: SubNavItem[];
}

export interface SubNavItem {
  id: number;
  name: string;
  link: string;
  active: boolean;
}

export const navListData: NavItems[] = [
  {
    id: 1,
    link: '/upcoming',
    name: 'Upcoming',
    active: true,
  },
  {
    id: 2,
    link: '/popular',
    name: 'Popular',
    active: true,
  },
  {
    id: 3,
    link: '/categories',
    name: 'Categories',
    active: true,
    subItems: [
      {
        id: 1,
        link: '/Action',
        name: 'Action',
        active: true,
      },
      {
        id: 2,
        link: '/Adventure',
        name: 'Adventure',
        active: true,
      },
      {
        id: 3,
        link: '/Animation',
        name: 'Animation',
        active: true,
      },
      {
        id: 4,
        link: '/Comedy',
        name: 'Comedy',
        active: true,
      },
      {
        id: 5,
        link: '/Crime',
        name: 'Crime',
        active: true,
      },
      {
        id: 6,
        link: '/Documentary',
        name: 'Documentary',
        active: true,
      },
      {
        id: 7,
        link: '/Drama',
        name: 'Drama',
        active: true,
      },
      {
        id: 8,
        link: '/Family',
        name: 'Family',
        active: true,
      },
      {
        id: 9,
        link: '/Fantasy',
        name: 'Fantasy',
        active: true,
      },
      {
        id: 10,
        link: '/History',
        name: 'History',
        active: true,
      },
      {
        id: 11,
        link: '/Horror',
        name: 'Horror',
        active: true,
      },
      {
        id: 12,
        link: '/Music',
        name: 'Music',
        active: true,
      },
      {
        id: 13,
        link: '/Mystery',
        name: 'Mystery',
        active: true,
      },
      {
        id: 14,
        link: '/Romance',
        name: 'Romance',
        active: true,
      },
      {
        id: 15,
        link: '/Science Fiction',
        name: 'Science Fiction',
        active: true,
      },
      {
        id: 16,
        link: '/TV Movie',
        name: 'TV Movie',
        active: true,
      },
      {
        id: 17,
        link: '/Thriller',
        name: 'Thriller',
        active: true,
      },
      {
        id: 18,
        link: '/War',
        name: 'War',
        active: true,
      },
      {
        id: 19,
        link: '/Western',
        name: 'Western',
        active: true,
      },
      {
        id: 20,
        link: '/View all',
        name: 'View all',
        active: true,
      },
    ]
  },
];