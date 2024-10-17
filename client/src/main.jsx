import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { store } from './Redux/store.js'
import { persistor } from './Redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import SocketContextProvider from './socket/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
                <SocketContextProvider>
                    <App />
                </SocketContextProvider>
            </Provider>
        </PersistGate>
    </BrowserRouter>
)
