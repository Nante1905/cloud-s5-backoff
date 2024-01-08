import React from "react";
import "../assets/css/template.css";
import Content from "./content";
import ContentForm from "./contentForm";
import Nav from "./nav";

const Template = () =>{
    return <>
        <div className="grid-container">
            <Nav />
            <Content/>
        </div>
        </>;
};

export default Template;