//THIS CLASS IS NOT USED AS IS FAULTY


import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, useLoadScript, Marker, DirectionsService,DirectionsRenderer,  Autocomplete,} from '@react-google-maps/api';
import { useMemo, useState, useRef, } from 'react';
import axios from 'axios';
import {Box,Button,ButtonGroup,Flex,HStack,IconButton,Input,SkeletonText,Text,} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'


            const center = { lat: 48.864716, lng: 2.349014 };
            const API_BASE_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
            const API_RADIUS_METERS = 1000;
            const API_TYPE = 'train_station';
            const API_KEY = 'AIzaSyBXvVKFmNw0Og1MsaYaPnABB7oW_MjW56Q';

    function NearNavigation(){
        const navigate = useNavigate();
            return(<>
                    <div><button onClick={() => { navigate('../Dashboard'); }} >
                   {" "}
                   Home Page </button>
               </div>
                 </>);
                    }

    export default function Home() {
      // Define state variables for the map and markers
     const [markers, setMarkers] = useState([]);
       const [selected, setSelected] = useState(null);
       const { isLoaded } = useLoadScript({
         googleMapsApiKey: "AIzaSyBXvVKFmNw0Og1MsaYaPnABB7oW_MjW56Q", });
             if (!isLoaded) return <div>Loading...</div>;
                return (
                <>
                <NearNavigation />
                <App/>
                </>
                );
                }


    /* function Map() {
       const[center, setCenter] = useState ({ lat: 48.864716, lng: 2.349014 });
       return (
         <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
           <Marker position={center} />
         </GoogleMap>
       );
        }
        */


        function App() {
          const [origin, setOrigin] = useState('');
          const [destination, setDestination] = useState('');
          const [directions, setDirections] = useState(null);

                    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
                    const [directionsResponse, setDirectionsResponse] = useState(null)
                    const [distance, setDistance] = useState('')
                    const [duration, setDuration] = useState('')



            const originRef = useRef()
            const destiantionRef = useRef()

          async function handleCalculateRoute() {
            if (origin && destination) {
              const originStations = await getNearbyStations(origin);
              const destinationStations = await getNearbyStations(destination);

              if (originStations.length && destinationStations.length) {
                const directionsServiceOptions = {
                  origin: originStations[0].geometry.location,
                  destination: destinationStations[0].geometry.location,
                  travelMode: 'TRANSIT',
                  transitOptions: {
                    modes: ['TRAIN'],
                    routingPreference: 'FEWER_TRANSFERS'
                  }
                };
                setDirections(directionsServiceOptions);
                centerMapOnLocations(originStations[0].geometry.location, destinationStations[0].geometry.location);
              }
            }
          }

          async function getNearbyStations(location) {
            const response = await axios.get(API_BASE_URL, {
              params: {
                input: location,
                inputtype: 'textquery',
                locationbias: `circle:${API_RADIUS_METERS}@${location}`,
                fields: 'geometry',
                type: API_TYPE,
                key: API_KEY
              }
            });
            return response.data.candidates;
          }

          function handleOriginChange(event) {
            setOrigin(event.target.value);
          }

          function handleDestinationChange(event) {
            setDestination(event.target.value);
          }

          function centerMapOnLocations(origin, destination) {
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(origin);
            bounds.extend(destination);
            center.lat = (origin.lat() + destination.lat()) / 2;
            center.lng = (origin.lng() + destination.lng()) / 2;
          }

          return (
            <div style={{ height: '100vh', width: '100vw' }}>
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ height: '50%', width: '50%' }}
              >
                {directions && (
                  <DirectionsService
                    options={{
                      origin: directions.origin,
                      destination: directions.destination,
                      travelMode: 'DRIVING',
                    }}
                    callback={(result) => {
                      if (result !== null) {
                        setDirections(result);
                      }
                    }}
                  />
                )}
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
              <div style={{ position: 'absolute', bottom: '10px', left: '10px' , backgroundColor: 'white', padding: '10px', borderRadius: '5px'  }}>
                <div>
                  <label htmlFor="origin-input">Origin:</label>
                  <input
                    id="origin-input"
                    type="text"
                    value={origin}
                    onChange={handleOriginChange}
                  />
                </div>
                <div>
                  <label htmlFor="destination-input">Destination:</label>
                  <input
                    id="destination-input"
                    type="text"
                    value={destination}
                    onChange={handleDestinationChange}
                  />
                </div>
                <button onClick={handleCalculateRoute}>Calculate Route</button>
              </div>
            </div>
          );
        }





