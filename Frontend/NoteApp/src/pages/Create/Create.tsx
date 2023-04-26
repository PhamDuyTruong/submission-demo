/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import "./Create.css";
import axios from "axios";
import Swal from 'sweetalert2'

const Create = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState<any>(null);
    const [wrongVideo, setWrongVideo] = useState(false)
    const [wrongFile, setWrongFile] = useState(false);
    const [video, setVideo] = useState<any>(null)

    const uploadVideo =  (e: any) => {
      e.preventDefault()
      const selectedFile = e.target.files[0];
      setVideo(selectedFile);
      const fileTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/mkv'];
      if(fileTypes.includes(selectedFile.type)){
        setWrongVideo(false);
      }else{
        setWrongVideo(true)
      }
    }

    const uploadFile =  (e: any) => {
      e.preventDefault()
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      console.log(selectedFile)
      const fileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      if(fileTypes.includes(selectedFile.type)){
        setWrongFile(false);
      }else{
        setWrongFile(true)
      }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault()
    const newNote = {
      title: title,
      description: desc,
      image: "",
      video: ""
    };

 

    
    if(file){
        const dataImg = new FormData();
        dataImg.append("name", file.name);
        dataImg.append("file", file);

      try {
       const {data} = await axios.post("http://localhost:8000/api/upload-images", dataImg)
        newNote.image = data.filename 
      } catch (error) {
        console.log(error)
      }
    }

    if(video){
      const dataVid = new FormData();
      dataVid.append("name", video.name)
      dataVid.append("file", video)
      try {
        const {data} = await axios.post("http://localhost:8000/api/upload-videos", dataVid)
        newNote.video = data.filename
      } catch (error) {
        console.log(error)
      }
    }

    if(wrongFile){
       newNote.image = ""
    }
    if(wrongVideo){
      newNote.video = ""
    }

    try {
      const {data} = await axios.post("http://localhost:8000/api/note",newNote);
      Swal.fire(
        "Created a note successfully !!!",
        "Wish you have a good experience at website",
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/home";
        }
      });
    } catch (error) {
      console.log(error)
    }
        }

  return (
    <div className="write">
    {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="Image" />
      )}
      {wrongFile && (
              <p style={{fontSize: "1rem", textAlign: "center", marginTop: "10px", fontWeight: "600", color: "#FF6969"}}>
                Please select an image (png or jpg or jpeg)
              </p>
        )}
    <form className="writeForm" onSubmit={handleSubmit}>
      <div className="writeFormGroup">
        <label htmlFor="fileInput">
          <i className="writeIcon fas fa-plus"></i>
        </label>
        <input id="fileInput" type="file" style={{ display: "none" }}  onChange={(e) => uploadFile(e)}/>
        <input
          className="writeInput"
          placeholder="Title"
          type="text"
          autoFocus={true}
          onChange={e=>setTitle(e.target.value)}
        />
      </div>
      <div className="writeFormGroup">
        <textarea
          className="writeInput writeText"
          placeholder="Tell your description..."
          autoFocus={true}
          onChange={e=>setDesc(e.target.value)}
        />
      </div>
   
      <div style={{marginLeft: "150px"}}>
        <p style={{fontSize: "20px", fontWeight: "600"}}>Select Video to upload</p>
          <p className='titleContent'>
             MP4 or WebM or ogg <br />
            720x1280 resolution or higher <br />
              Up to 10 minutes <br />
              Less than 2 GB
        </p>
        <input type='file' name='upload video' onChange={(e) => uploadVideo(e)}/>
        {video && (
          <video style={{width: "70vw", height: "462px", margin: "20px 0", borderRadius: "0.75rem", backgroundColor: "rgba(0,0,0,1)", display: "flex", alignItems: "center"}}
            controls
            loop
            src={URL.createObjectURL(video)}
          />
        )}
        {wrongVideo && (
              <p style={{fontSize: "1rem", textAlign: "center", marginTop: "10px", fontWeight: "600", color: "#FF6969"}}>
                Please select a video file (mp4 or webm or ogg)
              </p>
        )}
      </div>
      <button className="writeSubmit" type="submit">
        Publish
      </button>
    </form>
  </div>
  )}

export default Create