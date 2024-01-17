import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DropdownItem } from "../../types/dropdownItem.type";
import { NavItem } from "../../types/navItem.type";
import DropdownItemComponent from "../dropdown-item/dropdown-item.component";
import NavItemComponent from "../nav-item/nav-item.component";
import "./sidebar.component.scss";

interface SidebarProps {
  children: JSX.Element;
  navItems: (NavItem | DropdownItem)[];
}

interface SidebarState {
  sidebarOpen: boolean;
}

const initialState: SidebarState = {
  sidebarOpen: false,
};

const SidebarComponent = ({ children, navItems }: SidebarProps) => {
  const [state, setState] = useState(initialState);
  const sidebarRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  return (
    <>
      <nav
        className="sidebar close"
        ref={sidebarRef}
        onMouseOver={() => {
          sidebarRef.current?.classList.remove("close");
          setState((state) => ({
            ...state,
            sidebarOpen: true,
          }));
        }}
        onMouseLeave={() => {
          sidebarRef.current?.classList.add("close");
          setState((state) => ({
            ...state,
            sidebarOpen: false,
          }));
        }}
      >
        <header>
          <div className="image-text">
            <span className="image">
              <img
                src={state.sidebarOpen ? "/logo.png" : "/logo-fit.png"}
                style={
                  state.sidebarOpen
                    ? {
                        width: "200%",
                        height: "90px",
                      }
                    : {
                        width: "50px",
                      }
                }
                alt=""
              />
            </span>

            <div className="text logo-text">
              <span className="name">
                <Link to="/inscription">Se connecter</Link>
              </span>
            </div>
          </div>
        </header>

        <div className="menu-bar">
          <div className="menu">
            {/* <li
              className="search-box"
              onClick={() => sidebarRef.current?.classList.remove("close")}
            >
              <i className="bx bx-search icon" style={{}}></i>
              <input type="text" placeholder="Search..." />
            </li> */}

            <ul className="menu-links">
              {navItems.map((navItem, index) => {
                if (typeof navItem === "object" && "subNav" in navItem) {
                  return (
                    <DropdownItemComponent
                      key={index}
                      dropdownItem={navItem as DropdownItem}
                    />
                  );
                } else {
                  return (
                    <NavItemComponent
                      key={index}
                      navItem={navItem as NavItem}
                    />
                  );
                }
              })}

              {/* TEST */}
            </ul>
          </div>

          <div className="bottom-content">
            <li
              className=""
              style={{
                color: "#ffffff",
              }}
            >
              <a
                href="#"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Se déconnecter</span>
              </a>
            </li>

            {/* <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">Dark mode</span>
            </li> */}
          </div>
        </div>
      </nav>

      <section className="home">
        {children}
        {/* <div className="text">Dashboard Sidebar</div> */}
      </section>
    </>
  );
};

export default SidebarComponent;
