import React from 'react'
import AnswerBox from '../boxes/AnswerBox'

const Answers = ({answers, openedThread}) => (
    <div>
      {answers.map((answer, i) =>
        <AnswerBox key={i} 
        text={answer.text} 
        likes={answer.likes}
        location={answer.location}
        openedThread={openedThread}
        />
      )}
    </div>
)

export default Answers