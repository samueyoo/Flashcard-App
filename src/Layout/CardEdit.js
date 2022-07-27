import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { updateCard } from '../utils/api';

function CardEdit({ currentDeck={ name: "", cards: [{front: "test", id: ""}] } }) {
    const { cards, id } = currentDeck;
    const cardId = useParams().cardId;
    const cardObject = cards.find(card => card.id == cardId);

    const initialFormState = { front: "", back: "" };
    const [formData, setFormData] = useState(initialFormState)

    function handleChange({ target }) {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
        console.log("formData:", formData);
    }

    function handleEditSubmit(e) {
        console.log("updating deck...", {...cardObject, ...formData})
        updateCard({...cardObject, ...formData})
        setFormData({...cardObject, ...formData})
    }


    if (cardObject) {
        return (
            <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                    <li style={{"--bs-breadcrumb-divider": '/'}} className="breadcrumb-item"><Link to={`/${currentDeck.name}`}>{currentDeck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card</li>
                </ol>
            </nav>
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
                        required
                    />
                </label>
                <br />
                <Link to={`/decks/${id}`} className="btn btn-secondary">Cancel</Link>
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