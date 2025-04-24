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
    let applyButton = document.createElement('button');

    jobCard.className = 'jobCard';
    buttonContainer.id = 'applyButtoncontainer';
    applyButton.id = 'applyButton';

    jobTitle.innerHTML = '<span class="label">Title: </span><br>' + job['title'];
    jobId.innerHTML = '<span class="label">Job ID: </span><br>' + job['id'];
    companyName.innerHTML = '<span class="label">Company: </span><br>' + job['company'];
    experiance.innerHTML = '<span class="label">Years of Experiance: </span><br>' + job['yearsOfExperiance'];
    Salary.innerHTML = '<span class="label">Salary: </span><br>' + job['salary'];
    status.innerHTML = '<span class="label">Status: </span><br>' + job['status'];
    jobDescription.innerHTML = '<span class="label">Job description: </span><br>' + job['description'];
    applyButton.innerHTML = 'Apply';

    buttonContainer.appendChild(applyButton);
    jobCard.appendChild(jobTitle);
    jobCard.appendChild(jobId);
    jobCard.appendChild(companyName);
    jobCard.appendChild(experiance);
    jobCard.appendChild(Salary);
    jobCard.appendChild(status);
    jobCard.appendChild(jobDescription);
    jobCard.appendChild(buttonContainer);

    document.getElementById('cards').appendChild(jobCard);
}





/* Start display all jobs onload */

window.onload = function () {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    for (let i = 0; i < jobs.length; i++) {
        addJobCard(jobs[i]);
    };
}

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
            if (regex.test(jobs[i]['Title'])){
                addJobCard(jobs[i]);

            }
        }
    }

    else{
        let regex = new RegExp(`.*${searchValue}.*`, 'i');
        for (i = 0; i < jobs.length; i++){
            if (regex.test(jobs[i]['YearsofExperiance'])){
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
            if (regex.test(jobs[i]['Title'])){
                addJobCard(jobs[i]);

            }
        }
    }

    else{
        let regex = new RegExp(`.*${searchValue}.*`, 'i');
        for (i = 0; i < jobs.length; i++){
            if (regex.test(jobs[i]['YearsofExperiance'])){
                addJobCard(jobs[i]);
            }
        }
    }
})


/* End search for results 'typing' */