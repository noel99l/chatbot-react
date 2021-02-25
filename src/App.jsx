
import React from 'react';
import './assets/styles/style.css';
import FormDialog from './components/forms/formDialog';
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
        this.handleClose = this.handleClose.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
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
                setTimeout(() => this.displayNextQuestion(nextQuestionId), 500)
                break;
            case (/^https:*/.test(nextQuestionId)):
                const a = document.createElement('a');
                a.href = nextQuestionId;
                a.target = '_blank';
                a.click();
                break;
            case (nextQuestionId === 'contact'):
                this.handleClickOpen();
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

                setTimeout(() => this.displayNextQuestion(nextQuestionId), 500)
                break;
        }
    }
    
    componentDidMount() {
        const initAnswer = ''
        this.selectedAnswer(initAnswer, this.state.currentId)
    }

    componentDidUpdate() {
        const scrollArea = document.getElementById('scroll-area')
        if(scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight
        }
    }
    handleClickOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };
    
    render() {
        return(
            <section className="c-section">
                <div className="c-box">
                    <Chats chats={this.state.chats}/>
                    <AnswersList answers={this.state.answers} select={this.selectedAnswer}/>
                    <FormDialog open={this.state.open} handleClose={this.handleClose}/>
                </div>
            </section>
        )
    }
}