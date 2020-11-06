import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useLocation,
  Prompt,
  useRouteMatch,
} from "react-router-dom";

function App(props) {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products bookFacade={props.bookFacade} />
        </Route>
        <Route path="/company">
          <Company />
        </Route>
        <Route path="/AddBook">
          <AddBook bookFacade={props.bookFacade} />
        </Route>
        <Route path="/FindBook">
          <FindBook bookFacade={props.bookFacade} />
        </Route>
        <Route path="/paramsexample/:id" children={<Child />} />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function Header() {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/products">
          Products
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/addbook">
          Add Book
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/company">
          Company
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/FindBook">
          Find Book
        </NavLink>
      </li>
    </ul>
  );
}

const Child = () => {
  let { id } = useParams();
  return (
    <div>
      <h3> ID: {id}</h3>
    </div>
  );
};

function NoMatch() {
  let location = useLocation();
  return <p>DU TRYKKEDE FORKERT! </p>;
}

function Home() {
  return <p>hej med mig</p>;
}

function Products(props) {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <ul>
        {props.bookFacade.getBooks().map((element) => (
          <li key={element.id}>
            {element.title} <Link to={`${url}/${element.id}`}>details</Link>
          </li>
        ))}
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a book.</h3>
        </Route>
        <Route path={`${path}/:bookId`}>
          <Details bookFacade={props.bookFacade} />
        </Route>
      </Switch>
    </div>
  );
}

function Details(props) {
  let { bookId } = useParams();
  return (
    <fieldset>
      <legend>Book detail:</legend>
      <p>
        Id: {props.bookFacade.findBook(bookId).id}
        <br />
        Title: {props.bookFacade.findBook(bookId).title}
        <br />
        Info: {props.bookFacade.findBook(bookId).info}
      </p>
    </fieldset>
  );
}

function FindBook(props) {
  const emptyBook = { id: "", title: "", info: "" };
  const [bookId, setBookId] = useState();
  const [findBookId, setFindBookId] = useState();
  const [info, setInfo] = useState();

  const handleChange = (evt) => {
    const id = evt.target.value;
    setBookId(id);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setFindBookId(bookId);
    setBookId(emptyBook);
    console.log("bookId: " + JSON.stringify(findBookId));
  };

  const deleteBook = (evt) => {
    evt.preventDefault();
    const id = evt.target.value;
    console.log("delete: " + JSON.stringify(id));
    props.bookFacade.deleteBook(id);
    setInfo("Book with Id: " + id + " deleted");
  };
  return (
    <div>
      <h2>Find Book</h2>
      <form onChange={handleChange}>
        <input id="id" placeholder="Enter book id" />
        <button onClick={handleSubmit}>Find book</button>
      </form>

      <fieldset>
        <legend>Book detail:</legend>
        <p>
          Id:
          {props.bookFacade.findBook(findBookId) &&
            props.bookFacade.findBook(findBookId).id}
          <br />
          Title:
          {props.bookFacade.findBook(findBookId) &&
            props.bookFacade.findBook(findBookId).title}
          <br />
          Info:
          {props.bookFacade.findBook(findBookId) &&
            props.bookFacade.findBook(findBookId).info}
        </p>
        <div>{info}</div>
      </fieldset>

      <form>
        <button onClick={deleteBook} value={findBookId}>
          Delete Book
        </button>
      </form>
    </div>
  );
}
function AddBook(props) {
  const [book, setBook] = useState();
  let [isBlocking, setIsBlocking] = useState(false);

  const handleChange = (evt) => {
    const { id, value } = evt.target;
    setBook({ ...book, [id]: value });
    setIsBlocking(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.bookFacade.addBook(book);
    setIsBlocking(false);
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form>
        <input id="title" placeholder="Add title" onChange={handleChange} />
        <br />
        <input id="info" placeholder="Add info" onChange={handleChange} />
        <br />
        <button onClick={handleSubmit}>Save</button>
      </form>
      <Prompt
        when={isBlocking}
        message={(location) =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />
    </div>
  );
}

function Company() {
  return <p>hej med den</p>;
}

export default App;
