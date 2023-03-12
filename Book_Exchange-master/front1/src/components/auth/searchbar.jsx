import axios from 'axios';
import React, { useState } from 'react';

import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
export default function Searchbar() {
  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    'AIzaSyCqi37mzRrzkBrDZDb0BX9_IarX5iMOT88'
  );

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        'https://www.googleapis.com/books/v1/volumes?q=' +
          book +
          '&key=' +
          apiKey +
          '&maxResults=40'
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="card-header main-search">
        <div className="row">
          <div className="col-12 col-md-3 col-xl-3">
            <input
              onChange={handleChange}
              className="AutoFocus form-control"
              placeholder="Type something..."
              type="text"
            />
          </div>
          <div className="">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary search-btn"
            />
          </div>
        </div>
      </div>
      <div className="row container">
        {result.map((book) => (
          <div key={book} className="child col-4">
            <div className="text-center">
              <img
                style={{ height: '150px' }}
                src={
                  book.volumeInfo.imageLinks !== undefined
                    ? book.volumeInfo.imageLinks.thumbnail
                    : 'lite'
                }
                alt={book.title}
              />
              <p className="text">
                {book.volumeInfo.title ? book.volumeInfo.title : 'N/A'}
              </p>
              <br></br>
              <Card style={{ width: '18rem' }}>
                <ListGroup>
                  <ListGroup.Item>
                    {book.volumeInfo.industryIdentifiers
                      ? book.volumeInfo.industryIdentifiers[0].type +
                        ' : ' +
                        book.volumeInfo.industryIdentifiers[0].identifier
                      : ''}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Author:
                    {book.volumeInfo.authors == undefined
                      ? 'NA'
                      : book.volumeInfo.authors.join(', ')}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      onClick={(e) => {
                        alert('Successfully purchased');
                      }}>
                      Buy Now:
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}
