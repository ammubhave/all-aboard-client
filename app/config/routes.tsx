import React from 'react';
import { AppLoading } from 'expo';

import { Scene, Router, Stack } from 'react-native-router-flux';

import Home from '../scenes/Home';
import Board from '../scenes/Board';
import Hand from '../scenes/Hand';

import { color, navTitleStyle } from "../styles/theme";

export default class extends React.Component {
    render() {
        return (
            <Router>
                <Stack key="root"
                    hideNavBar={true}
                    navigationBarStyle={{ backgroundColor: "#fff" }}
                    titleStyle={navTitleStyle}>
                    <Scene key="Home" component={Home} title="Home" initial />
                    <Scene key="Board" component={Board} title="" />
                    <Scene key="Hand" component={Hand} title="" />
                </Stack>
            </Router>
        )
    }
}