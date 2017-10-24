import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import {addQuestion} from '../../utils/Storage'
import {connect} from 'react-redux'
import {addQuestionToDeck} from '../../actions'

class NewQuestion extends Component {
    state = {
        question: '',
        answer: ''
    }
    submitQuestion = () => {
        console.log(this.props)
        const {question, answer} = this.state
        if(question === '' || answer === '') {
            Alert.alert('Error!', 'Question & Answer has to be filled')
            return
        }
        let self = this
        addQuestion(this.props.navigation.state.params.title, question, answer).then(function() {
            console.log(self.props)
            const {title, questions} = self.props.navigation.state.params
            self.props.addQuestionToDeck(title, question, answer, questions)
            self.props.navigation.goBack()
        })

    }
    render() {
        const {question, answer} = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.newQuestion}>New Question</Text>
                <TextInput 
                    defaultValue="Question"
                    value={question}
                    style={styles.questionInput}
                    onChangeText={question => this.setState({question})}
                />

                <Text style={styles.newQuestion}>Answer:</Text>

                <TextInput 
                    defaultValue="Answer"
                    value={answer}
                    style={styles.answerInput}
                    onChangeText={answer => this.setState({answer})}
                />

                <TouchableOpacity
                    onPress={this.submitQuestion} style={styles.submitBtn}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    newQuestion: {
        fontSize: 15,
        marginTop: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    questionInput: {
        borderRadius: 7,
		borderColor: '#000000',
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        backgroundColor: '#fff',
        height: 40
    },
    answerInput: {
        borderRadius: 7,
		borderColor: '#000000',
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        backgroundColor: '#fff',
        height: 40
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

function mapStateToProps(state) {
    return {
        decks: state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addQuestionToDeck: (title, question, answer, questions) => dispatch(addQuestionToDeck(title, question, answer, questions))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);