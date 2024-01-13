import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SidebarComponent from "../../components/sidebar-component/sidebar.component";
import { DropdownItem } from "../../types/dropdownItem.type";
import { NavItem } from "../../types/navItem.type";

interface SidebarRootProps {
  children: JSX.Element;
}

const SidebarRoot = ({ children }: SidebarRootProps) => {
  const navs: (NavItem | DropdownItem)[] = [
    {
      text: "Utilitaire",
      icon: <ExpandMoreIcon />,
      authorization: [],
      subNav: [
        {
          text: "Couleurs",
          icon: <ColorLensIcon />,
          link: "/couleurs/",
          authorization: [],
        },
        {
          text: "Categories",
          icon: <CategoryIcon />,
          link: "/categories/",
          authorization: [],
        },
        {
          text: "Energies",
          icon: "bx bx-home-alt",
          link: "/energies/",
          authorization: [],
        },
        {
          text: "Etat",
          icon: "bx bx-home-alt",
          link: "/etats/",
          authorization: [],
        },
      ],
    },
  ];

  return <SidebarComponent navItems={navs}>{children}</SidebarComponent>;
};

export default SidebarRoot;
