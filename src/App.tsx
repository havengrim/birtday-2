import './index.css'
import First from './First'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bedroom from './Bedroom';
import VideoPage from './VideoPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/bedroom" element={<Bedroom />} />
        <Route path="/video" element={<VideoPage />} />
      </Routes>
    </Router>
  )
}

export default App