import { Card, CardContent } from "@mui/material";
import "./stats-card.component.scss";

export interface StatsCardProps {
  label: string;
  data: JSX.Element;
  className?: string;
}

const StatsCard = (props: StatsCardProps) => {
  return (
    <Card className={`stats_card ${props.className}`}>
      <CardContent className="text-center">{props.data}</CardContent>
      <p className="stats_label text-right">{props.label}</p>
    </Card>
  );
};

export default StatsCard;
