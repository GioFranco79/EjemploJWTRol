let miToken = '';
const btnFiltrar = document.querySelector('#btnFiltrar');
const btnLoguear = document.querySelector('#btnLoguear');

const validateEmail = (email) => {
      const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
      if (validEmail.test(email)) {
            return true;
      } else {
            return false;
      }
}

const logueandose = async () => {
      const urllogin = 'http://localhost:8080/login/signin';
      const email = document.querySelector('#txtCorreo').value;
      const password = document.querySelector('#txtPassword').value;
      if (!validateEmail(email)) {
            alert("Error! email invalido (ej. mimail@correo.com)");
            return;
      }
      const datos = {
            email,
            password
      }
      const opciones = {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
      }
      const response = await fetch(urllogin, opciones);
      const { token, msg } = await response.json();
      console.log(msg);
      if (!token) {
            alert(msg);
            console.log(msg);
      } else {
            miToken = token;
            $("#loginPrincipal").hide();
            $("#filtros").show();
            $("#tablita").show();
            llenaCombos(token);
      }
}

const listadoEstudiantes = async () => {
      const body = document.querySelector('#body');
      const url = 'http://localhost:8080/api/estudiantes';
      let region = document.querySelector('#region').value;
      let curso = document.querySelector('#curso').value;
      const datos = {
            region,
            curso
      }

      const opciones = {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': miToken
            },
            body: JSON.stringify(datos)
      }

      const response = await fetch(url, opciones);
      const estudiantes = await response.json();
      console.log(estudiantes);
      body.innerHTML= '';
      if (estudiantes) {      
            estudiantes.forEach(fila => {
                  let row = document.createElement('tr');
                  let rut = document.createElement('td');
                  rut.innerHTML = fila.rut;
                  row.appendChild(rut);
                  let nombre = document.createElement('td');
                  nombre.innerHTML = fila.nombre;
                  row.appendChild(nombre);
                  let apePat = document.createElement('td');
                  apePat.innerHTML = fila.apellido_pat;
                  row.appendChild(apePat);
                  let apeMat = document.createElement('td');
                  apeMat.innerHTML = fila.apellido_mat;
                  row.appendChild(apeMat);
                  let curso = document.createElement('td');
                  curso.innerHTML = fila.codigo_curso;
                  row.appendChild(curso);
                  let descripcion = document.createElement('td');
                  descripcion.innerHTML = fila.Curso.PlanFormativo.descripcion;
                  row.appendChild(descripcion);
                  body.appendChild(row);
            });
      }
}

const llenaCombos = async (token) => {
      const urlcursos = 'http://localhost:8080/api/cursos';
      const opciones = {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
            }
      }      
      const promesaCursos = await fetch(urlcursos);
      const cursos = await promesaCursos.json();

      const urlregiones = 'http://localhost:8080/api/regiones';
      const promesaRegiones = await fetch(urlregiones);
      const regiones = await promesaRegiones.json();

      const ComboCursos = document.querySelector('#curso');
      const ComboRegiones = document.querySelector('#region');

      let option = document.createElement("option");
      option.value = '';
      option.text = 'Elija una región';
      ComboRegiones.appendChild(option);
      regiones.forEach(region => {
            option = document.createElement("option");
            option.value = region.codigo_region;
            option.text = region.nombre;
            ComboRegiones.appendChild(option);
      });

      option = document.createElement("option");
      option.value = '';
      option.text = 'Elija un curso';
      ComboCursos.appendChild(option);
      cursos.forEach(curso => {
            option = document.createElement("option");
            option.value = curso.codigo_curso;
            option.text = curso.codigo_curso;
            ComboCursos.appendChild(option);
      });
      listadoEstudiantes(token);
}

$("#filtros").hide();
$("#tablita").hide();
btnFiltrar.addEventListener('click', listadoEstudiantes);
btnLoguear.addEventListener('click', logueandose);