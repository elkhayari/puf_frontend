import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './components';
import { Home } from './pages';
import { useStateContext } from './contexts/ContextProvider';
import './App.css';

function App() {
  const { setSocket, socket, setIsSocketOpen, isSocketOpen } =
    useStateContext();

  useEffect(() => {
    console.log('UseEffect App.js');
    const storedSocketOpen = sessionStorage.getItem('socketOpen');
    console.log(storedSocketOpen);

    const webSocket = new WebSocket('ws://127.0.0.1:8089/ws/devices/');
    setSocket(webSocket);
    console.log('WebSocket connection established');

    return () => {
      console.log('close it');
      socket.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    // Save the flag indicating whether the WebSocket is open in sessionStorage
    console.log('second useEffect');
    sessionStorage.setItem('socketOpen', isSocketOpen.toString());

    // Clean up the WebSocket connection on unmount if the socket is not open
    return () => {
      if (socket && !isSocketOpen) {
        socket.close();
        sessionStorage.removeItem('socketOpen');
      }
    };
  }, [socket, isSocketOpen]);

  return (
    <>
      {socket && (
        <>
          <div className="App">
            <ToastContainer position="top-right" />
          </div>
          <Router>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;

/*
<div className="App">
        <h1>Device Insertion Notifications</h1>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
        <Websocket
          url="ws://localhost:8000/ws/chat/"
          onMessage={handleData}
          ref={(websocket) => (this.refWebSocket = websocket)}
        />
      </div>
      */
