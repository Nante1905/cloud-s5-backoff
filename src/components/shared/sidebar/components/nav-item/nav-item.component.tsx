import { useLocation } from "react-router-dom";
import { NavItem } from "../../types/navItem.type";
import "./nav-item.component.scss";

interface NavItemProps {
  navItem: NavItem;
}

const NavItemComponent = (props: NavItemProps) => {
  const location = useLocation();

  console.log(
    location.pathname,
    " ",
    props.navItem.link,
    location.pathname == props.navItem.link
  );

  return (
    <li className="nav-link">
      <a href={props.navItem.link}>
        {typeof props.navItem.icon === "string" ? (
          <i
            className={`bx ${props.navItem.icon} icon ${
              location.pathname == props.navItem.link ? "active" : ""
            }`}
          ></i>
        ) : (
          <i
            className={`icon ${
              location.pathname == props.navItem.link ? "active" : ""
            } `}
          >
            {props.navItem.icon}
          </i>
        )}
        <span className="text nav-text">{props.navItem.text}</span>
      </a>
    </li>
  );
};

export default NavItemComponent;
