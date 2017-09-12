import React, { Component } from 'react';
import request from 'superagent';

const restroomStyle = {
    float: 'left',
    background: '#e3e5e6',
    borderRadius: '35px',
    color: '#5c455c',
    fontSize: '18px',
    textDecoration: 'none',
    width: '300px',
    height: '50px',
    margin: '5px',

};

const restroomHoverStyle = {
    float: 'left',
    background: '#4286f4',
    borderRadius: '35px',
    color: '#5c455c',
    fontSize: '18px',
    textDecoration: 'none',
    width: '300px',
    height: '50px',
    margin: '5px'
};

const floatleft = {
    float: 'left',
    margin: '0 0 0 10px',
    verticalAlign: 'middle',
    lineHeight: '50px',
    width: '240px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
};

const restroomImageGreenStyle = {
    float: 'right',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    verticalAlign: 'middle',
    background: 'green',
    borderRadius: '25px'
};

const restroomImageRedStyle = {
    float: 'right',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    verticalAlign: 'middle',
    background: 'red',
    borderRadius: '25px'
};

const restroomImageBlackStyle = {
    float: 'right',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    verticalAlign: 'middle',
    background: 'black',
    borderRadius: '25px'
};


export default class restroom extends Component {
    constructor(props){
        super(props);
        this.state = {hover: false, status: this.props.status};
        this.drag = this.drag.bind(this);
        this.hover = this.hover.bind(this);
        this.unHover = this.unHover.bind(this);
        this.getImage = this.getImage.bind(this);
        this.getRestroomStyle = this.getRestroomStyle.bind(this);
        this.getIconStyle = this.getIconStyle.bind(this);
    }
    componentDidMount() {
        setInterval(function() {
            const restroomResponse = request.get('/restroom/' + this.props.restroomid);
            restroomResponse.end(function(err, res) {
                if(err) {
                    console.error("error occurred:" + err);
                    return "error";
                }
                this.setState({status: res.body[0].status});
            }.bind(this));
        }.bind(this), 5000);
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
    getImage(gender){
        if(gender==='Male')
            return('../images/Men.png');
        else if(gender === 'Female')
            return('../images/Women.png');
    }
    getIconStyle(status){
        if(status === 'active')
            return (restroomImageGreenStyle);
        else if(status === 'closed for cleaning')
            return (restroomImageRedStyle);
        else if(status === 'under service')
            return(restroomImageBlackStyle);
        else
            return (restroomImageGreenStyle);
    }
    getRestroomStyle(){
        if (this.state.hover) {
            return restroomHoverStyle;
        } else {
            return restroomStyle;
        }
    }
    render() {
        let { restroomid, restroomname, restroomdisplayname, gender } = this.props;
        return (
            <div type="restroom"
                 id={restroomid}
                 style={this.getRestroomStyle()}
                 key={restroomname}
                 onMouseOver={this.hover}
                 onMouseOut={this.unHover}>
                <div style={floatleft}>{restroomdisplayname}</div>
                <div>
                    <img src={this.getImage(gender)} alt='Rest Room' style={this.getIconStyle(this.state.status)}/>
                </div>
            </div>
        );
    }
};