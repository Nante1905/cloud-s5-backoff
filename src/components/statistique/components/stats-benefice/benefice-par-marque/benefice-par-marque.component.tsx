import {
  DataGrid,
  GridColDef,
  GridRowIdGetter,
  GridValueGetterParams,
  frFR,
} from "@mui/x-data-grid";
import StatsCard from "../../stats-card/stats-card.component";

import { MarqueBenefice, StatBenefice } from "../../../types/stats.type";
interface BeneficeProps {
  statBenefice: StatBenefice;
}
const BeneficeParMarque = (props: BeneficeProps) => {
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
      sortComparator: (_v1, _v2, params1, params2) => {
        return params1.value.nom.localeCompare(params2.value.nom);
      },
    },
    {
      field: "benefice",
      headerName: "Montant",
      align: "right",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.montant.toLocaleString("fr")} MGA`,
      minWidth: 200,
    },
  ];
  const getRowId: GridRowIdGetter<MarqueBenefice> = (row: MarqueBenefice) =>
    row.marque.id || "fallback_id";

  return (
    <>
      <StatsCard
        label="Bénéfice"
        data={<h1 className="light">{props.statBenefice.benefice}</h1>}
        className="card_benef"
      />
      <h2>Classement de bénéfice par marques</h2>
      <div className="div_table_marque">
        <DataGrid
          rows={props.statBenefice.beneficeMarque}

          rowHeight={100}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          getRowId={getRowId}
        />
      </div>
    </>
  );
};

export default BeneficeParMarque;
