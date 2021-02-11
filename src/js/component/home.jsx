import React from "react";
import shortid from "shortid";

fetch("http://assets.breatheco.de/apis/fake/todos/user/diego", {
	method: "POST",
	BODY: JSON.stringify([]),
	headers: {
		"Content-Type": "application/json"
	}
})
	.then(resp => {
		console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
		console.log(resp.status); // el código de estado = 200 o código = 400 etc.
		console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
		return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	})
	.then(data => {
		//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
		console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
	})
	.catch(error => {
		//manejo de errores
		console.log(error);
	});

export function Home() {
	const [tarea, setTarea] = React.useState("");
	const [arrayTareas, setArrayTareas] = React.useState([]);
	const agregarTarea = e => {
		e.preventDefault();
		setArrayTareas([
			...arrayTareas,
			{
				id: shortid.generate(),
				nombreTarea: tarea
			}
		]);
		setTarea("");
	};

	const Delete = id => {
		for (let i = 0; i < arrayTareas.length; i++) {
			if (arrayTareas[i].id === id) {
				arrayTareas.splice(i, 1);
				setArrayTareas([...arrayTareas]);
			}
		}
	};

	return (
		<div className="container">
			<h1 className="text-center">TODO WITH REACT</h1>
			<div className="row">
				<div className="col-12">
					<ul className="list-group">
						<form onSubmit={agregarTarea}>
							<li className="list-group-item">
								<input
									type="text"
									className="form-control mb-2 rounder border-dark"
									placeholder="Enter task"
									onChange={e => setTarea(e.target.value)}
									value={tarea}
								/>
							</li>
						</form>
						{arrayTareas.map(item => (
							<li className="list-group-item" key={item.id}>
								<span className="lead">{item.nombreTarea}</span>
								<button
									type="button"
									className="ml-2 mb-1 close"
									data-dismiss="toast"
									aria-label="Close"
									onClick={() => Delete(item.id)}>
									<span aria-hidden="true">&times;</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
