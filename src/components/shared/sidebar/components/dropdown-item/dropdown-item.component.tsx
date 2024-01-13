import { useRef } from "react";
import { DropdownItem } from "../../types/dropdownItem.type";
import NavItemComponent from "../nav-item/nav-item.component";
import "./dropdown-item.component.scss";

interface DropdownItemProps {
  dropdownItem: DropdownItem;
}

const DropdownItemComponent = (props: DropdownItemProps) => {
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
          {typeof props.dropdownItem.icon === "string" ? (
            <i className={`bx ${props.dropdownItem.icon} icon`}></i>
          ) : (
            <i className="icon">{props.dropdownItem.icon}</i>
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
