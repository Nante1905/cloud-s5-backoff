import { useRef } from "react";
import { DropdownItem } from "../../types/dropdownItem.type";
import NavItemComponent from "../nav-item/nav-item.component";
import "./dropdown-item.component.scss";
import { useLocation } from "react-router-dom";
import { NavItem } from "../../types/navItem.type";

interface DropdownItemProps {
  dropdownItem: DropdownItem;
}

const DropdownItemComponent = (props: DropdownItemProps) => {
  const collapseElement = useRef<HTMLDivElement>(null);
  const location = useLocation();
  let active = false;

  for (const nav of props.dropdownItem.subNav as NavItem[]) {
    if (nav.link == location.pathname) {
      active = true;
    }
  }

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
          {typeof props.dropdownItem.icon === "string" ? (
            <i
              className={`bx ${props.dropdownItem.icon} icon ${
                active ? "active" : ""
              }`}
            ></i>
          ) : (
            <i className={`icon ${active ? "active" : ""}`}>
              {props.dropdownItem.icon}
            </i>
          )}
          <span className="text nav-text">{props.dropdownItem.text}</span>
        </a>
      </li>
      <div className="collapse close" ref={collapseElement}>
        {props.dropdownItem.subNav?.map((navItem, index) => (
          <NavItemComponent key={index} navItem={navItem} />
        ))}
      </div>
    </div>
  );
};

export default DropdownItemComponent;
