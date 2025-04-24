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
    
    jobTitle.innerHTML = '<span class="label">Title: </span><br>' + job['title'];
    jobId.innerHTML = '<span class="label">Job ID: </span><br>' + job['id'];
    companyName.innerHTML = '<span class="label">Company: </span><br>' + job['company'];
    experiance.innerHTML = '<span class="label">Years of Experiance: </span><br>' + job['yearsofExperiance'];
    Salary.innerHTML = '<span class="label">Salary: </span><br>' + job['salary'];
    status.innerHTML = '<span class="label">Status: </span><br>' + job['status'];
    jobDescription.innerHTML = '<span class="label">Job description: </span><br>' + job['description'];
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
            let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
            jobs = jobs.filter(item => item["id"] !== job["id"]);
            localStorage.setItem("jobs", JSON.stringify(jobs));
        }
    };
    editButton.onclick = function () {
        window.location.href = 'index9.html';
    };

    document.getElementById('cards').appendChild(jobCard);
}



/* Start display all jobs onload */

window.onload = function () {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    for (let i = 0; i < jobs.length; i++) {
        addJobCard(jobs[i]);
    };
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
    document.getElementById('cards').innerHTML = '';
    let inputValue = text.innerHTML;
    let searchValue = document.getElementById('searchInput').value;
    const jobs = JSON.parse(localStorage.getItem("jobs")) || []; 

    if (inputValue == 'By Title'){
        let regex = new RegExp(`.*${searchValue}.*`, 'i');
        for (i = 0; i < jobs.length; i++){
            if (regex.test(jobs[i].getElementsByTagName('Title')[0].textContent)){
                addJobCard(jobs[i]);
                
            }   
        }
    }

    else{
        let regex = new RegExp(`.*${searchValue}.*`, 'i');
        for (i = 0; i < jobs.length; i++){
        if (regex.test(jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent)){
                addJobCard(jobs[i]);
            }    
        }
    }
})

/* End search for results 'onclick' */


/* Start search for results 'typing' */

document.getElementById('searchInput').addEventListener('input', function(){
    document.getElementById('cards').innerHTML = '';
    let inputValue = text.innerHTML;
    let searchValue = document.getElementById('searchInput').value;
    const jobs = JSON.parse(localStorage.getItem("jobs")) || []; 

    if (inputValue == 'By Title'){
        let regex = new RegExp(`.*${searchValue}.*`, 'i');
        for (i = 0; i < jobs.length; i++){
            if (regex.test(jobs[i].getElementsByTagName('Title')[0].textContent)){
                addJobCard(jobs[i]);
                
            }   
        }
    }

    else{
        let regex = new RegExp(`.*${searchValue}.*`, 'i');
        for (i = 0; i < jobs.length; i++){
        if (regex.test(jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent)){
                addJobCard(jobs[i]);
            }    
        }
    }
})


/* End search for results 'typing' */

document.getElementById('Logout').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserId');
    window.location.href = './index0.html'; // Redirect to your login page
});