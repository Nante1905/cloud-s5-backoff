import { Chart } from "react-chartjs-2";
import "./stats-chart.component.scss";
import "chart.js/auto";
import dayjs from "dayjs";
import "dayjs/locale";
import { BeneficeMois } from "../../types/stats.type";

dayjs.locale("fr");
interface StatsChatProps{
  benefices: BeneficeMois[];
}
const StatsChart = (props: StatsChatProps) => {
  const mois: string[] = [];
  for (let i = 0; i < 12; i++) {
    mois.push(dayjs().month(i).locale("fr").format("MMMM"));
  }

  const data = {
    labels: mois,
    datasets: [
      {
        label: "Bénéfice",
        backgroundColor: "#317b93",
        borderColor: "#317b93",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: props.benefices.map((b: BeneficeMois) => b.benefice)
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Bénéfice par mois</h2>
      <div className="div_chart">
        <Chart type={"bar"} options={options} data={data} />
      </div>
    </div>
  );
};

export default StatsChart;
