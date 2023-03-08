//import React, { useState, useEffect } from 'react';
//import { getDocs, collection } from 'firebase/firestore';
//import { db } from '../home/firebase';
//import FileItem from './FileItem';
//
//const FileList = ({ removeFile }) => {
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
//  return (
//    <>
//      <ul className="file-list">
//        {fileList &&
//          fileList.map((f) => (
//            <FileItem key={f.name} file={f} deleteFile={removeFile} />
//          ))}
//      </ul>
//    </>
//  );
//};
//
//export default FileList;
