import React, { Component } from 'react';
import MapComponents from 'react-map-components';
import Restroom from './restroom';
import Mensrooms from '../images/mensrooms.png';
import Womensrooms from '../images/womensrooms.png';
let request = require('sync-request');

const styleMens = {
    background: '#525441',
    width: '32vw',
    margin: '1vh 1vw 1vh 1vw',
    height: '47vh',
    float: 'left',
    borderRadius: '28px',
    lineHeight: '312h',
    verticalAlign: 'middle',
    backgroundImage: `url(${Mensrooms})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'

};

const styleWomens = {
    background: '#525441',
    width: '31vw',
    margin: '1vh 1vw 1vh 0',
    height: '47vh',
    float: 'left',
    borderRadius: '28px',
    fontSize: '30px',
    lineHeight: '32vh',
    textAlign: 'center',
    backgroundImage: `url(${Womensrooms})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
};


class monitoredRestRooms extends Component {

    constructor(props){
        super(props);
        this.state = {restrooms: [], droppeditems: []};
        this.drop = this.drop.bind(this);
        this.getStyle = this.getStyle.bind(this);
        this.getRestRooms = this.getRestRooms.bind(this);
    }

    allowDrop(e) {
        e.preventDefault();
    }

    getRestRooms(){
        let allRestrooms = [];
        for(let item of this.state.droppeditems){
            let newRestroomsResponse;
            if(item.type === 'building')
                newRestroomsResponse = request('GET', '/restroom?gender=' + this.props.gender + '&buildingid=' + item.id);
            else if(item.type === 'floor')
                newRestroomsResponse = request('GET', '/restroom?gender=' + this.props.gender + '&floorid=' + item.id);
            allRestrooms = allRestrooms.concat(JSON.parse(newRestroomsResponse.body));
        }
        return allRestrooms;
    }

    componentDidMount() {
        setInterval(function() {
            this.setState({restrooms: this.getRestRooms()});
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
        this.setState({restrooms: this.getRestRooms()});
    }

    getStyle(gender){
        if(gender === 'male')
            return styleMens;
        else if(gender === 'female')
            return styleWomens;
    }

    render() {
        const {gender} = this.props;
        return (
            <div onDragOver={this.allowDrop} onDrop={this.drop} style={this.getStyle(gender)}>
                <MapComponents component={Restroom} for={this.state.restrooms} />
            </div>
        );
    }
}

export default monitoredRestRooms;