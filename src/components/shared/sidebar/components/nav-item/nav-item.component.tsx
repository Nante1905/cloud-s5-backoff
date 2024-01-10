import { NavItem } from "../../types/navItem.type";
import "./nav-item.component.scss";

interface NavItemProps {
  navItem: NavItem;
}

const NavItemComponent = (props: NavItemProps) => {
  return (
    <li className="nav-link">
      <a href={props.navItem.link}>
        <i className="bx bx-home-alt icon"></i>
        <span className="text nav-text">{props.navItem.text}</span>
      </a>
    </li>
  );
};

export default NavItemComponent;
