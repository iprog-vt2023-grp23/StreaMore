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

We will also implement an email API to notify users of new movie releases:
- [Rapid API: SendGrid API](https://rapidapi.com/sendgrid/api/sendgrid)

## Project Status
We've currently implemented most of the basic functionalities that were planned for the website, though some bugs and bad CSS remain to work on. 

### So far we've:
- Implemented API calls to fetch movies based on user search
- Integrated Firebase to enable user authentication and storage of user data such as movie lists
- Implemented initial versions of all pages presented in the project proposal
- Worked on CSS and included some third party UI tools

### We plan to:
- Improve CSS to make everything look better and consistent across the webpage
- Integrate some third party component relevant to our use case
- Work on the file structure to reduce complexity, Presenter-View style (Eller är detta helt klart kanske?)
- Implement the use of an Email API to notify users when a movie they are tracking is released on their streaming services.

## File Structure:
The file structure if primarily based on the lab file structure, with some changes due to the use of React Redux. 

`App.jsx` has the same purpose as always, structure what is rendered on the page.

`main.jsx` is the same as the standard `index.js` file.

`features/*` contains all respective components of the app, i.e. Presenter-View code with additional Redux-related files.
For example: 
- `features/sidebar/sidebarSlice.jsx` contains the sidebar slice. A slice refers to a portion of the global state (model), in this case the sidebar. The slice is managed through its own reducer functions which can modify its state. In the **sidebarSlice**, we have an *initialState* with information on whether the sidebar is toggled or not, and the current website endpoint the user is at. This state is changed through reducers *toggleSidebar* & *setCurrentPage*. We've also implemented two getters, *getSidebarState* & *getCurrentPage* which can be used to fetch the current state of the sidebar
- `features/sidebar/Sidebar.jsx` is the presenter of the sidebar, it fetches the sidebar state and firebase config, defines handlers for custom events from the view, sends props to the view, and renders the **sidebarview**
- `features/sidebar/SidebarView.jsx` has the purpose of designing the layout of the sidebar. It contains some logic to navigate between routes using *<NavLinks>* and throws custom events upon user interaction. 

The remaining files within `features/*` follow a similar pattern as above.

We also have files which handle the interaction with Firebase.
- `firebase/firebaseSlice.jsx` which is the slice for the user state, it also contains extra reducers for a set of functions following the syntax
```const [name] createAsyncThunk(...)```...
Vad gör builder och ovan funktioner?
- `firebase/Firebase.jsx` has the same purpose as `firebaseModel.js` in the labs. It communicates with Firebase to update the realtime database, fetch data from it, and subscribe to these changes.

The data model is located in `model/store.jsx`, which uses the Redux store functionality to essentially store all global data (the model), it combines all reducers discussed above into one model.
