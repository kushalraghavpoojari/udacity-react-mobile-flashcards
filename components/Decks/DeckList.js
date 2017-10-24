import React, { Component } from 'react'
import {View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity,} from 'react-native'
import {getDecks} from '../../actions'
import {fetchDecks} from '../../utils/Storage'
import {connect} from 'react-redux'
import DeckItem from './DeckItem'

class DeckList extends Component {
    
    componentWillMount() {
        const {dispatch, getAllDecks} = this.props
        fetchDecks().then((decks) =>{
            dispatch(getAllDecks(decks))
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const {decks, navigation} = this.props
        return (
            (decks) ? 
            <View style={styles.deck}>
               
                <FlatList
                    data={Object.values(decks).sort((a, b) => a.title > b.title)}
                    renderItem={({ item }) => <DeckItem item={item} navigate={navigation}/>}
                    keyExtractor={(item, index) => index}/>

            </View> 
            : 
            <View>
                <Text>No data</Text>
            </View>
        );
    }

}


function mapStateToProps(decks) {
    return {
        decks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllDecks: (decks) => dispatch(getDecks(decks))
    }
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        height: Dimensions.get('window').height
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);