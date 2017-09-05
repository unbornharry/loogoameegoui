import React, { Component } from 'react';
import MapComponents from 'react-map-components';
import Restroom from './restroom';

const style = {
    background: '#525441',
    width: '31vw',
    margin: '1vh 0 1vh 1vh',
    height: '47vh',
    float: 'left',
    borderRadius: '28px'
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
        console.log(e.dataTransfer.getData('text'));
        let data = JSON.parse(e.dataTransfer.getData('text'));
        fetch('/restroom?gender=male&buildingid=' + data.buildingid)
            .then(res => res.json())
            .then(restrooms => this.setState({ restrooms }));
        console.log(data);
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