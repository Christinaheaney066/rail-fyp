import React, { useState } from 'react';
import {GoogleMap,useLoadScript,Marker,InfoWindow,} from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode,getLatLng,} from 'use-places-autocomplete';
import {Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption,} from '@reach/combobox';
import '@reach/combobox/styles.css';
import './NearYou.css';


//         googleMapsApiKey: "AIzaSyBXvVKFmNw0Og1MsaYaPnABB7oW_MjW56Q",


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
const API_KEY = 'AIzaSyBXvVKFmNw0Og1MsaYaPnABB7oW_MjW56Q';



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

const {ready,value,suggestions: { status, data },setValue, clearSuggestions,} = usePlacesAutocomplete();

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

 const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

       return (
       <>
            <div className="places-container">
              <PlacesAutocomplete setSelected={setSelected} />
              <button onClick={() => setShowNearbyPlaces(!showNearbyPlaces)}>
                Search
              </button>
            </div>

 <GoogleMap
         zoom={10}
         center={center}
         mapContainerClassName="map-container"
       >
         {selected && <Marker position={selected} />}
         {showNearbyPlaces && (
           <>
             {places.map((place) => (
               <Marker
                 key={place.place_id}
                 position={{
                   lat: place.geometry.location.lat,
                   lng: place.geometry.location.lng,
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
           </>
         )}
       </GoogleMap>
     </>
   );
 }

      const PlacesAutocomplete = ({ setSelected }) => {
        const {
          ready,
          value,
          setValue,
          suggestions: { status, data },
          clearSuggestions,
        } = usePlacesAutocomplete();

        const handleSelect = async (address) => {
          setValue(address, false);
          clearSuggestions();

          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          setSelected({ lat, lng });
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
              };

    function Home() {
      return <Map />;
    }

export default Home;
