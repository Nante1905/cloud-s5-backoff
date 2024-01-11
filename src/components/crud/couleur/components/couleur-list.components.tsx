// CouleurListComponent.tsx

import React from "react";
import { Couleur } from "../../../shared/types/Couleur";
import "./couleur-list.components.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Title from "../../../shared/title/title.component";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { Link } from 'react-router-dom';


interface CouleurListComponentProps {
  couleurs: Couleur[];
}

const CouleurListComponent = ({ couleurs }: CouleurListComponentProps) => {
  return (
    <>
      <div className="list-couleur">
        <div className="title-form">
          <Title className="list-couleur-title"> Liste des couleurs </Title>
        </div>
        <div className="add-button">
            <div className="add-list-form">
                <Link to="/couleurs/add">
                <i className="add-button fas fa-plus"></i>
                </Link>  
            </div>
        </div>
        <TableContainer  style={{ boxShadow: '2px 3px 20px #adaaaa' , borderRadius: '10px' }}  component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Hexadécimal</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {couleurs.map((couleur) => (
                <TableRow
                  key={couleur.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{couleur.nom}</TableCell>
                  <TableCell><div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: couleur.hexa,
                      }}
                    ></div></TableCell>
                    <TableCell>
                    <Link to={`/couleurs/edit/${couleur.id}`}>
                        <i className="edit-list-icon fas fa-pencil-alt"></i>
                    </Link>  
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br/>
        <br/>
        <br/>
      </div>
    </>
  );
};

export default CouleurListComponent;
