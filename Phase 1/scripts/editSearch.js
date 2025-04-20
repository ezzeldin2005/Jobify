/* Start display all jobs onload */

window.onload = function () {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const xhttpResponse = xhttp.responseXML;
        let jobs = xhttpResponse.getElementsByTagName('Job');

        for (let i = 0; i < jobs.length; i++) {
            let jobCard = document.createElement('div');
            let jobTitle =  document.createElement('h3');
            let jobId =  document.createElement('h3');
            let companyName = document.createElement('p');
            let experiance = document.createElement('p');
            let Salary = document.createElement('p');
            let jobDescription = document.createElement('p');
            let status = document.createElement('p');
            let buttonContainer = document.createElement('div');
            let editButton = document.createElement('button');
            let deleteButton = document.createElement('button');

            jobCard.className = 'jobCard';
            buttonContainer.className = 'editDeletecontainer';
            editButton.className = 'editButton';
            deleteButton.className = 'deleteButton';
            
            jobTitle.innerHTML = '<span class="label">Title: </span><br>' + jobs[i].getElementsByTagName('Title')[0].textContent;
            jobId.innerHTML = '<span class="label">Job ID: </span><br>' + jobs[i].getElementsByTagName('Id')[0].textContent;
            companyName.innerHTML = '<span class="label">Company: </span><br>' + jobs[i].getElementsByTagName('Company')[0].textContent;
            experiance.innerHTML = '<span class="label">Years of Experiance: </span><br>' + jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent;
            Salary.innerHTML = '<span class="label">Salary: </span><br>' + jobs[i].getElementsByTagName('Salary')[0].textContent;
            status.innerHTML = '<span class="label">Status: </span><br>' + jobs[i].getElementsByTagName('Status')[0].textContent;
            jobDescription.innerHTML = '<span class="label">Job description: </span><br>' + jobs[i].getElementsByTagName('JobDescription')[0].textContent;
            editButton.innerHTML = 'Edit';
            deleteButton.innerHTML = 'Delete';

            console.log('hello');

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);
            jobCard.appendChild(jobTitle);
            jobCard.appendChild(jobId);
            jobCard.appendChild(companyName);
            jobCard.appendChild(experiance);
            jobCard.appendChild(Salary);
            jobCard.appendChild(status);
            jobCard.appendChild(jobDescription);
            jobCard.appendChild(buttonContainer);

            deleteButton.onclick = function () {
                if (confirm('Are you sure you want to delete this job posting?')) {
                    jobCard.remove();
                }
            };
            editButton.onclick = function () {
                window.location.href = 'index9.html';
            };
        
            document.getElementById('cards').appendChild(jobCard);
        }
    };

    xhttp.open("GET", "./scripts/Jobs.xml");
    xhttp.send();
};

/* End display all jobs onload */

/* Start Drop down menu */

let list = document.getElementById('list');
let select = document.getElementById('select');
let searchBar = document.getElementById('searchelecontainer');  
let text = document.getElementById('selectText');
let options = document.getElementsByClassName('options');

for(option of options){
    option.onclick = function(){
        text.innerHTML = this.innerHTML;
    }
}

select.onclick = function () {
    list.classList.toggle('open');

    if (list.classList.contains('open')) {
        searchBar.style.setProperty('margin-bottom', '100px');
    } else {
        searchBar.style.removeProperty('margin-bottom');
    }
};

/* End Drop down menu */

/* Start search for results onclick */

