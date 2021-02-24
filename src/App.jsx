
import React from 'react';
import './assets/styles/style.css';
import { AnswersList, Chats } from './components/index';
import defaultDataset from "./dataset";

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answers: [],
            chats: [],
            currentId: "init",
            dataset: defaultDataset,
            open: false
        }
        this.selectedAnswer = this.selectedAnswer.bind(this)
    }

    displayNextQuestion = (nextQuestionId) => {
        const chats = this.state.chats
        chats.push({
            text: this.state.dataset[nextQuestionId].question,
            type: 'question'
        })

        this.setState({
            answers: this.state.dataset[nextQuestionId].answers,
            chats: chats,
            currentId: nextQuestionId
        })
    }

    selectedAnswer = (selectedAnswer, nextQuestionId) => {
        switch(true) {
            case (nextQuestionId ==='init'):
                this.displayNextQuestion(nextQuestionId)
                break;
            default: 
                const chats = this.state.chats;
                chats.push({
                    text: selectedAnswer,
                    type: 'answer'
                })
        
                this.setState({
                    chats: chats
                    // chats: this.state.chats.push(chat) は直接stateを書き換えてしまっているのでNG
                })
                this.displayNextQuestion(nextQuestionId)
                break;
        }
    }
    
    componentDidMount() {
        const initAnswer = ''
        this.selectedAnswer(initAnswer, this.state.currentId)
    }
    
    render() {
        return(
            <section className="c-section">
                <div className="c-box">
                    <Chats chats={this.state.chats}/>
                    <AnswersList answers={this.state.answers} select={this.selectedAnswer}/>
                </div>
            </section>
        )
    }
}