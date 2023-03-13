import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../home/firebase'; // assuming that you have already set up Firebase
import Uploadfile from './Uploadfile';
//import FileList from './FileList';


const UploadFile = () => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  //const submitForm = () => {};


  return (
    <div className="UploadFile">
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

    <FileUploader
           onFileSelectSuccess={(file) => setSelectedFile(file)}
           onFileSelectError={({ error }) => alert(error)}
         />

         <button onClick={submitForm}>Submit</button>
       </form>
     </div>
   );
 };
















function App() {
  const [showSavedRoutes, setShowSavedRoutes] = useState(false);


function handleSavedRoutesClick() {
    setShowSavedRoutes(!showSavedRoutes);
  }

  return (
    <div className= "savedRoutesButn">
      <button onClick={handleSavedRoutesClick}>
       {showSavedRoutes ? 'Hide Saved Routes' : 'Show Saved Routes'}
      </button>{showSavedRoutes && <RoutesList />}</div>


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

