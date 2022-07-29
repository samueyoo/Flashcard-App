import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function BreadcrumbNavBar({ allDecks, deckName, cardId, editCard, editDeck, addCard, createDeck, study }) {

    //Defunct for now; keeping this component for posterity
    
    const currentUrl = window.location.href;
    const noDecksUrl = currentUrl.split("decks").pop();
    const splitUrl = noDecksUrl.split("/")

    //Home / Create Deck
    //Home / deckName
    //Home / deckName / Study
    //Home / deckName / Edit Deck
    //Home / deckNAme / Add Card
    //Home / deckName / Edit Card cardId

    let lis = splitUrl.map((urlPiece, index) => {
        if (index === 0) {
            return (
                <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
            )
        }
        if (Number(typeof(urlPiece)) === "number" && index === 1) {
            const matchingDeck = allDecks.find(deck => urlPiece == deck.id);
            return (
                <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={`/${matchingDeck.id}`}>{matchingDeck.name}</Link></li>
            )
        }
        if (Number(typeof(urlPiece)) === "number" && index === 1) {
            const matchingDeck = allDecks.find(deck => urlPiece == deck.id);
            return (
                <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={`/${matchingDeck.id}`}>{matchingDeck.name}</Link></li>
            )
        }
    })

    if (deckName) {
        lis = (
            <>
                <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{deckName}</li>
            </>
        )
    } else if (deckName && editDeck) {
        lis = (
            <>
                <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>{deckName}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{deckName}</li>
            </>
        )
    }


    //Maybe add a variable that renders below based on what the current URL contains? Make it dynamic?
    //Easier would be just to pass props to the navbar component with each route
   return (
    <>
        <button type="button" onClick={() => {
            console.log("currentUrl:", currentUrl)
            console.log("noDecksUrl:", noDecksUrl)
            console.log("splitUrl:", splitUrl)
            }}>Check URL</button>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">name</li>
            </ol>
        </nav>
    </>
   )
}

export default BreadcrumbNavBar;