import "./stats-list-root.component.scss";
import StatsCard from "../stats-card/stats-card.component";
import StatsChart from "../stats-chart/stats-chart.component";
import { Dayjs } from "dayjs";
import { StatProps } from "../../types/stats.type";
import { useEffect } from "react";

const StatsGenerales = (props: StatProps) => {
  useEffect(() => {
    console.log("oui");
    console.log(props.monthYear);
    
  },[props.monthYear]);
  return (
    <>
      <div className="stats_list">
        <StatsCard
          label="Bénéfice"
          data={<h1 className="light">1 560 000 MGA</h1>}
        />
        <StatsCard
          label="Ecartype entre date d'annonce et vente"
          data={<h1 className="light">10.5</h1>}
        />
        <StatsCard
          label="Taux de vente"
          data={
            <>
              <h2 className="light text-left">Annonces: 452</h2>
              <h2 className="light text-left">Ventes: 200</h2>
            </>
          }
        />
      </div>
      <div className="chart">
        <StatsChart />
      </div>
    </>
  );
};

export default StatsGenerales;
