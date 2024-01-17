import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  frFR,
} from "@mui/x-data-grid";
import StatsCard from "../../stats-card/stats-card.component";
import "./benefice-par-marque.component.scss";

const BeneficeParMarque = () => {
  const data = [
    {
      id: 1,
      marque: {
        nom: "Mercedes",
        logo: "mercedes.jpg",
      },
      benefice: 150000,
    },
    {
      id: 2,
      marque: {
        nom: "Mazda",
        logo: "mercedes.jpg",
      },
      benefice: 100000,
    },
    {
      id: 3,
      marque: {
        nom: "Audi",
        logo: "mercedes.jpg",
      },
      benefice: 120000,
    },
  ];
  const columns: GridColDef[] = [
    {
      field: "marque",
      headerName: "Motif",
      sortable: true,
      renderCell: (params) => (
        <div className="cell_marque">
          <img src={`${params.row.marque.logo}`} alt="Logo" />
          <span>{params.row.marque.nom}</span>
        </div>
      ),
      width: 400,
      sortComparator: (v1, v2, params1, params2) => {
        return params1.value.nom.localeCompare(params2.value.nom);
      },
    },
    {
      field: "benefice",
      headerName: "Montant",
      align: "right",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.benefice.toLocaleString("fr")} MGA`,
      minWidth: 200,
    },
  ];

  return (
    <>
      <StatsCard
        label="Bénéfice"
        data={<h1 className="light">1 560 000 MGA</h1>}
        className="card_benef"
      />
      <h2>Classement de bénéfice par marques</h2>
      <div className="div_table_marque">
        <DataGrid
          sx={{ width: "max-size" }}
          rows={data}
          rowHeight={100}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </>
  );
};

export default BeneficeParMarque;
