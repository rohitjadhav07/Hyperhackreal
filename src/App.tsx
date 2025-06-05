import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import PortfolioAnalysis from './pages/PortfolioAnalysis';
import AITrading from './pages/AITrading';
import StrategyMarketplace from './pages/StrategyMarketplace';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/portfolio" element={<PortfolioAnalysis />} />
            <Route path="/ai-trading" element={<AITrading />} />
            <Route path="/marketplace" element={<StrategyMarketplace />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;