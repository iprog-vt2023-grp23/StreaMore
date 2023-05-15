# StreaMore

Welcome to the github page of the StreaMore project, where you can search less to stream more.
The purpose of StreaMore is to ease the process of figuring out which streaming sites offer a specific movie/TV-series by providing all this information in one place. The user is able to search for anything and receive information, add it to their own lists and more.

## Team

- The Firebase pyrotechnician @GabbeLandin
- The React ranger @Lindefor
- The Scrum caster @Taumich
- The CSS lancer @tobiasljunggren97

Note: we are all working omni-role despite the meaning of the titles.

## API

This project is built using the following API:

- [Rapid API: Streaming Availability](https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability)



## Features
- Search for movies, TV-series and more
- Filter by streaming service, country and genre
- See information about search results, such as movie description
- Create an account and set your current streaming services
- Create personalized lists and populate them with your favourite movies and TV-series

## How to setup the project:
- Clone the repository to your local machine
- Run `npm install` to install all dependencies
- Run `npm run dev` to start the project
- Open your browser and go to the localhost specified in the terminal to view the project

The app is also deployed at: [Deployed App](https://streamore-4f6cd.firebaseapp.com/)

## File Structure:

The file structure if primarily based on the lab file structure, with some changes due to the use of React Redux.

`App.jsx` has the same purpose as always, structure what is rendered on the page.

`main.jsx` is the same as the standard `index.js` file.

`features/*` contains all respective components of the app, i.e. Presenter-View code with additional Redux-related files.

For example: 
- `features/sidebar/sidebarSlice.jsx` contains the sidebar slice. A slice refers to a portion of the global state (model), in this case the sidebar. The slice is managed through its own reducer functions which can modify its state. In the **sidebarSlice**, we have an *initialState* with information on whether the sidebar is toggled or not, and the current website endpoint the user is at. This state is changed through reducers *toggleSidebar* & *setCurrentPage*. We've also implemented two getters, *getSidebarState* & *getCurrentPage* which can be used to fetch the current state of the sidebar
- `features/sidebar/SidebarPresenter.jsx` is the presenter of the sidebar, it fetches the sidebar state and firebase config, defines handlers for custom events from the view, sends props to the view, and renders the **sidebarview**
- `features/sidebar/SidebarView.jsx` has the purpose of designing the layout of the sidebar. It contains some logic to navigate between routes using *<NavLinks>* and throws custom events upon user interaction. 


The remaining files within `features/*` follow a similar pattern as above.
Some Presenters interact with the model, for example:
`features/userLists/MyListPresenter.jsx` dispatches some actions, such as `removeMovieFromMovieList`, upon user interaction. This updates the model with the new data.

We also have files which handle the interaction with Firebase.

- `firebase/Firebase.jsx` which primarily contains `listenerMiddlewares`, these listens to actions which update the model, such as `removeMovieFromMovieList` mentioned above, and updates the firebase database accordingly. 

The data model is located in `model/store.jsx`, which uses the Redux store functionality to essentially store all global data (the model), it combines all reducers discussed above into one model.
