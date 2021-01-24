import React, { Component } from "react";
import Room from "./Room";

export default class Rooms extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let list = <div className="no-content-message">There is no rooms to show</div>;
        if (this.props.rooms && this.props.rooms.map) {
            list = this.props.rooms.map(r => <Room key={r.id}
                id={r.id} name={r.name}
                participants={r.participants}
                onClick={this.handleClick} />);
        }
        return (
            <div className='room-list'>
                {list}
            </div>
        );
    }
}
