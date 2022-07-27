import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateDeck } from '../utils/api/index';

function DeckEdit({ currentDeck={ cards: [], name: "", id: null} }) {
    const { cards, name, id, description } = currentDeck;
    const initialFormState = { name: "", description: "" };
    const [formData, setFormData] = useState(initialFormState)

    function handleChange({ target }) {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
        console.log("formData:", formData);
    }

    function handleEditSubmit(e) {
        console.log("updating deck...", {...currentDeck, ...formData})
        updateDeck({...currentDeck, ...formData})
        setFormData({...currentDeck, ...formData})
    }

    return (
        <>
            <h2>{name}: Add Card</h2>
            <form onSubmit={handleEditSubmit}>
                <label htmlFor="name">
                    Name
                    <br />
                    <input
                        id="name"
                        type="texT"
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

export default DeckEdit;