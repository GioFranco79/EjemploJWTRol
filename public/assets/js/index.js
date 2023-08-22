const btnFiltrar = document.querySelector('#btnFiltrar');

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
                  'Content-Type': 'application/json'
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

const llenaCombos = async () => {
      const urlcursos = 'http://localhost:8080/api/cursos';
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
}

btnFiltrar.addEventListener('click', listadoEstudiantes);

llenaCombos();
listadoEstudiantes();