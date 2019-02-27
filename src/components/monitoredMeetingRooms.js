import React, { Component } from 'react';
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
    }

    allowDrop(e) {
        e.preventDefault();
    }

    getMeetingRooms = () => {
        let allMeetingrooms = [];
        for(let item of this.state.droppeditems){
            let newMeetingroomsResponse;
            if(item.type === 'building')
                newMeetingroomsResponse = request('GET', '/meetingroom?gender=' + this.props.gender + '&buildingid=' + item.id);
            else if(item.type === 'floor')
                newMeetingroomsResponse = request('GET', '/meetingroom?gender=' + this.props.gender + '&floorid=' + item.id);
            allMeetingrooms = allMeetingrooms.concat(JSON.parse(newMeetingroomsResponse.body));
        }
        this.setState({meetingrooms: allMeetingrooms});
    };

    componentDidMount() {
        setInterval( () => {
            this.getMeetingRooms();
        }, 5000);
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
        this.getMeetingRooms();
    }

    render() {
        return (
            <div onDragOver={this.allowDrop} onDrop={this.drop} style={style}>
                {this.state && this.state.meetingrooms ? this.state.meetingrooms.map( room => (<Meetingroom {...room} updateParent={this.getMeetingRooms}/>)) : null}
            </div>
        );
    }
}

export default monitoredMeetingRooms;