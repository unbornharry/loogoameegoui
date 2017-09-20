import React, { Component } from 'react';
import MapComponents from 'react-map-components';
import Meetingroom from './meetingroom';
import Background from '../images/meetingroom.png';
var request = require('sync-request');

const style = {
    background: '#525441',
    width: '64vw',
    margin: '49vh 0 1vh 1vw',
    height: '49vh',
    float: 'left',
    borderRadius: '28px',
    position: 'absolute',
    overflow: 'auto',
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
};

class monitoredMeetingRooms extends Component {

    constructor(props){
        super(props);
        this.state = {buildingids: [], meetingrooms: []};
        this.drop = this.drop.bind(this);
    }

    allowDrop(e) {
        e.preventDefault();
    }

    componentDidMount() {
        setInterval(function() {
            let allMeetingrooms = [];
            for(let buildingid in this.state.buildingids){
                const newMeetingroomsResponse = request('GET', '/meetingroom?buildingid=' + buildingid);
                allMeetingrooms = allMeetingrooms.concat(newMeetingroomsResponse.body);
            }
            this.setState({meetingrooms: allMeetingrooms });
        }.bind(this), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    drop(e){
        let data = JSON.parse(e.dataTransfer.getData('text'));
        let allMeetingrooms = [];
        this.state.buildingids.push(data.buildingid);
        for(let buildingid in this.state.buildingids){
            const newMeetingroomsResponse = request('GET', '/meetingroom?buildingid=' + buildingid);
            allMeetingrooms = allMeetingrooms.concat(newMeetingroomsResponse.body);
        }
        this.setState({meetingrooms: allMeetingrooms });
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