import React from "react";
import "./style2.css"
import AllJokes from './AllJokes.js';
import AllScrape from './AllScrape.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, NavLink
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.


const Header = () => {
  return (
<ul className="header">
          <li>
          <NavLink exact activeClassName="selected" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to="/jokes">Jokes</NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to="/scrape">Scrape</NavLink>
          </li>
        </ul>
  );
}
export default function BasicExample() {
  return (
    <Router>
      <div>
        <Header/>
        
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/jokes">
            <Jokes />
          </Route>
          <Route path="/scrape">
            <Scrape />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Jokes() {
  return (
    <div>
      <AllJokes/>
    </div>
  );
}

function Scrape() {
  return (
    <div>
      <AllScrape />
    </div>
  );
}
