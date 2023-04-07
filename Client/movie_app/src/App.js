import './App.css';
import LoginPageComp from './Pages/loginPage/LoginPage';
import MoviesPageComp from './Pages/moviesPage/MoviesPage';
import { Routes, Route, Link } from 'react-router-dom'
import SubscriptionsPageComp from './Pages/subscriptionsPage/SubscriptionsPage';
import MovieAddPageComp from './Pages/movieAddPage/MovieAddPage';
import MemberAddPageComp from './Pages/memberAddPage/MemberAddPage';
import MovieEditPageComp from './Pages/movieEditPage/MovieEditPage';
import MemberEditPageComp from './Pages/memberEditPage/MemberEditPage';


function App() {
  return (
    <div>

      <Routes>

        <Route path="" element={<LoginPageComp />} />

        <Route path="/movies" element={<MoviesPageComp />} />
        <Route path="/movies/add" element={<MovieAddPageComp/>} />
        <Route path="/movies/edit/:id" element={<MovieEditPageComp/>} />

        <Route path="/subscriptions" element={<SubscriptionsPageComp/>} />
        <Route path="/member/add" element={<MemberAddPageComp/>} />
        <Route path="/member/edit/:id" element={<MemberEditPageComp/>} />

      </Routes>

    </div>
  );
}

export default App;
