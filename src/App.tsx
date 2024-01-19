import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "./App.scss";
import SidebarRoot from "./components/shared/sidebar/container/sidebar-root/sidebar-root.component";
import "./global.scss";
import { initialize } from "./store/pagination/PaginationSlice";

function App({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Route changed ", location.pathname);
    dispatch(initialize());
  }, [location]);

  return <SidebarRoot>{children}</SidebarRoot>;
}

export default App;
