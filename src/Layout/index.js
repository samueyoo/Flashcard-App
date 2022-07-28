import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Link, Route, Switch, useHistory } from "react-router-dom";

import { listDecks, deleteDeck } from "../utils/api/index";
import Home from "./Home";
import Deck from "./Deck";
import DeckStudy from "./DeckStudy";

function Layout() {
  const [allDecks, setAllDecks] = useState([{ name: "", id: null, cards: []}]);
  const history = useHistory();

  useEffect(() => { //Initial request and rendering of all decks in the API.
      async function getAllDecks() {
          const decksArray = await listDecks();
          console.log("getAllDecks Function: decksArray", decksArray);
          setAllDecks(decksArray)
      }
      getAllDecks();
  }, [])

  const handleDeleteDeckBtn = (deckId) => { //Need to move delete handler down to the Decklist component, that way we can just reference deckId directly instead of chaining parentNode!
    const abortController = new AbortController();
    const signal = abortController.signal
    console.log("Selected deckId:", deckId);

    async function deleteRequest(deckId, signal) { //Delete request and 
      const deleteResponse = await deleteDeck(deckId, signal);
      console.log("Delete request; empty object SHOULD means successful deletion:", deleteResponse);
      const listDecksResponse = await listDecks();
      console.log("Delete request 2; new list of deck(s) to change allDecks state to:", listDecksResponse);
      setAllDecks(listDecksResponse);
    }

      if (window.confirm("Delete this Deck? You will not be able to recover it.")) {
        deleteRequest(deckId, signal);
        history.push("/");
      };

    return () => {
      console.log("cleanup", deckId);
      return abortController.abort(); //Not sure why AbortController is not working
    }
  }


  return (
    <>
      <Header />
      <div className="container">
        <Switch>

          <Route exact path="/">
            <Home allDecks={allDecks} setAllDecks={setAllDecks} handleDeleteDeckBtn={handleDeleteDeckBtn} />
          </Route>

          <Route exact path="/decks/new">
            <p>CREATING NEW DECK; need to implement create deck component here</p>
            <p>Create Deck</p>
            <Link to={"/"}>Back to Home</Link>
          </Route>

          <Route path="/decks/:deckId/study">
            <DeckStudy />
          </Route>

          <Route path="/decks/:deckId">
            <Deck allDecks={allDecks} setAllDecks={setAllDecks} handleDeleteDeckBtn={handleDeleteDeckBtn} />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>

      </div>
    </>
  );
}

export default Layout;
