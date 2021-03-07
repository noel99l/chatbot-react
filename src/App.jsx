
import React, { useCallback, useEffect, useState } from 'react';
import './assets/styles/style.css';
import FormDialog from './components/forms/formDialog';
import { AnswersList, Chats } from './components/index';
import defaultDataset from "./dataset";

const App = () => {
    const [answers, setAnswers] = useState([])
    const [chats, setChats] = useState([])
    const [currentId, setCurrentId] = useState("init")
    const [dataset, setDataset] = useState(defaultDataset)
    const [open, setOpen] = useState(false)

    const displayNextQuestion = (nextQuestionId, nextDataset) => {
        addChats({
            text: nextDataset.question,
            type: 'question'
        })

        setAnswers(nextDataset.answers)
        setCurrentId(nextQuestionId)
    }

    const selectAnswer = (selectedAnswer, nextQuestionId) => {
        switch(true) {
            case (/^https:*/.test(nextQuestionId)):
                const a = document.createElement('a');
                a.href = nextQuestionId;
                a.target = '_blank';
                a.click();
                break;
            case (nextQuestionId === 'contact'):
                handleOpen();
                break;
            default: 
                addChats({
                    text: selectedAnswer,
                    type: 'answer'
                })

                setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 500)
                break;
        }
    }

    const addChats = (chat) => {
        setChats(prevChats => {
            return [...prevChats, chat]
        })
    }
    
    useEffect(() => {
        setDataset(defaultDataset)
        displayNextQuestion(currentId, dataset[currentId])
    },[])

    useEffect(() => {
        const scrollArea = document.getElementById('scroll-area')
        if(scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight
        }
    })
    
    const handleOpen = useCallback(() => {
        setOpen(true)
    },[setOpen]);


    const handleClose = useCallback(() => {
        setOpen(false)
    },[setOpen]);
    
    return(
        <section className="c-section">
            <div className="c-box">
                <Chats chats={chats}/>
                <AnswersList answers={answers} select={selectAnswer}/>
                <FormDialog open={open} handleOpen={handleOpen} handleClose={handleClose}/>
            </div>
        </section>
    )
}

export default App;