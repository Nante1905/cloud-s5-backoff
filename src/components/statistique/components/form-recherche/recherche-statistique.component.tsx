import { Button } from "@mui/material";
import { DatePicker, LocalizationProvider, frFR } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import "./recherche-statistique.component.scss";

const RechercheStatistique = () => {
  // ça dépend an'izay ilain'ilay backend ny format
  // fa efa io ny mois sy année
  return (
    <div>
      <form className="form_stat">
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="fr-FR"
          localeText={
            frFR.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <DatePicker
            label={"Mois et année"}
            views={["month", "year"]}
            onChange={(value: Dayjs | null) => {
              // console.log("mois ", value?.month(), "annee ", value?.year());
              console.log(value);
            }}
          />
        </LocalizationProvider>
        <Button variant="contained">Rechercher</Button>
      </form>
    </div>
  );
};

export default RechercheStatistique;
