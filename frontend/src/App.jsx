import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Team from './pages/Team.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={
            <>
              <Navbar />
              <main>
                <Services />
              </main>
              <Footer />
            </>
          } />
          <Route path="/team" element={
            <>
              <Navbar />
              <main>
                <Team />
              </main>
              <Footer />
            </>
          } />
          <Route path="/gallery" element={
            <>
              <Navbar />
              <main>
                <Gallery />
              </main>
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <main>
                <Contact />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
