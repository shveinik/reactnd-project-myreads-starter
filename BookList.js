import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types'


class BookList extends React.Component{
  
  static propTypes = {
    upd: PropTypes.func.isRequired
    }

    state = {
      book:{},
      newShelf:''
      
    }

    // bookUpdateFunction = (b,s) => BooksAPI.update(this.state.book, this.state.newShelf).then(()=>{})



    // updateShelf = (shelf, book) => {
    //   this.setState({ newShelf: shelf , book: book })
    //   // this.bookUpdateFunction()
    //   // this.updateShelfFunc(this.state.book, this.state.newShelf)
    //   upd("loool")
      
    // }


    render(){
        // console.log("state shelf" + this.state.book.shelf)
        let  newShelf  = this.state
        let { books } = this.props
        const { upd, logFunction } = this.props

        let shelf = this.props
        let booksToShow = books.filter((b)=>b.shelf.toLowerCase() === this.props.shelf.toLowerCase().replace(/\s+/g,''))
        

        return(
            
            <div className="bookshelf-books">
            <ol className="books-grid">
              {booksToShow.map((book)=>(
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      {/* <select onChange={(event) => this.updateShelf(event.target.value, book)} */}
                      <select onChange={(event) => upd(book, event.target.value)}

                              // value={book.shelf}                  
                              defaultValue={book.shelf}
                              >
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