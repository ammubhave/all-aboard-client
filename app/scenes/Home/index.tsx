import React from 'react';
import { TextInput, SafeAreaView, View, Picker, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { RootStackParamList } from '../../../App';
import styles from './styles';
import { SERVER_URI } from "../../config/constants";
import Button from "../../components/Button";

type HomeSceneNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = { navigation: HomeSceneNavigationProp; };

type State = {
    playerName: string;
    gameCode: string;
    selectedGame: string;
    password: string;
};

export default class Home extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            playerName: "",
            gameCode: "",
            selectedGame: "",
            password: "",
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View>
                        <Text>Server Address</Text>
                        <TextInput value={SERVER_URI} style={styles.input} editable={false} />
                    </View>
                    <View>
                        <Text>Server Password</Text>
                        <TextInput
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            style={styles.input}
                            autoCorrect={false}
                            textContentType="none"
                            autoCapitalize="none"
                            autoCompleteType="off"
                        />
                    </View>
                    <View style={styles.separator} />
                    <View>
                        <Text>Game</Text>
                        <Picker
                            selectedValue={this.state.selectedGame}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedGame: itemValue })}
                            style={{ marginTop: 5, marginBottom: 8 }}
                        >
                            <Picker.Item label="Jaipur" value="jaipur" />
                            <Picker.Item label="Splendor" value="splendor" />
                            <Picker.Item label="Codenames" value="codenames" />
                        </Picker>
                    </View>
                    <View>
                        <Text>Game Code</Text>
                        <TextInput
                            onChangeText={gameCode => this.setState({ gameCode })}
                            value={this.state.gameCode}
                            style={styles.input}
                            autoCorrect={false}
                            textContentType="none"
                            autoCapitalize="none"
                            autoCompleteType="off"
                        />
                    </View>
                    <View style={styles.separator} />
                    <View>
                        <Button
                            title="Board View"
                            disabled={this.state.gameCode === ""}
                            onPress={() => this.props.navigation.navigate('GameScreen', { playerName: 'board', gameName: this.state.selectedGame, gameCode: this.state.gameCode, password: this.state.password })}
                        />
                    </View>
                    <View style={styles.separator} />
                    <View>
                        <Text>Player Name</Text>
                        <TextInput
                            onChangeText={playerName => this.setState({ playerName })}
                            value={this.state.playerName}
                            style={styles.input}
                        />
                        <Button
                            title="Player View"
                            disabled={this.state.playerName === "" || this.state.playerName === "board" || this.state.gameCode === ""}
                            onPress={() => this.props.navigation.navigate('GameScreen', { playerName: this.state.playerName, gameName: this.state.selectedGame, gameCode: this.state.gameCode, password: this.state.password })}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>);
    }
}
