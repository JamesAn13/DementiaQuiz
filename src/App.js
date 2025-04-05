import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Survey from "./components/Survey";
import Main from "./components/Main";
import MemoryGame from "./components/Games/MemoryGame";
import PuzzleGame from "./components/Games/PuzzleGame";
import ReactionGame from "./components/Games/ReactionGame";
import WordGame from "./components/Games/WordGame";
import "./App.css";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    {!isLoggedIn ? (
                        <>
                            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/survey" element={<Survey />} />
                            <Route path="/main" element={<Main />} />
                            <Route path="/games/memory" element={<MemoryGame />} />
                            <Route path="/games/puzzle" element={<PuzzleGame />} />
                            <Route path="/games/reaction" element={<ReactionGame />} />
                            <Route path="/games/word" element={<WordGame />} />
                            <Route path="*" element={<Navigate to="/main" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;