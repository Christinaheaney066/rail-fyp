import { useState, useEffect, useRef } from 'react';
import { db } from '../home/firebase';
import Uploadfile from './Uploadfile';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { query, collection, getDocs, where } from 'firebase/firestore';
import './FilesFolder.css'
import './Uploadfile.css'

function DisplayTickets({ links }) {
  return (
    <div>
      <ol className="notebook-list">
        {links.map((file, index) => (
          <li key={index}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}


function App() {
  const [showSavedRoutes, setShowSavedRoutes] = useState(false);
  const [urls, setUrls] = useState([]);
  const divRef = useRef(null);

  //let urls = [];

   function handleSavedRoutesClick() {
      setShowSavedRoutes(!showSavedRoutes);
   }

async function onDisplayClick() {
  const storage = getStorage();
  const userUid = getAuth().currentUser.uid;
  const listRef = ref(storage, "");

  try {
    const res = await listAll(listRef);

    const files = [];

    for (const itemRef of res.items) {
      if (itemRef._location.path_.startsWith(userUid)) {
        const url = await getDownloadURL(itemRef);
        const name = itemRef.name;
        files.push({ name, url });
      }
    }

    setUrls(files);
  } catch (error) {
    console.log(error);
  }
}

  useEffect(() => {
    console.log(urls)
  }, [urls])

  return (
  <>
  <div className= "upload-file-container">
  <Uploadfile />
  </div>

<div className="savedRoutesButn">
  <button className="custom-button" onClick={handleSavedRoutesClick}>
    {showSavedRoutes ? "Hide Saved Routes" : "Show Saved Routes"}
  </button>
  {showSavedRoutes && <RoutesList />}
</div>

<div className="show-saved-file-btn">
  <button className="custom-button" onClick={onDisplayClick}>
    Show Saved Files
  </button>
  {urls.length !== 0 && <DisplayTickets links={urls} />}
</div>

</>

  );
}

function RoutesList() {
  const [routes, setRoutes] = useState([]);
  const auth = getAuth();
  const userId = auth.currentUser && auth.currentUser.uid;

  useEffect(() => {
    async function fetchRoutes() {
      if (userId) {
        const querySnapshot = await getDocs(
          query(collection(db, 'routesCollection'), where('userId', '==', userId))
        );
        const routes = querySnapshot.docs.map(doc => doc.data());
        setRoutes(routes);
      }
    }
    fetchRoutes();
  }, [userId]);

  return (
    <>
      <div>
        {routes.map((route, index) => (
          <div key={index}>
            <p>Origin: {route.origin}</p>
            <p>Destination: {route.destination}</p>
            <p>Waypoints: {JSON.stringify(route.waypoints)}</p>
            <p>Distance: {route.distance}</p>
            <p>Duration: {route.duration}</p>
          </div>
        ))}
      </div>
    </>
  );
}


export default App;

