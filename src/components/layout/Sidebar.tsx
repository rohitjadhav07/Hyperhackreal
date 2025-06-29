import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LineChart, 
  BrainCircuit, 
  Store, 
  Settings,
  Github,
  Layers,
  Activity
} from 'lucide-react';
import HyperionLogo from '../ui/HyperionLogo';
import { useTheme } from '../../contexts/ThemeContext';

const Sidebar: React.FC = () => {
  const { currentTheme } = useTheme();
  
  const navLinks = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/portfolio', icon: <LineChart size={20} />, label: 'Portfolio' },
    { to: '/ai-trading', icon: <BrainCircuit size={20} />, label: 'AI Trading' },
    { to: '/marketplace', icon: <Store size={20} />, label: 'Marketplace' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside className={`w-64 h-screen border-r fixed left-0 top-0 flex flex-col transition-colors duration-300 ${
      currentTheme === 'dark' 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    }`}>
      <div className={`p-4 flex items-center space-x-3 border-b transition-colors duration-300 ${
        currentTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <HyperionLogo className="text-indigo-500" size={28} />
        <h1 className="text-xl font-bold gradient-text">HyperTrade</h1>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-400'
                  : currentTheme === 'dark'
                  ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <span className="mr-3">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className={`p-4 border-t transition-colors duration-300 ${
        currentTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
          currentTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <div className="text-sm">
            <span className={currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Hyperion Network:
            </span>{' '}
            <span className="text-green-500">Connected</span>
          </div>
        </div>
        
        <div className="flex justify-between mt-4 px-4">
          <a 
            href="https://docs.metis.io/hyperion" 
            target="_blank" 
            rel="noreferrer" 
            className={`transition-colors duration-300 ${
              currentTheme === 'dark' 
                ? 'text-gray-500 hover:text-gray-300' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Layers size={18} />
          </a>
          <a 
            href="#" 
            className={`transition-colors duration-300 ${
              currentTheme === 'dark' 
                ? 'text-gray-500 hover:text-gray-300' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Activity size={18} />
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer" 
            className={`transition-colors duration-300 ${
              currentTheme === 'dark' 
                ? 'text-gray-500 hover:text-gray-300' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;