import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native'
import {addDeck} from '../../actions'
import {connect} from 'react-redux'
import {addNewDeck} from '../../utils/Storage'

class NewDeck extends Component {
    state = {
        deckTitle: ''
    }

    submitDeckTitle = () => {
        const {deckTitle} = this.state
        if(deckTitle === '') {
            Alert.alert('Warning', 'Deck name cannot be empty');
            return 
        }

        addNewDeck(deckTitle)
        console.log(this.props)
        this.props.addDeck(deckTitle)

        this.props.navigation.navigate('IndividualDeck', {title: deckTitle, questions: []})
        this.setState({deckTitle: ''})
    }

    render() {
        let {deckTitle} = this.state 
        return (
            <View style={styles.container}>
                <View style={styles.deck}>
                    <Text style={styles.title}>What is the title of your new deck?</Text>
                    <TextInput 
                        defaultValue="Question"
                        value={deckTitle}
                        style={styles.deckTitle}
                        onChangeText={deckTitle => this.setState({deckTitle})}
                    />
                    <TouchableOpacity
                        onPress={this.submitDeckTitle} style={styles.submitBtn}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
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
        padding: 20
    },
    deckTitle: {
        borderRadius: 7,
		borderColor: '#000000',
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        backgroundColor: '#fff',
        height: 40
    },
    title: {
        fontSize: 34
    },
    questions: {
        fontSize: 16
    },
    submitText: {
        borderWidth: 1,
        marginTop: 10,
        fontSize: 20,
        color: '#fff',
    },
    submitBtn: {
        borderRadius: 7,
        margin: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    }
})


function mapStateToProps(decks) {
    return {
        decks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addDeck: (deck) => dispatch(addDeck(deck))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);