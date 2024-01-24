import React from 'react'
import { useEffect, useState } from 'react'


export default function List({ onRemoveItem, searchedItems }) {

    return (
        <>
            <ul>
                {searchedItems.map((story) => (
                    <div key={story.id} style={{ display: "flex",marginBottom:"0.5rem" }}>
                        <li>{story.title}</li>
                        <button
                            style={{ marginLeft: "1rem" }}
                            onClick={() => onRemoveItem(story.id)}
                        >Remove</button>
                    </div>
                ))}
            </ul>
        </>
    )
}
// - {story.author}