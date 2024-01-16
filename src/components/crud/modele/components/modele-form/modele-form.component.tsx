import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../../../assets/fontawesome-5/css/all.min.css";
import { findAllCategorieWithoutPage } from "../../../../service/categorie.service";
import { findAllMarqueWithoutPage } from "../../../../service/marque.service";
import ErrorSnackBar from "../../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../../shared/components/snackbar/SuccessSnackBar";
import AppLoaderComponent from "../../../../shared/loader/app-loader.component";
import { getErrorMessage } from "../../../../shared/service/api-service";
import Title from "../../../../shared/title/title.component";
import { Categorie } from "../../../../shared/types/Categorie";
import { Marque } from "../../../../shared/types/Marque";
import { Modele } from "../../../../shared/types/Modele";
import { ApiResponse } from "../../../../shared/types/Response";
import { insertModele, updateModele } from "../../service/modele.service";
import "./modele-form.component.scss";

interface ModeleFormProps {
  entity?: Modele;
}

const ModeleFormComponent = (props: ModeleFormProps) => {
  const modele = props.entity;
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (props.entity) {
      setState((state) => ({
        ...state,
        form: {
          ...(props.entity as Modele),
        },
      }));
    }
    findAllCategorieWithoutPage()
      .then((res) => {
        setState((state) => ({
          ...state,
          categories: (res.data as ApiResponse).data,
          categoriesLoading: false,
        }));
      })
      .catch((err) => {
        setState((state) => ({
          ...state,
          error: err.response.data.message,
          openError: true,
          categoriesLoading: false,
        }));
      });

    findAllMarqueWithoutPage()
      .then((res) => {
        setState((state) => ({
          ...state,
          marques: (res.data as ApiResponse).data,
          marquesLoading: false,
        }));
      })
      .catch((err) => {
        setState((state) => ({
          ...state,
          error: err.response.data.message,
          openError: true,
          marquesLoading: false,
        }));
      });
  }, [props.entity]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(state.form);

    setState((state) => ({
      ...state,
      submitLoading: true,
    }));
    if (state.form.id) {
      updateModele(state.form)
        .then((res) => {
          const response: ApiResponse = res.data;
          if (response.ok) {
            setState((state) => ({
              ...state,
              success: response.message,
              submitLoading: false,
              openSuccess: true,
            }));
          } else {
            setState((state) => ({
              ...state,
              error: response.err,
              submitLoading: false,
              openError: true,
            }));
          }
        })
        .catch((err) => {
          console.error(err);
          let errorMessage = "";
          if (
            !err.response.data.err ||
            err.response.data.err == "" ||
            err.response.data.err == null
          ) {
            errorMessage = getErrorMessage(err.code);
          } else {
            errorMessage = err.response.data.err;
          }
          setState((state) => ({
            ...state,
            error: errorMessage,
            submitLoading: false,
            openError: true,
          }));
        });
    } else {
      insertModele(state.form)
        .then((res) => {
          const response: ApiResponse = res.data;
          if (response.ok) {
            setState((state) => ({
              ...state,
              success: response.message,
              submitLoading: false,
              openSuccess: true,
            }));
          } else {
            setState((state) => ({
              ...state,
              error: response.err,
              submitLoading: false,
              openError: true,
            }));
          }
        })
        .catch((err) => {
          console.error(err);
          let errorMessage = "";
          if (
            !err.response.data.err ||
            err.response.data.err == "" ||
            err.response.data.err == null
          ) {
            errorMessage = getErrorMessage(err.code);
          } else {
            errorMessage = err.response.data.err;
          }
          setState((state) => ({
            ...state,
            error: errorMessage,
            submitLoading: false,
            openError: true,
          }));
        });
    }
  };

  return (
    <>
      <div className="form-temp couleur-form">
        <div className="container-form">
          <Link to="/modeles">
            <i className="form-return fas fa-arrow-left"></i>
          </Link>{" "}
          <div className="title-form">
            <Title>{modele ? "Modifier Modele" : "Créer Modele"}</Title>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form">
              <TextField
                label="Nom"
                onChange={(event) => {
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      nom: event.target.value,
                    },
                  }));
                }}
                value={state.form.nom}
              />
              <TextField
                label="Nombre de place"
                onChange={(event) => {
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      nbPlace: Number(event.target.value),
                    },
                  }));
                }}
                value={state.form.nbPlace?.toString()}
              />
              <TextField
                label="Nombre de porte"
                onChange={(event) => {
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      nbPorte: Number(event.target.value),
                    },
                  }));
                }}
                value={state.form.nbPorte}
              />
              <FormControl>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="fr"
                >
                  <DatePicker
                    label={"Année de sortie"}
                    views={["year"]}
                    onChange={(value: Dayjs | null) => {
                      // console.log("mois ", value?.month(), "annee ", value?.year());
                      setState((state) => ({
                        ...state,
                        form: {
                          ...state.form,
                          anneeSortie: value?.year() as number,
                        },
                      }));
                      console.log(value?.year());
                    }}
                    value={dayjs().year(state.form.anneeSortie)}
                  />
                </LocalizationProvider>
              </FormControl>
              <AppLoaderComponent loading={state.categoriesLoading}>
                <FormControl sx={{ width: 200 }}>
                  <InputLabel id="demo-simple-select-label">
                    Categorie
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.form.idCategorie}
                    label="Categorie"
                    onChange={(event) => {
                      setState((state) => ({
                        ...state,
                        form: {
                          ...state.form,
                          idCategorie: event.target.value as number,
                        },
                      }));
                    }}
                  >
                    {state.categories?.map((e: Categorie) => (
                      <MenuItem key={e?.id} value={e?.id}>
                        {e.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </AppLoaderComponent>
              <AppLoaderComponent loading={state.marquesLoading}>
                <FormControl sx={{ width: 200 }}>
                  <InputLabel id="demo-simple-select-label">Marque</InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.form.idMarque}
                    label="Marque"
                    onChange={(event) => {
                      setState((state) => ({
                        ...state,
                        form: {
                          ...state.form,
                          idMarque: event.target.value as number,
                        },
                      }));
                    }}
                  >
                    {state.marques?.map((e: Categorie) => (
                      <MenuItem key={e?.id} value={e?.id}>
                        {e.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </AppLoaderComponent>

              <Button variant="contained" type="submit">
                <AppLoaderComponent loading={state.submitLoading}>
                  <span>{modele ? "Modifier" : "Créer"}</span>
                </AppLoaderComponent>
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ErrorSnackBar
        open={state.openError}
        onClose={() =>
          setState(() => ({
            ...state,
            openError: false,
          }))
        }
        error={state.error}
      />
      <SuccessSnackBar
        open={state.openSuccess}
        onClose={() =>
          setState(() => ({
            ...state,
            openSuccess: false,
          }))
        }
        message={state.success}
      />
    </>
  );
};

interface ModeleFormState {
  form: Modele;
  categories: Categorie[];
  categoriesLoading: boolean;
  marquesLoading: boolean;
  marques: Marque[];
  success: string;
  error: string;
  submitLoading: boolean;
  openError: boolean;
  openSuccess: boolean;
}

const initialState: ModeleFormState = {
  form: {
    nom: "",
    nbPlace: 0,
    nbPorte: 0,
    anneeSortie: 0,
    idCategorie: 1,
    idMarque: 1,
  },
  success: "",
  error: "",
  submitLoading: false,
  openError: false,
  openSuccess: false,
  categories: [],
  marques: [],
  categoriesLoading: true,
  marquesLoading: true,
};

export default ModeleFormComponent;
