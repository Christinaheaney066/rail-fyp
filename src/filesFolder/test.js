//import { useState, useEffect } from 'react';
//import { getDocs, collection } from 'firebase/firestore';
//import { db } from '../home/firebase'; // assuming that you have already set up Firebase
//import Uploadfile from './Uploadfile';
//
//
//
//function App() {
//  const [showSavedRoutes, setShowSavedRoutes] = useState(false);
//  const [files, setFiles] = useState([])
//
//  const removeFile = (filename) => {
//  setFiles(files.filter(file => file.name !== filename))
//  }
//
//
//  function handleSavedRoutesClick() {
//    setShowSavedRoutes(!showSavedRoutes);
//  }
//
//  return (
//  <>
//<div className= "savedRoutesButn">
//      <button onClick={handleSavedRoutesClick}>
//        {showSavedRoutes ? 'Hide Saved Routes' : 'Show Saved Routes'}
//      </button>{showSavedRoutes && <RoutesList />}</div>
//
//
//            <div classname= "uploadfile">
//            <p className= "title"> Upload File </p>
//            <Uploadfile files = {files} setFiles= {setFiles} removeFiles={removeFile} />
//            <FileList files = {files} removeFile={removeFile} />
//            </div>
//</>
//    );
//}
//
//
//
//function RoutesList() {
//  const [routes, setRoutes] = useState([]);
//
//  useEffect(() => {
//    async function fetchRoutes() {
//      const querySnapshot = await getDocs(collection(db, "routesCollection"));
//      const routes = querySnapshot.docs.map(doc => doc.data());
//      setRoutes(routes);
//    }
//    fetchRoutes();
//  }, []);
//
//  return (
//    <div>
//      {routes.map((route, index) => (
//        <div key={index}>
//          <p>Origin: {route.origin}</p>
//          <p>Destination: {route.destination}</p>
//          <p>Waypoints: {JSON.stringify(route.waypoints)}</p>
//          <p>Distance: {route.distance}</p>
//          <p>Duration: {route.duration}</p>
//        </div>
//      ))}
//    </div>
//  );
//}
//
//const { getStorage, ref, uploadBytes, deleteObject } = require("firebase/storage");
//const storage = getStorage();
//
//app.post("/upload", async (req, res) => {
//  const file = req.files.newFile;
//  const storageRef = ref(storage, file.name);
//  try {
//    await uploadBytes(storageRef, file);
//    console.log("File uploaded");
//    return res.status(200).json({ result: true, msg: "file uploaded" });
//  } catch (error) {
//    console.error(error);
//    return res.status(500).json({ result: false, msg: error.message });
//  }
//});
//
//app.delete("/upload", async (req, res) => {
//  const filename = req.query.name;
//  const storageRef = ref(storage, filename);
//  try {
//    await deleteObject(storageRef);
//    console.log("File deleted");
//    return res.status(200).json({ result: true, msg: "file deleted" });
//  } catch (error) {
//    console.error(error);
//    return res.status(500).json({ result: false, msg: error.message });
//  }
//});
//
//
//export default App;
//

//
//import React, { useState, useEffect } from 'react';
//import { getDocs, collection } from 'firebase/firestore';
//import {db} from "../home/firebase";
//import FileItem from './FileItem';
//
//
//const FileList = ({ files, removeFile }) => {
//  const [fileList, setFileList] = useState([]);
//
//  useEffect(() => {
//    const fetchFiles = async () => {
//      const querySnapshot = await getDocs(collection(db, 'FileCollection'));
//      const fileList = querySnapshot.docs.map((doc) => doc.data());
//      setFileList(fileList);
//    };
//
//    fetchFiles();
//  }, []);
//
//







//            <div classname= "uploadfile">
//            <p className= "title"> Upload File </p>
//            <Uploadfile files = {files} setFiles= {setFiles} removeFiles={removeFile} />
//            <FileList files = {files} removeFile={removeFile} />
//            </div>





//
//    return(
//    <>
//        <ul className = "file-list">
//        {
//            files &&
//            files.map(f => <fileItem
//                key={f.name}
//                file = {f}
//                deleteFile={deleteFileHandler}
//
//            >)
//        }
//        </ul>
//</>
//    )
//
//}
//export default FileList