import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
  
  // CITAS EN EL LOCAL STORAGE

  let citasIniciales = JSON.parse(localStorage.getItem('citas')); // para leer lo de local storage se usa JSON

  if(!citasIniciales){
    citasIniciales=[];
  }

  // ARREGLO DE CITAS

  const [citas, guardarCitas] = useState(citasIniciales); // arreglo de citas

  //   USE EFFECT PARA REALIZAR CIERTAS OPERACIONES CUANDO EL STATE CAMBIA
  const listo = () => {
    // console.log("listo")
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }
  useEffect( listo, [citas] ); 

  //funcion para guardar las citas actuales y agregue la nueva

  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // FUNCION PARA ELIMINAR CITAS

  const eliminarCita = id => {
    // console.log(id)  
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas)
  }


  // TITULO 

  const titulo = (citas.length === 0) ? 'No hay citas' : 'Administra tus citas'

  return (
    
    <>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">

          <div className="one-half column">
            <Formulario 
              crearCita = {crearCita}
            />
          </div>
               
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
              key = {cita.id}  
              cita = {cita}   
              eliminarCita = {eliminarCita}       
              />  
            ))}
              
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
