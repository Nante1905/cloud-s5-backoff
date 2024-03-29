// EnergieListComponent.tsx

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { Energie } from "../../../shared/types/Energie";
import "./couleur-list.components.css";
import CustomPagination from "../../../shared/components/snackbar/pagination/CustomPagination";

interface EnergieListComponentProps {
  energies: Energie[];
}

const EnergieListComponent = ({ energies }: EnergieListComponentProps) => {
  return (
    <>
      <div>
        <TableContainer
          style={{ boxShadow: "2px 3px 20px #adaaaa", borderRadius: "10px" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {energies.map((energie) => (
                <TableRow
                  key={energie.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{energie.nom}</TableCell>
                  <TableCell>
                    <Link to={`/energies/edit/${energie.id}`}>
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

export default EnergieListComponent;
