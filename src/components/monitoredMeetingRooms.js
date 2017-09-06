import React, { Component } from 'react';
import MapComponents from 'react-map-components';
import Meetingroom from './meetingroom';

const style = {
    background: '#525441',
    width: '65vw',
    margin: '49vh 0 1vh 1vh',
    height: '50vh',
    float: 'left',
    borderRadius: '28px',
    position: 'absolute',
    overflow: 'auto'
};

class monitoredMeetingRooms extends Component {

    constructor(props){
        super(props);
        this.state = {meetingrooms: []};
        this.drop = this.drop.bind(this);
    }

    static allowDrop(e) {
        e.preventDefault();
    }

    drop(e){
        let data = JSON.parse(e.dataTransfer.getData('text'));
        fetch('/meetingroom?buildingid=' + data.buildingid)
            .then(res => res.json())
            .then(meetingrooms => this.setState({ meetingrooms }));
    }

    render() {
        return (
            <div onDragOver={this.allowDrop} onDrop={this.drop} style={style}>
                <MapComponents component={Meetingroom} for={this.state.meetingrooms} />
            </div>
        );
    }
}

export default monitoredMeetingRooms;