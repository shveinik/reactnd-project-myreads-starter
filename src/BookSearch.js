import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
// import BookList from './BookList.js'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'


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


clearQuery = () => {
    // this.setState({query: ''})
    this.setState({books: []})
}

updateQuery = (query) => {
  this.setState({ query : query })
  this.searchBook(this.state.query)  
  
}

render(){
    let books = this.state.books
    const {upd} = this.props
    let booksToShow
    let {my} = this.props


  

if (this.state.books.length>0)

{
    booksToShow = books

}else{

    booksToShow = []

}

    return(
  
        <div>
        <input 
        type="search" 
        placeholder="Search by title or author"
        value={this.state.query}
        onChange={(event) => this.updateQuery(event.target.value)}
                             />
        <div className="bookshelf-books">

        <button onClick={()=>{this.clearQuery()}}>Clear</button>

            <ol className="books-grid">
              {booksToShow.map((book)=>(
                                my.map((m)=>m.id===book.id && (book.shelf=m.shelf)),
                                book.shelf===undefined && (book.shelf = 'none'),
                                book.imageLinks? 
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(event) => upd(book, event.target.value)} >
                        <option value="nonee" disabled>Move to...</option>
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
              :
              <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundColor: 'white' }}></div>
                  <div className="book-shelf-changer">
                    <select onChange={(event) => upd(book, event.target.value)}
                            defaultValue={(book.shelf)}>
                      <option value="disabled" disabled>Move to...</option>
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