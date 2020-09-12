import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

const PeopleList = props => {
    const { people } = props;
    const r = people.map(p => {
        const { id, nome } = p;
        return <View style={styles.container} key={id}>
            <Text style={[styles.default, styles.id]} > {id}</Text>
            <Text style={[styles.default, styles.nome]} >{nome} </Text>
        </View>
    });

    return (
        <ScrollView>
            {r}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    default: {
        padding: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "#d6d7da",
        borderStyle: 'solid'
    },
    id: {
        flex: 0.1,
        textAlign: 'center'
    },
    nome: {
        flex: 0.9
    }
});

export default PeopleList;