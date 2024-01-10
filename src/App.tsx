/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.scss";
import SidebarRoot from "./components/shared/sidebar/container/sidebar-root/sidebar-root.component";

function App({ children }: any) {
  return <SidebarRoot>{children}</SidebarRoot>;
}

export default App;
