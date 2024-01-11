import SidebarComponent from "../../components/sidebar-component/sidebar.component";
import { NavItem } from "../../types/navItem.type";

interface SidebarRootProps {
  children: JSX.Element;
}

const SidebarRoot = ({ children }: SidebarRootProps) => {
  const navs: NavItem[] = [
    {
      text: "Couleurs",
      icon: "bx bx-home-alt",
      link: "/couleurs/",
      authorization: ["Direction des Achats", "Direction Financière"],
    },
    {
      text: "Categories",
      icon: "bx bx-home-alt",
      link: "/categories/",
      authorization: ["Direction des Achats", "Direction Financière"],
    },
    {
      text: "Energies",
      icon: "bx bx-home-alt",
      link: "/energies/",
      authorization: ["Direction des Achats", "Direction Financière"],
    },
    {
      text: "Etat",
      icon: "bx bx-home-alt",
      link: "/etats/",
      authorization: ["Direction des Achats", "Direction Financière"],
    },
    {
      text: "Liste des demandes",
      icon: "bx bx-home-alt",
      link: "/demandes/",
      authorization: ["Direction des Achats", "Direction Financière"],
    },
    {
      text: "Demandes par nature",
      icon: "bx bx-home-alt",
      link: "/demandes/nature",
      authorization: ["Direction des Achats"],
    },
    {
      text: "Etat de stock",
      icon: "bx bx-home-alt",
      link: "/etat-stock",
      authorization: ["Magasin", "Direction Financière"],
    },
    {
      text: "Sortie de stock",
      icon: "bx bx-home-alt",
      link: "/sortie-stock",
      authorization: ["Magasin"],
    },
    {
      text: "bon d'entrée",
      icon: "bx bx-home-alt",
      link: "/bon-entree",
      authorization: ["Magasin"],
    },
  ];

  return <SidebarComponent navItems={navs}>{children}</SidebarComponent>;
};

export default SidebarRoot;
