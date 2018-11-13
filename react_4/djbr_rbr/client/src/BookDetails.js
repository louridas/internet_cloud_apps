import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './App.css';

class BookDetails extends Component {

  constructor(props) {
    super(props);
    console.log(props.match.params.id);
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
    this.loadBook(this.props.match.url);
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
    const id = this.state.book.id;
    const book = this.state.book;
    fetch(`/api/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(book),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => console.log('Result: ', JSON.stringify(result)))
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
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}


export default BookDetails;
