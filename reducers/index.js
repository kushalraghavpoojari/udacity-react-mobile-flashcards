import {FETCH_DECKS, ADD_DECK, ADD_QUESTION} from '../actions/types'

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_DECKS: 
            console.log(action)
            return {
                ...state,
                ...action.decks
            };
        case ADD_DECK: 
            const {deck} = action.deck
            console.log({...state, deck:{}})
            return {...state, deck:{}};
        case ADD_QUESTION: 
            const {questions, question, answer} = action
            questions.push({question, answer})
            let newQuestions = questions
            return {
                ...state,
                [action.title]: {
                    ...state[action.title], questions: newQuestions
                }
            }
            //return {};
            
        default: 
            return state;
    }
}