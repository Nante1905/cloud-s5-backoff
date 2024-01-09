import { useState } from "react";
import RechercheStatistique from "../components/form-recherche/recherche-statistique.component";
import "./dashboard.component.scss";
import { Tab, Tabs } from "@mui/material";
import StatsGenerales from "../components/stats-generale/stats-generale-root.component";
import StatsBenefice from "../components/stats-benefice/stats-benefice/stats-benefice.component";
import StatsApp from "../components/stats-app/stats-app.component";

interface DashboardState {
  tab: string;
}

const initialState: DashboardState = {
  tab: "1",
};

const Dashboard = () => {
  document.title = "Dashboard";
  const [state, setState] = useState<DashboardState>(initialState);

  // ato no miverina mi fetch data raha ohatra ka niova ilay mois sy année
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setState((state) => ({
      ...state,
      tab: newValue,
    }));
  };

  return (
    <>
      <h1>Statistique</h1>
      <div className="dashboard">
        <RechercheStatistique />
        <Tabs
          className="tabs"
          value={state.tab}
          onChange={handleTabChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="1" label="Générale" />
          <Tab value="2" label="Bénéfice" />
          <Tab value="3" label="Utilisation de l'application" />
        </Tabs>
        {state.tab === "1" && <StatsGenerales />}
        {state.tab === "2" && <StatsBenefice />}
        {state.tab === "3" && <StatsApp />}
      </div>
    </>
  );
};

export default Dashboard;
