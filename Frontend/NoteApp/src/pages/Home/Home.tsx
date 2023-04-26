import React, {useState, useEffect} from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import axios from 'axios'
import Notes from '../../components/Notes/Notes'


const Home = () => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const fetchPost = async () => {
            const {data} =  await axios.get("http://localhost:8000/api/note/");
            console.log(data.data)
            setNotes(data.data);
         };
         fetchPost();
    }, [])
  return (
    <>
         <Header />
        <div className='home'>
            <Notes notes={notes}/>
            <Sidebar />
        </div>
    </>
  )
}

export default Home