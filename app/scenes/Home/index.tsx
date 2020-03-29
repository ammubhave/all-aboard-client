import React from 'react';
import { TextInput, Button, SafeAreaView, View } from 'react-native';
import { Actions } from 'react-native-router-flux'
import styles from './styles';

type Props = {};

type State = {
    playerName: string
};

export default class Home extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            playerName: ""
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Button
                        title="Board View"
                        onPress={() => Actions.Board()}
                    />
                </View>
                <View style={styles.separator} />
                <View>
                    <TextInput
                        onChangeText={playerName => this.setState({ playerName })}
                        value={this.state.playerName}
                        style={styles.input}
                    />
                    <Button
                        title="User View"
                        onPress={() => Actions.Hand({ playerName: this.state.playerName })}
                    />
                </View>
            </SafeAreaView>);
    }
}
