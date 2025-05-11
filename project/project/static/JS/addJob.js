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
    if (checkId(newjob['id'])) {
        document.getElementById('message').textContent = 'Job ID already exists!';
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').style.marginTop = '2px';
        return;
    }
    else
    {
        document.getElementById('message').textContent = 'Job added successfully!';
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').style.marginTop = '2px';
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

let checkId = function(id){
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i]['id'] == id) {
            return true;
        }
    }
    return false;

}

document.getElementById('Logout').addEventListener('click', function() {
    
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserId');

});