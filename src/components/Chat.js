import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import AuthService from "../services/auth.service";

import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';
import './Chat.css';
import { Link } from "react-router-dom";

const ENDPOINT = 'http://localhost:8080/';

let socket;

// location is a prop from react router
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { room } = queryString.parse(location.search);
    const name = AuthService.getCurrentUser().username;
    console.log(room)

    socket = io();
    // socket = io(ENDPOINT) ?; 
    setRoom(room);
    setName(name)
    // console.log(socket);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // console.log(users)
    // });

    socket.on("users", ({ users }) => {
      // console.log(users)
      setUsers(users)
    });

    socket.on('messages', messages => {
      // console.log(messages)
      setMessages(m => messages)
    });

    socket.on('room', room => {
      // console.log(room)
      setRoom(m => room)
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  function UsersList(users) {
    const listItems = users.map((user) =>
      <li key={user.id}>
        <Link className="link" to="/rooms">
          {user.name}
        </Link>
      </li>
    );
    return (
      <ul>{listItems}

        <li>
          <Link className="link" to="/chat?room=klack">
            klack
          </Link>
        </li>

        <li>
          <Link className="link" to="/chat?room=klack2">
            klack2
          </Link>
        </li>
      </ul>

    );
  }

  return (
    <div className="outerContainer">
      {UsersList(users)}

      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;