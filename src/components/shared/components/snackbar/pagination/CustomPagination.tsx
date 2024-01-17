import { Button, Pagination, TextField } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PaginationState,
  setNbrParPage,
  setNumeroPage,
} from "../../../../../store/pagination/PaginationSlice";
import { getPagination } from "../../../../../store/pagination/selector";
import "./CustomPagination.scss";

interface CustomPaginationState {
  error: string | null;
  nbrPage: number;
}

const CustomPagination = () => {
  const page: PaginationState = useSelector(getPagination);
  const dispatch = useDispatch();
  const [state, setState] = useState<CustomPaginationState>({
    error: null,
    nbrPage: 5,
  });

  return (
    <div id="pagination">
      <div className="pagination_container">
        <TextField
          label="Taille"
          type="number"
          className="input"
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
          // value={page.nbrParPage}
          defaultValue={page.nbrParPage}
          onChange={(event) => {
            setState((state) => ({
              ...state,
              error: null,
            }));
            const value = Number(event.target.value);
            if (value < 1) {
              setState((state) => ({
                ...state,
                error: "Le nombre d'élément par page doit être supérieur à 0.",
              }));
            } else {
              setState((state) => ({
                ...state,
                nbrPage: value,
              }));
            }
          }}
        />
        <Button onClick={() => dispatch(setNbrParPage(state.nbrPage))}>
          <GridSearchIcon />
        </Button>
        <Pagination
          count={page.total}
          variant="outlined"
          color="primary"
          defaultPage={page.numero}
          boundaryCount={2}
          onChange={(_event, page) => {
            dispatch(setNumeroPage(page));
          }}
        />
      </div>
      {state.error != null && (
        <p className="text-center text-danger">{state.error}</p>
      )}
    </div>
  );
};

export default CustomPagination;
