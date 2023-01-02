const apikey = "06d7ea65-1954-4de5-bc88-f85720b8ee0c";
const apihost = 'https://todo-api.coderslab.pl';


document.addEventListener('DOMContentLoaded', function () {

    function apiListTasks() {
        return fetch(apihost  + '/api/tasks',
            {
                headers: {Authorization: apikey}
            }
        ).then(function (response) {
                if (!response.ok) {
                    alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
                }
                return response.json();

            }
        )
    }

    //console.log(apiListTasks());


    function renderTask(taskId, title, description, status) {
        const section = document.createElement('section');
        section.className = 'card mt-5 shadow-sm';
        document.querySelector('main').appendChild(section);

        const headerDiv = document.createElement('div');
        headerDiv.className = 'card-header d-flex justify-content-between align-items-center';
        section.appendChild(headerDiv);

        const headerLeftDiv = document.createElement('div');
        headerDiv.appendChild(headerLeftDiv);

        const h5 = document.createElement('h5');
        h5.innerText = title;
        headerLeftDiv.appendChild(h5);

        const h6 = document.createElement('h6');
        h6.className = 'card-subtitle text-muted';
        h6.innerText = description;
        headerLeftDiv.appendChild(h6);

        const headerRightDiv = document.createElement('div');
        headerDiv.appendChild(headerRightDiv);

        if(status == 'open') {
            const finishButton = document.createElement('button');
            finishButton.className = 'btn btn-dark btn-sm js-task-open-only';
            finishButton.innerText = 'Finish';
            headerRightDiv.appendChild(finishButton);
        }

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-outline-danger btn-sm ml-2';
        deleteButton.innerText = 'Delete';
        headerRightDiv.appendChild(deleteButton);

        
    }



    apiListTasks().then(
        function (response) {
            // "response" zawiera obiekt z kluczami "error" i "data" (zob. wyżej)
            // "data" to tablica obiektów-zadań
            // uruchamiamy funkcję renderTask dla każdego zadania jakie dał nam backend

            console.log(response);
           /* response.data.forEach(function (task) {
                    renderTask(task.id, task.title, task.description, task.status);
                }


            );*/

            for (let i = 0; i <response.data.length ; i++) {
                renderTask(response.data[i].id, response.data[i].title, response.data[i].description, response.data[i].status)
            }
        }
    );

});
