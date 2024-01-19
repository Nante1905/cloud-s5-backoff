import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Title from "../../shared/title/title.component";
import RechercheStatistique from "../components/form-recherche/recherche-statistique.component";
import StatsApp from "../components/stats-app/stats-app.component";

import Title from "../../shared/title/title.component";
import dayjs, { Dayjs } from "dayjs";


interface DashboardState {
  tab: string;
  monthYear: Dayjs;
}

const initialState: DashboardState = {
  tab: "1",
  monthYear: dayjs(),
};

const Dashboard = () => {
  document.title = "Dashboard";
  const [state, setState] = useState<DashboardState>(initialState);


  const handleMonthYearChange = (monthyear: Dayjs) => {
    setState((state) => ({
      ...state,
      monthYear: monthyear,
    }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {

    setState((state) => ({
      ...state,
      tab: newValue,
    }));
  };

  return (
    <>
      <Title>Statistique</Title>
      <div className="dashboard">
        <RechercheStatistique onChange={handleMonthYearChange} />
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
        {state.tab === "1" && <StatsGenerales monthYear={state.monthYear} />}
        {state.tab === "2" && <StatsBenefice monthYear={state.monthYear} />}
        {state.tab === "3" && <StatsApp monthYear={state.monthYear} />}
      </div>
    </>
  );
};

export default Dashboard;
