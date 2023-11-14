import { useCallback, useEffect, useState } from "react"
import './classes.css'

function Formulario() {
    const [enteredName, setEnteredName] = useState('');
    const [enteredApellidos, setEnteredApellidos] = useState('');
    const [enteredEmail, setEnteredEmail] = useState(' ');
    const [enteredSexo, setEnteredSexo] = useState(' ');
    const [enteredMensaje, setEnteredMensaje] = useState('');

    const [nombreIncorrecto, setNombreIncorrecto] = useState("");
    const [apellidosIncorrecto, setApellidosIncorrecto] = useState("");
    const [emailIncorrecto, setEmailIncorrecto] = useState("");
    const [sexoIncorrecto, setSexoIncorrecto] = useState("");
    const [mensajeIncorrecto, setMensajeIncorrecto] = useState("");

    const [enviadoCorrectamente, setEnviadoCorrectamente] = useState("");

    const [cssClass, setCssClass] = useState("input-valid");
    const [cssClassName, setCssClassName] = useState("input-valid");
    const [cssClassApellidos, setCssClassApellidos] = useState("input-valid");
    const [cssClassEmail, setCssClassEmail] = useState("input-valid");
    const [cssClassSexo, setCssClassSexo] = useState("input-valid");
    const [cssClassMensaje, setCssClassMensaje] = useState("input-valid");

    const url = "http://localhost:5000/users"

    const data = {
        name: enteredName,
        apellidos: enteredApellidos,
        email: enteredEmail,
        sexo: enteredSexo,
        mensaje: enteredMensaje,
    }
    
    async function fetchPost(url){
        await fetch(url, {
        method: "POST",
        body: JSON.stringify(data), //convierte JS en JSON
        headers: {
        "Content-Type": "application/json",
        },
        })}

    function updateName(event){
        setEnteredName(event.target.value);
    }
    function updateApellidos(event){
        setEnteredApellidos(event.target.value);
    }
    function updateEmail(event){
        setEnteredEmail(event.target.value);
    }
    function updateSexo(event){
        setEnteredSexo(event.target.value);
    }
    function updateMensaje(event){
        setEnteredMensaje(event.target.value);
    }
    
    const validateTodo = useCallback(
        function() {
            if(enteredName===""||enteredName.length>10){
                setNombreIncorrecto(<p>El nombre no es válido, No debe estar vacio ni tener más de 10 carácteres</p>)
                setCssClassName("input-invalid")
            }else{
                setNombreIncorrecto(<span></span>)
                setCssClassName("input-valid")
            }
            if(enteredApellidos===""||enteredApellidos.length>20){
                setApellidosIncorrecto(<p>Los apellidos no son válidos, No debe estar vacio ni tener más de 20 carácteres</p>)
                setCssClassApellidos("input-invalid")
            }else{
                setApellidosIncorrecto(<span></span>)
                setCssClassApellidos("input-valid")
            }
            if(!enteredEmail.includes("@")||enteredEmail.length>20){
                setEmailIncorrecto(<p>El email no es válido, debe incluir un @</p>)
                setCssClassEmail("input-invalid")
            }else{
                setEmailIncorrecto(<span></span>)
                setCssClassEmail("input-valid")
            }
            if(enteredSexo===""){
                setSexoIncorrecto(<p>Seleccione un sexo</p>)
                setCssClassSexo("input-invalid")
            }
            if(enteredMensaje.length>500){
                setMensajeIncorrecto(<p>Mensaje demasiado largo</p>)
                setCssClassMensaje("input-invalid")
            }else{
                setMensajeIncorrecto(<span>Cáracteres restantes: {500-enteredMensaje.length}</span>)
            }
            if(enteredName===""||enteredName.length>10||enteredApellidos===""||enteredApellidos.length>20||!enteredEmail.includes("@")||enteredEmail.length>20||enteredSexo===""||enteredMensaje.length>500){
                setCssClass("input-invalid")
                document.getElementById('buttonEnviar').disabled = true;
            }else{
                setCssClass("input-valid")
                document.getElementById('buttonEnviar').disabled = false;
            }
        },
        [enteredName,enteredApellidos,enteredEmail,enteredSexo,enteredMensaje]
    )


    useEffect(
        function(){
            validateTodo();
        },
        [validateTodo]
    );

    const handleSubmit = () => {
        setEnviadoCorrectamente(<h1>Formulario enviado correctamente</h1>)
        fetchPost(url);
    }

    return(
        <form>
            <div>
            <h1>Formulario DAM2</h1>
                <label>Nombre </label>
                <input className={cssClassName} type="name" onChange={updateName} />
                {nombreIncorrecto}
                <p></p>
                <label>Apellidos </label>
                <input className={cssClassApellidos} type="apellidos" onChange={updateApellidos} />
                {apellidosIncorrecto}
                <p></p>
                <label>Email </label>
                <input className={cssClassEmail} type="email" onChange={updateEmail} />
                {emailIncorrecto}
                <p></p>
                <label>Sexo </label>
                <select className={cssClassSexo} type="sexo" onChange={updateSexo}>
                    <option defaultValue="No binario">No binario</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
                {sexoIncorrecto}
                <p></p>
                <label>Mensaje </label>
                <textarea className={cssClassMensaje} type="mensaje" onChange={updateMensaje}/>
                {mensajeIncorrecto}
                <p></p>
                <label>Acepto los Términos y Condiciones </label>
                <input  type="checkbox" id="checkboxTerminos"/>
            </div>
            <button className={cssClass} type = 'submit' onClick={handleSubmit} id="buttonEnviar">Click to submit</button>
            {enviadoCorrectamente}
        </form>
    );
}

export default Formulario