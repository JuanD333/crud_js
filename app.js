const creationForm = document.getElementById("creationForm"),
    editionForm = document.getElementById("editionForm"),
    arraysTableBody = document.getElementById("arraysTableBody");

const creationFormModal = new bootstrap.Modal(document.getElementById('creationModal'));
const editionFormModal = new bootstrap.Modal(document.getElementById('editionModal'));

let arrayList = []; // deberiamos cargar el listado de arreglos aqui

loadArraysInTheTable();

// cargarlos en la tabla

function loadArraysInTheTable()
{
    getArrayList();

    while(arraysTableBody.firstChild)
    {
        arraysTableBody.firstChild.remove();
    }

    arrayList.forEach((array, index) => {
    
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${array.valor_1}</td>
            <td>${array.valor_2}</td>
            <td>${array.valor_3}</td>
            <td>${array.valor_4}</td>
            <td>
                <button data-index="${index}" type="button" class="edition btn btn-sm btn-success">Editar</button>
                <button type="button" class="btn btn-sm btn-danger">Eliminar</button>
            </td>
        `;

        arraysTableBody.appendChild(row);
    });

}

function getArrayList()
{
  // obtener el listado de arreglos de localstorage
  arrayList = JSON.parse( localStorage.getItem("arrays") ); // null || [...datos];

  // verificar si lo que me devolvio el localstorage es un array 
  arrayList = Array.isArray( arrayList ) ? arrayList : [];
}

creationForm.addEventListener("submit", (event) => {

    event.preventDefault();

    // lo creo
    let newArray = create();

    // luego lo creamos
    save(newArray);

    loadArraysInTheTable();
    
});

function create()
{
    const inputs = creationForm.querySelectorAll("input");

    let array = {};

    inputs.forEach((input, index) => {

        // sumar 1 al indice del array (indice 1 es 0)
        array[`valor_${index + 1}`] = input.value;

    });

    return array;
}

function save(array)
{   
    // actualizamos el listado con el nuevo array creado
    arrayList.push(array);

    localStorage.setItem("arrays", JSON.stringify(arrayList));

    creationFormModal.hide();

    creationForm.reset();
}

// editar

arraysTableBody.addEventListener("click", event => {

    if( event.target.classList.contains("edition") )
    {
        showEditionForm(event.target.getAttribute("data-index"));
    }

});

function showEditionForm(index)
{
    let arrayToEdit = arrayList[index];

    document.getElementById("inputForIndexOfArrayToEdit").value = index;

    const inputs = editionForm.querySelectorAll("input[type='number']");

    inputs.forEach((input, index) => {

        input.value = arrayToEdit[`valor_${index + 1}`];

    });

    editionFormModal.show();
}

editionForm.addEventListener("submit", (event) => {

    event.preventDefault();

    edit();

});

function edit()
{
    const inputs = editionForm.querySelectorAll("input[type='number']");
    
    let index = document.getElementById("inputForIndexOfArrayToEdit").value;
    
    let arrayToEdit = arrayList[index];

    inputs.forEach((input, index) => {

        // sumar 1 al indice del array (indice 1 es 0)
        arrayToEdit[`valor_${index + 1}`] = input.value;

    });

    localStorage.setItem("arrays", JSON.stringify(arrayList));

    editionFormModal.hide();

    loadArraysInTheTable();
}