import React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { deleteCard, listDecks } from '../utils/api';
import CardslistCard from './CardslistCard';

function Cardslist({ currentDeck={ cards: [], name: "", id: null}, allDecks, setAllDecks, handleDeleteDeckBtn }) {

    const { cards, name, id, description } = currentDeck;
    const routeMatch = useRouteMatch().url;

    const cardsFromCurrentDeck = cards.map(card => {
        return <CardslistCard key={card.id} card={card} handleDeleteCard={handleDeleteCard} />
    })

    async function handleDeleteCard(cardId) {
        async function getAllDecks() {
            const decksArray = await listDecks();
            console.log("getAllDecks Function: decksArray", decksArray);
            setAllDecks(decksArray)
        }
        if (window.confirm("Delete this card? You will not be able to recover it.")) {
            deleteCard(cardId).then(getAllDecks);
        }
    }

    return (
        <>
            <h3>{name}</h3>
            <p>{description}</p>
            <Link to={`${routeMatch}/edit`} className="btn btn-secondary" style={{ marginRight: 5 }}>Edit</Link>
            <Link to={`/decks/${id}/study`} className="btn btn-primary" style={{ marginRight: 5 }}>Study</Link>
            <button className="btn btn-primary" style={{ marginRight: 5 }}>+ Add cards</button>
            <button className="btn btn-danger" onClick={() => handleDeleteDeckBtn(id)}>🗑️</button>
            <h2 style={{ marginTop: 30 }}>Cards</h2>
            {cardsFromCurrentDeck}
        </>
    )
}

export default Cardslist;