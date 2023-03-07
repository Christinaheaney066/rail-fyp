//import React, { useState, useMemo } from 'react';
//import { Navigate, useNavigate } from 'react-router-dom';
//import {
//  GoogleMap,
//  useJsApiLoader,
//  useLoadScript,
//  Marker,
//  Autocomplete,
//  DirectionsRenderer,
//  InfoWindow,} from '@react-google-maps/api';
//import {
//  Combobox,
//  ComboboxInput,
//  ComboboxPopover,
//  ComboboxList,
//  ComboboxOption,} from '@reach/combobox';
//import usePlacesAutocomplete, {
//  getGeocode,
//  getLatLng,} from 'use-places-autocomplete';
//import './NearYou.css';
//
//
//
//const libraries = ['places'];
//const mapContainerStyle = {
//  width: '100vw',
//  height: '100vh',
//};
//const options = {
//  disableDefaultUI: true,
//  zoomControl: true,
//};
//const center = { lat: 48.864716, lng: 2.349014 };
//
//     export default function Home() {
//       const { isLoaded } = useLoadScript({
//         googleMapsApiKey: "AIzaSyBXvVKFmNw0Og1MsaYaPnABB7oW_MjW56Q",
//         libraries: ['places'],
//       });
//
//       if (!isLoaded) return <div>Loading...</div>;
//
//       return (
//           <>
//             <Map />
//           </>
//         );
//     }
//
//     function Map() {
//      // const center = useMemo(() => ({ lat: 48.864716, lng: 2.349014 }), []);
//       const [selected, setSelected] = useState(null);
//
//    const handleSearch = async () => {
//        if (!selected) return;
//
//        const { lat, lng } = selected;
//        const response = await fetch(
//          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&type=restaurant|bar|museum&key=${"AIzaSyBXvVKFmNw0Og1MsaYaPnABB7oW_MjW56Q"}`
//        );
//        const data = await response.json();
//        setPlaces(data.results);
//      };
//
//
//
//
//       return (
//        <>
//      <div className="places-container">
//         <PlacesAutocomplete setSelected={setSelected} />
//         <button onClick={() => setShowNearbyPlaces(!showNearbyPlaces)}>
//           Search
//         </button>
//       </div>
//
//    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
//      {selected && <Marker position={selected} />}
//      {showNearbyPlaces && <NearbyPlaces center={center} />}
//    </GoogleMap>
//           </>
//         );
//        }
//
//        const PlacesAutocomplete = ({ setSelected }) => {
//          const {
//            ready,
//            value,
//            setValue,
//            suggestions: { status, data },
//            clearSuggestions,
//          } = usePlacesAutocomplete();
//
//          const handleSelect = async (address) => {
//            setValue(address, false);
//            clearSuggestions();
//
//            const results = await getGeocode({ address });
//            const { lat, lng } = await getLatLng(results[0]);
//            setSelected({ lat, lng });
//          };
//           return (
//              <Combobox onSelect={handleSelect}>
//                    <ComboboxInput
//                      value={value}
//                      onChange={(e) => {
//                        setValue(e.target.value);
//                        setSelected(null);
//                      }}
//                      disabled={!ready}
//                      className="combobox-input"
//                      placeholder="Search an address"
//                    />
//                    <ComboboxPopover>
//                      <ComboboxList>
//                        {status === "OK" &&
//                          data.map(({ id, description }) => (
//                            <ComboboxOption key={id} value={description} />
//                          ))}
//                      </ComboboxList>
//                    </ComboboxPopover>
//                  </Combobox>
//                );
//              };
//
//
//
