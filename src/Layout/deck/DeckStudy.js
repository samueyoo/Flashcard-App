import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../../utils/api/index';

import CardStudy from './CardStudy';

function DeckStudy({ getAllDecks }) {
    const deckId = useParams().deckId;
    const history = useHistory();

    const [deck, setDeck] = useState({cards: [""]});
    const [front, setFront] = useState(true);
    const [whichCard, setWhichCard] = useState(0);

    useEffect(() => {
        async function activeDeck(deckId) {
            const response = await readDeck(deckId);
            //console.log("response:", response);
            setDeck(response);
        }
        activeDeck(deckId);
        //console.log("deck:", deck)
    }, [])

    const handleNext = () => {
        if (whichCard < (deck.cards.length - 1)) {
            setFront(true);
            setWhichCard(whichCard + 1);
        } else if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
            setFront(true);
            setWhichCard(0);
        } else {
            history.push("/");
        }
        
    }

    const handleFlip = () => {
        setFront(!front);
    }



    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                    <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h3>Study: {deck.name}</h3>
            {/*<button onClick={() => {console.log("deck:", deck)}}>Check deck State</button>
            <button onClick={() => {console.log("front:", front)}}>Check front State</button>
            <button onClick={() => {console.log("whichCard (index):", whichCard)}}>Check whichCard State</button>
            <button onClick={() => {console.log("cards.length:", deck.cards.length)}}>Check cards.length State</button>*/}
            <CardStudy deck={deck} front={front} whichCard={whichCard} handleNext={handleNext} handleFlip={handleFlip} getAllDecks={getAllDecks} />
        </>
    )
}

export default DeckStudy;