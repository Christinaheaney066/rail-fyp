import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../home/firebase";


async function getRoutes() {
  const querySnapshot = await getDocs(collection(db, "routesCollection"));
  const routes = [];
  querySnapshot.forEach((doc) => {
    routes.push(doc.data());
  });
  return routes;
}

function SavedRoutesWidget() {
  const [routes, setRoutes] = useState([]);

  async function fetchRoutes() {
    const routes = await getRoutes();
    setRoutes(routes);
  }

  return (
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
  );
}

function App() {
  const [showSavedRoutes, setShowSavedRoutes] = useState(false);

  function handleSavedRoutesClick() {
    setShowSavedRoutes(true);
  }

  return (
    <div>
      <button onClick={handleSavedRoutesClick}>Your Saved Routes</button>
      {showSavedRoutes && <SavedRoutesWidget />}
    </div>
  );
}
export default App;