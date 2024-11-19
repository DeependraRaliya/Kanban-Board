import React from "react";
import { useCachedApi } from "./fetchData";
import Cards from "../Cards";
import { useState } from "react";
import './board.css'

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

function Board() {
    const { data, error, loading } = useCachedApi(API_URL);
    const [displayState, setDisplayState] = useState("priority")

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const tickets = data.tickets
    const users = data.users

    const handleChange = (event) => {
        setDisplayState(event.target.value);
    }

    const columns = {
        4: "Urgent",
        3: "High",
        2: "Medium",
        1: "Low",
        0: "No priority"
    };

    return (
        <div className="container">
            <div style={{marginBottom: "20px"}}>
                <label htmlFor="dropdown">Group </label>
                <select id="dropdown" value={displayState} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                </select>
            </div>
            {
                displayState == "user" ? <>
                    <div className="user-container">
                        {users.map((user, index1) => {
                            return <div key={index1} className="user-column">
                                <p>{user.name}</p>
                                {
                                    tickets.filter((ticket) => ticket.userId === user.id)
                                        .map((cardItem, index2) => (<Cards key={index2} ticket={cardItem} />))
                                }
                            </div>
                        })}
                    </div>
                </>
                    : <>
                        <div className="priority-container">
                            {Object.entries(columns).map(([key, value]) => (
                                <div key={key} className="priority-column">
                                    <strong>{key}</strong> - {value}
                                    {
                                        tickets
                                            .filter((ticket) => ticket.priority === Number(key)) // Convert key to a number
                                            .map((item, cardIndex) => (
                                                <Cards key={cardIndex} ticket={item} />
                                            ))
                                    }
                                </div>
                            ))}
                        </div>
                    </>
            }
        </div>
    );
}

export default Board;