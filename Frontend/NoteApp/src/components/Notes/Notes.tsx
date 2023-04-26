/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import "./Notes.css";
import Note from '../Note/Note';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Notes = ({notes}: any) => {
  return (
    <div className='notes'>
       {notes.map((item: any) => (
          <Note note={item}/>
       ))}
    </div>
  )
}

export default Notes