import React from "react";
import "../assets/css/template.css";


const Nav = () =>{
    return <>
    <section id="sidebar">
        <a href="#" className="brand">
            <i class='bx bxs-smile'></i>
            <span className="text">MON APP</span>
        </a>
        <ul className="side-menu top">
            <li className="active">
                <a href="#">
                    <i class='bx bxs-dashboard' ></i>
                    <span className="text">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class='bx bxs-shopping-bag-alt' ></i>
                    <span className="text">My Store</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class='bx bxs-doughnut-chart' ></i>
                    <span className="text">Analytics</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class='bx bxs-message-dots' ></i>
                    <span className="text">Message</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class='bx bxs-group' ></i>
                    <span className="text">Team</span>
                </a>
            </li>
        </ul>
        <ul className="side-menu">
            <li>
                <a href="#">
                    <i class='bx bxs-cog' ></i>
                    <span className="text">Settings</span>
                </a>
            </li>
            <li>
                <a href="#" className="logout">
                    <i class='bx bxs-log-out-circle' ></i>
                    <span className="text">Logout</span>
                </a>
            </li>
        </ul>
    </section>
    </>
    ;
};

export default Nav;