// MarqueListComponent.tsx

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import CustomPagination from "../../../shared/components/snackbar/pagination/CustomPagination";
import { Marque } from "../../../shared/types/Marque";
import "./marque-list.components.css";

interface MarqueListComponentProps {
  marques: Marque[];
}

const MarqueListComponent = ({ marques }: MarqueListComponentProps) => {
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
                <TableCell>Logo</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marques.map((marque) => (
                <TableRow
                  key={marque.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{marque.nom}</TableCell>
                  <TableCell>
                    {" "}
                    <img
                      alt={"logo"}
                      className="marque-photo"
                      src={marque.logo}
                      // src={replaceSubstring(
                      //   FileUrlFetcher(marque.logo),
                      //   firebase_img,
                      //   imagkit
                      // )}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/marques/edit/${marque.id}`}>
                      <i className="edit-list-icon fas fa-pencil-alt"></i>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default MarqueListComponent;
