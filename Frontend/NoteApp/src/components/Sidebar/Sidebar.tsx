import React from "react";
import "./Sidebar.css"
import {Link} from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://images.pexels.com/photos/9420617/pexels-photo-9420617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>
          I'm a student from University of Science. I'm learning technology
          infomation.
        </p>
        <button className="createButton" style={{backgroundColor: "#6C9BCF", borderRadius: "10px", padding: "10px", border: "1px solid #000"}}>
            <Link  to="/create" style={{textDecoration: "none", color: "#fff", fontWeight: "600"}}>Create Note</Link>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
