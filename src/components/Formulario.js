import React, {useState} from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types'


const Formulario = ({crearCita}) => {



    //CREANDO STATE DE CITAS ----> tendremos un objeto con todos los campos
    const [cita, actualizarCita] = useState({
                                                mascota: '',
                                                propietario: '',
                                                fecha: '',
                                                hora: '',
                                                sintomas: ''    
                                            }); 
    
    const [error, actualizarError] = useState(false); // boolean false y true cuando haya error o no


    

    const handleChanged = (e) => {
        
        

        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
        
    }

    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Cuando el usuario presiona en Agregar Cita

    const submitCita = e => {

        e.preventDefault(); // para que no envie el formulario antes de la validacion

        //VALIDAR
        
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }
        
        //ELIMINAMOS EL MSJ DE ERROR
        actualizarError(false);

        //ASIGNAR UN ID

        cita.id = uuid();

        //CREAR LA CITA

        crearCita(cita);

        //RESETEAR FORM

        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''    
        }); 
    }


    return ( 
        <>
            <h2>Crear Cita</h2>
            
            {error ? <p className="alerta-error">Tienes que llenar todos los campos</p> : null }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota" 
                    onChange = {handleChanged}    
                    value = {mascota}           
                />    
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de mascota" 
                    onChange = {handleChanged}    
                    value = {propietario}               
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"       
                    onChange = {handleChanged}    
                    value = {fecha}       
                />   
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width" 
                    onChange = {handleChanged} 
                    value = {hora}                 
                />   
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange = {handleChanged}   
                    value = {sintomas} 
                ></textarea>    
                <button
                    type="submit"
                    className="u-full-width button-primary"
                    
                
                >Agregar Cita</button>
            </form>
        </>
    );
}
 
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;