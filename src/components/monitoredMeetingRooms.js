import React, { Component } from 'react';
import MapComponents from 'react-map-components';
import Meetingroom from './meetingroom';
import Background from '../images/meetingroom.png';
let request = require('sync-request');

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
        this.state = {droppeditems: [], meetingrooms: []};
        this.drop = this.drop.bind(this);
        this.getMeetingRooms = this.getMeetingRooms.bind(this);
    }

    allowDrop(e) {
        e.preventDefault();
    }

    getMeetingRooms(){
        let allMeetingrooms = [];
        for(let item of this.state.droppeditems){
            let newMeetingroomsResponse;
            if(item.type === 'building')
                newMeetingroomsResponse = request('GET', '/meetingroom?gender=' + this.props.gender + '&buildingid=' + item.id);
            else if(item.type === 'floor')
                newMeetingroomsResponse = request('GET', '/meetingroom?gender=' + this.props.gender + '&floorid=' + item.id);
            allMeetingrooms = allMeetingrooms.concat(JSON.parse(newMeetingroomsResponse.body));
        }
        return allMeetingrooms;
    }

    componentDidMount() {
        setInterval(function() {
            this.setState({meetingrooms: this.getMeetingRooms()});
        }.bind(this), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    drop(e){

        let data = JSON.parse(e.dataTransfer.getData('text'));
        if(data.buildingid)
            this.state.droppeditems.push({type: 'building', id: data.buildingid});
        else if (data.floorid)
            this.state.droppeditems.push({type: 'floor', id: data.floorid});
        this.setState({meetingrooms: this.getMeetingRooms()});
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