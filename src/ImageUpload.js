import React, { useState } from 'react';
import {input, Button } from "@material-ui/core";
import './imageUpload.css';


function Imageupload() {

     const [caption,setCaption] =useState('');
     const [progress, setProgress] =useState(0);
     const [image, setImage]=useState(null);

     const handleChange =(e) =>{

        if(e.target.files[0]){
        setImage(e.target.files[0]);

        }
     };

     const handleUpload =() =>{

     }
    return (
        <div className="imageupload">

        
            
            <input type="text" placeholder='Enter A caption' onChange={event =>setCaption(event.target.value)} />
            <input type ="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>

            upload
            </Button>
            
        </div>
    )
}

export default Imageupload;
