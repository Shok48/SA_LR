import React from "react";
import styles from './App.module.css'
import { Header } from 'antd/es/layout/layout'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage';
import ConverterPage from "./pages/LR1/ConverterPage";
import { HierarchyPage } from "./pages/LR2/HierarchyPage";
import { DecompositionPage } from "./pages/LR3/DecompositionPage";

const App = () => {

  return (
    <Router>
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
        <Header className={styles.Header}>
          <Link to="/">Главная</Link>
          <Link to="/LR-1">Лабораторная работа №1</Link>
          <Link to="/LR-2">Лабораторная работа №2</Link>
          <Link to="/LR-3">Лабораторная работа №3</Link>
        </Header>
        <div style={{flex: 1, overflowY: 'auto'}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/LR-1' element={<ConverterPage />} />
            <Route path='/LR-2' element={<HierarchyPage />} />
            <Route path='/LR-3' element={ <DecompositionPage /> } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
