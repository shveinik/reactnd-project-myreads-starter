import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList.js'
import PropTypes from 'prop-types'
import BookSearch from './BookSearch.js'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'



class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books:[],
      query:'',
      showSearchPage: false
    };
       this.updateBookFunction = this.updateBookFunction.bind(this)
  }
 

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
     
  }

updateBookFunction(book, shelf){
  BooksAPI.update(book, shelf).then((res)=>{
        book.shelf = shelf
        this.setState(state => ( { books : this.state.books.filter(boo=>boo.id!==book.id).concat([book]) } ))

  })
  
 }


  render() { 
    return (
      <div className="app">
      <Route exact path='/search' render={() => (
        <div className="search-books">
          <div className="search-books-bar">
              <Link to='/'className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                    <BookSearch upd={this.updateBookFunction}/>
                  </div>
                </div>
              <div className="search-books-results">
            <ol className="books-grid"></ol>
        </div>
      </div>
      )}/>
     
     <Route exact path='/' render={() => (
      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                 <BookList books={this.state.books} shelf={"Currently Reading"} upd={this.updateBookFunction} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                <BookList books={this.state.books} shelf={"Want to Read"} upd={this.updateBookFunction}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                <BookList books={this.state.books} shelf={"Read"} upd={this.updateBookFunction}/>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
          
      </div>
    )
  }

}

export default BooksApp
