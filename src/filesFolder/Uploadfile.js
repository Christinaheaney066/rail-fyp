import { useState } from "react";
import "./Uploadfile.css";
import React from 'react';
import { db } from "../home/firebase";
import { getDocs, collection, getFirestore, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import 'firebase/storage'

function UploadFile() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('no selected file');

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };
const saveFile = async () => {
    const storage = getStorage();
    const userUid = getAuth().currentUser.uid;
    const storageRef = ref(storage, userUid + file.name);

    uploadBytes(storageRef, file).then((snapshot) => {
        console.log("!")
    })
}




  return (
    <main>
      <form>
        <label htmlFor="file-upload" className="file-upload-label">
        </label>
        <input
          type="file"
          id="file-upload"
          className="file-upload-input"
          onChange={handleFileUpload}
        />
      </form>

      <section className="uploaded-row">
        <span>
          {fileName}
          {file && (
            <button
              onClick={() => {
                setFile(null);
                setFileName('no selected file');
              }}
            >
              Delete
            </button>
          )}
        </span>
      </section>
    <div className="save-file-btn">
            <button onClick={saveFile}>Save Your File</button>
          </div>

    </main>
  );
}

export default UploadFile;

