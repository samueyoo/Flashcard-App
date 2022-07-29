import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api/index'

function NewDeck({ getAllDecks }) {
    const initialFormData = { name: "", description: ""};
    const [formData, setFormData] = useState(initialFormData);
    const history = useHistory();

    const handleNewDeckSubmit = (e) => {
        e.preventDefault();
        async function newDeckRequest(deck) {
            createDeck(deck)
                .then((deck) => {
                    setFormData(initialFormData);
                    return deck;
                })
                .then((deck) => {
                    history.push(`/decks/${deck.id}`);
                    return deck;
                })
                .then((deck) => console.log("deck sent:", deck))
                .then(() => getAllDecks())
        }
        newDeckRequest(formData);
    }

    useEffect(() => {

    }, [formData])

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
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h1>Create Deck</h1>
            <form onSubmit={handleNewDeckSubmit}>
                <label>
                    Name
                    <br />
                    <input 
                        name="name"
                        type="text"
                        id="name"
                        placeholder="Deck Name"
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Description
                    <br />
                    <textarea 
                        name="description"
                        id="description"
                        placeholder='Brief description of the deck'
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

export default NewDeck;