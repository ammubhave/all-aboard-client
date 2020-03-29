import React from 'react';
import { TextInput, Button, SafeAreaView, View, Picker } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { RootStackParamList } from '../../../App';
import styles from './styles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = { navigation: HomeScreenNavigationProp; };

type State = {
    playerName: string;
    selectedGame: string;
};

export default class Home extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            playerName: "",
            selectedGame: "jaipur",
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                    <View>
                        <Picker
                            selectedValue={this.state.selectedGame}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedGame: itemValue })}
                        >
                            <Picker.Item label="Jaipur" value="jaipur" />
                        </Picker>
                    </View>
                    <View>
                        <Button
                            title="Board View"
                            onPress={() => this.props.navigation.navigate('Board', { game: this.state.selectedGame })}
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
                            disabled={this.state.playerName === ""}
                            onPress={() => this.props.navigation.navigate('Hand', { playerName: this.state.playerName, game: this.state.selectedGame })}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>);
    }
}
