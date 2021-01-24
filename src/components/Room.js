import React from 'react';


export default class Room extends React.Component {

    click = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <div className='room-item' onClick={this.click}>
                <div>{this.props.name}</div>
                <span>{this.props.participants}</span>
            </div>
        )
    }
}