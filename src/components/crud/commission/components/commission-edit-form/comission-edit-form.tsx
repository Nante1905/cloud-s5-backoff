import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Commission } from "../../../../shared/types/Commission";
import "./comission-edit-form.scss";

interface CommissionEditFormComponentProps {
  commission?: Commission;
  historiqueCommission: Commission[];
}

const CommissionEditFormComponent = (
  props: CommissionEditFormComponentProps
) => {
  return (
    <div className="commission-edit-form">
      <div className="form">
        <h3>Valeur actuelle</h3>
        <p className="valeur">{props.commission?.pourcentage} %</p>

        <form>
          <TextField label="Nouvelle valeur" />
          <Button type="submit" variant="contained">
            Mettre à jour
          </Button>
        </form>
      </div>
      <div className="historique">
        <h3>Historique de mis à jour commission</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date de modification</TableCell>
              <TableCell>Pourcentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.historiqueCommission?.map((commission) => (
              <TableRow>
                <TableCell>
                  {new Date(commission.dateAjout).toLocaleDateString() +
                    " " +
                    new Date(commission.dateAjout).toLocaleTimeString()}
                </TableCell>
                <TableCell>{commission.pourcentage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CommissionEditFormComponent;
