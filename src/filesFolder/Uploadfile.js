//import { useState } from "react";
//import "./Uploadfile.css";
//import * as Icon from "react-bootstrap-icons";
//import axios from "axios";
//import { doc, setDoc } from "firebase/firestore";
//import { db } from "../home/firebase";
////
//const Uploadfile = ({ files, setFiles, removeFile }) => {
//    const uploadHandler = (event) => {
//        const file = event.target.files[0];
//        if(!file) return;
//        file.isUploading = true;
//        setFiles([...files, file])
//
//        // upload file
//        const formData = new FormData();
//        formData.append(
//            "newFile",
//            file,
//            file.name
//        )}
//
////    axios
////      .post("http://localhost:8080/upload", formData)
////      .then(async (res) => {
////        // Save file to Firebase database
////        const fileDocRef = doc(db, "FileCollection", file.name);
////        await setDoc(fileDocRef, {
////          name: file.name,
////          type: file.type,
////          url: res.data.downloadURL,
////        });
////        setFiles((prevFiles) => [
////          ...prevFiles,
////          { name: file.name, type: file.type, url: res.data.downloadURL },
////        ]);
////        setUploading(false);
////      })
////      .catch((error) => {
////        console.error(error);
////        setUploading(false);
////      });
////  };
////
//  return (
//  <>
//    <div className="file-card">
//      <div className="file-inputs">
//        <input type="file" onChange={uploadHandler} />
//        <button>
//          Uploading
//        </button>
//        AddFile
//        <button>
//        </button>
//      </div>
//      <p className="main"> Supported Files </p>
//      <p className="info"> PDF, JPG, PNG </p>
//    </div>
//    </>
//)
//}
//
//export default Uploadfile

//
//const FileUploader = ({onFileSelect}) => {
//    const fileInput = useRef(null)
//    const handleFileInput = (e) => {
//  // handle validations
//  const file = e.target.files[0];
//  if (file.size > 1024)
//    onFileSelectError({ error: "File size cannot exceed more than 1MB" });
//  else onFileSelectSuccess(file);
//};
//
//const submitForm = () => {
//  const formData = new FormData();
//  formData.append("name", name);
//  formData.append("file", selectedFile);
//
//  axios
//    .post(UPLOAD_URL, formData)
//    .then((res) => {
//      alert("File Upload success");
//    })
//    .catch((err) => alert("File Upload Error"));
//};
//
//      return (
//      <>
//          <div className="file-uploader">
//           <input type="file" onChange={handleFileInput} />
//              <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary" onClick={() => submitForm()}>
//          </div>
//          </>
//      )
//  }