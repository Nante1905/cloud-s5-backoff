import React from "react";
import "../assets/css/template.css";
const Formulaire = () =>{
    return <>
        <div className="formulaire_contenu" >
            <h1 className="title_form" > Ajout Element </ h1>
            <div className="group_form">
                <label className="label_form" > Nom: </label>
                <input  className="form_input" type="text"/> 
            </div>
            <div className="group_form">
                <label className="label_form" > Nom: </label>
                <select className="form_input" >
                    <option>hyhu</option>
                    <option>hyhu</option>
                    <option>hyhu</option>
                    <option>hyhu</option>
                    <option>hyhu</option>
                </select>
            </div>
            <div className="group_form">
                <label className="label_form" > Nom: </label>
                <input  className="form_input" type="password"/> 
            </div>
            <div className="group_form">
                <a>
                    <span className="addButton margin-none">Ajouter</span> 
                </a>
            </div>
        </div>
    </>
};

export default Formulaire; 