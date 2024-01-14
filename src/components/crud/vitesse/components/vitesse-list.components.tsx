// VitesseListComponent.tsx

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { Vitesse } from "../../../shared/types/Vitesse";
import CustomPagination from "../../../shared/components/snackbar/pagination/CustomPagination";

interface VitesseListComponentProps {
  vitesses: Vitesse[];
}

const VitesseListComponent = ({ vitesses }: VitesseListComponentProps) => {
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
              {vitesses.map((vitesse) => (
                <TableRow
                  key={vitesse.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{vitesse.nom}</TableCell>
                  <TableCell>
                    <Link to={`/vitesses/edit/${vitesse.id}`}>
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

export default VitesseListComponent;
