import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BookSearch extends React.Component {

constructor(props){
    super(props);
    this.state = {
        books:[],
        query:''

    }
}

debounce(callback, wait, context = this) {
  let timeout = null 
  let callbackArgs = null
  
  const later = () => callback.apply(context, callbackArgs)
  
  return function() {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}


searchBook = (query) => {
    if(query!==''){
      BooksAPI.search(query).then(res=>{
      if(res !== undefined && !res.error){
          this.setState({
              books:res
          })
       }
       else{
         this.clearQuery()
       }
  })

    }else{
      this.clearQuery()
    }


        

}




clearQuery = () => {
    this.setState({books: []})
}

updateQuery = (query) => {
  this.setState({ query : query }, () => this.searchBook(this.state.query))

}


// updateQuery = this.debounce((query) => {
// this.setState({ query : query }, () => this.searchBook(this.state.query)) , console.log(this.state.query) },1000)








render(){
    let booksToShow = this.state.books
    const {upd} = this.props
    let {my} = this.props


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