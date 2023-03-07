//import {useState} from 'react';
//import './Uploadfile.css';
//import * as Icon from 'react-bootstrap-icons';
//import axios from 'axios'
//import { doc, setDoc } from 'firebase/firestore';
//
//const Uploadfile = (files, setFiles, removeFile) => {
//const uploadHandler =(event) => {
//const file = event.target.files[0];
//file.isUploading = true;
//setFiles([...files, file]);
//
//
//    //upload file
//    const formDate = new FormData();
//    formData.append(
//    "newFile",
//    file,
//    file.name
//    )
//
//  axios
//    .post('http://localhost:8080/upload', formData)
//    .then((res) => {
//      file.isUploading = true;
//      setFiles([...files, file]);
//
//      // Save file to Firebase database
//      const fileDocRef = doc(db, 'FileCollection', file.name);
//      setDoc(fileDocRef, {
//        name: file.name,
//        type: file.type,
//        url: res.data.downloadURL,
//      });
//    })
//    .catch((error) => {
//      console.error(error);
//      removeFile(file.name);
//    });
//};
//    return (
//    <div className = "file-card">
//        <div className = "file-inputs">
//            <input type= "files" onChange={uploadHandler} />
//            <button>Add file
//            </button>
//    </div>
//        <p cassName= "main"> Supported Files </p>
//        <p className="info"> PDF, JPG, PNG </p>
//
//
//    </div>
//
//    )
//
//}
//
//export default Uploadfile;


import { useState } from "react";
import "./Uploadfile.css";
import * as Icon from "react-bootstrap-icons";
import { BiPlus } from "react-bootstrap-icons";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../home/firebase";

const Uploadfile = ({ setFiles }) => {
  const [uploading, setUploading] = useState(false);

  const uploadHandler = (event) => {
    const file = event.target.files[0];
    setUploading(true);

    // upload file
    const formData = new FormData();
    formData.append("newFile", file, file.name);

    axios
      .post("http://localhost:8080/upload", formData)
      .then(async (res) => {
        // Save file to Firebase database
        const fileDocRef = doc(db, "FileCollection", file.name);
        await setDoc(fileDocRef, {
          name: file.name,
          type: file.type,
          url: res.data.downloadURL,
        });
        setFiles((prevFiles) => [
          ...prevFiles,
          { name: file.name, type: file.type, url: res.data.downloadURL },
        ]);
        setUploading(false);
      })
      .catch((error) => {
        console.error(error);
        setUploading(false);
      });
  };

  return (
    <div className="file-card">
      <div className="file-inputs">
        <input type="file" onChange={uploadHandler} disabled={uploading} />
        <button disabled={uploading}>
          {uploading ? "Uploading..." : "Add file"}
        </button>
      </div>
      <p className="main"> Supported Files </p>
      <p className="info"> PDF, JPG, PNG </p>
    </div>
  );
};

export default Uploadfile;
