import {FETCH_DECKS, ADD_DECK, ADD_QUESTION} from './types'
import {fetchDecks} from '../utils/Storage'

export function getDecks(decks) {
    return {
        type: FETCH_DECKS,
        decks
    }
    
}

export const addDeck = deck => ({
    type: ADD_DECK,
    deck,
});

export const addQuestionToDeck = (title, question, answer, questions) => ({
    type: ADD_QUESTION,
    title,
    question,
    answer,
    questions
});