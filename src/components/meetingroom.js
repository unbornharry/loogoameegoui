import React, { Component } from 'react';
import request from 'superagent';
import CircularProgressbar from 'react-circular-progressbar';

const meetingroomStyle = {
    float: 'left',
    background: '#e3e5e6',
    borderRadius: '30px',
    color: 'red',
    fontSize: '18px',
    textDecoration: 'none',
    width: '300px',
    height: '60px',
    margin: '5px'
};

const meetingroomUsedStyle = {
    float: 'left',
    background: '#e3e5e6',
    borderRadius: '30px',
    color: 'red',
    fontSize: '18px',
    textDecoration: 'none',
    width: '300px',
    height: '60px',
    margin: '5px'
};

const meetingroomHoverStyle = {
    float: 'left',
    background: 'white',
    borderRadius: '30px',
    fontSize: '18px',
    textDecoration: 'none',
    width: '300px',
    height: '60px',
    margin: '5px',
    boxShadow: '10px 10px 5px #888888'
};

const meetingroomAvailableStyle = {
    float: 'left',
    background: 'white',
    borderRadius: '30px',
    color: 'green',
    fontSize: '18px',
    textDecoration: 'none',
    width: '300px',
    height: '60px',
    margin: '5px'
};

const meetingroomReservedStyle = {
    float: 'left',
    background: 'yellow',
    borderRadius: '30px',
    color: 'green',
    fontSize: '18px',
    textDecoration: 'none',
    width: '300px',
    height: '60px',
    margin: '5px'
};

const floatleft = {
    float: 'left',
    margin: '0 0 0 10px',
    verticalAlign: 'middle',
    lineHeight: '60px',
    width: '230px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
};

const floatright = {
    float: 'right',
    lineHeight: '60px',
    verticalAlign: 'middle'
};

export default class meetingroom extends Component {
    constructor(props){
        super(props);
        this.state = {hover: false, reserved: this.props.reserved, occupantcount: this.props.occupantcount};
        this.hover = this.hover.bind(this);
        this.unHover = this.unHover.bind(this);
        this.reserve = this.reserve.bind(this);
    }
    componentWillReceiveProps(newProps) {
        this.setState({reserved: newProps.reserved, occupantcount: newProps.occupantcount});
    }
    hover(){
        this.setState({hover: true});
    }
    unHover(){
        this.setState({hover: false});
    }
    reserve() {
        if (this.state.occupantcount === 0 && this.state.reserved === 'unreserved') {
            const reserveMeetingroomResponse = request.put('/meetingroom/' + this.props.meetingroomid + '/reserve');
            reserveMeetingroomResponse.end(function (err, res) {
                if (err) {
                    console.error("error occurred:" + err);
                    return "error";
                }
                if (res.statusCode === 200) {
                    this.setState({reserved: 'reserved'});
                }
            }.bind(this));
        }
        else if (this.state.occupantcount === 0 && this.state.reserved === 'reserved'){
            const unreserveMeetingroomResponse = request.put('/meetingroom/' + this.props.meetingroomid + '/unreserve');
            unreserveMeetingroomResponse.end(function (err, res) {
                if (err) {
                    console.error("error occurred:" + err);
                    return "error";
                }
                if (res.statusCode === 200) {
                    this.setState({reserved: 'unreserved'});
                }
            }.bind(this));
         }
    }
    getmeetingroomStyle(){
        if(this.state.occupantcount === 0 && this.state.reserved === 'unreserved')
            return meetingroomAvailableStyle;
        else if (this.state.occupantcount === 0 && this.state.reserved === 'reserved')
            return meetingroomReservedStyle;
        else if (this.state.occupantcount !== 0)
            return meetingroomUsedStyle;
    }
    getmeetingroomHoverStyle(){
        if (this.state.hover) {
            return meetingroomHoverStyle;
        } else if (!this.state.hover){
            return meetingroomStyle;
        }
    }
    render() {
        let { meetingroomid, meetingroomname, meetingroomdisplayname, occupancy} = this.props;
        return (
            <div type="meetingroom"
                 id={meetingroomid}
                 style={{...this.getmeetingroomHoverStyle(), ...this.getmeetingroomStyle() }}
                 key={meetingroomname}
                 onMouseOver={this.hover}
                 onMouseOut={this.unHover}
                onDoubleClick={this.reserve}>
                <div style={floatleft}>{meetingroomdisplayname} ({occupancy})</div>
                <CircularProgressbar style={floatright}
                    percentage={Math.floor(this.state.occupantcount/this.props.occupancy * 100) > 100 ? 100 : Math.floor(this.state.occupantcount/this.props.occupancy * 100)}
                    strokeWidth={15}
                    initialAnimation={true}
                    classForPercentage={(percent) => percent < 100 ? 'incomplete' : 'complete'}
                    textForPercentage={(pct) => this.state.occupantcount}
                />
            </div>
        );
    }
};