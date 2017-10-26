import {AsyncStorage} from 'react-native'

export const KEY = '@MySuperStore:key2'

let data = {
    React: {
        title: 'React',
        questions: [
        {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
        },
        {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
        }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
        {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
        ]
    }
};

export function fetchDecks () {
    return AsyncStorage.getItem(KEY).then(function(results){
        return results === null ? initialData() : JSON.parse(results)
    });
}


export function initialData() {
    AsyncStorage.setItem(KEY, JSON.stringify(data));
    return data;
}

export function addNewDeck(deck) {
    console.log(JSON.stringify(deck))
    return AsyncStorage.mergeItem(KEY, JSON.stringify(deck));
}

export function addQuestion (title, question, answer) {
    return AsyncStorage.getItem(KEY).then(function(results){
        let data = JSON.parse(results)
        data[title].questions.push({question, answer})
        let newData = JSON.stringify(data)
        AsyncStorage.mergeItem(KEY, newData)
    });
}