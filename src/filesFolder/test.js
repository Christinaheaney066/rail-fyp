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


import React, { useState } from 'react';
import {GoogleMap,useLoadScript,Marker,InfoWindow,} from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode,getLatLng,} from 'use-places-autocomplete';
import {Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption,} from '@reach/combobox';
import '@reach/combobox/styles.css';
import './NearYou.css';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = { lat: 48.864716, lng: 2.349014 };
const API_KEY = 'YOUR_API_KEY';

function PlacesAutocomplete({ setSelected }) {
  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSelected(null);
        }}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

function Map() {
  const [selected, setSelected] = useState(null);
  const [showNearbyPlaces, setShowNearbyPlaces] = useState(false);
  const [places, setPlaces] = useState([]);

  const handleSearch = async () => {
    if (!selected) return;
    const { lat, lng } = selected;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&type=restaurant|bar|museum&key=${API_KEY}`
    );
    const data = await response.json();
    setPlaces(data.results);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
    onLoad: () => setIsMapLoaded(true)
  });
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
        <button onClick={() => setShowNearbyPlaces(!showNearbyPlaces)}>
          Search
        </button>
      </div>
      {isLoaded ? (
        <GoogleMap
          zoom={10}
          center
={<LatLngLiteral>center</LatLngLiteral>}
options={options}
mapContainerStyle={mapContainerStyle}
>
{selected && (
<Marker
position={{ lat: selected.lat, lng: selected.lng }}
onClick={() => setSelected(selected)}
/>
)}
{showNearbyPlaces && places.map((place) => (
<Marker
key={place.id}
position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
onClick={() => setSelected(place)}
/>
))}
{selected && (
<InfoWindow
position={{ lat: selected.lat, lng: selected.lng }}
onCloseClick={() => setSelected(null)}
>
<div>
<h2>{selected.name}</h2>
<p>{selected.formatted_address}</p>
</div>
</InfoWindow>
)}
</GoogleMap>
) : (
<div>Loading...</div>
)}
</>
);
}

export default function NearYou() {
return <Map />;
}



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