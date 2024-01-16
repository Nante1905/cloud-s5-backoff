import React, { useState } from "react";
import { StatFiltre, StatsTopUtilisateur } from "../../types/stats.type";
import { DataGrid, frFR } from "@mui/x-data-grid";
import {
  statsFiltreColumns,
  statsTopUtilisateurColumns,
} from "./services/tabs-columns";
import "./stats-app.component.scss";
import StatsCard from "../stats-card/stats-card.component";
import { Button, Card, CardContent, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import { Chart } from "react-chartjs-2";

interface StatsAppState {
  nbrUtilisateur: number;
}

const initialState: StatsAppState = {
  nbrUtilisateur: 3,
};

const StatsApp = () => {
  //   alaina am props
  const [state, setState] = useState<StatsAppState>(initialState);

  const dataFiltre: StatFiltre[] = [
    {
      filtre: "Catégorie",
      valeur: "Citadines",
    },
    {
      filtre: "Mot clé",
      valeur: "Citadines",
    },
    {
      filtre: "Couleur",
      valeur: "#45678",
    },
    {
      filtre: "Marque",
      valeur: "Audi",
    },
  ];

  const dataTopUtilisateurs: StatsTopUtilisateur[] = [
    {
      utilisateur: {
        nom: "Rakoto",
        prenom: "Jean",
      },
      annonce: 15,
      vente: 8,
      commission: 250000,
      pourcentage: (8 / 15) * 100,
    },
    {
      utilisateur: {
        nom: "Rabe",
        prenom: "Marc",
      },
      annonce: 10,
      vente: 4,
      commission: 200000,
      pourcentage: (4 / 10) * 100,
    },
    {
      utilisateur: {
        nom: "Rasoa",
        prenom: "Kely",
      },
      annonce: 9,
      vente: 3,
      commission: 180000,
      pourcentage: (3 / 9) * 100,
    },
  ];

  //   chart nbr utilisateurs
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
        data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 12, 45],
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
    <div>
      <div className="stats_utilisateurs">
        <div className="nbr_utilisateurs">
          <StatsCard
            label="Utilisateurs inscrits"
            data={<h1 className="light">1 250</h1>}
          />
          <Card className="chart_inscrits">
            <CardContent>
              <Chart type="bar" data={nbrInscriptions} options={chartOptions} />
            </CardContent>
          </Card>
        </div>

        <div className="top_utilisateurs">
          <h2>Top {state.nbrUtilisateur} du meilleur vendeur</h2>
          <form>
            <TextField
              label="Nombre d'utilisateur"
              onChange={(event) => {
                setState((state) => ({
                  ...state,
                  nbrUtilisateur: Number(event.target.value),
                }));
              }}
            />
            <Button type="submit" variant="contained" className="btn">
              <SearchIcon />
            </Button>
          </form>
          <div className="tab">
            <DataGrid
              rows={dataTopUtilisateurs}
              getRowId={(row) =>
                `${row.utilisateur.nom} ${row.utilisateur.prenom}`
              }
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
      <div className="stats_filtre">
        <h2>Les filtres les plus utilisés</h2>
        <div className="tab">
          <DataGrid
            rows={dataFiltre}
            getRowId={(row) => row.filtre}
            rowHeight={60}
            columns={statsFiltreColumns}
            hideFooter={true}
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            sx={{ width: "max-size" }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsApp;
