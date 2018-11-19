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
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

import BookDetails from './BookDetails.js';


library.add(faEye);

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
                    <Badge pill>{item.id}</Badge>
                    <span className="books-buttons">
                      <Button color="link">
                        <FontAwesomeIcon
                          icon="eye"
                          onClick={() => this.props.onPreview(item.id)}
                        />
                      </Button>
                    </span>                    
                    <Link 
                      to={'/books/' + item.id}>{item.title}
                    </Link>
                  </div>
                  <Button
                    close
                    onClick={() => this.props.onDismiss(item.id)} />
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


class BookPreview extends Component {

  render() {

    if (!this.props.book) { return null; }

    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
          <ModalHeader
            toggle={this.props.toggle}>
            Book Preview
          </ModalHeader>
          <ModalBody>
            <h5>Title</h5>
              <a href={this.props.book.url}>
                {this.props.book.title}</a>
            <h5>Year</h5>{this.props.book.pub_year}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggle}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

class Home extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      list: null,
      searchTerm: '',
      togglePreviewModal: false,
      bookToPreview: null,
    };
    
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
  }

  componentDidMount() {
    axios.get('/api/books')
      .then(response =>  this.setState({list: response.data}))
      .catch(error => error);
  }

  togglePreview() {
    this.setState({
      togglePreviewModal: !this.state.togglePreviewModal
    });
  }
  
  onDismiss(id) {
    axios(`/api/books/${id}`, {method: "DELETE"})
      .then(response => {
        const updatedList = this.state.list.filter(item => item.id !== id);
        this.setState({ list: updatedList });
      })
      .catch(error => error);
  }

  onPreview(id) {
    axios.get(`/api/books/${id}`)
      .then(response => {
        this.setState({bookToPreview: response.data});
        this.togglePreview();
      })
      .catch(error => error);    
  }
  
  onSearchChange(event) {
    // shallow merge, so list is preserved
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    
    if (!this.state.list) { return null; }

    const referrerState = this.props.location.state;
    let message = '';
    if (referrerState) {
      message = referrerState.message;
      referrerState.message = '';
    }
    const bookToPreview = this.state.bookToPreview;

    return(
      <div>
        <BookPreview
          book={bookToPreview}
          modal={this.state.togglePreviewModal}
          toggle={this.togglePreview}/>
        <Search
          value={this.searchTerm}
          onSearchChange={this.onSearchChange}
        />                          
        <ItemList
          list={this.state.list}
          searchTerm={this.state.searchTerm}
          onDismiss={this.onDismiss}
          onPreview={this.onPreview}
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
  }
};


class App extends Component {
 
  render() {
   
    return (      
      <Container className="App">
        <Router>
            <div>
                <Route
                  path="/" exact
                  component={Home}
                />
                <Route
                  path="/books/:id"
                  component={BookDetails}
                />
                <Route
                  path="/books/" exact
                  component={BookDetails}
                />
            </div>
        </Router>
        </Container>
    );
  }
}

export default App;
