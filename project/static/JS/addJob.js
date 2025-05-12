document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault();
    let id = this.elements["jobID"].value
    fetch('AdminHomePage/jobModel')
        .then(response => response.json())
        .then(jobs =>{
            for(job of jobs) {
                if (job.ID == id) {
                    document.getElementById('message').textContent = 'Job ID already exists!';
                    document.getElementById('message').style.color = 'red';
                    document.getElementById('message').style.marginTop = '2px';
                    return;
                } else {
                    document.getElementById('message').textContent = 'Job added successfully!';
                    document.getElementById('message').style.color = 'green';
                    document.getElementById('message').style.marginTop = '2px';
                    document.getElementById('form').reset()
                }
            }
        })
})

document.addEventListener("load", function(e){
    let username = document.getElementById('username').dataset.username
    fetch('adminModel/')
        .then(response => response.json())
        .then(admins => {
            for (admin of admins){
                if (admin.Username == username){
                    document.getElementById("jobCompany").value = admin.CompanyName;
                    return;
                }
            }
        })
})


