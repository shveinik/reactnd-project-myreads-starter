import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'




class BookList extends React.Component{
  
  static propTypes = {
    
    }
      state = {
      book:{},
    }

  
    render(){
        let { books } = this.props
        const { upd } = this.props
        let shelf = this.props
        let booksToShow = books.filter((b)=>b.shelf.toLowerCase() === this.props.shelf.toLowerCase().replace(/\s+/g,''))

        return(

          <div className="bookshelf-books">
            <ol className="books-grid">
             {booksToShow.map((book)=>(
                                        book.imageLinks? 
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
              :
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193 }}></div>
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
        )
    }
}





export default BookList