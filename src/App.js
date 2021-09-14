import logo from './logo.svg';
import './App.css';
import { useState } from 'react';



function App() {

  const [cantLineasTotales, setcantLineasTotales] = useState(null)
  const [cantLineasCodigo, setcantLineasCodigo] = useState(null)

const handleSubmit = (e) =>{
  e.preventDefault()
  const lineasTotales = document.getElementById("code").value.split("\n").length
  const lineasCodigo = document.getElementById("code").value.split(";").length
  //console.log(document.getElementById("code").value.split("\n").lenght)
  setcantLineasTotales(lineasTotales)
  console.log(lineasTotales)
  setcantLineasCodigo(lineasCodigo)
  console.log(lineasCodigo)
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
          <input value={cantLineasTotales} readOnly={true}/>



        </div>
        <div className="resultado">



        <p className="label"> resultado 2</p>
        <input value={cantLineasCodigo} readOnly={true}/>



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
