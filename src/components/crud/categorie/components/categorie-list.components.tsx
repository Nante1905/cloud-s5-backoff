// CategorieListComponent.tsx

import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import "../../../../assets/fontawesome-5/css/all.min.css";
import Title from "../../../shared/title/title.component";
import { Categorie } from "../../../shared/types/Categorie";
import "./couleur-list.components.scss";

interface CategorieListComponentProps {
  categories: Categorie[];
}

const CategorieListComponent = ({
  categories,
}: CategorieListComponentProps) => {
  return (
    <>
      <div className="list-crud">
        <div className="title-form">
          <Title> Liste des categories </Title>
        </div>
        <div className="add-button">
          <Link to="/categories/add">
            <Button variant="contained">
              <i className="fas fa-plus"></i>
            </Button>
          </Link>
        </div>
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
              {categories.map((couleur) => (
                <TableRow
                  key={couleur.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{couleur.nom}</TableCell>
                  <TableCell>
                    <Link to={`/categories/edit/${couleur.id}`}>
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
    </>
  );
};

export default CategorieListComponent;
