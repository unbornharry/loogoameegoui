import React, { Component } from 'react';
import request from 'superagent';

const meetingroomStyle = {
    float: 'left',
    borderRadius: '30px',
    background: 'white',
    fontSize: '18px',
    textDecoration: 'none',
    width: '300px',
    height: '60px',
    margin: '5px',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '60px',
};

const meetingroomUsedStyle = {
    float: 'left',
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
    fontSize: '18px',
    background: 'white',
    textDecoration: 'none',
    boxShadow: '5px 5px 5px #888888',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '60px',
};

const meetingroomAvailableStyle = {
    float: 'left',
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
    fontSize: '18px',
    textDecoration: 'none',
    width: '300px',
    height: '60px',
    margin: '5px'
};

export default class Meetingroom extends Component {
    constructor(props){
        super(props);
        this.state = {hover: false, reserved: this.props.reserved, occupied: this.props.occupied, occupantcount: this.props.occupantcount};
        this.hover = this.hover.bind(this);
        this.unHover = this.unHover.bind(this);
        this.reserve = this.reserve.bind(this);
    }
    componentWillReceiveProps(newProps) {
        this.setState({reserved: newProps.reserved, occupied: this.props.occupied, occupantcount: newProps.occupantcount});
    }
    hover(){
        this.setState({hover: true});
    }
    unHover(){
        this.setState({hover: false});
    }
    reserve() {
        if (this.state.occupied === 0 && this.state.reserved === 'unreserved') {
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
        else if (this.state.occupied === 0 && this.state.reserved === 'reserved'){
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
    occupy = (e) => {
        e.preventDefault()
        const { updateParent } = this.props;
        const occupyMeetingroomResponse = this.state.occupied ?
            request.put('/meetingroom/' + this.props.meetingroomid + '/unoccupy'):
            request.put('/meetingroom/' + this.props.meetingroomid + '/occupy');
        occupyMeetingroomResponse.end(function (err, res) {
            if (err) {
                console.error("error occurred:" + err);
                return "error";
            }
            if (res.statusCode === 200) {
                this.state.occupied ? this.setState({occupied: 0}) : this.setState({occupied: 1});
            }
            updateParent();
        }.bind(this));
    };
    getmeetingroomStyle(){
        if(this.state.occupied === 0 && this.state.reserved === 'unreserved')
            return meetingroomAvailableStyle;
        else if (this.state.occupied === 0 && this.state.reserved === 'reserved')
            return meetingroomReservedStyle;
        else if (this.state.occupied !== 0)
            return meetingroomUsedStyle;
        else
            return meetingroomStyle;
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
            <div
                id={meetingroomid}
                style={{...this.getmeetingroomHoverStyle(), ...this.getmeetingroomStyle() }}
                key={meetingroomname}
                onMouseOver={this.hover}
                onMouseOut={this.unHover}
                onDoubleClick={this.reserve}
                onContextMenu={this.occupy}
            >
                <div>{meetingroomdisplayname} ({occupancy})</div>
            </div>
        );
    }
};