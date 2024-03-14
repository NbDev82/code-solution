import { useEffect, useState } from 'react';
import './ProblemScreen.scss'
import axios from "axios";

function ProblemScreen() {
    const [problem,setProblem] = useState("");

    useEffect(() => {
        fetchProblem("Palindrome-Number").then(data =>{
            setProblem(data);
            console.log(data)
        });
    }, []);

    const fetchProblem = async (problemName) => {
        try {
            const response = await axios.get('http://localhost:8000/api/problems/' + problemName);
            return response.data
        } catch (error) {
            console.error('Error fetching problem:', error);
            return error.response?.data?.message
        }
    };

    return (
        <>
            <div className="problem">
                <h3 className="problem__name">{problem.name}</h3>
                {problem && (
                    <p className="problem__description" dangerouslySetInnerHTML={{ __html: problem?.description?.replace(/\n/g, "<br/>") }} />
                )}
                <div className="problem__details">
                    <span className="problem__point">Point: {problem.point}</span>
                    <span className="problem__difficulty-level">Difficulty: <strong className={`problem__difficulty-level__${problem?.difficultyLevel?.toLowerCase()}`}>{problem?.difficultyLevel}</strong></span>
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
