// EtatListComponent.tsx

import { Etat } from "../../../shared/types/Etat";
import "./etat-list.components.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { Link } from "react-router-dom";
import CustomPagination from "../../../shared/components/snackbar/pagination/CustomPagination";

interface EtatListComponentProps {
  etats: Etat[];
}

const EtatListComponent = ({ etats }: EtatListComponentProps) => {
  return (
    <>
      <div>
        <TableContainer
          style={{ boxShadow: "2px 3px 20px #adaaaa", borderRadius: "10px" }}
          component={Paper}
          className="table_container"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Valeur</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {etats.map((etat) => (
                <TableRow
                  key={etat.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{etat.nom}</TableCell>
                  <TableCell>{etat.valeur}</TableCell>
                  <TableCell>
                    <Link to={`/etats/edit/${etat.id}`}>
                      <i className="edit-list-icon fas fa-pencil-alt"></i>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <CustomPagination />
          </Table>
        </TableContainer>
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default EtatListComponent;
