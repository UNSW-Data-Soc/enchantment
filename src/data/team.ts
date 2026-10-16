export type Member = { name: string; role: string; file?: string };

type Section = {
    title: string;
    cardClass: string;
    sizes: string;
    eager?: boolean;
    members: Member[];
};

export const sections: Section[] = [
    {
        title: 'President',
        cardClass: 'w-[70%] sm:w-[50%] md:w-[32%] lg:w-[24%]',
        sizes: '(min-width: 1024px) 276px, (min-width: 768px) 32vw, (min-width: 640px) 50vw, 70vw',
        eager: true,
        members: [{ name: 'Qingyuan He', role: 'President', file: 'qingyuan_h.jpg' }],
    },
    {
        title: 'Executives',
        cardClass: 'w-[42%] sm:w-[38%] md:w-[28%] lg:w-[22%]',
        sizes: '(min-width: 1024px) 253px, (min-width: 768px) 28vw, (min-width: 640px) 38vw, 42vw',
        members: [
            { name: 'Ethan Pham', role: 'Vice President (Activities)', file: 'ethan_p.jpg' },
            { name: 'Stella Lin', role: 'Vice President (Development)', file: 'stella_l.jpg' },
            { name: 'Naisha Kulshreshtha', role: 'Vice President (External)' },
            { name: 'Andre Baruah', role: 'Vice President (Operations)', file: 'andre_b.jpg' },
            { name: 'Akhil Panwar', role: 'Secretary', file: 'akhil_p.jpg' },
            { name: 'Aaron Chen', role: 'Treasurer' },
        ],
    },
    {
        title: 'Directors',
        cardClass: 'w-[42%] md:w-[28%] lg:w-[22%]',
        sizes: '(min-width: 1024px) 253px, (min-width: 768px) 28vw, 42vw',
        members: [
            { name: 'Aaron Wong', role: 'Human Resources Director' },
            { name: 'Yatha Shah', role: 'Human Resources Director', file: 'yatha_s.jpg' },
            { name: 'Linh Pham', role: 'Social Director', file: 'linh_p.jpg' },
            { name: 'Jason Nguyen', role: 'Social Director' },
            { name: 'Lily Tang', role: 'Education Director', file: 'lily_t.jpg' },
            { name: 'Minjun Kim', role: 'Education Director', file: 'minjun_k.jpg' },
            { name: 'Anoushka Pandey', role: 'Philanthropy & Projects Director', file: 'anoushka_p.jpg' },
            { name: 'Isabella Fan', role: 'Philanthropy & Projects Director', file: 'isabella_f.jpg' },
            { name: 'Liam Lightfoot', role: 'Careers Director' },
            { name: 'Vidisha Trivedi', role: 'Careers Director', file: 'vidisha_t.jpg' },
            { name: 'Cathy Dinh', role: 'Sponsorships Director', file: 'cathy_d.jpg' },
            { name: 'Simon Shen', role: 'Sponsorships Director' },
            { name: 'Kai Lu', role: 'Technology Director', file: 'kai_l.jpg' },
            { name: 'Shafquat Tabeeb', role: 'Technology Director', file: 'shafquat_t.jpg' },
            { name: 'Jennifer Lee', role: 'Marketing Director', file: 'jennifer_l.jpg' },
            { name: 'Shashwat Manish', role: 'Marketing Director' },
            { name: 'Shreya Verma', role: 'Media Director', file: 'shreya_v.jpg' },
            { name: 'Vedant Tyagi', role: 'Media Director', file: 'vedant_t.jpg' },
        ],
    },
];
