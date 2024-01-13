import { Button, TextField } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import "../../../../assets/fontawesome-5/css/all.min.css";
import { insertMarque, updateMarque } from "../../../service/marque.service";
import { imageDb } from "../../../shared/firebase/config";
import Title from "../../../shared/title/title.component";
import { Marque } from "../../../shared/types/Marque";
import "./marque-form.component.css";
import "./marque-form.component.scss";
import { ApiResponse } from "../../../shared/types/Response";
import { getErrorMessage } from "../../../shared/service/api-service";
import ErrorSnackBar from "../../../shared/components/snackbar/ErrorSnackBar";
import SuccessSnackBar from "../../../shared/components/snackbar/SuccessSnackBar";

interface MarqueFormProps {
  entity?: Marque;
  file_img?: File | undefined;
  file_name?: string;
  success?: string;
  error?: string;
  imgUrl?: string[];
}

const MarqueFormComponent = (props: MarqueFormProps) => {
  const [state, setState] = useState<MarqueFormState>(initialState);
  // const setImgUrl = (imgUrl: string[]) => {
  //   setState((state) => ({ ...state, imgUrl }));
  // };
  const marque = props.entity;

  useEffect(() => {
    if (props.entity) {
      setState((state) => ({
        ...state,
        form: {
          ...(props.entity as Marque),
        },
      }));
    }
  }, [props.entity]);

  // useEffect(() => {
  //   listAll(ref(imageDb, "logo")).then((imgs) => {
  //     imgs.items.forEach((val) => {
  //       getDownloadURL(val).then((url) => {
  //         setState((state) => ({
  //           ...state,
  //           imgUrl: [
  //             ...state.imgUrl,
  //             replaceSubstring(url, firebase_img, imagkit),
  //           ],
  //         }));
  //       });
  //     });
  //   });
  // }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (state.file_img !== null) {
      const imgRef = ref(imageDb, `logo/${v4()}`);

      uploadBytes(imgRef, state.file_img as File).then(async (value) => {
        // console.log("ito" + value.metadata.name);
        // setState((state) => ({
        //   ...state,
        //   form: {
        //     ...state.form,
        //     logo: value.metadata.name as string,
        //   },
        // }));

        // console.log("vqlue : ", value);
        // console.log("ny alefa 1 : ");
        // console.log(state);

        const url = await getDownloadURL(value.ref);
        setState((state) => ({
          ...state,
          form: {
            ...state.form,
            logo: url,
          },
        }));

        setTimeout(() => {
          if (state.form.id) {
            updateMarque(state.form)
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
            insertMarque(state.form)
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
        }, 500);

        console.log(state, url);
      });
    }
  };

  return (
    <div className="form-temp marque-form">
      <div className="container-form">
        <Link to="/marques">
          <i className="form-return fas fa-arrow-left"></i>
        </Link>{" "}
        <div className="title-form">
          <Title>{marque ? "Modifier marque" : "Créer marque"}</Title>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <TextField
              label="Nom"
              onChange={(event) =>
                setState((state) => ({
                  ...state,
                  form: {
                    ...state.form,
                    nom: event.target.value as string,
                  },
                }))
              }
              value={state.form.nom}
            />
            <TextField
              type="file"
              label="logo"
              onChange={(event) =>
                setState((state) => ({
                  ...state,
                  form: {
                    ...state.form,
                    // logo: event.target.value as string,
                  },
                  file_name: (event.target as HTMLInputElement).files?.[0]
                    .name as string,
                  file_img: (event.target as HTMLInputElement).files?.[0],
                }))
              }
            />
            <Button variant="contained" type="submit">
              {marque ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
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
    </div>
  );
};

interface MarqueFormState {
  form: Marque;
  file_name: string;
  file_img: File | undefined;
  success: string;
  error: string;
  submitLoading: boolean;
  openError: boolean;
  openSuccess: boolean;
  imgUrl: string[];
}

const initialState: MarqueFormState = {
  form: {
    nom: "",
    logo: "",
  },
  file_name: "",
  file_img: undefined,
  success: "",
  error: "",
  submitLoading: false,
  openError: false,
  openSuccess: false,
  imgUrl: [],
};

export default MarqueFormComponent;
