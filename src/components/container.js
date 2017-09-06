import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import Mapcomponents from 'react-map-components';
import HTML5Backend from 'react-dnd-html5-backend';
import MonitoredMeetingRooms from './monitoredMeetingRooms';
import MonitoredRestRooms from './monitoredRestRooms';
import Rightpane from './rightpane';

 class container extends Component {
    static render() {
        const genders = [{gender: 'male'},{gender: 'female'}];
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div>
                    <Mapcomponents component={MonitoredRestRooms} for={genders} />
                    <MonitoredMeetingRooms />
                    <Rightpane />
                </div>
            </DragDropContextProvider>
        );
    }
}

export default container;