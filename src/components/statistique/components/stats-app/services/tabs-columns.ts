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
    field: "nom",
    headerName: "Nom",
    minWidth: 300,
  },
  {
    field: "prenom",
    headerName: "Prenom",
    minWidth: 300,
  },
  {
    field: "valide",
    headerName: "Validés",
    type: "number",
    minWidth: 100,
  },
  {
    field: "vendu",
    headerName: "Vendus",
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
