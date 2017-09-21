import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import Mapcomponents from 'react-map-components';
import HTML5Backend from 'react-dnd-html5-backend';
import MonitoredMeetingRooms from './monitoredMeetingRooms';
import MonitoredRestRooms from './monitoredRestRooms';
import RightPane from './rightpane';

 class container extends Component {
    render() {
        const genders = [{gender: 'male'},{gender: 'female'}];
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div>
                    <Mapcomponents component={MonitoredRestRooms} for={genders} />
                    <MonitoredMeetingRooms />
                    <RightPane />
                </div>
            </DragDropContextProvider>
        );
    }
}

export default container;