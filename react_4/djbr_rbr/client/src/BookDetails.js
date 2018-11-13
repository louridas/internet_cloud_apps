import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { Link } from "react-router-dom";
import './App.css';

class BookDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadBook(url) {
    fetch(url)
      .then(response => response.json())
      .then(result => this.setState({book: result}))                     
      .catch(error => error);
  }
  
  componentDidMount() {
    if (!this.props.match.params.id) {
      const book = {
        title: '',
        URL: '',
        year_published: ''
      };
      this.setState({book});
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
    const book = this.state.book;
    
    book[name] = value;
    this.setState({book});
  }
  
  handleSubmit(event) {
    const id = this.state.book.id || '';
    let book = this.state.book;
    const method = this.state.book.id ? "PUT" : "POST";
    fetch(`/api/books/${id}`, {
      method: method,
      body: JSON.stringify(book),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        book = {
          title: '',
          URL: '',
          year_published: '',
        };
        this.setState({book});
        this.props.onBookInsert(result);
      })
      .catch(error => console.error('Error:', error));
    event.preventDefault();
  }
 
  render() {
    const book = this.state.book;
    if (!book) { return null; }

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
              type="url"
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
