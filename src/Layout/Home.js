import React, {  } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Decklist from './deck/Decklist';

function Home({ allDecks, setAllDecks, handleDeleteDeckBtn }) {
      
  const handleCheckStateBtn = () => { //Temp debugging btn to check current state
    console.log(allDecks);
}

    return (
        <Switch>
            <Route exact path="/">
                <Link to="/decks/new" className="btn btn-primary">Create Deck</Link>
                <button onClick={handleCheckStateBtn}>Check allDecks State!</button>
                <p>Home.js</p>
                <Decklist allDecks={allDecks} setAllDecks={setAllDecks} handleDeleteDeckBtn={handleDeleteDeckBtn} />
            </Route>
        </Switch>

    )
}


export default Home;