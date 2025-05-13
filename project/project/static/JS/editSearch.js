let addJobCard = function(job){
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

    jobTitle.innerHTML = '<span class="label">Title: </span><br>' + job.Title;
    jobId.innerHTML = '<span class="label">Job ID: </span><br>' + job.ID;
    companyName.innerHTML = '<span class="label">Company: </span><br>' + job.CompanyName;
    experiance.innerHTML = '<span class="label">Years of Experiance: </span><br>' + job.Experience;
    Salary.innerHTML = '<span class="label">Salary: </span><br>' + job.Salary;
    status.innerHTML = '<span class="label">Status: </span><br>' + job.Status;
    jobDescription.innerHTML = '<span class="label">Job description: </span><br>' + job.Description;
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
            fetch(`/AdminHomePage/DeleteJob/${job.ID}/`)
                .then(response => response.json())
                .then(status => console.log(status.status))
        }
    };
    editButton.onclick = function () {
        window.location.href = `/AdminHomePage/EditJob/${job.ID}/`;
    };

    document.getElementById('cards').appendChild(jobCard);
}



/* Start display all jobs onload */

window.onload = function () {
    let username = document.getElementById('username').dataset.username
    fetch('/AdminHomePage/jobModel/')
        .then(response=>response.json())
        .then(jobs=>{
            for (const job of jobs) {
                if(job.Admin == username)
                addJobCard(job);
            };
        })
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
    let username = document.getElementById('username').dataset.username
    document.getElementById('cards').innerHTML = '';
    let inputValue = text.innerHTML;
    let searchValue = document.getElementById('searchInput').value;
    fetch('/AdminHomePage/jobModel/')
        .then(response=>response.json())
        .then(jobs => {
            if (inputValue == 'By Title'){
                let regex = new RegExp(`.*${searchValue}.*`, 'i');
                for (const job of jobs){
                    if (regex.test(job.Title) && job.Admin == username){
                        addJobCard(job);

                    }
                }
            }

            else{
                let regex = new RegExp(`.*${searchValue}.*`, 'i');
                for (const job of jobs){
                    if (regex.test(jobs.Experience) && job.Admin == username){
                        addJobCard(job);
                    }
                }
            }
        })


})

/* End search for results 'onclick' */


/* Start search for results 'typing' */

document.getElementById('searchInput').addEventListener('input', function(){
    document.getElementById('cards').innerHTML = '';
    let inputValue = text.innerHTML;
    let searchValue = document.getElementById('searchInput').value;
    fetch('/AdminHomePage/jobModel/')
        .then(response=>response.json())
        .then(jobs => {
            if (inputValue == 'By Title'){
                let regex = new RegExp(`.*${searchValue}.*`, 'i');
                for (const job of jobs){
                    if (regex.test(job.Title) && job.Admin == username){
                        addJobCard(job);

                    }
                }
            }

            else{
                let regex = new RegExp(`.*${searchValue}.*`, 'i');
                for (const job of jobs){
                    if (regex.test(jobs.Experience) && job.Admin == username){
                        addJobCard(job);
                    }
                }
            }
        })
})

