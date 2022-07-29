import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api/index';

function DeckEdit({ currentDeck={ cards: [], name: "", id: null}, getAllDecks }) {
    const { name, id } = currentDeck;
    const initialFormState = { name: "", description: "" };
    const [formData, setFormData] = useState(initialFormState)
    const [theDeck, setTheDeck] = useState({});
    const deckId = useParams().deckId;
    const history = useHistory();

    async function retrieveTheDeck() {
        readDeck(deckId)
            .then(deck => {
                setTheDeck(deck);
                return deck;
            })
            .then(deck => setFormData(deck));
    }

    useEffect(() => {
        retrieveTheDeck();
    }, [])

    function handleChange({ target }) {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
        console.log("formData:", formData);
    }

    function handleEditSubmit(e) {
        e.preventDefault();
        console.log("updating deck...", {...currentDeck, ...formData})
        async function editDeckRequest(deck) {
            updateDeck(deck)
                .then(() => setFormData(initialFormState))
                .then(() => history.push(`/decks/${id}`))
                .then(() => getAllDecks())
        }
        editDeckRequest({...currentDeck, ...formData})
    }

    if (currentDeck) {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={`/decks/${id}`}>{name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                    </ol>
                </nav>
                <h2>{name}: Add Card</h2>
                <form onSubmit={handleEditSubmit}>
                    <label htmlFor="name">
                        Name
                        <br />
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            required
                        />
                    </label>
                    <br />
                    <label htmlFor="description">
                    Description
                        <br />
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleChange}
                            value={formData.description}
                            cols="50"
                            rows="3"
                        />
                    </label>
                    <br />
                    <Link to={`/decks/${id}`} className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </>
        )
    }
}

export default DeckEdit;