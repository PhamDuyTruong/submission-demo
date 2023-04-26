import React from 'react'
import "./Note.css"
import {Link} from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Note = ({note}: any) => {
    const PF = "http://localhost:8000/static/images/";
  return (
    <div className='note'>
       {note.image && <img className="noteImg" src={PF + note.image} alt="Image" />}
       <Link to={`/note/${note.id}`} className="link" style={{textDecoration: "none"}}>
      <div className="noteInfo">      
        <span className="noteTitle"> 
            {note.title}
        </span>
       
        <hr />
        <span className="noteDate">{new Date(note.created_at).toDateString()}</span>
      </div>
      </Link>
      <p className="noteDesc">
          {note.description.length > 20 ? note.description.slice(0, 15) + '...' : note.description}
      </p>
    </div>
    
  )
}

export default Note