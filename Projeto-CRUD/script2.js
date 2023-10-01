const form = document.getElementById('crud-form');
const cursoList = document.getElementById('curso-list');
const searchInput = document.getElementById('search');

const cursos = [];


let cursoIndex = -1;
let nextCursoCode = 1; 

function displayCursos(filteredCursos = cursos) {
    cursoList.innerHTML = '';

    for (let i = 0; i < filteredCursos.length; i++) {
        const curso = filteredCursos[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nextCursoCode++}</td>
            <td>${curso.nome}</td>
            <td>${curso.data}</td>
            <td>
                <button onclick="editCurso(${i})">Alterar</button>
                <button onclick="deleteCurso(${i})">Excluir</button>
            </td>
        `;
        cursoList.appendChild(row);
    }
}

function searchCursos() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredCursos = cursos.filter(curso => {
        return curso.nome.toLowerCase().includes(searchTerm) ||
               curso.data.toLowerCase().includes(searchTerm);
    });
    displayCursos(filteredCursos);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const nomeInput = document.getElementById('nome');
    const dataInput = document.getElementById('data');

    if (cursoIndex === -1) {

        const novoCurso = {
            nome: nomeInput.value.trim(),
            data: dataInput.value
        };

        if (novoCurso.nome !== '' && novoCurso.data !== '') {
            cursos.push(novoCurso);
        }
    } else {

        cursos[cursoIndex].nome = nomeInput.value.trim();
        cursos[cursoIndex].data = dataInput.value;
        cursoIndex = -1; 
        document.getElementById('submitButton').textContent = 'Incluir';
        document.getElementById('updateButton').style.display = 'none';
        document.getElementById('cancelButton').style.display = 'none';
    }

    nomeInput.value = '';
    dataInput.value = '';
    displayCursos();
});

function deleteCurso(index) {
    const confirmation = confirm('Tem certeza que deseja excluir este curso?');
    if (confirmation) {
        cursos.splice(index, 1);
        displayCursos();
    }
}

displayCursos();

function searchCursos() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredCursos = cursos.filter(curso => {
        return curso.nome.toLowerCase().includes(searchTerm) ||
               curso.instrutor.toLowerCase().includes(searchTerm) ||
               curso.local.toLowerCase().includes(searchTerm);
    });
    displayCursos(filteredCursos);
}

