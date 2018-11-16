import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Container,
  Button,
  Badge,
  ListGroup,
  ListGroupItem,
  Form,
  Input,
  Alert
} from 'reactstrap';

import BookDetails from './BookDetails.js';

class Search extends Component {

  render() {
    const { searchTerm, onSearchChange } = this.props;
    return (
      <Form className="books-search">
        <Input
          type="text"
          placeholder="search title"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </Form>
    );
  } 
}

class ItemList extends Component {

  searchItem(item) {
    return item.title.toLowerCase()
      .includes(this.props.searchTerm.toLowerCase());
  }

  render() {
    return (
      <div>
        <div className="books">
          <ListGroup>
            {this.props.list.filter(item => this.searchItem(item)).map(
              item =>
                <ListGroupItem
                  key={item.id}
                  className="justify-content-between">
                  <div className="book-item">
                    <Badge pill>{item.id}</Badge>&nbsp;              
                    <Link 
                      to={'/books/' + item.id}>{item.title}</Link>
                  </div>            
                  <Button close onClick={() => this.props.onDismiss(item.id)} />
                </ListGroupItem>          
            )}
          </ListGroup>
        </div>
      </div>
    );
  }
}

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Alert
        className="message"
        color={this.props.color}
        isOpen={this.state.visible}
        toggle={this.onDismiss}>
        {this.props.message}
      </Alert>
    );
  }
}


function Home(props) {
  
  const referrerState = props.location.state;
  let message = '';
  if (referrerState) {
    message = referrerState.message;
    referrerState.message = '';
  }
  
  return(
    <div>
      <Search
        value={this.searchTerm}
        onSearchChange={this.onSearchChange}
      />                          
      <ItemList
        {...props}
        list={this.state.list}
        searchTerm={this.state.searchTerm}
        onDismiss={this.onDismiss}
      />
      <div>
        <Link to='/books/'>
          <Button color="primary">New</Button>
        </Link>
      </div>
      { message &&
        <Message
          color="success"
          message={message}
        />
      }
    </div>
  );
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: null,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onBookInsert = this.onBookInsert.bind(this);
    this.onBookUpdate = this.onBookUpdate.bind(this);
  }

  componentDidMount() {
    fetch('/api/books')
      .then(response => response.json())
      .then(result =>  this.setState({list: result}))
      .catch(error => error);
  }
  
  onDismiss(id) {
    fetch(`/api/books/${id}`, {method: "DELETE"})
      .then(response => {
        const updatedList = this.state.list.filter(item => item.id !== id);
        this.setState({ list: updatedList });
      })
      .catch(error => error);
  }

  onBookInsert(newBook) {
    const updatedList = [...this.state.list, newBook];
    this.setState({ list: updatedList });
  }

  onBookUpdate(updatedBook) {
    const updatedList = this.state.list.map(book => {
      return (book.id === updatedBook.id
              ? updatedBook
              : book);
    });
    this.setState({ list: updatedList });
  }
 
  onSearchChange(event) {
    // shallow merge, so list is preserved
    this.setState({ searchTerm: event.target.value });
  }
 
  render() {

    if (!this.state.list) { return null; }

    const HomeComponent = Home.bind(this);
    
    return (      
      <Container className="App">
        <Router>
            <div>
                <Route
                  path="/" exact
                  component={HomeComponent}
                />
                <Route
                  path="/books/:id"
                  render={(props) =>
                          <BookDetails
                            {...props}                            
                            onBookUpdate={this.onBookUpdate}
                          />}
                />
                <Route
                  path="/books/" exact
                  render={(props) =>
                          <BookDetails
                            {...props}                            
                            onBookInsert={this.onBookInsert}
                          />}
                />
            </div>
        </Router>
        </Container>
    );
  }
}

export default App;
