import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/store'
import Root from './components/root'
import "@babel/polyfill";

document.addEventListener('DOMContentLoaded', () => {
    let preloadedState;
    if (window.currentUser) {
        preloadedState = {
            sessions: {
                currentUser: window.currentUser
            }
        }
    } else {
        preloadedState = {
            sessions: {
                currentUser: null
            }
        }
    }
    const store = configureStore(preloadedState)
    window.store = store
    const root = document.getElementById('root')
    ReactDOM.render(<Root store={store}/>, root)
})