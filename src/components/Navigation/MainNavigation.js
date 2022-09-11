import React from 'react'
import {NavLink} from 'react-router-dom'
import AuthContext from '../../context/auth-context'
import './MainNavigation.css'
import { useContext } from 'react'

export default function MainNavigation(props) {
        const context = useContext(AuthContext)
            return (
                <header className="main-navigation">
                    <div className="main-navigation_logo">
                        <h1>Event Booking App</h1>
                    </div>
                    <nav className="main-navigation_items">
                        <ul>
                            {!context.token && <li><NavLink to="/auth">Login</NavLink></li>}
                            <li><NavLink to="/events">Events</NavLink></li>
                            {context.token && 
                            <>
                            <li><NavLink to="/bookings">Bookings</NavLink></li>
                            <li><button onClick={context.logout}>Log out</button></li>
                            </>
                            }
                        </ul>
                    </nav> 
                </header>
            )}

