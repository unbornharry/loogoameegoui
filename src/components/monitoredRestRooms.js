import React, { Component } from 'react';
import MapComponents from 'react-map-components';
import Restroom from './restroom';
import Mensrooms from '../images/mensrooms.png';
import Womensrooms from '../images/womensrooms.png';

const styleMens = {
    background: '#525441',
    width: '32vw',
    margin: '1vh 0 1vh 1vh',
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
    width: '32vw',
    margin: '1vh 0 1vh 1vh',
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


class monitoredMeetingRooms extends Component {

    constructor(props){
        super(props);
        this.state = {restrooms: [], buildings: []};
        this.drop = this.drop.bind(this);
        this.getStyle = this.getStyle.bind(this);
    }

    allowDrop(e) {
        e.preventDefault();
    }

    drop(e){
        let data = JSON.parse(e.dataTransfer.getData('text'));
        fetch('/restroom?gender=' + this.props.gender + '&buildingid=' + data.buildingid)
            .then(res => res.json())
            .then(newrestrooms => {
                let restrooms = this.state.restrooms.concat(newrestrooms);
                this.setState({ restrooms });
            });
    }

    getStyle(gender){
        if(gender === 'male')
            return styleMens;
        else if(gender === 'female')
            return styleWomens;
    }

    // getDivText(gender){
    //     if(gender === 'male')
    //         return "Drop Buildings Here to see Men's room statuses";
    //     else if(gender === 'female')
    //         return "Drop Buildings Here to see Women's room statuses";
    // }

    render() {
        const {gender} = this.props;
        return (
            <div onDragOver={this.allowDrop} onDrop={this.drop} style={this.getStyle(gender)}>
                {/*{this.getDivText(gender)}*/}
                <MapComponents component={Restroom} for={this.state.restrooms} />
            </div>
        );
    }
}

export default monitoredMeetingRooms;