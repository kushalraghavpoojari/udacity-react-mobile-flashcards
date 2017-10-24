import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {getDecks} from '../../actions'
import {connect} from 'react-redux'
import {fetchDecks} from '../../utils/Storage'
class IndividualDeck extends Component {
	
	componentWillMount() {
        const {dispatch, getAllDecks} = this.props
        fetchDecks().then((decks) =>{
            dispatch(getAllDecks(decks))
        }).catch(error => {
            console.log(error)
        })
	}
	
	render() {
		const {title, questions} = this.props.navigation.state.params
		return (
			<View style={styles.container}>
				<View style={{flex:2}}>
					<View style={styles.deck}>
						<Text style={styles.title}>{title}</Text>
						<Text style={styles.questions}>{questions.length} cards</Text>
					</View>
				</View>
				<View style={{flex:3}}>
					<TouchableOpacity style={styles.addCard} onPress={() => this.props.navigation.navigate('NewQuestion', {title, questions})}>
						<Text style={styles.cardTitle}>Add Card</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.startQuiz} onPress={() => this.props.navigation.navigate('Quiz', {title, questions})}>
						<Text style={styles.quizTitle}>Start Quiz</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		padding: 20
    },
    deck: {
		flex:1,
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 36
    },
    questions: {
		fontSize: 18,
		marginTop: 10,
		color: '#6E828A'
	},
	addCard:{
		backgroundColor: '#fff',
		marginLeft: 50,
		marginRight: 50,
		marginTop: 50,
        padding: 10,
		borderRadius: 7,
		borderColor: '#000000',
		borderWidth: 1,
        height: 45,
	},
	startQuiz: {
		backgroundColor: '#000000',
		marginLeft: 50,
		marginRight: 50,
		marginTop: 20,
        padding: 10,
		borderRadius: 7,
		borderColor: '#fff',
		borderWidth: 1,
        height: 45,
	},
	cardTitle: {
		fontSize: 24,
		textAlign: 'center'
	},
	quizTitle: {
		fontSize: 24,
		color: '#fff',
		textAlign: 'center'
	}
})

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


export default connect(mapStateToProps, mapDispatchToProps)(IndividualDeck);