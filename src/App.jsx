import { Routes, Route} from 'react-router-dom';
import HotelList from './pages/HotelList';
import HotelDetails from './pages/HotelDetails';
import AddHotel from './pages/AddHotel';
import EditHotel from './pages/EditHotel';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import './App.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('preferred-theme', newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('preferred-theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);


  return (
    <div className={theme === 'dark' ? 'dark-theme' : ''}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/details/:id" element={<HotelDetails />} />
        <Route path="/add" element={<AddHotel />} />
        <Route path="/edit/:id" element={<EditHotel />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}