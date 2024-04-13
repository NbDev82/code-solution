import React, {createContext, useEffect, useState} from 'react';
import ProblemScreen from '~/components/Problem/ProblemScreen';
import EditorScreen from '~/components/Editor/EditorScreen';
import NavbarProblem from '~/components/Navbars/NavbarProblem/ProblemNavbar/NavbarProblem';
import TestCaseScreen from '~/components/TestCaseScreen/TestCaseScreen';
import MainNavbar from "~/components/Navbars/NavbarProblem/MainNavbar/MainNavbar";
import DiscussesScreen from "~/components/DiscussesProblem/DiscussesScreen";
import SubmissionScreen from "~/components/Submissions/SubmissionScreen";
import "./SubmitCodeScreen.scss"
import queryString from 'query-string';
import {getProblem} from '~/services/ProblemService'
import {USER_SAMPLE} from '~/utils/Const'
export const ProblemContext = createContext(null);

function SubmitCodeScreen() {
    const [result, setResult] = useState("")
    const [activeMenuItem, setActiveMenuItem] = useState("Description")
    const [problem, setProblem] = useState("");
    const [problemId, setProblemId] = useState("");
    const [problemName, setProblemName] = useState("Missing-Number");
    const [userId, setUserId] = useState(0);
    const [user,setUser] = useState(USER_SAMPLE);

    useEffect(() => {
        // fetchProblem(problemName).then(data => {
        //     setProblem(data);
        //     setProblemId(data.id)
        //     setProblemName(data.name)
        // });
        // setUserId(1)
    }, []);

    const fetchProblem = async (problemName) => {
        try {
            //const response = await getProblem(queryString.stringify({problemId}));
            //return response.data
        } catch (error) {
            console.error('Error fetching problem:', error);
            return error.response?.data?.message
        }
    };

    const renderActiveScreen = () => {
        switch (activeMenuItem) {
            case "Description":
                return <ProblemScreen/>;
            case "Discusses":
                return <DiscussesScreen/>;
            case "Submissions":
                return <SubmissionScreen/>;
            default:
                break;
        }
    };

    return (
        <ProblemContext.Provider value={{
            result, setResult,
            activeMenuItem, setActiveMenuItem,
            problem, setProblem,
            problemId, setProblemId,
            userId, setUserId,
            problemName, setProblemName
            ,user}}>
            <section>
                <div className="layout">
                    <div className="nav__layout centered">
                        <MainNavbar/>
                    </div>

                    <div className="nav__problem__layout centered">
                        <NavbarProblem/>
                    </div>

                    <div className="problem__layout">
                        {renderActiveScreen()}
                    </div>

                    <div className="editor__layout">
                        <EditorScreen/>
                    </div>

                    <div className="testcases_layout">
                        <TestCaseScreen/>
                    </div>
                </div>
            </section>
        </ProblemContext.Provider>
    )
}

export  default SubmitCodeScreen