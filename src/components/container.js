import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MonitoredMeetingRooms from './monitoredMeetingRooms';
import MonitoredMensRooms from './monitoredMensRooms';
import Rightpane from './rightpane';

export default class Container extends Component {
    render() {
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div>
                    <MonitoredMensRooms />
                    <MonitoredMeetingRooms />
                    <Rightpane />
                </div>
            </DragDropContextProvider>
        );
    }
}