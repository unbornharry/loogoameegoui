import React, { Component } from 'react';
import MapComponents from 'react-map-components';
import Restroom from './restroom';

const style = {
    background: '#525441',
    width: '64vw',
    margin: '49vh 0 1vh 1vh',
    height: '50vh',
    float: 'left',
    borderRadius: '28px',
    position: 'absolute'
};

class monitoredMeetingRooms extends Component {

    constructor(props){
        super(props);
        this.state = {restrooms: []};
        this.drop = this.drop.bind(this);
    }

    allowDrop(e) {
        e.preventDefault();
    }

    drop(e){
        fetch('/restroom?buildingid=1')
            .then(res => res.json())
            .then(restrooms => this.setState({ restrooms }));
        let data = e.dataTransfer.getData('text');
        console.log(data);
        // // e.target.appendChild(document.getElementById(data));

    }

    render() {
        return (
            <div onDragOver={this.allowDrop} onDrop={this.drop} style={style}>
                <MapComponents component={Restroom} for={this.state.restrooms} />
            </div>
        );
    }
}

export default monitoredMeetingRooms;