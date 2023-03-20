import React from "react";

const Results = (props ) => {
    return (
        <div className="row mt-2">
            <div className="col-sm-6">
                <div className="card m-5" style={{ margin: '0 auto' }}>
                    <div className="card-header">
                        Correct Guess
                    </div>
                    <ul className="list-group list-group-flush">
                        {props.correctGuess.reverse().map((item) => {
                            return (<li className="list-group-item">{item}</li>);
                        })}
                    </ul>
                </div>
            </div>


            <div className="col-sm-6">
                <div className="card m-5" style={{ margin: '0 auto' }}>
                    <div className="card-header">
                        Incorrect Guess
                    </div>
                    <ul className="list-group list-group-flush">
                        {props.incorrectGuess.reverse().map((item) => {
                            return (<li className="list-group-item">{item}</li>);
                        })}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default Results;