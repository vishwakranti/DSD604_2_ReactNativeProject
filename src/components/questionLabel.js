import React from "react";

const QuestionLabel = ({ props }) => {
  return (
    <div className='justify-content-md-center' style={{ height: '50px' }}>
      <h3 className={props ? "d-block pt-20" : "d-none"}>
        What is the meaning of <span className="mark">
          {props ? props.Place_name + '?' : ''}</span>
      </h3>
      <blockquote className={props ? "d-block text-muted p-0" : "d-none text-muted p-0"}>
        {props ? 'Hint: ' + props.Hint + '?' : ''}
      </blockquote>
    </div>
  );
}

export default QuestionLabel;