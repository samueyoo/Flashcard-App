import React, { useEffect } from 'react';
import { useParams, useRouteMatch, Switch, Route, Link } from 'react-router-dom';
//import BreadcrumbNavBar from './BreadcrumbNavBar';
import Cardslist from './Cardslist';
import DeckEdit from './DeckEdit';
import CardEdit from './CardEdit';
import NewCard from './NewCard';

function Deck({ allDecks, setAllDecks, handleDeleteDeckBtn}) {
    const deckId = useParams().deckId;
    console.log("deckId Param:", deckId)
    console.log("allDecks State:", allDecks)

    const routeMatch = useRouteMatch().url;
    console.log("routeMatch:", routeMatch)

    useEffect(() => {
        console.log("Deck.js has rendered")
    }, [])

    const currentDeck = allDecks.find(deck => {
        // console.log('=====================')
        // console.log("Looking for deck with matching ID...");
        // console.log("deck.id:", deck.id)
        // console.log(deckId)
        // console.log(deck.id == deckId)
        if (deck.id == deckId) console.log("...Match!:", deck);
        //console.log('=====================')
        return deck.id == deckId;
    });

    console.log("currentDeck:", currentDeck)

    if (currentDeck) {return (
        <>
            <Switch>
                <Route exact path={routeMatch}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{currentDeck.name}</li>
                        </ol>
                    </nav>
                    <Cardslist 
                    currentDeck={currentDeck}
                    allDecks={allDecks} 
                    setAllDecks={setAllDecks} 
                    handleDeleteDeckBtn={handleDeleteDeckBtn}  
                    />
                </Route>

                <Route path={`/decks/:deckId/edit`}>
                    <DeckEdit currentDeck={currentDeck} />
                </Route>

                <Route path={`/decks/:deckId/cards/new`}>
                    <NewCard deckId={currentDeck.id} />
                </Route>
                <Route path={`/decks/:deckId/cards/:cardId/edit`}>
                    <CardEdit currentDeck={currentDeck} />
                </Route>
            </Switch>
        </>
    )} else {
        return (
            <p>Deck not found</p>
        )
    }
}

export default Deck;