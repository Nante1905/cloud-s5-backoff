import { Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import "./recherche-statistique.component.scss";
import "dayjs/locale/fr";

const RechercheStatistique = () => {
  // ça dépend an'izay ilain'ilay backend ny format
  // fa efa io ny mois sy année
  return (
    <div>
      <form className="form_stat">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <DatePicker
            label={"Mois et année"}
            views={["month", "year"]}
            onChange={(value: Dayjs | null) => {
              // console.log("mois ", value?.month(), "annee ", value?.year());
              console.log(value);
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
