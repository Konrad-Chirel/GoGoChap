import {Home, LogOut,ChartColumn,NotepadText,Users,UserPlus,UserCheck,Package, ScrollText , PackagePlus,ShoppingBag,Settings, PieChart, Coins, Headphones, FileUp, PlusCircle} from "lucide-react"
import image1 from "@/assets/image1.jpg";
// constants.js

export const navbarLinks = [
  {
    title: "Dashboard",
    links: [
             {
                label:"Tableau de bord",
                icon: Home,
                path: "/",
            },
          {
                label:"Gestion des utilisateurs",
                icon: Users,
                path: "/gestion_utilisateur",

            }, {
                label:"Repartition des tarifs",
                icon: Coins,
                path: "/repartition_des_tarifs",
            },

           
             {
                label:"Gestion des tarifs",
                icon: ScrollText,
                path: "/gestion_des_tarifs",
            },
             {
                label:"Gestion des litiges/support client",
                icon: Headphones,
                path: "/gestion_des_litiges",
            },
             {
                label:"Export de données/ rapports  financiers",
                icon:  FileUp ,
                path: "/export_donnees",
            },
             {
                label:"Ajout/retrait de zones géographiques desservies",
                icon: PlusCircle,
                path: "/zone_geographique_desservies",
            },
           

        ],
    },
   
    ]


export const settingsLinks = [
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    label: "Déconnexion",
    icon: LogOut,
    path: null,       // pas de chemin, c’est une action
    onClick: "logout" // indicateur pour le bouton logout
  }
];



export const overviewData = [
    { name: "Lun", revenue: 500, expenses: 500, sales: 100 },
    { name: "Mar", revenue: 2000, expenses: 1000, sales: 150 },
    { name: "Mer", revenue: 1000, expenses: 800, sales: 700 },
    { name: "Jeu", revenue: 3000, expenses: 1200, sales: 200 },
    { name: "Ven", revenue: 2000, expenses: 700, sales: 120 },
    { name: "Sam", revenue: 500, expenses: 600, sales: 800 },
    { name: "Dim", revenue: 2000, expenses: 1100, sales: 140 },
    { name: "Lun+", revenue: 3000, expenses: 1300, sales: 180 },
    { name: "Mar+", revenue: 1000, expenses: 900, sales: 600 },
    { name: "Mer+", revenue: 3000, expenses: 1000, sales: 170 },
    { name: "Jeu+", revenue: 600, expenses: 500, sales: 90 },
    { name: "Ven+", revenue: 5000, expenses: 1500, sales: 250 },
  ];

export const recentSalesData = [
{
    id:1,
    name:"Olivia Martin",
    email: "noah.wilson@email.com",
    image: image1,
    produit: "Pizza",
    total:3500,
},
{
    id:2,
    name:"James Smith",
    email: "noah.wilson@email.com",
    image: image1,
    produit: "Jus d'ananas",
    total:3500,
},
{
    id:3,
    name:"Sophia Brown",
    email: "noah.wilson@email.com",
    image: image1,
    produit: "riz au gras",
    total:3500,
},
    
{
    id:4,
    name:"Noah Wilson",
    email: "noah.wilson@email.com",
    image: image1,
    produit: "chawarma",
    total:3500, 
},

];

export const topProducts = [
    
{
    number:1,
    name:"Wireless House",
    image: image1,
    description: "Ergonomic wireless mouse with precision tracking",
    price:49.99,
    status: "In Stock",
    rating: 4.8,
},
{
    number:2,
    name:"Wireless House",
    image: image1,
    description: "Ergonomic wireless mouse with precision tracking",
    price:49.99,
    status: "In Stock",
    rating: 4.8,
},
{
    number:3,
    name:"Wireless House",
    image: image1,
    description: "Ergonomic wireless mouse with precision tracking",
    price:49.99,
    status: "In Stock",
    rating: 4.8,
},
{
    number:4,
    name:"Wireless House",
    image: image1,
    description: "Ergonomic wireless mouse with precision tracking",
    price:49.99,
    status: "In Stock",
    rating: 4.8,
},
{
    number:5,
    name:"Wireless House",
    image: image1,
    description: "Ergonomic wireless mouse with precision tracking",
    price:49.99,
    status: "In Stock",
    rating: 4.8,
},
{
    number:6,
    name:"Wireless House",
    image: image1,
    description: "Ergonomic wireless mouse with precision tracking",
    price:49.99,
    status: "In Stock",
    rating: 4.8,
},
{
    number:7,
    name:"Wireless House",
    image: image1,
    description: "Ergonomic wireless mouse with precision tracking",
    price:49.99,
    status: "In Stock",
    rating: 4.8,
},
{
    number:8,
    name:"Wireless House",
    image: image1,
    description: "Ergonomic wireless mouse with precision tracking",
    price:49.99,
    status: "In Stock",
    rating: 4.8,
},
{
    number:9,
    name:"Wireless House",
    image: image1,
    description: "Ergonomic wireless mouse with precision tracking",
    price:49.99,
    status: "In Stock",
    rating: 4.8,
},
{
    number:10,
    name:"Wireless House",
    image: image1,
    description: "Ergonomic wireless mouse with precision tracking",
    price:49.99,
    status: "In Stock",
    rating: 4.8,
},
];