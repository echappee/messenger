import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Rooms = ({ }) => {
    // const [rooms, setRoom] = useState('');

    // const listItems = [];

    // function RoomsList(rooms) {
    //     const listItems = rooms.map((room) =>
    //       <li key={room.id}>
    //         <Link className="link" to="/room">
    //           {room.name}
    //         </Link>
    //       </li>
    //     );
    return (

        <ul>
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
    //   }
}

export default Rooms;