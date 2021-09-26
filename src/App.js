import logo from './logo.svg';
import './App.css';
import { useState } from 'react';



function App() {

	const [cantLineasTotales, setcantLineasTotales] = useState(0)
	const [complejidadCiclomatica, setcomplejidadCiclomatica] = useState(0)
	const [longitudHalstead, setlongitudHalstead] = useState(0)
	const [volumenHalstead, setvolumenHalstead] = useState(0)
	const [comentariosSimples, setcomentariosSimples] = useState(0)

	const condicionales = {
		'>': 0,
		'<': 0,
		'>=': 0,
		'<=': 0,
		'==': 0,
		"try": 0
	}

	const halsteadMetodo = (texto)=>
{
	//Operadores + - = * ; int double float return
	let textosSinComentarios = texto.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');
	let cantidadOperadoresTotales = 0;
	let cantidadOperandosTotales = 0;
	let cantidadOperadoresUnicos = 0;
	let cantidadOperandosUnicos = 0;
	let operadores = ["+", "-", "/", "*", "int", "double", "float", ";", ":", "public", "static", "void", "&&", "||", "<=", ">=", "<", ">"];
	//var operadores = document.getElementById("operadores").value.split(',');
	let operandosUnicos = [];
	let i;
	//OPERADORES UNICOS Y TOTALES.
	for (let i = 0; i < operadores.length; i++)
	{
		if(textosSinComentarios.indexOf(operadores[i]) !=-1)
			cantidadOperadoresUnicos++;
		cantidadOperadoresTotales += texto.split(operadores[i]).length-1;
	}

	//OPERADORES TOTALES

	//OPERANDOS UNICOS Y TOTALES.
	let aAnalizar = textosSinComentarios.split(' ');
	let hasta = textosSinComentarios.split(' ').length;
	for (let j = 0; j < hasta; j++)
	{
		//Si no es un operador y todavia no esta en el array de operandos unicos.
		if(operadores.indexOf(aAnalizar[j]) == -1 && operandosUnicos.indexOf(aAnalizar[j]) == -1)
		{
			operandosUnicos.push(aAnalizar[j]);
			cantidadOperandosUnicos++;
		}
		//Si no es un operador.
		if(operadores.indexOf(aAnalizar[j]) == -1)
			cantidadOperandosTotales++;
	}
	setlongitudHalstead(parseInt(cantidadOperadoresUnicos*Math.log2(cantidadOperadoresUnicos)+cantidadOperandosUnicos*Math.log2(cantidadOperandosUnicos)));
	setvolumenHalstead(parseFloat((cantidadOperadoresTotales+cantidadOperandosTotales)*Math.log2(cantidadOperadoresUnicos+cantidadOperandosUnicos)).toFixed(2));
}

	const calcularCOmplejidadCiclomatica = (code) => {
		let result=0
		const codeSplited = code.split(" ");
		codeSplited.map((c) => {
			if (c in condicionales) {
				++condicionales[c]
			}
		})

		Object.values(condicionales).map((e) => { result = result + e })
		console.log(result)
		setcomplejidadCiclomatica(result + 1)


	}


	const handleSubmit = (e) => {
		e.preventDefault()
		const code = document.getElementById("code").value
		console.log(code)
		setcantLineasTotales(code.split("\n").length)

		calcularCOmplejidadCiclomatica(code);
		setcomentariosSimples(code.split('//').length - 1);
		halsteadMetodo(code)
	}

	return (
		<div className="App">
			<header className="App-header">    <img src="https://miel.unlam.edu.ar/vista/imagenes/logo_unlam_34.png" className="unlam-logo" alt="logo unlam" /> </header>



			<div className="contenedor">
				<div>
					<div className="codigo-container">
						GRUPO 3
						<textarea id="code" placeholder="codigo a evaluar" className="codigo" />

					</div>

				<div className="resul-container">
					<div className="resultado">



						{/* <p className="label"> lineas totales</p> */}
						<input value={cantLineasTotales} readOnly={true} />



					</div>
					<div className="resultado">



						{/* <p className="label">Lineas de codigo</p> */}
						<input value={cantLineasTotales - comentariosSimples} readOnly={true} />



					</div>
					<div className="resultado">



						{/* <p className="label">Lineas comentadas</p> */}
						<input value={comentariosSimples} readOnly={true} />



					</div>
					<div className="resultado">



						{/* <p className="label">Porcentaje de lineas comentadas</p> */}
						<input value={comentariosSimples > 0 && cantLineasTotales > 0 ? comentariosSimples / cantLineasTotales * 100 : 0} readOnly={true} />



					</div>
					<div className="resultado">



						{/* <p className="label"> Complejidad ciclomatica</p> */}
						<input value={complejidadCiclomatica} readOnly={true} />



					</div>
					<div className="resultado">



						{/* <p className="label">Halstead Longitud</p> */}
						<input value={longitudHalstead} readOnly={true} />



					</div>
					<div className="resultado">



						{/* <p className="label">Halstead Volumen</p> */}
						<input value={volumenHalstead} readOnly={true} />



					</div>


					</div>

					<button onClick={handleSubmit} class="button">Calcular</button>
				</div>
			</div>
		</div>
	);
}

export default App;


