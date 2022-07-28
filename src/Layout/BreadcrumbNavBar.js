import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function BreadcrumbNavBar({ currentDeck={name: ""} }) {
    const { name } = currentDeck;
    //Component most likely defunct, keeping for posterity
    const routeMatch = useRouteMatch().url;

    //Maybe add a variable that renders below based on what the current URL contains? Make it dynamic?
    //Easier would be just to pass props to the navbar component with each route
   return (
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{name}</li>
        </ol>
    </nav>
   )
}

export default BreadcrumbNavBar;