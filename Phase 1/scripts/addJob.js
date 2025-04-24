document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault();
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const newjob = {
        company: this.elements["jobCompany"].value,
        id: this.elements["jobID"].value,
        title: this.elements["jobTitle"].value,
        salary: this.elements["jobSalary"].value,
        yearsOfExperiance: this.elements["jobExperiance"].value,
        descreption: this.elements["jobDescription"].value,
        status: this.elements["jobStatus"].value,
    }

    jobs.push(newjob);
    localStorage.setItem("jobs", JSON.stringify(jobs));

    this.elements["jobCompany"].value = "";
    this.elements["jobID"].value = "";
    this.elements["jobTitle"].value = "";
    this.elements["jobSalary"].value = "";
    this.elements["jobExperiance"].value = "";
    this.elements["jobDescription"].value = "";
    for(let option of this.elements["jobStatus"]){
        option.checked = false;
    }
})

document.getElementById('Logout').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserId');
    window.location.href = './index0.html'; // Redirect to your login page
});