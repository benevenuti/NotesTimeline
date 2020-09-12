import React from 'react';
import { Text, View } from 'react-native';
import PeopleList from '../components/PeopleList';
import peopleJson from '../../people.json';

export default class PeoplePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            people: []
        }
    }

    componentDidMount() {
        this.setState({
            people: peopleJson
        })
    }

    render() {
        return (
            <View>
                <PeopleList people={this.state.people} />
            </View>
        )
    }
}