import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SlideList from './components/SlideList';
import SlideViewer from './components/SlideViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SlideList />} />
        <Route path="/view/:filename" element={<SlideViewer />} />
      </Routes>
    </Router>
  );
}

export default App;