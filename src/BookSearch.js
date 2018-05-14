import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList.js'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


class BookSearch extends React.Component {

constructor(props){
    super(props);
    this.state = {
        books:[],
        query:''
        
    }
}

searchBook = (query) => {
    if(query.length>0){
        BooksAPI.search(query).then(res=>{
        if(!res.error){
            this.setState({
                books:res  
            })

         }
    })
}

}

updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.searchBook(this.state.query)
    

}
  clearQuery = () => {
    this.setState({ query: '' })
   
}

render(){
    let books = this.state.books
    const {upd} = this.props

    return(
  
        <div>
        <input 
        type="search" 
        placeholder="Search by title or author"
        value={this.state.query}
        onChange={(event) => this.updateQuery(event.target.value)}
                             />
        <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book)=>(
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={(event) => upd(book, event.target.value)}
                              defaultValue={book.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
              ))}
            </ol>
          </div>
        </div>
    )
}
}

export default BookSearch;