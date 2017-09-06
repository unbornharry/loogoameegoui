import React, { Component } from 'react';
import request from 'superagent';
import CircularProgressbar from 'react-circular-progressbar';

const meetingroomStyle = {
    float: 'left',
    background: '#e3e5e6',
    borderRadius: '30px',
    color: '#5c455c',
    fontSize: '20px',
    textDecoration: 'none',
    width: '300px',
    height: '60px',
    margin: '5px',

};

const meetingroomHoverStyle = {
    float: 'left',
    background: 'white',
    borderRadius: '30px',
    color: '#5c455c',
    fontSize: '20px',
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
        this.state = {hover: false, status: this.props.status};
        this.drag = this.drag.bind(this);
        this.hover = this.hover.bind(this);
        this.unHover = this.unHover.bind(this);
    }
    componentDidMount() {
        setInterval(function() {
            const meetingroomResponse = request.get('/meetingroom/' + this.props.meetingroomid);
            meetingroomResponse.end(function(err, res) {
                if(err) {
                    console.error("error occurred:" + err);
                    return "error";
                }
                this.setState({status: res.body[0].status});
            }.bind(this));
        }.bind(this), 10000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    drag(e){
        e.dataTransfer.setData('text', e.target.id);
    }
    hover(){
        this.setState({hover: true});
    }
    unHover(){
        this.setState({hover: false});
    }
    getmeetingroomStyle(){
        if (this.state.hover) {
            return meetingroomHoverStyle;
        } else {
            return meetingroomStyle;
        }
    }
    render() {
        let { meetingroomid, meetingroomname, meetingroomdisplayname, occupantcount, occupancy } = this.props;
        // const pctDisplay = occupantcount + "/" + occupancy;
        return (
            <div type="meetingroom"
                 id={meetingroomid}
                 style={this.getmeetingroomStyle()}
                 key={meetingroomname}
                 onMouseOver={this.hover}
                 onMouseOut={this.unHover}>
                <div style={floatleft}>{meetingroomdisplayname}</div>
                <CircularProgressbar style={floatright}
                    percentage={occupantcount/occupancy * 100}
                    strokeWidth={15}
                    initialAnimation={true}
                    textForPercentage={(pctDisplay)=>pctDisplay}
                />
            </div>
        );
    }
};