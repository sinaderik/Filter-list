import React, { useEffect, useReducer } from 'react'
import List from './components/List';
import Search from './components/Search';
import { useState } from 'react'
import useStorageState from './hooks/useStorageState';


export default function App() {

  const API_ENFPOINT = "https://fakestoreapi.com/products"

  const [searchTerm, setSearchTerm] = useStorageState("searched", "");
  const [allStories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isError: false,
    isLoading: false
  })
  
  
  useEffect(() => {

    dispatchStories({ type: "STORIES_FETCH_INIT" })

    fetch(API_ENFPOINT)
      .then(response => response.json())
      .then(data => {
        dispatchStories({ type: "STORIES_FETCH_SUCCESS", payload: data })
      })
      .catch(()=>{
        dispatchStories({ type: "STORIES_FETCH_FAILED" })
      })

  }, [])


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
      default:
        return state;
    }
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

      {allStories.isLoading && <h3 style={{marginLeft:"1rem"}}>Loading...</h3>}
      {allStories.isError && <h3 style={{ color: "red" }}>Something went wrong please try again later</h3>}

      <List onRemoveItem={removeItem} searchedItems={searchedItems} />
    </div>
  )
}
