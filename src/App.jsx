import { Routes, Route} from 'react-router-dom';
import HotelList from './pages/HotelList';
import HotelDetails from './pages/HotelDetails';
import AddHotel from './pages/AddHotel';
import EditHotel from './pages/EditHotel';
import Favorites from './pages/Favorites';
import RessetB from './components/RessetB';
import './App.css';

export default function App() {
  return (
    <div>
      <header>
        <RessetB /> 
      </header>
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