import { useEffect, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
//import {app} from 'firebase/app';
import "firebase/database";

import {getMovieList, updateMovieList} from "/src/features/movieList/movieListSlice"
import firebaseConfig from "/src/FirebaseConfig.jsx";
import { getDatabase, onValue, ref, set } from "firebase/database";

const app = initializeApp(firebaseConfig);
const database = getDatabase();
const movieListRef = ref(database, 'movieList/')

export const FirebaseContext = createContext(null);

export default ({children}) => {
    
    let firebase = {
        app: null,
        database: null
    }



    const dispatch = useDispatch();

        /*
        ref(database, 'movieList/').on('movie', (snapshot) => {
            const vals = snapshot.val();
            let _records = [];
            for(const key in vals){
                _records.push({
                    ...vals[key],
                    id: key
                });
            }
            console.log("records", _records)
            dispatch(updateMovieList(_records));
        })
        */
    
    //if (!app.apps.length) {
        firebase = {
            app: app,
            database: database,

            api: {
                getMovieList,
                addMovie,
                removeMovie
            }
        }
    //}
   
    function getMovieList(){
        console.log(firebase)
        //const movieListRef = ref(database, 'movieList/')
        onValue(movieListRef, (snapshot) => {
            const vals = snapshot.val();
            let _records = [];
            for(const key in vals){
                _records.push({
                    ...vals[key],
                    id: key
                });
            }
            console.log("records", _records);
            dispatch(updateMovieList(_records));
        })
    }

    function addMovie(movie) {
        set(ref(database, 'movieList/' + movie.imdbId), movie);
        console.log("saved movie", movie);
    }

    function removeMovie(movie) {
        set(ref(database, 'movieList/' + movie.imdbId), null);
        console.log("removed movie", movie);
    }

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )

}

/*

const fetchFromFirebase = () => {
    const dispatch = useDispatch();
    onValue(movieListRef, (snapshot) => {
    
        const data = snapshot.val();
        console.log(data)

        if(data)
            dispatch(updateMovieList(data));
    })
}


const pushToFirebase = () => {
    const movieList = useSelector(getMovieList);
    console.log("hej")

    useEffect(() => {
        console.log("hejhej")
        set(movieListRef, movieList)
        /*
            Push to firebase

    }, [movieList])
}
/*
const fetchFromFirebase = async () => {
    console.log("hejhejhej")
    const firebaseSnapshot = await get(rf);
    dispatch(updateMovieList(firebaseSnapshot.val()));
}
*/

//export {pushToFirebase, fetchFromFirebase}