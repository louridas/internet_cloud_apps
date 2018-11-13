import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { Link } from "react-router-dom";
import './App.css';

const emptyBook = {
  title: '',
  url: '',
  pub_year: ''
};

class BookDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {...emptyBook};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadBook(url) {
    fetch(url)
      .then(response => response.json())
      .then(result => this.setState({...result}))
      .catch(error => error);
  }
  
  componentDidMount() {
    if (!this.props.match.params.id) {
      this.setState({...emptyBook});
    } else {
      this.loadBook(this.props.match.url);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.loadBook(this.props.match.url);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    this.setState({[name]: value});
  }
  
  handleSubmit(event) {
    const id = this.state.id || '';
    let book = this.state;
    const method = this.state.id ? "PUT" : "POST";
    fetch(`/api/books/${id}`, {
      method: method,
      body: JSON.stringify(book),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        book = Object.assign({}, emptyBook);
        this.setState({book});
        console.log(this.state.book);
        this.props.onBookInsert(result);
      })
      .catch(error => console.error('Error:', error));
    event.preventDefault();
  }
 
  render() {
    const book = this.state;
    // if (!book.id) { return null; }

    return (
      <div className="book">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="bookTitle">Title</Label>
            <Input
              type="text"
              name="title"
              value={book.title}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="bookUrl">
              <a href={book.url}
                 target="_blank"
                 rel="noopener noreferrer">URL</a>
            </Label>
            <Input
              type="text"
              name="url"
              value={book.url}
              onChange={this.handleInputChange}              
            />
          </FormGroup>
          <FormGroup>
            <Label for="bookPubYear">Publication Year</Label>
            <Input
              type="text"
              name="pub_year"
              value={book.pub_year}
              onChange={this.handleInputChange}              
            />
          </FormGroup>
          <Button color="success">Submit</Button>{' '}
          <Link to='/'>
            <Button color="secondary">Dismiss</Button>{' '}
          </Link>
        </Form>
      </div>
    );
  }
}


export default BookDetails;
