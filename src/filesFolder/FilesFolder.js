import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";

function FilesFolder(){
     const navigate = useNavigate();

        return(
                <div>
                     <button
                       onClick={() => {
                         navigate('../Dashboard');
                       }}
                     >
                       {" "}
                       Home Page
                     </button>
                   </div>
                 );
               }
    export default FilesFolder