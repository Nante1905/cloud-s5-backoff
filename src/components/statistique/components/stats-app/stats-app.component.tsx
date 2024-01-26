import { DataGrid, frFR } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  Inscription,
  StatInscription,
  StatProps,
  StatRequestAnnee,
  TopUser,
  TopUserRequest,
} from "../../types/stats.type";
import { statsTopUtilisateurColumns } from "./services/tabs-columns";
import "./stats-app.component.scss";

import SearchIcon from "@mui/icons-material/Search";
import { Button, Card, CardContent, TextField } from "@mui/material";
import dayjs from "dayjs";
import { Chart } from "react-chartjs-2";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import { getErrorMessage } from "../../../shared/service/api-service";
import { ApiResponse } from "../../../shared/types/Response";
import { getStatInscription, getTopSellers } from "../../service/stats.service";
import StatsCard from "../stats-card/stats-card.component";
import "./stats-app.component.scss";

interface StatsAppState {
  statInscription: StatInscription;
  topSellers: TopUser[];
  nbrUtilisateur: number;
  loading: boolean;
  isLoaded: boolean;
  errorMessage: string;
  openError: boolean;
  inscriptionArray: number[];
  pendingNbrUtilisateur: number;
}

const initialState: StatsAppState = {
  statInscription: {
    users: 0,
    inscriptions: [],
  },
  topSellers: [],
  nbrUtilisateur: 5,
  loading: true,
  isLoaded: false,
  errorMessage: "",
  openError: false,
  inscriptionArray: [102, 90, 101, 54, 15, 100, 90, 40, 20, 15, 128, 118],
  pendingNbrUtilisateur: 5,
};

const StatsApp = (props: StatProps) => {
  const [state, setState] = useState<StatsAppState>(initialState);
  useEffect(() => {
    console.log("entrer");
    const reqTopSeller: TopUserRequest = {
      toShow: state.nbrUtilisateur,
      annee: props.monthYear.year(),
      mois: props.monthYear.month() + 1,
    };
    const req: StatRequestAnnee = {
      annee: props.monthYear.year(),
    };
    getTopSellers(reqTopSeller)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          console.log(response.data);

          setState((state) => ({
            ...state,
            topSellers: response.data,
          }));
        } else {
          setState((state) => ({
            ...state,
            errorMessage: response.err,
            openError: true,
            idLoaded: false,
            loading: true,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        let errorMessage = "";
        if (
          !err.response?.data.err ||
          err.response?.data.err == "" ||
          err.response?.data.err == null
        ) {
          errorMessage = getErrorMessage(err.code);
        } else {
          errorMessage = err.response.data.err;
        }
        setState((state) => ({
          ...state,
          loading: true,
          isLoaded: false,
          errorMessage: errorMessage,
          openError: true,
        }));
      });

    getStatInscription(req)
      .then((res) => {
        const response: ApiResponse = res.data;
        if (response.ok) {
          console.log(response.data);

          setState((state) => ({
            ...state,
            statInscription: response.data,
            inscriptionArray: response.data.inscriptions.map(
              (inscription: Inscription) => inscription.nbInscrit
            ),
          }));
        } else {
          setState((state) => ({
            ...state,
            errorMessage: response.err,
            openError: true,
            idLoaded: false,
            loading: true,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        let errorMessage = "";
        if (
          !err.response?.data.err ||
          err.response?.data.err == "" ||
          err.response?.data.err == null
        ) {
          errorMessage = getErrorMessage(err.code);
        } else {
          errorMessage = err.response.data.err;
        }
        setState((state) => ({
          ...state,
          loading: true,
          isLoaded: false,
          errorMessage: errorMessage,
          openError: true,
        }));
      });
    console.log(state.nbrUtilisateur);
  }, [props.monthYear, state.nbrUtilisateur]);
  const mois: string[] = [];
  for (let i = 0; i < 12; i++) {
    mois.push(dayjs().month(i).locale("fr").format("MMM"));
  }

  const nbrInscriptions = {
    labels: mois,
    datasets: [
      {
        label: "Inscriptions",
        backgroundColor: "#317b93",
        borderColor: "#317b93",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: state.inscriptionArray,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div>
        <div className="stats_utilisateurs">
          <div className="nbr_utilisateurs">
            <StatsCard
              label="Utilisateurs inscrits"
              data={<h1 className="light">{state.statInscription.users}</h1>}
            />
            <Card className="chart_inscrits">
              <CardContent>
                <Chart
                  type="bar"
                  data={nbrInscriptions}
                  options={chartOptions}
                />
              </CardContent>
            </Card>
          </div>

          <div className="top_utilisateurs">
            <h2>Top {state.nbrUtilisateur} des meilleurs vendeurs</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setState((state) => ({
                  ...state,
                  nbrUtilisateur: state.pendingNbrUtilisateur,
                }));
              }}
            >
              <TextField
                label="Nombre d'utilisateur"
                onChange={(event) => {
                  setState((state) => ({
                    ...state,
                    pendingNbrUtilisateur: Number(event.target.value),
                  }));
                }}
              />
              <Button type="submit" variant="contained" className="btn">
                <SearchIcon />
              </Button>
            </form>
            <div className="tab">
              <DataGrid
                rows={state.topSellers}
                getRowId={(row) => `${row.nom} ${row.prenom}`}
                rowHeight={60}
                columns={statsTopUtilisateurColumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                sx={{ width: "max-size" }}
              />
            </div>
          </div>
        </div>
      </div>
      <ErrorSnackBar
        open={state.openError}
        error={state.errorMessage}
        onClose={() => {
          setState((state) => ({ ...state, openError: false }));
        }}
      />
    </>
  );
};

export default StatsApp;
