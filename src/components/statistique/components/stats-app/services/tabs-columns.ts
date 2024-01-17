/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GridCellParams,
  GridColDef,
  GridTreeNode,
  GridValueGetterParams,
} from "@mui/x-data-grid";

export const statsFiltreColumns: GridColDef[] = [
  {
    field: "filtre",
    headerName: "Filtre",
    sortable: false,
    minWidth: 300,
  },
  {
    field: "valeur",
    headerName: "Valeur",
    align: "right",
    sortable: false,
    minWidth: 300,
  },
];

export const statsTopUtilisateurColumns: GridColDef[] = [
  {
    field: "utilisateur",
    headerName: "Utilisateur",
    minWidth: 300,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.utilisateur.nom} ${params.row.utilisateur.prenom}`,
  },
  {
    field: "annonce",
    headerName: "Annonces",
    type: "number",
    minWidth: 100,
  },
  {
    field: "vente",
    headerName: "Ventes",
    minWidth: 100,
    type: "number",
  },
  {
    field: "pourcentage",
    headerName: "Pourcentage",
    minWidth: 150,
    align: "right",
    cellClassName: (_params: GridCellParams<any, any, any, GridTreeNode>) =>
      "big strong",
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.pourcentage.toLocaleString("fr")}%`,
  },
  {
    field: "commission",
    headerName: "Commission",
    minWidth: 150,
    align: "right",
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.commission.toLocaleString("fr")} MGA`,
  },
];
