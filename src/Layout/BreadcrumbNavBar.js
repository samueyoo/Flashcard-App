import React from 'react';
import { Link } from 'react-router-dom';

function BreadcrumbNavBar({ currentDeck={name: ""} }) {
    const { name } = currentDeck;
    //Component most likely defunct, keeping for posterity
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