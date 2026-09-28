import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/common/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Forum from "./pages/Forum";
import Courses from "./pages/Courses";
import Workshops from "./pages/Workshops";
import Store from "./pages/Store";
import Learning from "./pages/Learning";
import Projects from "./pages/Projects";
import StudentProjects from "./pages/StudentProjects";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/store" element={<Store />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/student-projects" element={<StudentProjects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
