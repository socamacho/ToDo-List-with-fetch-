import React, { useState, useEffect } from "react";

export function Home() {
    //Definicion de las variables necesitadas

    const API_URL = "https://assets.breatheco.de/apis/fake/todos/user/sofimaker"

    const [task, setTask] = ("");
    const [list, setList] = [];

    //Metodo POST, crea tareas

    const crearListaTareas = () => {

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([]) //Array modificado a cadena de txt JSON para poder ser leido.
        })
            .then(response => response.json()) //Mi response lo estoy transformando a .json para hacerlo mas legible.
            .then(data => console.log()) //Seguidamente imprimo mis datos.
            .catch(error => console.log("Error:", error.message)); //.catch me captura el error de haberlo y lo imprime. 
    };

    //Metodo GET,obtengo tareas

    const obtenerTareas = () => {

        fetch(API_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(response => response.json())
            .then(data => {
                setList(data); //Agrego mis datos resultantes/info dentro de list usando el hook.
                console.log(data);
            })
            .catch(error => console.log("Error:", error.message)); //Va fuera de la funcion.
    };

    //Metodo PUT, actualizo tareas

    const actualizarTareas = list => { //Parametro es lista porque es lo que yo quiero actualizar.

        fetch(API_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(list)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log("Error:", error.message));
    };

    //Metodo DELETE, elimino tareas

    const eliminarListaTareas = () => {

        fetch(API_URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log("Error:", error.message))
    }

    useEffect(() => { //NOTA: useEffect se levanta apenas se renderiza la pagina. 
        obtenerTareas()
    }, []); //Nota: El [] se va a ejecuta cada que se monte la pagina. Si hubiese algo, se ejecuta durante la actualizacion.

    return (
        <div className="container">
            <h1 className="display-3 text-center text-muted font-weight-light">
                todos
			</h1>
            <div className="input-group mb-3">
                <input
                    onChange={e => setTask(e.target.value)} //El evento onChange actualiza mi tarea al presionar enter con el task typeado.
                    value={task}
                    onKeyPress={e => {
                        //Funcion que al presionar enter se agrega un task.
                        if (e.key == "Enter") {
                            const newList = { label: task, done: false } //Se crea esta const para que Postman reconozca el formato.
                            const resultList = list.concat(newList);
                            setList(resultList); //Mediante setList en list concatene un nuevo task.Esto me genera un nuevo array con los datos anteriores.
                            setTask(""); //Limpio el task
                            console.log({ resultList }); //Ahora aqui estan todos mis datos
                            actualizarTareas(resultList); //Esto para actualizar el nuevo tipo de datos?
                        }
                    }}
                    type="text"
                    className="form-control"
                    placeholder="No tasks, add a task"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                />
            </div>

            <ul className="list-group">
                {list.map((item, index) => {
                    return (
                        //Solucion:Se agrega el estilo de la clase dentro del li y es suficiente.
                        <li
                            className="list-group-item font-weight-light"
                            key={index}>
                            <button
                                onClick={() => {
                                    const resultList = list.filter(//Creo la const resultList para que el filtro sea sobre ese nuevo array.
                                        (itemf, indexf) => indexf !== index
                                    );
                                    setList(resultList //Para que lo que resulte me lo ingrese en la lista.
                                    );
                                    actualizarTareas(resultList);//Para actualizar mis tareas.
                                }}>
                                type="button"
                                className="btn btn-outline-light float-right">
                            <i className="fas fa-times"></i>
                            </button>
                            {item}
                        </li>
                    );
                })}
            </ul>

            <p className="text-muted card pl-1">{list.length} items left</p>
        </div >

    )
}
