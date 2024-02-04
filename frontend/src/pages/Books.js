import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'


function Books() {

  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/books")
        setBooks(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchAllBooks()
  }, [])

  const handleDelete = async (id) => {
    try{
      await axios.delete("http://localhost:3001/books/"+id)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      <h1>ORENDA BOOK SHOP</h1>
      <div className='books'>
        {books.map(book => (
          <div className='book' key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className='update'><Link to={`/update/${book.id}`}>Güncelle</Link></button>
            <button className='delete' onClick={()=>handleDelete(book.id)}>Sil</button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add New Book</Link>
      </button>
    </div>
  )
}

export default Books