document.getElementById('searchBtn').addEventListener('click', function(){
    const xhttp = new XMLHttpRequest();
    document.getElementById('cards').innerHTML = '';
    xhttp.onload = function(){
        const xhttpResponse = xhttp.responseXML;
        let inputValue = text.innerHTML;
        let searchValue = document.getElementById('searchInput').value;
        let jobs = xhttpResponse.getElementsByTagName('Job');
    
        if (inputValue == 'By Title'){
            let regex = new RegExp(`.*${searchValue}.*`, 'i');
            for (i = 0; i < jobs.length; i++){
                if (regex.test(jobs[i].getElementsByTagName('Title')[0].textContent)){
                    let jobCard = document.createElement('div');
                    let jobTitle =  document.createElement('h3');
                    let jobId =  document.createElement('h3');
                    let companyName = document.createElement('p');
                    let experiance = document.createElement('p');
                    let Salary = document.createElement('p');
                    let jobDescription = document.createElement('p');
                    let status = document.createElement('p');
                    let buttonContainer = document.createElement('div');
                    let editButton = document.createElement('button');
                    let deleteButton = document.createElement('button');

                    jobCard.className = 'jobCard';
                    buttonContainer.className = 'editDeletecontainer';
                    editButton.className = 'editButton';
                    deleteButton.className = 'deleteButton';
                    
                    jobTitle.innerHTML = '<span class="label">Title: </span><br>' + jobs[i].getElementsByTagName('Title')[0].textContent;
                    jobId.innerHTML = '<span class="label">Job ID: </span><br>' + jobs[i].getElementsByTagName('Id')[0].textContent;
                    companyName.innerHTML = '<span class="label">Company: </span><br>' + jobs[i].getElementsByTagName('Company')[0].textContent;
                    experiance.innerHTML = '<span class="label">Years of Experiance: </span><br>' + jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent;
                    Salary.innerHTML = '<span class="label">Salary: </span><br>' + jobs[i].getElementsByTagName('Salary')[0].textContent;
                    status.innerHTML = '<span class="label">Status: </span><br>' + jobs[i].getElementsByTagName('Status')[0].textContent;
                    jobDescription.innerHTML = '<span class="label">Job description: </span><br>' + jobs[i].getElementsByTagName('JobDescription')[0].textContent;
                    editButton.innerHTML = 'Edit';
                    deleteButton.innerHTML = 'Delete';

                    buttonContainer.appendChild(editButton);
                    buttonContainer.appendChild(deleteButton);
                    jobCard.appendChild(jobTitle);
                    jobCard.appendChild(jobId);
                    jobCard.appendChild(companyName);
                    jobCard.appendChild(experiance);
                    jobCard.appendChild(Salary);
                    jobCard.appendChild(status);
                    jobCard.appendChild(jobDescription);
                    jobCard.appendChild(buttonContainer);

                    deleteButton.onclick = function () {
                        if (confirm('Are you sure you want to delete this job posting?')) {
                            jobCard.remove();
                        }
                    };
                    editButton.onclick = function () {
                        window.location.href = 'index9.html';
                    };

                    document.getElementById('cards').appendChild(jobCard);
                    
                }   
            }
        }

        else{
            let regex = new RegExp(`.*${searchValue}.*`, 'i');
            for (i = 0; i < jobs.length; i++){
            if (regex.test(jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent)){
                let jobCard = document.createElement('div');
                let jobTitle =  document.createElement('h3');
                let jobId =  document.createElement('h3');
                let companyName = document.createElement('p');
                let experiance = document.createElement('p');
                let Salary = document.createElement('p');
                let jobDescription = document.createElement('p');
                let status = document.createElement('p');
                let buttonContainer = document.createElement('div');
                let editButton = document.createElement('button');
                let deleteButton = document.createElement('button');

                jobCard.className = 'jobCard';
                buttonContainer.className = 'editDeletecontainer';
                editButton.className = 'editButton';
                deleteButton.className = 'deleteButton';
                
                jobTitle.innerHTML = '<span class="label">Title: </span><br>' + jobs[i].getElementsByTagName('Title')[0].textContent;
                jobId.innerHTML = '<span class="label">Job ID: </span><br>' + jobs[i].getElementsByTagName('Id')[0].textContent;
                companyName.innerHTML = '<span class="label">Company: </span><br>' + jobs[i].getElementsByTagName('Company')[0].textContent;
                experiance.innerHTML = '<span class="label">Years of Experiance: </span><br>' + jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent;
                Salary.innerHTML = '<span class="label">Salary: </span><br>' + jobs[i].getElementsByTagName('Salary')[0].textContent;
                status.innerHTML = '<span class="label">Status: </span><br>' + jobs[i].getElementsByTagName('Status')[0].textContent;
                jobDescription.innerHTML = '<span class="label">Job description: </span><br>' + jobs[i].getElementsByTagName('JobDescription')[0].textContent;
                editButton.innerHTML = 'Edit';
                deleteButton.innerHTML = 'Delete';

                buttonContainer.appendChild(editButton);
                buttonContainer.appendChild(deleteButton);
                jobCard.appendChild(jobTitle);
                jobCard.appendChild(jobId);
                jobCard.appendChild(companyName);
                jobCard.appendChild(experiance);
                jobCard.appendChild(Salary);
                jobCard.appendChild(status);
                jobCard.appendChild(jobDescription);
                jobCard.appendChild(buttonContainer);

                deleteButton.onclick = function () {
                    if (confirm('Are you sure you want to delete this job posting?')) {
                        jobCard.remove();
                    }
                };
                editButton.onclick = function () {
                    window.location.href = 'index9.html';
                };

                document.getElementById('cards').appendChild(jobCard);
                }    
            }
        }
        
    } 

    xhttp.open('GET', "./scripts/Jobs.xml");
    xhttp.send();
})

/* End search for results 'onclick' */


/* Start search for results 'typing' */

