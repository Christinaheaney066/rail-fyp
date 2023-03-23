import { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./NearYou.css";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { db, auth } from "../home/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  query,
  collection,
  setDoc,
  getDocs,
  addDoc,
  where,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "45vh",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = { lat: 48.864716, lng: 2.349014 };

function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBXvVKFmNw0Og1MsaYaPnABB7oW_MjW56Q",
    libraries,
  });

  const [selected, setSelected] = useState(null);
  const [showNearbyPlaces, setShowNearbyPlaces] = useState(false);
  const [places, setPlaces] = useState([]);
  const mapRef = useRef();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

const handleSelect = async (address) => {
  setValue(address, false);
  clearSuggestions();

  try {
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({
      geometry: {
        location: {
          lat,
          lng,
        },
      },
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

  const handleSearch = () => {
    if (!selected) {
      alert("Please select a location first.");
      return;
    }

  const service = new window.google.maps.places.PlacesService(mapRef.current);

  const request = {
    location: selected.geometry.location,
    radius: "3000", // Change this to 3000 for a 3km radius
    type: [
     "restaurant",
     "bar",
     "night_club",
     "supermarket",
     "tourist_attraction",
     "hospital",
     "cafe",
     "atm",
     "museum"
    ],
  };

  service.nearbySearch(request, (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      setPlaces(results);
      setShowNearbyPlaces(true);
    } else {
      alert("Failed to fetch nearby places. Please try again.");
    }
  });
};

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <>

      <div className="places-container">
        <PlacesAutocomplete
          ready={ready}
          value={value}
          suggestions={data}
          setValue={setValue}
          clearSuggestions={clearSuggestions}
          handleSelect={handleSelect}
          handleSearch={() => handleSearch(selected, setPlaces, setShowNearbyPlaces)}

        />
      </div>
      <div className= "Google-map-location">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={mapContainerStyle}
        options={options}
        onLoad={(map) => (mapRef.current = map)}
      >
        {selected && (
          <Marker
            position={{
              lat: selected.geometry.location.lat,
              lng: selected.geometry.location.lng,
            }}
          />
        )}

        {showNearbyPlaces &&
          places.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }}
              onClick={() => {
                setSelected(place);
              }}
            />
          ))}
        {selected && (
          <InfoWindow
            position={{
              lat: selected.geometry.location.lat,
              lng: selected.geometry.location.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{selected.name}</h2>
              <p>{selected.vicinity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      </div>

      <TodoList />
    </>
  );
}

function PlacesAutocomplete({
  ready,
  value,
  suggestions,
  setValue,
  clearSuggestions,
  handleSelect,
  handleSearch,
}) {
  return (
  <Combobox onSelect={handleSelect}>
    <ComboboxInput
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      disabled={!ready}
      className="search-input"
      placeholder="Search an address"
    />
    <button className="search-button" onClick={handleSearch}>Search</button>
    <ComboboxPopover>
      <ComboboxList>
        {suggestions.map(({ id, description }) => (
          <ComboboxOption key={id} value={description} />
        ))}
      </ComboboxList>
    </ComboboxPopover>
  </Combobox>
);
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [showTodos, setShowTodos] = useState(false);
  const [user] = useAuthState(getAuth());

  useEffect(() => {
    const loadTodos = async () => {
      if (user) {
        const docRef = doc(getFirestore(), "placesMemos", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTodos(docSnap.data().todos);
        }
      }
    };
    loadTodos();
  }, [user]);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const handleSaveTodos = async () => {
    try {
      await setDoc(doc(getFirestore(), "placesMemos", user.uid), { todos });
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving your todos");
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
    console.log(todos);
  };

  return (
    <div className="Todo_container">
      <input type="text" value={newTodo} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add To do</button>
      <button onClick={handleSaveTodos}>Save To dos</button>
      <button onClick={() => setShowTodos(!showTodos)}>
        {showTodos ? "Hide To do" : "Show To do"}
      </button>
      {showTodos && (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Map;