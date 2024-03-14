import React, {useContext, useEffect, useState} from 'react';
import "./SubmissionScreen.scss"
import axios from "axios";

function SubmissionScreen() {
    const [submissions, setSubmissions] = useState([])

    useEffect(() => {
        fetchSubmissions(1,"Palindrome Number").then(data => {
            setSubmissions(data)
        })
    },[])

    const fetchSubmissions = async (userId, problemName) => {
        try {
            const response = await axios.get('http://localhost:8000/api/submissions/gets', {
                    params: {
                        userId: userId,
                        problemName: problemName
                    } });
            return response.data;
        } catch (error) {
            console.error('Error fetching problem:', error);
            return error?.response?.data
        }
    };

    return (
        <>
            <table>
                <thead className="table__head">
                    <tr>
                        <th className="table__cell table__cell--status">Status</th>
                        <th className="table__cell table__cell--language">Language</th>
                        <th className="table__cell table__cell--runtime">Runtime</th>
                        <th className="table__cell table__cell--memory">Memory</th>
                        <th className="table__cell table__cell--notes">Notes</th>
                    </tr>
                </thead>
                <tbody>
                {submissions.length > 0 && (
                    <>
                        {submissions.map(submission => (
                            <tr key={submission.id} className="table__row">
                                <td className="table__cell table__cell--status">
                                    <strong className={`table__status-color--${submission.status.toLowerCase()}`}>
                                        {submission.status}
                                    </strong>
                                    <h5>{submission.createdAt}</h5>
                                </td>
                                <td className="table__cell table__cell--language">
                                    <div className="table__icon--language">{submission.language}</div>
                                </td>
                                <td className="table__cell table__cell--runtime">
                                    <div className="table__icon table__runtime-icon" />
                                    {submission.runtime}ms
                                </td>
                                <td className="table__cell table__cell--memory">
                                    <div className="table__icon table__memory-icon" />
                                    {submission.memory}MB
                                </td>
                                <td className="table__cell table__cell--notes">
                                    <div className="table__icon table__notes-icon" />
                                    {/* Add notes logic if available */}
                                </td>
                            </tr>
                        ))}
                    </>
                )}
                </tbody>
            </table>
            {submissions.length === 0 && <p className="centered">No submissions yet.</p>}
        </>
    )
}

export default SubmissionScreen;