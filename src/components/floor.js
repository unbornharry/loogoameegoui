import React, { Component } from 'react';

const floorStyle = {
    float: 'left',
    background: '#e3e5e6',
    borderRadius: '28px',
    color: 'black',
    fontSize: '20px',
    padding: '10px 20px 20px 20px',
    textDecoration: 'none',
    width: '23vw',
    height: '30px',
    margin: '5px',
};

const floorHoverStyle = {
    float: 'left',
    background: '#4286f4',
    borderRadius: '28px',
    color: 'black',
    fontSize: '20px',
    padding: '10px 20px 20px 20px',
    textDecoration: 'none',
    width: '23vw',
    height: '30px',
    margin: '5px',
};

const floorNameStyle = {
    fontWeight: 'bolder',
    verticalAlign: 'middle',
    lineHeight: '30px',
    align: 'center',
    textAlign: 'center'
};

export default class floor extends Component {
    constructor(props){
        super(props);
        this.state = {hover: false};
        this.dragStart = this.dragStart.bind(this);
        this.hover = this.hover.bind(this);
        this.unHover = this.unHover.bind(this);
    }
    dragStart(e){
        let transferData = {"floorid" : e.target.id };
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
            return floorHoverStyle;
        } else {
            return floorStyle;
        }
    }
    render() {
        const { floorid, floorname} = this.props;

        return (
            <div type="floor"
                 id={floorid}
                 style={this.style()}
                 key={floorname}
                 draggable='true'
                 onDragStart={this.dragStart}
                 onMouseOver={this.hover}
                 onMouseOut={this.unHover}
                 onClick = {this.props.handler}>
                <div style={floorNameStyle}>{floorname}</div>
            </div>
        );
    }
}