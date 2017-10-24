import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {clearLocalNotificiation, setLocalNotificiation} from '../../utils/Notifications'

class Quiz extends Component {
    state = {
        index: 0,
        correct: 0,
        shouldShow: false
    }

    showHide = () => {
        this.setState({shouldShow: !this.state.shouldShow})
    }

    isCorrect = () => {
        const {index, correct} = this.state;
        this.setState({index: index + 1, correct: correct + 1, shouldShow: false});
    }

    isNotcorrect = () => {
        this.setState({index: this.state.index + 1});
    }

    startQuiz = () => {
        this.setState({index: 0, correct: 0, shouldShow: false});
        clearLocalNotificiation().then(setLocalNotificiation)
    };

    goBackToDeck = () => {
        this.props.navigation.goBack();
    }

    render() {
        console.log(this.props)
        const {index, correct, shouldShow} = this.state
        const {questions} = this.props.navigation.state.params
        const questionExists = index < questions.length;

        return (
            <View style={{flex: 1}}>
                {questionExists ?
                    <View style={{flex:1}}>
                        <View style={styles.index}>
                            <View>
                                <Text style={styles.indexText}>{questions.length - index} / {questions.length}</Text>
                            </View>
                        </View>

                        <View style={[styles.group, {flex: 4}]}>
                            <View>
                                {shouldShow ? (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[index].answer}</Text>

                                        <TouchableOpacity onPress={this.showHide} style={styles.buttonQuestion}>
                                            <Text style={styles.question}>Question</Text>
                                        </TouchableOpacity>

                                    </View>) : (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[index].question}</Text>

                                        <TouchableOpacity onPress={this.showHide} style={styles.buttonAnswer}>
                                            <Text style={styles.answer}>Answer</Text>
                                        </TouchableOpacity>

                                    </View>
                                )}
                            </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
                            <View style={styles.container}>

                                <TouchableOpacity onPress={this.isCorrect} style={styles.buttonAnswer}>
                                    <Text style={styles.answer}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.isNotcorrect} style={styles.buttonQuestion}>
                                    <Text style={styles.question}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                : 
                    <View style={{flex: 1}}>
                        <View style={styles.scoreView}>
                            <Text style={styles.score}>Score: {correct}</Text>
                        </View>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 3}}>
                            <View style={styles.container}>

                                <TouchableOpacity onPress={this.startQuiz} style={styles.buttonAnswer}>
                                    <Text style={styles.answer}>Start Quiz</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.goBackToDeck} style={styles.buttonQuestion}>
                                    <Text style={styles.question}>Back</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    index: {
        justifyContent: 'flex-start',
        flex: 1
    },
    scoreView: {
        flex: 2, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    score: {
        fontSize: 22,
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    indexText: {
        fontWeight: 'bold',
        fontSize: 18,
        margin: 10
    },
    buttonAnswer: {
        backgroundColor: '#fff',
        marginTop: 20,
        padding: 10,
		borderRadius: 7,
		borderColor: '#70dd2f',
		borderWidth: 1,
        height: 45,
    },
    buttonQuestion: {
        backgroundColor: '#fff',
        marginTop: 20,
        padding: 10,
		borderRadius: 7,
		borderColor: '#ff463f',
		borderWidth: 1,
        height: 45,
    },
    question: {
        fontSize: 18, 
        color: '#ff463f'
    },
    answer: {
        fontSize: 18, 
        color: '#70dd2f'
    }
});

export default Quiz;