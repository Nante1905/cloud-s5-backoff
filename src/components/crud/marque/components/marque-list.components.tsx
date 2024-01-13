// MarqueListComponent.tsx

import React from "react";
import { Marque } from "../../../shared/types/Marque";
import "./marque-list.components.css";
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
import FileUrlFetcher from "../../../shared/constants/FileUrlFetcher";
import { firebase_img, imagkit } from "../../../shared/constants/global";
import { replaceSubstring } from "../../../shared/constants/fonction";


interface MarqueListComponentProps {
  marques: Marque[];
}

const MarqueListComponent = ({ marques }: MarqueListComponentProps) => {
  return (
    <>
      <div className="list-marque">
        <div className="title-form">
          <Title className="list-marque-title"> Liste des marques </Title>
        </div>
        <div className="add-button">
            <div className="add-list-form">
                <Link to="/marques/add">
                <i className="add-button fas fa-plus"></i>
                </Link>  
            </div>
        </div>
        <TableContainer  style={{ boxShadow: '2px 3px 20px #adaaaa' , borderRadius: '10px' }}  component={Paper}>
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
                  <TableCell> <img alt={marque.logo} className="marque-photo"  src={replaceSubstring(FileUrlFetcher( marque.logo ) , firebase_img , imagkit  )} /></TableCell>
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
        <br/>
        <br/>
        <br/>
      </div>
    </>
  );
};

export default MarqueListComponent;
