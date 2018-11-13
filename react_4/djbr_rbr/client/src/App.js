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
  Row
} from 'reactstrap';

import BookDetails from './BookDetails.js';

class Search extends Component {

  render() {
    const { searchTerm, onSearchChange } = this.props;
    return (
      <Form>
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
              to={'/api/books/' + item.id}>{item.title}</Link>
            </div>            
            <Button close onClick={() => this.props.onDismiss(item.id)} />
          </ListGroupItem>          
      )}
      </ListGroup>
      </div>
    );
  }
}

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

  onBookInsert(book) {
    const updatedList = [...this.state.list, book];
    this.setState({ list: updatedList });
  }
  
  onSearchChange(event) {
    // shallow merge, so list is preserved
    this.setState({ searchTerm: event.target.value });
  }
 
  render() {

    if (!this.state.list) { return null; }
    
    return (      
      <Container className="App">
        
        <Row>
          <Search
            value={this.searchTerm}
            onSearchChange={this.onSearchChange}
          />
        </Row>
        
        <Row>          
          <Router>
            <div>
              <ItemList
                list={this.state.list}
                searchTerm={this.state.searchTerm}
                onDismiss={this.onDismiss}
              />
              <Link to='/api/books/'>
                <Button color="primary">New</Button>
              </Link>
              <Container>
                <Route path="/" component={(props) => <div/>}/>              
                <Route path="/api/books/:id" component={BookDetails}/>
                <Route path="/api/books" exact
                       render={(props) => <BookDetails
                                            onBookInsert={this.onBookInsert}
                                            {...props}
                                          />}
                />
              </Container>
            </div>          
          </Router>
        </Row> 
        </Container>
    );
  }
  x
}

export default App;
