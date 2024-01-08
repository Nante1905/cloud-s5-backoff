import React from "react";
import "../assets/css/template.css";
import Content from "./content";
import ContentForm from "./contentForm";
import Nav from "./nav";

const TemplateForm = () =>{
    return <>
        <div className="grid-container">
            <Nav />
            <ContentForm />
        </div>
        </>;
};

export default TemplateForm;