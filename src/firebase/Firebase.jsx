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
   
    function getMovieList(){
        onValue(ref(database, 'movieList/'), (snapshot) => {
            const vals = snapshot.val();
            if(vals)
                dispatch(updateMovieList(Object.values(vals)));
        })
    }
    function getServices(){
        onValue(ref(database, 'services/'), (snapshot) => {
            const vals = snapshot.val();
            if(vals)
                dispatch(updateStreamingServices(Object.values(vals)));
        })
    }

    function addMovie(movie) {set(ref(database, 'movieList/' + movie.imdbId), movie);}
    function removeMovie(movie) {set(ref(database, 'movieList/' + movie.imdbId), null);}

    function addService(service) {set(ref(database, 'services/' + service), service);}
    function removeService(service) {set(ref(database, 'services/' + service), null);}

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )

}