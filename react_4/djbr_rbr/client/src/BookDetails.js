import React, { Component } from 'react';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';

import {
  Redirect,
  Link
} from "react-router-dom";

import axios from 'axios';

import './App.css';

const emptyBook = {
  title: '',
  url: '',
  pub_year: ''
};

class BookDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toMain: false,
      message: '',
      book: {...emptyBook},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      this.setState({toMain: false, message: error.response.data});
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest
      console.log(error.request);
      this.setState({toMain: false, message: 'No response'});
    } else {
      // Something happened in setting up the request that
      // triggered an Error
      console.log('Error', error.message);
      this.setState({toMain: false, message: error.message});          
    }
  }

  componentDidMount() {
    if (!this.props.match.params.id) {
      this.setState({book: {...emptyBook}});
    } else {
      axios.get('/api/' + this.props.match.url)
        .then(response => this.setState({book: {...response.data}}))
        .catch(error => this.handleError(error));
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const newBook = {...this.state.book};

    newBook[name] = value;
    this.setState({book: newBook});
  }
  
  handleSubmit(event) {
    const id = this.state.book.id || '';
    const book = this.state.book;
    const method = this.state.book.id ? "PUT" : "POST";
    axios(`/api/books/${id}`, {
      method: method,
      data: JSON.stringify(book),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        let message = '';
        if (method === "POST") {
          message = 'book inserted';
        } else {
          message = 'book updated';
        }
        this.setState({toMain: true, message });
      })
      .catch(error => this.handleError(error));
    event.preventDefault();
  }
 
  render() {
    if (this.state.toMain) {
      const message = this.state.message;
      return <Redirect
               to={{
                 pathname: "/",
                 state: { message }
               }}
        />;
    }
    
    const book = this.state.book;

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
          <Button color="primary">Submit</Button>{' '}
          <Link to='/'>
            <Button color="secondary">Back</Button>{' '}
          </Link>
        </Form>
        {this.state.message && 
         <Alert
           className="message"
           color="danger">
           Error<span> </span>
           {this.state.message}
         </Alert>
        }
      </div>
    );
  }
}


export default BookDetails;
