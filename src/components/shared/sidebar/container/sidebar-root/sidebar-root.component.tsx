import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AlignVerticalCenterIcon from "@mui/icons-material/AlignVerticalCenter";
import BuildIcon from "@mui/icons-material/Build";
import ClassIcon from "@mui/icons-material/Class";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import InsightsIcon from "@mui/icons-material/Insights";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PercentIcon from "@mui/icons-material/Percent";
import RuleFolderIcon from "@mui/icons-material/RuleFolder";
import StarsIcon from "@mui/icons-material/Stars";
import SidebarComponent from "../../components/sidebar-component/sidebar.component";
import { DropdownItem } from "../../types/dropdownItem.type";
import { NavItem } from "../../types/navItem.type";
import BarChartIcon from '@mui/icons-material/BarChart';
interface SidebarRootProps {
  children: JSX.Element;
}

const SidebarRoot = ({ children }: SidebarRootProps) => {
  const navs: (NavItem | DropdownItem)[] = [
    {

      text:"Statistiques",
      icon: <BarChartIcon />,
      authorization:[],
      link: "/dashboard/"

      text: "Dashboard",
      icon: <InsightsIcon />,
      link: "/dashboard",
      authorization: [],
    },
    {
      text: "Validation des annonces",
      icon: <RuleFolderIcon />,
      link: "/validation",
      authorization: [],
    },
    {
      text: "Commission",
      icon: <PercentIcon />,
      link: "/commissions/",
      authorization: [],
    },
    {
      text: "Utilitaire",
      icon: <BuildIcon />,
      authorization: [],
      subNav: [
        {
          text: "Categories",
          icon: <CategoryIcon />,
          link: "/categories/",
          authorization: [],
        },
        {
          text: "Marques",
          icon: <DirectionsCarIcon />,
          link: "/marques/",
          authorization: [],
        },
        {
          text: "Modèles",
          icon: <ClassIcon />,
          link: "/modeles/",
          authorization: [],
        },
        {
          text: "Energies",
          icon: <LocalGasStationIcon />,
          link: "/energies/",
          authorization: [],
        },
        {
          text: "Boîte de vitesse",
          icon: <AlignVerticalCenterIcon />,
          link: "/vitesses/",
          authorization: [],
        },
        {
          text: "Etat",
          icon: <StarsIcon />,
          link: "/etats/",
          authorization: [],
        },
        {
          text: "Couleurs",
          icon: <ColorLensIcon />,
          link: "/couleurs/",
          authorization: [],
        },
      ],
    },
  ];

  return <SidebarComponent navItems={navs}>{children}</SidebarComponent>;
};

export default SidebarRoot;
