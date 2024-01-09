/* eslint-disable @typescript-eslint/no-explicit-any */
import "./stats-card.component.scss";
import { Card, CardContent } from "@mui/material";

export interface StatsCardProps {
  label: string;
  data: JSX.Element;
  className?: string;
}

const StatsCard = (props: StatsCardProps) => {
  return (
    <Card className={`stats_card ${props.className}`}>
      <CardContent>{props.data}</CardContent>
      <p className="stats_label text-right">{props.label}</p>
    </Card>
  );
};

export default StatsCard;
