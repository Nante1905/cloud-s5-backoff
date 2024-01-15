import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import CustomPagination from "../../../../shared/components/snackbar/pagination/CustomPagination";
import { Modele } from "../../../../shared/types/Modele";
import "./modele-list.component.scss";

interface ModeleListComponentProps {
  modeles: Modele[];
}

const ModeleListComponent = (props: ModeleListComponentProps) => {
  return (
    <>
      <div className="modele-list">
        <TableContainer
          style={{ boxShadow: "2px 3px 20px #adaaaa", borderRadius: "10px" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Nombre de place</TableCell>
                <TableCell>Nombre de porte</TableCell>
                <TableCell>Année de sortie</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell>Marque</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.modeles.map((modele) => (
                <TableRow
                  key={modele.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{modele.nom}</TableCell>
                  <TableCell>{modele.nbPlace}</TableCell>
                  <TableCell>{modele.nbPorte}</TableCell>
                  <TableCell>{modele.anneeSortie}</TableCell>
                  <TableCell>{modele.categorie?.nom}</TableCell>
                  <TableCell>{modele.marque?.nom}</TableCell>
                  <TableCell>
                    <Link to={`/modeles/edit/${modele.id}`}>
                      <i className="edit-list-icon fas fa-pencil-alt"></i>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        <br />
      </div>
      <CustomPagination />
    </>
  );
};

export default ModeleListComponent;
