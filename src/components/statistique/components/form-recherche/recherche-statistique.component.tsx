import { Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "./recherche-statistique.component.scss";
import "dayjs/locale/fr";
import { useEffect, useState } from "react";

interface RechercheProps {
  onChange: (value: Dayjs) => void;
}
interface RechercheState {
  dayjs: Dayjs;
}
const initialState: RechercheState = {
  dayjs: dayjs(),
};
const RechercheStatistique = (props: RechercheProps) => {
  const [state, setState] = useState<RechercheState>(initialState);
  useEffect(() => {
    props.onChange(state.dayjs);
  }, []);
  return (
    <div>
      <form className="form_stat">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <DatePicker
            value={state.dayjs}
            label={"Mois et année"}
            views={["month", "year"]}
            onChange={(value) => {
              const newDate = dayjs(value != null ? value : null);
              setState((state) => ({ ...state, dayjs: newDate }));
              console.log(newDate);
              
              props.onChange(newDate);
            }}
          />
        </LocalizationProvider>
        <Button variant="contained" className="btn">
          Rechercher
        </Button>
      </form>
    </div>
  );
};

export default RechercheStatistique;
