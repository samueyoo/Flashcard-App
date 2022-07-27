import React from 'react';
import { Link } from 'react-router-dom';

function DeckBootstrapCard({ deck, handleDeleteDeckBtn }) {
    const cardCount = deck.cards.length;

    return (
        <div className="card" id={deck.id}>
            <p>DeckBootstrapCard.js</p>
            <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-text">{deck.description}</p>
                <p>{cardCount} cards</p>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                <button className="btn btn-danger" onClick={() => handleDeleteDeckBtn(deck.id)} >🗑️</button>
            </div>
        </div>
    )
}

export default DeckBootstrapCard;