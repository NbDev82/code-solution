import { useEffect, useState } from 'react';
import './ProblemScreen.scss'
import axios from "axios";

function ProblemScreen() {
    const [problem,setProblem] = useState("");

    useEffect(() => {
        fetchProblem();
    }, []);

    const fetchProblem = async () => {
        try {
            const problemName = "Missing-Number"
            const response = await axios.get('http://localhost:8000/api/problems/' + problemName);
            setProblem(response.data);
            console.log(response.data)
        } catch (error) {
            setProblem('Error fetching problem:' + error.response?.data?.message)
            console.error('Error fetching problem:', error);
        }
    };

    return (
        <>
            <div className="problem">
                <h3 className="problem__name">{problem.name}</h3>
                <p className="problem__description" dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, "<br/>") }}></p><br/>
                <div className="problem__details">
                    <span className="problem__point">Point: {problem.point}</span>
                    <span className="problem__difficulty-level">Difficulty: <strong className={`problem__difficulty-level__${problem.difficultyLevel.toLowerCase()}`}>{problem.difficultyLevel}</strong></span>
                </div><br/>
                <div className="problem__stats">
                    <span className="problem__accepted-count">Accepted: {problem.acceptedCount}</span>
                    <span className="problem__discuss-count">Discussions: {problem.discussCount}</span>
                    <span className="problem__submission-count">Submissions: {problem.submissionCount}</span>
                </div><br/>
                <p className="problem__acceptance-rate">Acceptance Rate: {problem.acceptanceRate}%</p>
            </div>
        </>
    )
}

export default ProblemScreen
