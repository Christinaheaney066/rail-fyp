import React from 'react';
import {useState, useMemo} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, useLoadScript, Marker, Autocomplete, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import {Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption,} from "@reach/combobox";
import usePlacesAutocomplete, {getGeocode,getLatLng,} from "use-places-autocomplete";

//https://www.youtube.com/watch?v=9e-5QHpadi0 look at this


    function NearNavigation(){
        const navigate = useNavigate();
            return(
    <>
        <div>
             <button onClick={() => { navigate('../Dashboard'); }} >
                   {" "}
                   Home Page
                 </button>
               </div>
                     </>
             );
}

     export default function Home() {
       const { isLoaded } = useLoadScript({
         googleMapsApiKey: "AIzaSyBXvVKFmNw0Og1MsaYaPnABB7oW_MjW56Q",
          //load the places Api key
         libraries: ['places'],
       });

       if (!isLoaded) return <div>Loading...</div>;
       return <Map />;
     }

     function Map() {
       const center = useMemo(() => ({ lat: 48.864716, lng: 2.349014 }), []);
       const [selected, setSelected] = useState(null);
       return (
        <>
             <div className="places-container">
               <PlacesAutocomplete setSelected={setSelected} />
             </div>

             <GoogleMap
               zoom={10}
               center={center}
               mapContainerClassName="map-container"
             >
               {selected && <Marker position={selected} />}
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
                  onChange={(e) => setValue(e.target.value)}
                  disabled={!ready}
                  className="combobox-input"
                  placeholder="Search an address"
                />
                <ComboboxPopover>
                  <ComboboxList>
                    {status === "OK" &&
                      data.map(({ place_id, description }) => (
                        <ComboboxOption key={place_id} value={description} />
                      ))}
                  </ComboboxList>
                </ComboboxPopover>
              </Combobox>
            );
          };




         /*   const Map = withScriptjs(withGoogleMap((props) =>
              <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
              >
                {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
              </GoogleMap>
            ));

            function MyMapComponent() {
              return (
                <Map
                  isMarkerShown
                  googleMapURL={"https:maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBXvVKFmNw0Og1MsaYaPnABB7oW_MjW56Q"}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              );
            }}
*/
/*
        class NearYou extends React.Component{
            render(){
                return(
                     <LoadScript
                            googleMapsApiKey="AIzaSyBXvVKFmNw0Og1MsaYaPnABB7oW_MjW56Q"
                          >
                            <GoogleMap
                              mapContainerStyle={containerStyle}
                              center={center}
                              zoom={10}
                            >
                               <></>
                                    </GoogleMap>
                                  </LoadScript>

                    )
                    }
                    }
                    */

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};


