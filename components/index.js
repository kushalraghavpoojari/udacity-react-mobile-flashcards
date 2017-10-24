import React, { Component } from 'react'
import {View, Text} from 'react-native'
import {TabNavigator, StackNavigator} from 'react-navigation'
import DeckList from './Decks/DeckList'
import NewDeck from './Decks/NewDeck'
import IndividualDeck from './Decks/IndividualDeck'
import NewQuestion from './Cards/NewQuestion'
import Quiz from './Quiz/Quiz'
import {Ionicons} from '@expo/vector-icons'
import {blue, appleBlue} from '../utils/colors'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../reducers/index.js'
import {setLocalNotification} from '../utils/Notifications'

const Tabs = TabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'All Decks',
            tabBarIcon: () => <Ionicons name='ios-albums-outline' size={30} color={appleBlue}/>
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: () => <Ionicons name='ios-add' size={30} color={appleBlue}/>
        },
    },
});

const Stack = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {title: 'Home'},
    },
    IndividualDeck: {
        screen: IndividualDeck,
        navigationOptions: {
            headerTintColor: '#000',
        },
    },
    NewQuestion: {
        screen: NewQuestion,
        navigationOptions: {
            headerTintColor: '#000',
            title: 'Add Card'
        },
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: '#000',
            title: 'Quiz'
        },
    }
});

class Index extends Component {

    componentWillMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <Stack />
                </View>
            </Provider>
        );
    }

}

export default Index;