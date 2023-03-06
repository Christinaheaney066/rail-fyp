// eslint-disable//
import {Box,Button,ButtonGroup,Flex,HStack,IconButton,Input,SkeletonText,Text,} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import {useJsApiLoader,GoogleMap,Marker,Autocomplete,DirectionsRenderer,} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import { query, collection, getDocs,addDoc, where } from "firebase/firestore";
import { useEffect} from "react";
import firebase from 'firebase/app';
import 'firebase/database';
import {db} from "../home/firebase";



const center = { lat: 48.8584, lng: 2.2945 }

    function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBXvVKFmNw0Og1MsaYaPnABB7oW_MjW56Q',
    libraries: ['maps'],
  })

  const API_BASE_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
  const API_TYPE = 'train_station';
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [directionsResponse1, setDirectionsResponse1] = useState(null)
  const [directionsResponse2, setDirectionsResponse2] = useState(null)
  const [directionsResponse3, setDirectionsResponse3] = useState(null)
  const [directionsResponse4, setDirectionsResponse4] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [waypts, setWaypts] = useState([]);
  const [outStr, setOutStr] = useState('');
  const [routes, setRoutes] = useState([]);



  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef(null)
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef(null)
   /** @type React.MutableRefObject<HTMLInputElement> */
  const waypointRef = useRef(null);



  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
        // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()

    let results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: "DRIVING",
      waypoints: waypts.map((waypoint) => ({ location: waypoint, stopover: true })),
      optimizeWaypoints : true,
      //this will tell best order of location to visit in lat and long

    })

    setDirectionsResponse(results)
    console.log(results)
    let outStr = "";
    for (let i = 0; i != results.routes[0].legs.length; i++) {
        const startAddress = results.routes[0].legs[i].start_address;
        const endAddress = results.routes[0].legs[i].end_address;
        console.log(startAddress + " to " + endAddress);
        setOutStr(prevOutStr => prevOutStr + startAddress + " to " + endAddress + "\n");

        //utStr += startAddress + " to " + endAddress + "\n";
        let results1 = await directionsService.route({
              origin: startAddress,
              destination: endAddress,
              // eslint-disable-next-line no-undef
              travelMode: "TRANSIT",
              waypoints: [],
            })

            //Each iteration add results1 to array directionResponses
            // In the render function


        if (i == 0) setDirectionsResponse(results1)
        if (i == 1) setDirectionsResponse1(results1)
        if (i == 2) setDirectionsResponse2(results1)
        if (i == 3) setDirectionsResponse3(results1)
        if (i == 4) setDirectionsResponse4(results1)

    }

    // put outStr in to a textbox or <p> body idk

    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)

        const routeData = {
              origin: originRef.current.value,
              destination: destiantionRef.current.value,
              waypoints: waypts,
              distance: distance,
              duration: duration,
            };
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destiantionRef.current.value = '';
    setWaypts([]);
  }
  function addWaypoint() {
    const waypoint = waypointRef.current.value;
       if (waypoint) {
         setWaypts([...waypts, waypoint])
         waypointRef.current.value = '';
       }
  }


  async function saveRoute() {
    const routeData = {
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      waypoints: waypts,
      distance: distance,
      duration: duration,
    };
     try {
         const docRef = await addDoc(collection(db, "routesCollection"), routeData);
         console.log("Route document written with ID: ", docRef.id);
       } catch (e) {
         console.error("Error adding document: ", e);
       }
     }


  return (
  <>
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='50vh'
      w='50vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {isLoaded &&
            <GoogleMap
                      center={center}
                      zoom={4}
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                      }}
                      onLoad={map => setMap(map)}
                    >
                      <Marker position={center} />

                      {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                      )}
                      {directionsResponse1 && (
                        <DirectionsRenderer directions={directionsResponse1} />
                      )}
                      {directionsResponse2 && (
                                              <DirectionsRenderer directions={directionsResponse2} />
                                            )}
                      {directionsResponse3 && (
                                              <DirectionsRenderer directions={directionsResponse3} />
                                            )}
                      {directionsResponse4 && (
                                              <DirectionsRenderer directions={directionsResponse4} />
                                            )}

                    </GoogleMap>
        }

      </Box>
    <Box p={4} borderRadius='lg' m={4} bgColor='white' shadow='base' minW='container.md' zIndex='1'>
      <HStack spacing={2} justifyContent='space-between'>
        <Box flexGrow={1}>
          <Input type='text' placeholder='Origin' ref={originRef} />
        </Box>
        <Box flexGrow={1}>
          <Input type='text' placeholder='Destination' ref={destiantionRef} />
        </Box>
        <Box flexGrow={1}>
          <Input
            placeholder="Add up to five waypoint"
            size="sm"
            ref={waypointRef}
            onChange={() => {}}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addWaypoint();
              }
            }}
            />
    </Box>
    <ButtonGroup>
    <Button colorScheme='pink' type='submit' onClick={calculateRoute}> Calculate Route</Button>
     <IconButton aria-label='center back' icon={<FaTimes />} onClick={clearRoute}/>
     </ButtonGroup>
      </HStack>
     <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
          </HStack>
        </Box>
      </Flex>

        <textarea
                 border= '1px solid black'
                 font-size= '100px'
                 margin-right= '20px'
                 margin-left= '40px'
                 margin-top= '50px'
                 position= 'absolute'
                 top= '30%'
                 left= '60%'
                 value={outStr} rows={10} cols={50} />

      <div>
       <Box>
       <Button classname="SaveRoute_btn" onClick={saveRoute}>Save Route</Button>
         </Box>
         </div>



        </>
        );
        }

export default App