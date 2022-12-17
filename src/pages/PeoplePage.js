import React from 'react';
import { View, StyleSheet } from 'react-native';
import PeopleList from '../components/PeopleList';
import { FloatingAction } from 'react-native-floating-action';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as firebase from 'firebase/compat';

export default class PeoplePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            people: []
        }
    }

    componentDidMount() {
        var db = firebase.database();

        db.ref('/usr/people').on('value', querySnapshot => {
            let data = []

            querySnapshot.forEach((child) => {
                data.push({
                    id: child.val().id,
                    nome: child.val().nome,
                });
            })

            console.log(data)
            this.setState({
                people: data
            })
        })
    }

    addPerson() {
        var db = firebase.database();
        db.ref('/usr/people').push({ nome: "Alguem" })
            .then(() => console.info('inserido'))
            .catch((error) => console.info(`deu erro: ${error}`))
    }

    render() {
        const actions = [
            {
                text: "Nova Pessoa",
                icon: require("../img/add_person.png"),
                name: "btnNovaPessoa",
                position: 2
            }
        ];
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <PeopleList people={this.state.people} />
                </View>

                <FloatingAction
                    actions={actions}
                    onPressItem={ () => this.addPerson()}
                />

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});