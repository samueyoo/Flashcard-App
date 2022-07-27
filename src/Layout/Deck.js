import React, { useEffect } from 'react';
import { useParams, useRouteMatch, Switch, Route, Link } from 'react-router-dom';
import BreadcrumbNavBar from './BreadcrumbNavBar';
import Cardslist from './Cardslist';
import DeckEdit from './DeckEdit';
import CardEdit from './CardEdit';

function Deck({ allDecks, setAllDecks, handleDeleteDeckBtn}) {
    const deckId = useParams().deckId;
    console.log("deckId Param:", deckId)
    console.log("allDecks State:", allDecks)

    const routeMatch = useRouteMatch().url;
    console.log("routeMatch:", routeMatch)

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

    return (
        <>
            <BreadcrumbNavBar currentDeck={currentDeck} />
            <Switch>
                <Route exact path={routeMatch}>
                    <Cardslist 
                    currentDeck={currentDeck}
                    allDecks={allDecks} 
                    setAllDecks={setAllDecks} 
                    handleDeleteDeckBtn={handleDeleteDeckBtn}  
                    />
                </Route>
                <Route path={`${routeMatch}/edit`}>
                    <DeckEdit currentDeck={currentDeck} />
                </Route>
                <Route path={`${routeMatch}/cards/new`}>

                </Route>
                <Route path={`${routeMatch}/cards/:cardId/edit`}>
                    <p>Editing a Card</p>
                    <CardEdit currentDeck={currentDeck} />
                </Route>
            </Switch>
        </>
    )
}

export default Deck;