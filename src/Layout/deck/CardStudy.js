import React from 'react';
import { Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import NewCard from '../card/NewCard';

function CardStudy({ deck, front, whichCard, handleNext, handleFlip, getAllDecks }) {
    const { cards, id } = deck;
    const currentCard = cards[whichCard]

    if (cards.length < 3) {
        return (
            <>
                <Switch>
                    <Route path="/decks/:deckId/study">
                        <h4>Not enough cards.</h4>
                        <p>You need at least 3 cards to study. There are {cards.length} cards in this deck</p>
                        <Link to={`/decks/${id}/cards/new`} type="button" className="btn btn-primary">+ Add Cards</Link>
                    </Route>
                    <Route path="/decks/:deckId/cards/new">
                        <NewCard deckId={id} getAllDecks={getAllDecks} />
                    </Route>
                </Switch>
            </>
        )
    } else if (front) {
        return (
            <div className="card">
                <div className="card-body">Card {whichCard + 1} of {cards.length}</div>
                <div className="card-body">{currentCard.front}</div>
                <button type="button" className="btn btn-secondary" onClick={handleFlip}>Flip</button>
            </div>
        )
    } else {
        return (
            <div className="card">
                <div className="card-body">Card {whichCard + 1} of {cards.length}</div>
                <div className="card-body">{currentCard.back}</div>
                <button type="button" className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>
        )
    }

}

export default CardStudy;