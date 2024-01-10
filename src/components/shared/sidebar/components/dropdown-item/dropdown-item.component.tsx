import { useRef } from "react";
import { NavItem } from "../../types/navItem.type";
import NavItemComponent from "../nav-item/nav-item.component";
import "./dropdown-item.component.scss";

interface DropdownItemProps {
  text: string;
  navItems?: NavItem[];
}

const DropdownItemComponent = (props: DropdownItemProps) => {
  const items: NavItem[] = [
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
  ];

  const collapseElement = useRef<HTMLDivElement>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement | MouseEvent>
  ) => {
    event.preventDefault();
    collapseElement.current?.classList.toggle("close");
  };

  return (
    <div className="dropdown-item">
      <li className="nav-link">
        <a href="#" onClick={(event) => handleClick(event)}>
          <span className="text nav-text">{props.text}</span>
          <i className="bx bx-home-alt icon"></i>
        </a>
      </li>
      <div className="collapse close" ref={collapseElement}>
        {items.map((navItem, index) => (
          <NavItemComponent key={index} navItem={navItem} />
        ))}
      </div>
    </div>
  );
};

export default DropdownItemComponent;