document.getElementById('searchInput').addEventListener('input', function(){
    const xhttp = new XMLHttpRequest();
    document.getElementById('cards').innerHTML = '';
    xhttp.onload = function(){
        const xhttpResponse = xhttp.responseXML;
        let inputValue = text.innerHTML;
        let searchValue = document.getElementById('searchInput').value;
        let jobs = xhttpResponse.getElementsByTagName('Job');
    
        if (inputValue == 'By Title'){
            let regex = new RegExp(`.*${searchValue}.*`, 'i');
            for (i = 0; i < jobs.length; i++){
                if (regex.test(jobs[i].getElementsByTagName('Title')[0].textContent)){
                    let jobCard = document.createElement('div');
                    let jobTitle =  document.createElement('h3');
                    let jobId =  document.createElement('h3');
                    let companyName = document.createElement('p');
                    let experiance = document.createElement('p');
                    let Salary = document.createElement('p');
                    let jobDescription = document.createElement('p');
                    let status = document.createElement('p');
                    let buttonContainer = document.createElement('div');
                    let editButton = document.createElement('button');
                    let deleteButton = document.createElement('button');

                    jobCard.className = 'jobCard';
                    buttonContainer.className = 'editDeletecontainer';
                    editButton.className = 'editButton';
                    deleteButton.className = 'deleteButton';
                    
                    jobTitle.innerHTML = '<span class="label">Title: </span><br>' + jobs[i].getElementsByTagName('Title')[0].textContent;
                    jobId.innerHTML = '<span class="label">Job ID: </span><br>' + jobs[i].getElementsByTagName('Id')[0].textContent;
                    companyName.innerHTML = '<span class="label">Company: </span><br>' + jobs[i].getElementsByTagName('Company')[0].textContent;
                    experiance.innerHTML = '<span class="label">Years of Experiance: </span><br>' + jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent;
                    Salary.innerHTML = '<span class="label">Salary: </span><br>' + jobs[i].getElementsByTagName('Salary')[0].textContent;
                    status.innerHTML = '<span class="label">Status: </span><br>' + jobs[i].getElementsByTagName('Status')[0].textContent;
                    jobDescription.innerHTML = '<span class="label">Job description: </span><br>' + jobs[i].getElementsByTagName('JobDescription')[0].textContent;
                    editButton.innerHTML = 'Edit';
                    deleteButton.innerHTML = 'Delete';

                    buttonContainer.appendChild(editButton);
                    buttonContainer.appendChild(deleteButton);
                    jobCard.appendChild(jobTitle);
                    jobCard.appendChild(jobId);
                    jobCard.appendChild(companyName);
                    jobCard.appendChild(experiance);
                    jobCard.appendChild(Salary);
                    jobCard.appendChild(status);
                    jobCard.appendChild(jobDescription);
                    jobCard.appendChild(buttonContainer);

                    deleteButton.onclick = function () {
                        if (confirm('Are you sure you want to delete this job posting?')) {
                            jobCard.remove();
                        }
                    };
                    editButton.onclick = function () {
                        window.location.href = 'index9.html';
                    };

                    document.getElementById('cards').appendChild(jobCard);
                        
                }   
            }
        }

        else if(inputValue == 'By Years of Experience'){
            let regex = new RegExp(`.*${searchValue}.*`, 'i');
            for (i = 0; i < jobs.length; i++){
            if (regex.test(jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent)){
                    let jobCard = document.createElement('div');
                    let jobTitle =  document.createElement('h3');
                    let jobId =  document.createElement('h3');
                    let companyName = document.createElement('p');
                    let experiance = document.createElement('p');
                    let Salary = document.createElement('p');
                    let jobDescription = document.createElement('p');
                    let status = document.createElement('p');
                    let buttonContainer = document.createElement('div');
                    let editButton = document.createElement('button');
                    let deleteButton = document.createElement('button');

                    jobCard.className = 'jobCard';
                    buttonContainer.className = 'editDeletecontainer';
                    editButton.className = 'editButton';
                    deleteButton.className = 'deleteButton';
                    
                    jobTitle.innerHTML = '<span class="label">Title: </span><br>' + jobs[i].getElementsByTagName('Title')[0].textContent;
                    jobId.innerHTML = '<span class="label">Job ID: </span><br>' + jobs[i].getElementsByTagName('Id')[0].textContent;
                    companyName.innerHTML = '<span class="label">Company: </span><br>' + jobs[i].getElementsByTagName('Company')[0].textContent;
                    experiance.innerHTML = '<span class="label">Years of Experiance: </span><br>' + jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent;
                    Salary.innerHTML = '<span class="label">Salary: </span><br>' + jobs[i].getElementsByTagName('Salary')[0].textContent;
                    status.innerHTML = '<span class="label">Status: </span><br>' + jobs[i].getElementsByTagName('Status')[0].textContent;
                    jobDescription.innerHTML = '<span class="label">Job description: </span><br>' + jobs[i].getElementsByTagName('JobDescription')[0].textContent;
                    editButton.innerHTML = 'Edit';
                    deleteButton.innerHTML = 'Delete';

                    buttonContainer.appendChild(editButton);
                    buttonContainer.appendChild(deleteButton);
                    jobCard.appendChild(jobTitle);
                    jobCard.appendChild(jobId);
                    jobCard.appendChild(companyName);
                    jobCard.appendChild(experiance);
                    jobCard.appendChild(Salary);
                    jobCard.appendChild(status);
                    jobCard.appendChild(jobDescription);
                    jobCard.appendChild(buttonContainer);

                    deleteButton.onclick = function () {
                        if (confirm('Are you sure you want to delete this job posting?')) {
                            jobCard.remove();
                        }
                    };
                    editButton.onclick = function () {
                        window.location.href = 'index9.html';
                    };

                    document.getElementById('cards').appendChild(jobCard);
                }    
            }
        }
        
    } 

    xhttp.open('GET', "./scripts/Jobs.xml");
    xhttp.send();
})


/* End search for results 'typing' */