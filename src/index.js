import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Layout from "./pages/Layout";

import "./css/App.css";
import History from "./pages/History";

import traduction from "./traduction";
class App extends React.Component {
    state = {
        language: 1,
        traduction: traduction
    }
    render(){
        return (
            <BrowserRouter>
                <Routes path="/" element={<Layout />}>
                    <Route index element={(<MainPage
                        i18n={traduction[this.state.language]}/>)} />
                    <Route path="history" element={
                        (<History
                        i18n={traduction[this.state.language]}
                        />)
                    } />
                    <Route path="*" element={<MainPage />} />
                </Routes>

            </BrowserRouter>
        );
    }

}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
