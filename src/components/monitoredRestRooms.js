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
        this.state = {restrooms: [], buildingids: []};
        this.drop = this.drop.bind(this);
        this.getStyle = this.getStyle.bind(this);
    }

    allowDrop(e) {
        e.preventDefault();
    }

    componentDidMount() {
        setInterval(function() {
            let allRestrooms = [];
            for(let buildingid of this.state.buildingids){
                const newRestroomsResponse = request('GET', '/restroom?gender=' + this.props.gender + '&buildingid=' + buildingid);
                allRestrooms = allRestrooms.concat(JSON.parse(newRestroomsResponse.body));
            }
            this.setState({restrooms: allRestrooms });
        }.bind(this), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    drop(e){
        let data = JSON.parse(e.dataTransfer.getData('text'));
        let allRestrooms = [];
        this.state.buildingids.push(data.buildingid);
        for(let buildingid of this.state.buildingids){
            const newRestroomsResponse = request('GET', '/restroom?gender=' + this.props.gender + '&buildingid=' + buildingid);
            allRestrooms = allRestrooms.concat(JSON.parse(newRestroomsResponse.body));
        }
        this.setState({restrooms: allRestrooms });
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