import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Counter from "./features/counter/Counter"
import PostsList from './features/posts/PostsList'
import AddPostForm from './features/posts/AddPostForm'
import SearchList from './features/searchBar/SearchList'
import SearchBar from './features/searchBar/SearchBar'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Counter />
      <SearchBar />
      <SearchList />
    </div>
  )
}

export default App
