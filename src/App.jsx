import React, { useEffect, useReducer } from 'react'
import List from './components/List';
import Search from './components/Search';
import { useState } from 'react'
import useStorageState from './hooks/useStorageState';


export default function App() {

  const [searchTerm, setSearchTerm] = useStorageState("searched", "");
  const [allStories, dispatchStories] = useReducer(storiesReducer, [])
  // const [allStories, setAllStories] = useState([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getAsyncStories()
      .then(data => {
        dispatchStories({ type: "SET_STORIES", payload: data })
        // setAllStories(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsError(true)
        setIsLoading(false)
      })
  }, [])

  const data = [
    {
      id: 0,
      title: "React",
      url: "https://reactjs.org",
      author: "Reza ahmadi",
      num_comments: 3,
      points: 4,
    },
    {
      id: 1,
      title: "Redux",
      url: "https://redux.js.org",
      author: "Mohammad kia",
      num_comments: 2,
      points: 5,
    },
  ]

  function storiesReducer(state, action) {
    switch (action.type) {
      case "SET_STORIES":
        return action.payload
      case "REMOVE_STORY":
        return (state || []).filter((story) => story.id !== action.payload);
      default:
        return state;
    }
  }

  function getAsyncStories() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, 2000)
    })
  }

  function searching(value) {
    setSearchTerm(value)
  }

  function removeItem(id) {
    dispatchStories({ type: "REMOVE_STORY", payload: id })
    // const filteredItems = allStories.filter(story => story.id != id)
    // setAllStories(filteredItems)
  }

  const searchedItems = allStories.filter(story => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase())
  })


  return (
    <div>
      <Search searchTerm={searchTerm} searching={searching} />

      {isLoading && <p>Loading...</p>}
      {isError && <h3 style={{ color: "red" }}>Something went wrong please try again later</h3>}

      <List onRemoveItem={removeItem} searchedItems={searchedItems} />
    </div>
  )
}
