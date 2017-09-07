import React, { Component } from 'react';
import Building from './building';
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
        this.state = {buildings: []};
        this.getBuildings = this.getBuildings.bind(this)
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
            .then(buildings => this.setState({ buildings }));
    }

    render() {
        return (
                <div style={rightpaneStyle}>
                    <input type="text"
                           style={searchStyle}
                           ref="searchQueryInput"
                           placeholder="Filter by building properties"
                           onChange={this.getBuildings}
                    />
                    <div className="buildinglist">
                        <MapComponents component={Building} for={this.state.buildings} />
                    </div>
                </div>
        );
    }
}

export default rightpane;