addJobCard = function(job){
    let jobCard = document.createElement('div');
    let jobTitle =  document.createElement('h3');
    let jobId =  document.createElement('h3');
    let companyName = document.createElement('p');
    let experiance = document.createElement('p');
    let Salary = document.createElement('p');
    let jobDescription = document.createElement('p');
    let status = document.createElement('p');

    jobCard.className = 'jobCard';
    jobTitle.innerHTML = '<span class="label">Title: </span><br>' + job.Title;
    jobId.innerHTML = '<span class="label">Job ID: </span><br>' + job.ID;
    companyName.innerHTML = '<span class="label">Company: </span><br>' + job.CompanyName;
    experiance.innerHTML = '<span class="label">Years of Experience: </span><br>' + job.Experience;
    Salary.innerHTML = '<span class="label">Salary: </span><br>' + job.Salary;
    status.innerHTML = '<span class="label">Status: </span><br>' + job.Status;
    jobDescription.innerHTML = '<span class="label">Job description: </span><br>' + job.Description;

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
    let username = document.getElementById('username').dataset.username;
    const addedJobIds = new Set(); // Track already added jobs by ID

    fetch('/UserHomePage/AppliedJob/')
        .then(response => response.json())
        .then(appliedJobs => {
            for (const appliedJob of appliedJobs) {

                fetch('/AdminHomePage/jobModel')
                    .then(response => response.json())
                    .then(jobs => {
                        for (const job of jobs) {
                            if (appliedJob.User === username && appliedJob.job_ID === job.ID && !addedJobIds.has(job.ID)) {
                                addJobCard(job);
                                addedJobIds.add(job.ID); // Mark as added
                            }
                        }
                    });
            }
        });
};


/* End display all jobs onload */