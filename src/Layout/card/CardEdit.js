import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readCard, readDeck, updateCard } from '../../utils/api/index';

function CardEdit({ currentDeck={ name: "", cards: [{front: "test", id: ""}] }, getAllDecks }) {
    const { cards, id } = currentDeck;
    const cardId = useParams().cardId;
    const deckId = useParams().deckId;
    const history = useHistory();

    const [theDeck, setTheDeck] = useState({});
    const [theCard, setTheCard] = useState([]);


    const initialFormState = { front: "", back: "" };
    const [formData, setFormData] = useState(initialFormState)

    async function retrieveTheDeck() {
        readDeck(deckId)
            .then(deck => setTheDeck(deck));
        readCard(cardId)
            .then(card => {
                setTheCard(card);
                return card;
            })
            .then(card => setFormData(card));
    }

    useEffect(() => {
        retrieveTheDeck();
    }, [])

    const handleCheckCurrentDecksCards = () => {
        console.log("theDeck/theCard:", theDeck, theCard)
    }

    function handleChange({ target }) {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
        console.log("formData:", formData);
    }

    function handleEditSubmit(e) {
        e.preventDefault();
        console.log("updating card...", {...theCard, ...formData})
        async function editCardRequest(card) {
            updateCard(card)
                .then(() => setFormData(initialFormState))
                .then(() => history.push(`/decks/${deckId}`))
                .then(() => getAllDecks())
        }
        editCardRequest({...theCard, ...formData})
    }


    if (theCard) {
        return (
            <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                    <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>
            <button type="button" onClick={handleCheckCurrentDecksCards}>Check theDeck/theCards</button>
            <h3>Edit Card</h3>
            <form onSubmit={handleEditSubmit}>
                <label htmlFor="name">
                    Front
                    <br />
                    <textarea
                        id="front"
                        name="front"
                        onChange={handleChange}
                        value={formData.front}
                        cols="50"
                        rows="3"
                        placeholder={theCard.front}
                        required
                    />
                </label>
                <br />
                <label htmlFor="description">
                    Back
                    <br />
                    <textarea
                        id="back"
                        name="back"
                        onChange={handleChange}
                        value={formData.back}
                        cols="50"
                        rows="3"
                        placeholder={theCard.back}
                        required
                    />
                </label>
                <br />
                <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </>
        )
    } else {
        return (
            <p>No cards found</p>
        )
    }
}

export default CardEdit;