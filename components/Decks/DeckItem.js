import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

class DeckItem extends Component {

    render() {
        const {item} = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigate.navigate('IndividualDeck', item)}>
                    <View style={styles.deck}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.questions}>{item.questions? item.questions.length : 0} cards</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    deck: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 28
    },
    questions: {
        fontSize: 16
    }
})

export default DeckItem;