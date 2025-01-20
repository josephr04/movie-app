export interface NavItems {
    id: number;
    link: string;
    name: string;
    active: boolean;
}

export const navListData: NavItems[] = [
    {
        id: 1,
        link: '#upcoming',
        name: 'Upcoming',
        active: true,
    },
    {
        id: 2,
        link: '#popular',
        name: 'Popular',
        active: true,
    },
    {
        id: 3,
        link: '#categories',
        name: 'Categories',
        active: true,
    },
];