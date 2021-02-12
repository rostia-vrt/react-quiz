import React, {Component} from 'react'
import classes from '../Quiz/Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'


class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerstate: null,
        quiz: [
            { question: 'Якого кольору небо?',
                rightAnswerId: 2, 
                id: 1,
                answers: [
                    {text: 'Чорний' , id: 1},
                    {text: 'Синій', id: 2},
                    {text: 'Зелений', id: 3},
                    {text: 'Червоний', id: 4}
                ]
            },
            { question: 'В котрому році заснували Львів?',
                rightAnswerId: 4, 
                id: 2,
                answers: [
                    {text: '1568' , id: 1},
                    {text: '1517', id: 2},
                    {text: '980', id: 3},
                    {text: '1256', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = answerId => {
        const question = this.state.quiz[this.state.activeQuestion]

        if(question.rightAnswerId === answerId){

            this.setState({
                answerState: {[answerId]: 'success'}
            })

            const timeOut = window.setTimeout(() => {
                if(this.isQuizFinished()) {
                    console.log('Finished');
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1
                    })
                }

                window.clearTimeout(timeOut)
            }, 1000)

            
        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }

        
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }


    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Дайте відповідь на запитання</h1>

                    <ActiveQuiz
                    answers={this.state.quiz[this.state.activeQuestion].answers}
                    question={this.state.quiz[this.state.activeQuestion].question}
                    onAnswerClick={this.onAnswerClickHandler}
                    quizLength={this.state.quiz.length}
                    answerNumber={this.state.activeQuestion + 1}
                    state={this.state.answerstate}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz