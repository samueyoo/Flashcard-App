import React from 'react';
import { Link } from 'react-router-dom';

function DeckBootstrapCard({ deck, handleDeleteDeckBtn }) {
    const cardCount = deck.cards.length;

    return (
        <div className="card" style={{marginTop: "10px", marginBottom: "10px"}} id={deck.id}>
            <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-text">{deck.description}</p>
                <p>{cardCount} cards</p>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary" style={ {marginRight: 5} }>View</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary" style={ {marginRight: 20} }>Study</Link>
                <button className="btn btn-danger" onClick={() => handleDeleteDeckBtn(deck.id)} >🗑️</button>
            </div>
        </div>
    )
}

export default DeckBootstrapCard;