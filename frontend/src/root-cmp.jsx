// const Router = ReactRouterDOM.HashRouter
// const { Route, Routes } = ReactRouterDOM
// const { Provider } = ReactRedux
import './assets/style/main.css'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutUs } from "./pages/about-us";
import { HomePage } from './pages/home-page';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { CarIndex } from './pages/car-index';



export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<CarIndex />} path="/car" />

                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}


