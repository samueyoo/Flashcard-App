import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function CardslistCard({ card={ id: null, front: "", back: "", deckId: null }, handleDeleteCard }) {
    const routeMatch = useRouteMatch().url;
    const { id, front, back, deckId } = card;

    return (
        <div className="card">
            <div className="card-body">
                <p>{front}</p>
                <p>{back}</p>
                <Link to={`${routeMatch}/cards/${id}/edit`} className="btn btn-secondary"style={{ marginRight: 5 }}>Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDeleteCard(id)}>🗑️</button>
            </div>
        </div>
    )
}

export default CardslistCard;