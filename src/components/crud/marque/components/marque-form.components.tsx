import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Title from "../../../shared/title/title.component";
import { Marque } from "../../../shared/types/Marque";
import "../../../../assets/fontawesome-5/css/all.min.css"
import "./marque-form.component.css";
import "./marque-form.component.scss";
import { firebase_img, imagkit, Url_api } from "../../../shared/constants/global";
import { Link } from 'react-router-dom';
import { insertMarque, updateMarque } from "../../../service/marque.service";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../../../shared/firebase/config";
import {v4} from "uuid";
import { IKImage } from 'imagekitio-react';
import { replaceSubstring } from "../../../shared/constants/fonction";

interface MarqueFormProps {
  entity?: Marque;
  file_img : any  ;
  file_name:string;
  success: string;
  error: string;
  imgUrl: any
}

const MarqueFormComponent = (props: MarqueFormProps) => {
  const [state, setState] = useState<MarqueFormState>(initialState);
  const setImgUrl = (imgUrl: string[]) => {
    setState((state) => ({ ...state, imgUrl }));
  };
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

  useEffect(() => {
    listAll(ref(imageDb, "logo")).then(imgs => {
      imgs.items.forEach(val => {
        getDownloadURL(val).then(url => {
          setState((state) => ({ ...state, imgUrl : [...state.imgUrl , replaceSubstring( url , firebase_img , imagkit ) ] }));
        });
      });
    });
  }, []);
  const handleSubmit = async () => {
    if(state.file_img !==null){
      const imgRef =  ref(imageDb,`logo/${v4()}`)
      uploadBytes(imgRef,state.file_img).then(value=>{
        console.log("ito" + value.metadata.name );
          setState((state) => ({
            ...state,
            form: {
              ...state.form,
              logo: value.metadata.name,
            }
          }))

          console.log("vqlue : ", value);
          console.log("ny alefa 1 : ");
          console.log(state);
          getDownloadURL(value.ref).then(url=>{
            setState((state) => ({
              ...state,
              form: {
                ...state.form,
                logo: value.metadata.name + "" as string,
              },
            }))
            setImgUrl(data=>[...data,url]);
            try {
              console.log("ny alefa : ");
              console.log(state);
              if (state.form.id) {
                updateMarque(state.form);
                console.log("Mise à jour effectuée avec succès!");
                setState((state) => ({ ...state, success: "Modifié avec succès !", error: null }));
              } else {
                insertMarque(state.form);
                console.log("Insertion effectuée avec succès!");
                setState((state) => ({ ...state, success: "Insertion effectuée avec succès !", error: null }));
              }
            } catch (error) {
              console.error("An error occurred:", error);
              console.log(state);
              if (error.response && error.response.data && error.response.data.ok !== true) {
                const errorMessage = error.response.data.err || "Une erreur inattendue s'est produite.";
                setState((state) => ({ ...state, error: errorMessage, success: null }));
              } else {
                setState((state) => ({ ...state, error: "Une erreur inattendue s'est produite.", success: null }));
              }
            }
          })
      })
   }

  
  };

  const marque = props.entity;
  return (
    <div className="form-temp marque-form">
      <div className="container-form" > 
      <Link to="/marques">
          <i className="form-return fas fa-arrow-left"></i>
        </Link>        <div className="title-form" > 
          <Title >{marque ? "Modifier marque" : "Créer marque"}</Title>
        </div>
        {state.error && (
          <div className="success-error-form" style={{ color: "red" }}>
            {state.error}
          </div>
        )}
        {state.success && (
          <div className="success-error-form" style={{ color: "green" }}>
            {state.success}
          </div>
        )}
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
                  logo: event.target.value as string,
                },
                file_name : event.target.value,
                file_img:event.target.files[0]
              }))
            }
            value={state.file_name}
          />
          <Button variant="contained" onClick={handleSubmit}>
            {marque ? "Modifier" : "Créer"}
          </Button>
        </div>
        </div>
    </div>
  );
};

interface MarqueFormState {
  form: Marque;
  file_name:string,
  file_img : File | undefined,
  success: boolean,
  error: boolean,
  imgUrl: string[]
}

const initialState: MarqueFormState = {
  form: {
    nom: "",
    logo: "",
  },
  file_name:"",
  file_img : undefined ,
  success: false,
  error: false,
  imgUrl: []
};

export default MarqueFormComponent;