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
            <td>${curso.instrutor}</td>
            <td>${curso.local}</td>
            <td>${curso.cargaHoraria}</td>
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
               curso.instrutor.toLowerCase().includes(searchTerm) ||
               curso.local.toLowerCase().includes(searchTerm);
    });
    displayCursos(filteredCursos);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const nomeInput = document.getElementById('nome');
    const instrutorInput = document.getElementById('instrutor');
    const localInput = document.getElementById('local');
    const cargaHorariaInput = document.getElementById('cargaHoraria');
    const dataInput = document.getElementById('data');

    if (cursoIndex === -1) {

        const novoCurso = {
            nome: nomeInput.value.trim(),
            instrutor: instrutorInput.value.trim(),
            local: localInput.value.trim(),
            cargaHoraria: cargaHorariaInput.value.trim(),
            data: dataInput.value
        };

        if (novoCurso.nome !== '' && novoCurso.instrutor !== '' && novoCurso.local !== '' && novoCurso.cargaHoraria !== '' && novoCurso.data !== '') {
            cursos.push(novoCurso);
        }
    } else {

        cursos[cursoIndex].nome = nomeInput.value.trim();
        cursos[cursoIndex].instrutor = instrutorInput.value.trim();
        cursos[cursoIndex].local = localInput.value.trim();
        cursos[cursoIndex].cargaHoraria = cargaHorariaInput.value.trim();
        cursos[cursoIndex].data = dataInput.value;
        cursoIndex = -1; 
        document.getElementById('submitButton').textContent = 'Incluir';
        document.getElementById('updateButton').style.display = 'none';
        document.getElementById('cancelButton').style.display = 'none';
    }

    nomeInput.value = '';
    instrutorInput.value = '';
    localInput.value = '';
    cargaHorariaInput.value = '';
    dataInput.value = '';
    displayCursos();
});

function editCurso(index) {
    cursoIndex = index;
    const curso = cursos[index];
    document.getElementById('nome').value = curso.nome;
    document.getElementById('instrutor').value = curso.instrutor;
    document.getElementById('local').value = curso.local;
    document.getElementById('cargaHoraria').value = curso.cargaHoraria;
    document.getElementById('data').value = curso.data;
    document.getElementById('submitButton').textContent = 'Salvar Alterações';
    document.getElementById('updateButton').style.display = 'block';
    document.getElementById('cancelButton').style.display = 'block';
}

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


