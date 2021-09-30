import "./App.css";
import Header from "./components/Header";
import TestingForm from "./components/TestingForm";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="contenedor">
        <TestingForm />
      </div>
    </div>
  );
}

export default App;
