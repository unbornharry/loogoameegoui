import React, { Component } from 'react';
import Building from './building';
import MapComponents from 'react-map-components';

const searchStyle = {
    width: '20vw',
    position: 'relative',
    align: 'center',
    radius: '8px',
    height: '30px',
    fontSize: 'large',
    textAlign: 'center',
    margin: '20px 0 20px 0'
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
                <div className="rightpane">
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