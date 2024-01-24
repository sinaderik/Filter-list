import React, { useEffect, useReducer } from 'react'
import List from './components/List';
import Search from './components/Search';
import { useState } from 'react'
import useStorageState from './hooks/useStorageState';


export default function App() {

  const [searchTerm, setSearchTerm] = useStorageState("searched", "");
  const [allStories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isError: false,
    isLoading: false
  })


  useEffect(() => {
    dispatchStories({ type: "STORIES_FETCH_INIT" })
    getAsyncStories()
      .then(data => {
        dispatchStories({ type: "STORIES_FETCH_SUCCESS", payload: data })
      })
      .catch(() => {
        dispatchStories({ type: "STORIES_FETCH_FAILED" })
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
      case "STORIES_FETCH_INIT":
        return {
          ...state,
          isError: false,
          isLoading: true
        }
      case "STORIES_FETCH_SUCCESS":
        return {
          ...state,
          isError: false,
          isLoading: false,
          data: action.payload
        }
      case "STORIES_FETCH_FAILED":
        return {
          ...state,
          isError: true,
          isLoading: false,
        }
      case "REMOVE_STORY":
        return {
          ...state,
          data: state.data.filter((story) => story.id !== action.payload)
        }
      // return (state || []).filter((story) => story.id !== action.payload);
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
  }

  const searchedItems = allStories.data.filter(story => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase())
  })


  return (
    <div>
      <Search searchTerm={searchTerm} searching={searching} />

      {allStories.isLoading && <p>Loading...</p>}
      {allStories.isError && <h3 style={{ color: "red" }}>Something went wrong please try again later</h3>}

      <List onRemoveItem={removeItem} searchedItems={searchedItems} />
    </div>
  )
}
