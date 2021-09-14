import logo from './logo.svg';
import './App.css';
import { useState } from 'react';



function App() {

  const [cantLineas, setcantLineas] = useState(null)

const handleSubmit = (e) =>{
  e.preventDefault()
  const lineas = document.getElementById("code").value.split("\n").length
  //console.log(document.getElementById("code").value.split("\n").lenght)
  setcantLineas(lineas)
  console.log(lineas)
}

  return (
    <div className="App">
      <header className="App-header">    <img src="https://miel.unlam.edu.ar/vista/imagenes/logo_unlam_34.png" className="unlam-logo" alt="logo unlam"/> </header>



      <div className="contenedor">
    <div>
      <div className="codigo-container">
        GRUPO 3
        <textarea id="code" placeholder="codigo a evaluar" className="codigo" />

      </div>

  
        <div className="resultado">



        <p className="label"> resultado 1</p>
          <input value={cantLineas} readOnly={true}/>



        </div>
        <div className="resultado">



        <p className="label"> resultado 2</p>
        <input readOnly={true}/>



        </div>
        <div className="resultado">



        <p className="label"> resultado 3</p>
        <input readOnly={true}/>



        </div>
        <div className="resultado">



        <p className="label"> resultado 4</p>
        <input readOnly={true}/>



        </div>


        <button onClick={handleSubmit} class="button">Calcular</button>
      </div>
      </div>
    </div>
  );
}

export default App;
