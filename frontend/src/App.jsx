import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import "./assets/global.css";

function App() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Products />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
