import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { createCard, readDeck } from '../utils/api';

function NewCard({ getAllDecks }) {
    const deckIdParam = useParams().deckId;
    console.log("deckIdParam", deckIdParam)

    const initialFormData = { front: "", back: ""};
    const [formData, setFormData] = useState(initialFormData);
    const [theDeck, setTheDeck] = useState({});
    const history = useHistory();

    const handleNewCardSubmit = (e) => {
        e.preventDefault();
        async function newCardRequest(card) {
            createCard(deckIdParam, card)
                .then((card) => {
                    setFormData(initialFormData);
                    return card;
                })
                .then((card) => {
                    history.push(`/decks/${deckIdParam}`);
                    return card;
                })
                .then((card) => console.log("deck sent:", card))
                .then(() => getAllDecks)
        }
        newCardRequest(formData);
    }

    useEffect(() => {
        async function retrieveTheDeck() {
            readDeck(deckIdParam)
                .then(deck => {
                    setTheDeck(deck);
                    return deck;
                })
        }
        retrieveTheDeck();
    }, [])

    function handleChange({ target }) { //Can probably refactor these handleChange functions by lifting them higher and just passing them
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
        console.log("formData:", formData);
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                    <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={`/decks/${deckIdParam}`}>{theDeck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h1>{theDeck.name}: Add Card</h1>
            <form onSubmit={handleNewCardSubmit}>
                <label>
                    Front
                    <br />
                    <textarea
                        name="front"
                        id="front"
                        placeholder="Front side of card"
                        cols="50"
                        rows="3"
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Back
                    <br />
                    <textarea 
                        name="back"
                        id="back"
                        placeholder='Back side of card'
                        cols="50"
                        rows="3"
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <Link to={"/"} type="button" className="btn btn-secondary" style={ {marginRight: 5} }>Cancel</Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default NewCard;