import React, { Component } from 'react';
import Building from './building';
import Floor from './floor';
import MapComponents from 'react-map-components';
import buildingImage from '../images/building.png';

const searchStyle = {
    width: '25vw',
    position: 'relative',
    align: 'center',
    borderRadius: '8px',
    height: '30px',
    fontSize: 'large',
    textAlign: 'center',
    margin: '20px 0 20px 0'
};

const rightpaneStyle = {
    left: '66vw',
    position: 'absolute',
    width: '30vw',
    height: '97vh',
    borderRadius: '28px',
    background: '#525441',
    float: 'right',
    overflow: 'auto',
    padding: '0 0 0 3vw',
    margin: '1vh 1vw 1vh 0',
    backgroundImage: `url(${buildingImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
};

class rightpane extends Component {

    constructor(props){
        super(props);
        this.state = {buildings: [], listToShow : "buildings"};
        this.getBuildings = this.getBuildings.bind(this);
        this.handler = this.handler.bind(this);
    }

    componentDidMount() {
        fetch('/building?querystring=')
            .then(res => res.json())
            .then(buildings => this.setState({ buildings }));
    }

    getBuildings(e){
        const querystring = e.target.value;
        fetch('/building?querystring=' + querystring)
            .then(res => res.json())
            .then(buildings => this.setState({ buildings: buildings, listToShow: "buildings" }));

    }

    handler(e){
        e.preventDefault();
        let buildingid = e.target.parentNode.id;
        fetch('/floor?buildingid=' + buildingid)
            .then(res => res.json())
            .then(floors => this.setState({ floors: floors, listToShow: "floors" }));
    }
    render() {
        for(let building of this.state.buildings) { building.handler = this.handler; }
        let mappedList;
        if(this.state.listToShow === "buildings")
            mappedList  = <MapComponents component={Building} for={this.state.buildings} />;
        else if (this.state.listToShow === "floors")
            mappedList  = <MapComponents component={Floor} for={this.state.floors} />;
        return (
                <div style={rightpaneStyle}>
                    <input type="text"
                           style={searchStyle}
                           ref="searchQueryInput"
                           placeholder="Filter by building properties"
                           onChange={this.getBuildings}
                    />
                    <div className="list">
                        {mappedList}
                    </div>
                </div>
        );
    }
}

export default rightpane;