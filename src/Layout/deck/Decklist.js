import React, {  } from 'react';
import DeckBootstrapCard from './DeckBootstrapCard';

function Decklist({ allDecks, handleDeleteDeckBtn }) {
    
    const deckCards = allDecks.map(deck => {
        return <DeckBootstrapCard key={deck.id} deck={deck} handleDeleteDeckBtn={handleDeleteDeckBtn} />
    })

    return (
        <>
            <div>{deckCards}</div>
        </>
    )
}

export default Decklist;