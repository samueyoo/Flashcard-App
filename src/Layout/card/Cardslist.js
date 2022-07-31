import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { deleteCard, listDecks, readDeck } from '../../utils/api/index';
import CardslistCard from './CardslistCard';
function Cardslist({ currentDeckState, allDecks, setAllDecks, handleDeleteDeckBtn  }) {

    const [theDeck, setTheDeck] = useState({});
    const [theCards, setTheCards] = useState([]);

    //const { cards, name, id, description } = currentDeck;
    const routeMatch = useRouteMatch().url;
    const deckId = useParams().deckId
    console.log("deckId", deckId)

    const handleCheckCurrentDecksCards = () => {
        console.log(theDeck)
        console.log("currentDeckState:", currentDeckState)
    }

    async function retrieveTheDeck() {
        readDeck(deckId)
            .then(deck => {
                setTheDeck(deck);
                return deck;
            })
            .then(deck => {
                const cards = deck.cards;
                setTheCards(cards.map(card => {
                    return <CardslistCard key={card.id} card={card} handleDeleteCard={handleDeleteCard} />
                }));
            })
    }

    useEffect(() => {
        retrieveTheDeck();
    }, [])

    async function handleDeleteCard(cardId) {
        async function getAllDecks() {
            const decksArray = await listDecks();
            console.log("getAllDecks Function: decksArray", decksArray);
            setAllDecks(decksArray)
            retrieveTheDeck();
        }
        if (window.confirm("Delete this card? You will not be able to recover it.")) {
            deleteCard(cardId).then(getAllDecks);
        }
    }

    return (
        <>
            <h3>{theDeck.name}</h3>
            <p>{theDeck.description}</p>
            {/*<button type="button" onClick={handleCheckCurrentDecksCards}>Check currentDeck</button>*/}
            <Link to={`${routeMatch}/edit`} className="btn btn-secondary" style={{ marginRight: 5 }}>Edit</Link>
            <Link to={`/decks/${theDeck.id}/study`} className="btn btn-primary" style={{ marginRight: 5 }}>Study</Link>
            <Link to={`/decks/${theDeck.id}/cards/new`} className="btn btn-primary" style={{ marginRight: 5 }}>+ Add cards</Link>
            <button className="btn btn-danger" onClick={() => handleDeleteDeckBtn(theDeck.id)}>🗑️</button>
            <h2 style={{ marginTop: 30 }}>Cards</h2>
            {theCards}
        </>
    )
}

export default Cardslist;