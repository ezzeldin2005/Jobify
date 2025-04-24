// show job details in the form to be edited
let showJobData = function(job)
{
    
    document.getElementById('jobCompany').value = job['company'];
    document.getElementById('jobID').value = job['id'];
    document.getElementById('jobTitle').value = job['title'];   
    document.getElementById('jobSalary').value = job['salary'];
    document.getElementById('jobExperiance').value = job['yearsOfExperiance'];
    document.getElementById('jobDescription').value = job['description'];
    const statusRadio = document.getElementsByName('jobStatus');
    for(const option of statusRadio ){
        option.checked = (job['status'] === option.value);
    }


}

// retrieve job details for editing
window.onload = function () {
const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i]['id'] == localStorage.getItem("editId")) {
            showJobData(jobs[i]);
            break
        }
    }; 
    
}


// edit job details and save to local storage
document.getElementById('form').addEventListener('submit', function (def) {
    def.preventDefault();
    let editedjob = {
        company: this.elements["jobCompany"].value,
        id: this.elements["jobID"].value,
        title: this.elements["jobTitle"].value,
        salary: this.elements["jobSalary"].value,
        yearsOfExperiance: this.elements["jobExperiance"].value,
        description: this.elements["jobDescription"].value,
        status: this.elements["jobStatus"].value,
    };

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i]['id'] == localStorage.getItem("editId")) {
            jobs[i] = editedjob;
            break;
        }
    }
    localStorage.setItem("jobs", JSON.stringify(jobs));
    window.location.href = 'index8.html';
})


document.getElementById('Logout').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserId');
    window.location.href = './index0.html'; // Redirect to your login page
});