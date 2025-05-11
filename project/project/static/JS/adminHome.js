nn vvvvv.lh0let addJobCard = function(job){
    let jobCard = document.createElement('div');
    let jobTitle =  document.createElement('h3');
    let jobId =  document.createElement('h3');
    let companyName = document.createElement('p');
    let experiance = document.createElement('p');
    let Salary = document.createElement('p');
    let jobDescription = document.createElement('p');
    let status = document.createElement('p');

    jobCard.className = 'jobCard';
    
    jobTitle.innerHTML = '<span class="label">Title: </span><br>' + job['title'];
    jobId.innerHTML = '<span class="label">Job ID: </span><br>' + job['id'];
    companyName.innerHTML = '<span class="label">Company: </span><br>' + job['company'];
    experiance.innerHTML = '<span class="label">Years of Experiance: </span><br>' + job['yearsOfExperiance'];
    Salary.innerHTML = '<span class="label">Salary: </span><br>' + job['salary'];
    status.innerHTML = '<span class="label">Status: </span><br>' + job['status'];
    jobDescription.innerHTML = '<span class="label">Job description: </span><br>' + job['description'];

    console.log('hello');

    jobCard.appendChild(jobTitle);
    jobCard.appendChild(jobId);
    jobCard.appendChild(companyName);
    jobCard.appendChild(experiance);
    jobCard.appendChild(Salary);
    jobCard.appendChild(status);
    jobCard.appendChild(jobDescription);

    document.getElementById('cards').appendChild(jobCard);
}



/* Start display all jobs onload */

window.onload = function () {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    for (let i = 0; i < jobs.length; i++) {
        addJobCard(jobs[i]);
    };
};

document.getElementById('Logout').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserId');
    window.location.href = './index0.html'; // Redirect to your login page
});