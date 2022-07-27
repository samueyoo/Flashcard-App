import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api';

function DeckStudy() {
    const deckId = useParams().deckId;

    const [deck, setDeck] = useState([]);

    useEffect(() => {
        async function activeDeck(deckId) {
            const response = await readDeck(deckId);
            //console.log("response:", response);
            setDeck(response);
        }
        activeDeck(deckId);
        //console.log("deck:", deck)
    }, [])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                    <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={`/${deck.name}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h3>Study: {deck.name}</h3>
            <p>DeckStudy.js</p>
            <p>{deck.id}</p>
        </>
    )
}

export default DeckStudy;