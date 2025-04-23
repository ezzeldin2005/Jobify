document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault();
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const newjob = {
        company: this.elements["jobCompany"].value,
        id: this.elements["jobID"].value,
        title: this.elements["jobTitle"].value,
        salary: this.elements["jobSalary"].value,
        yearsOfExperiance: this.elements["jobExperiance"].value,
        description: this.elements["jobDescription"].value,
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