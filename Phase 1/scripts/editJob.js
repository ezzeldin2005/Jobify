// show job details in the form to be edited
let showJobData = function(job)
{
    Username = job.Admin;
    document.getElementById('jobCompany').value = job.CompanyName;
    document.getElementById('jobID').value = job.ID;
    document.getElementById('jobTitle').value = job.Title;
    document.getElementById('jobSalary').value = job.Salary;
    document.getElementById('jobExperience').value = job.Experience;
    document.getElementById('jobDescription').value = job.Description;
    const statusRadio = document.getElementsByName('jobStatus');
    for(const option of statusRadio ){
        option.checked = (job.Status === option.value);
    }


}

// retrieve job details for editing
window.onload = function () {
 let job_id = document.getElementById('id').dataset.job_id
    fetch('/AdminHomePage/jobModel')
        .then(response => response.json())
        .then(jobs => {
            for(job of jobs){
                if(job.ID == job_id){
                    showJobData(job);
                    document.getElementById('home').href = `/AdminHomePage/${Username}/`;
                    document.getElementById('addjob').href = `/AdminHomePage/AddJob/${Username}/`;
                    document.getElementById('editjob').href = `/AdminHomePage/SearchJob/${Username}/`;
                    break;
                }
            }
        })
}


// edit job details and save to local storage
document.getElementById('form').addEventListener('submit', function (def) {
    let job_id = document.getElementById('id').dataset.job_id
    def.preventDefault();
    let editedjob = {
        company: this.elements["jobCompany"].value,
        id: this.elements["jobID"].value,
        title: this.elements["jobTitle"].value,
        salary: this.elements["jobSalary"].value,
        yearsOfExperiance: this.elements["jobExperience"].value,
        description: this.elements["jobDescription"].value,
        status: this.elements["jobStatus"].value,
    };

    fetch(`/AdminHomePage/UpdateJob/${job_id}/`, { method: 'PUT',body: JSON.stringify(editedjob) })
    .then(response => response.json())
    .then(data => console.log(data))

    window.location.href = `/AdminHomePage/SearchJob/${Username}/`;
})


document.getElementById('Logout').addEventListener('click', function(e) {

    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserId');

});