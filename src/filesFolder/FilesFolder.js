import { useState, useEffect, useRef } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../home/firebase';
import Uploadfile from './Uploadfile';
//import FileList from './FileList';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

function DisplayTickets({links}) {
    return (
        <div>
            {links.map(link => (
                <a href={link}>{link}</a>
            ))}
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

        const urls = [];

        for (const itemRef of res.items) {
          if (itemRef._location.path_.startsWith(userUid)) {
            const url = await getDownloadURL(itemRef);
            urls.push(url);
          }
        }

        setUrls(urls);
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

    <div className= "savedRoutesButn">
      <button onClick={handleSavedRoutesClick}>
       {showSavedRoutes ? 'Hide Saved Routes' : 'Show Saved Routes'}
      </button>{showSavedRoutes && <RoutesList />}</div>

<button onClick={onDisplayClick}>TEST
</button>

{urls.length !== 0 &&
    <DisplayTickets links={urls} />
}



</>

  );
}



function RoutesList() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    async function fetchRoutes() {
      const querySnapshot = await getDocs(collection(db, "routesCollection"));
      const routes = querySnapshot.docs.map(doc => doc.data());
      setRoutes(routes);
    }
    fetchRoutes();
  }, []);

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

