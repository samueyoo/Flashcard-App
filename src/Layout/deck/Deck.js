import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch, Switch, Route, Link } from 'react-router-dom';
//import BreadcrumbNavBar from './BreadcrumbNavBar';
import Cardslist from '../card/Cardslist';
import DeckEdit from './DeckEdit';
import CardEdit from '../card/CardEdit';
import NewCard from '../card/NewCard';
import { readDeck } from '../../utils/api/index';

function Deck({ allDecks, setAllDecks, handleDeleteDeckBtn, getAllDecks}) {
    const deckId = useParams().deckId;
    const [currentDeckState, setCurrentDeckState] = useState({});

    console.log("deckId Param:", deckId)
    console.log("allDecks State:", allDecks)

    async function retrieveDeck() {
        const response = await readDeck(deckId)
        setCurrentDeckState(response);
        return response;
    }

    useEffect(() => {
        retrieveDeck();
        console.log("Deck.js has rendered")
    }, [])

    // const currentDeck2 = allDecks.find(deck => {
    //     // console.log('=====================')
    //     // console.log("Looking for deck with matching ID...");
    //     // console.log("deck.id:", deck.id)
    //     // console.log(deckId)
    //     // console.log(deck.id == deckId)
    //     if (deck.id == deckId) console.log("...Match!:", deck);
    //     //console.log('=====================')
    //     return deck.id == deckId;
    // });



    console.log("currentDeckState:", currentDeckState)

    if (currentDeckState) {return (
        <>
            <Switch>
                <Route exact path="/decks/:deckId">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{currentDeckState.name}</li>
                        </ol>
                    </nav>
                    <Cardslist 
                    currentDeckState={currentDeckState}
                    allDecks={allDecks} 
                    setAllDecks={setAllDecks} 
                    handleDeleteDeckBtn={handleDeleteDeckBtn}  
                    />
                </Route>

                <Route path={`/decks/:deckId/edit`}>
                    <DeckEdit currentDeck={currentDeckState} getAllDecks={getAllDecks} />
                </Route>

                <Route path={`/decks/:deckId/cards/new`}>
                    <NewCard />
                </Route>
                <Route path={`/decks/:deckId/cards/:cardId/edit`}>
                    <CardEdit currentDeck={currentDeckState} getAllDecks={getAllDecks} />
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