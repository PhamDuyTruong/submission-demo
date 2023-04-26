import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import "./DetailNote.css"
const DetailNote = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split("/")[2];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [note, setNote] = useState<any>({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [video, setVideo] = useState("");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const PF = "http://localhost:8000/static/images/";
    const PF1 = "http://localhost:8000/static/videos/";
    useEffect(() => {
        const getPost = async() => {
            const res = await axios.get("http://localhost:8000/api/note/" + path);
            setNote(res.data.data);
            setTitle(res.data.data.title);
            setDesc(res.data.data.description);
            setVideo(res.data.data.video)
          };
          getPost();
    }, [path])
  return (
    <div className="singlePost">
     <button style={{backgroundColor: "#98D8AA", color: "#fff", fontWeight: "700", borderRadius: "10px", padding: "10px", cursor: "pointer"}} onClick={() => navigate(-1)}>Go Back</button>
    <div className="singlePostWrapper">
    {note.image && (
      <img src={PF + note.image} alt="image" className="singlePostImg" />
      )}
     
    <h1 className="singlePostTitle">
      {title}
    </h1>
      <div className="singlePostInfo">
        <span>
          Author:
          <b className="singlePostAuthor">
              <b> {user.data.username || "undefined"}</b>
          </b>
        </span>
        <span>{new Date(note.created_at).toDateString()}</span>
      </div>
    <p className="singlePostDesc">{desc}</p>
      <p style={{fontSize: "25px", fontWeight: "700"}}>Video</p>
      {video ? (<video 
          style={{width: "70vw", height: "462px", margin: "20px 0", borderRadius: "0.75rem", backgroundColor: "rgba(0,0,0,1)", display: "flex", alignItems: "center"}}
          src={PF1 + note.video}
          controls
          loop
      />) : (
        <p style={{color: "#ddd", }}>No Video to watch</p>
      )}
    </div>
  </div>
  )
}

export default DetailNote