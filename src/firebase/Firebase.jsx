import { createContext } from "react";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import {getDatabase, onValue, ref, set} from "firebase/database";

import {updateMovieList} from "/src/features/movieList/movieListSlice"
import { updateStreamingServices } from "../features/userPage/userPageSlice";
import firebaseConfig from "/src/FirebaseConfig.jsx";

const app = initializeApp(firebaseConfig);
const database = getDatabase();

let firebase = {
    app: null,
    database: null
}

export const FirebaseContext = createContext(null);

export default ({children}) => {

    const dispatch = useDispatch();
    if (!firebase.api) {
        firebase = {
            app: app,
            database: database,

            //Here all functions that communicate with firebase are declared.
            api: {
                getMovieList,
                getServices,
                addMovie,
                removeMovie,
                addService,
                removeService,
            }
        }
    }
   
    //Function for retreiving the movie list from firebase, called from App
    function getMovieList(){
        onValue(ref(database, 'movieList/'), (snapshot) => {
            const vals = snapshot.val();
            if(vals)
                dispatch(updateMovieList(Object.values(vals)));
        })
    }
    //Function for retreiving the streaming service list from firebase, called from App
    function getServices(){
        onValue(ref(database, 'services/'), (snapshot) => {
            const vals = snapshot.val();
            if(vals)
                dispatch(updateStreamingServices(Object.values(vals)));
        })
    }

    //Functions for adding and removing movies from firebase, called from RenderMovies
    function addMovie(movie) {set(ref(database, 'movieList/' + movie.imdbId), movie);}
    function removeMovie(movie) {set(ref(database, 'movieList/' + movie.imdbId), null);}

    //Functions for adding and removing streaming services, called from UserPage
    function addService(service) {set(ref(database, 'services/' + service), service);}
    function removeService(service) {set(ref(database, 'services/' + service), null);}

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )

}