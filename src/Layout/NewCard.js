import React from 'react';
import { useParams } from 'react-router-dom';

function NewCard({ deckId }) {
    const deckIdParam = useParams().deckId;
    console.log("deckIdParam", deckIdParam)

    return (
        <p>NewCard.js... deckId = {deckId}</p>
    )
}

export default NewCard;