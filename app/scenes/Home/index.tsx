import React from 'react';
import { TextInput, Button, SafeAreaView, View, Picker, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { RootStackParamList } from '../../../App';
import styles from './styles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = { navigation: HomeScreenNavigationProp; };

type State = {
    playerName: string;
    gameCode: string;
    selectedGame: string;
};

export default class Home extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            playerName: "",
            gameCode: "",
            selectedGame: "jaipur",
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View>
                        <Text>Game Code</Text>
                        <TextInput
                            onChangeText={gameCode => this.setState({ gameCode })}
                            value={this.state.gameCode}
                            style={styles.input}
                        />
                    </View>
                    <View>
                        <Picker
                            selectedValue={this.state.selectedGame}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedGame: itemValue })}
                        >
                            <Picker.Item label="Jaipur" value="jaipur" />
                            {/* <Picker.Item label="Splendor" value="splendor" /> */}
                            <Picker.Item label="Codenames" value="codenames" />
                        </Picker>
                    </View>
                    <View>
                        <Button
                            title="Board View"
                            onPress={() => this.props.navigation.navigate('Board', { gameName: this.state.selectedGame, gameCode: this.state.gameCode })}
                        />
                    </View>
                    <View>
                        <TextInput
                            onChangeText={playerName => this.setState({ playerName })}
                            value={this.state.playerName}
                            style={styles.input}
                        />
                        <Button
                            title="User View"
                            disabled={this.state.playerName === "" || this.state.playerName === "board" || this.state.gameCode === ""}
                            onPress={() => this.props.navigation.navigate('Hand', { playerName: this.state.playerName, gameName: this.state.selectedGame, gameCode: this.state.gameCode })}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>);
    }
}
