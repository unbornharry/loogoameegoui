import React, { Component } from 'react';

const buildingStyle = {
    float: 'left',
    background: '#e3e5e6',
    borderRadius: '28px',
    color: '#5c455c',
    fontSize: '20px',
    padding: '10px 20px 20px 20px',
    textDecoration: 'none',
    width: '200px',
    height: '100px',
    margin: '5px',
};

const buildingHoverStyle = {
    float: 'left',
    background: '#4286f4',
    borderRadius: '28px',
    color: '#5c455c',
    fontSize: '20px',
    padding: '10px 20px 20px 20px',
    textDecoration: 'none',
    width: '200px',
    height: '100px',
    margin: '5px',
};

const buildingNameStyle = {
    fontWeight: 'bolder'
};

export default class building extends Component {
    constructor(props){
        super(props);
        this.state = {hover: false};
        this.dragStart = this.dragStart.bind(this);
        this.hover = this.hover.bind(this);
        this.unHover = this.unHover.bind(this);
    }
    dragStart(e){
        let transferData = {"buildingid" : e.target.id };
        e.dataTransfer.setData('text', JSON.stringify(transferData));
    }
    hover(){
        this.setState({hover: true});
    }
    unHover(){
        this.setState({hover: false});
    }
    style() {
        if (this.state.hover) {
            return buildingHoverStyle;
        } else {
            return buildingStyle;
        }
    }
    render() {
        const { buildingid, buildingname, address1, city, state, zip } = this.props;

        return (
            <div type="building"
                 id={buildingid}
                 style={this.style()}
                 key={buildingname}
                 draggable='true'
                 onDragStart={this.dragStart}
                 onMouseOver={this.hover}
                 onMouseOut={this.unHover}>
                <div style={buildingNameStyle}>{buildingname}</div>
                <div>{address1}</div>
                <div>{city}</div>
                <div>{state}</div>
                <div>{zip}</div>
            </div>
        );
    }
}