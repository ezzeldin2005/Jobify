document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault();
    const formData = new FormData(this);
    let username = document.getElementById('username').dataset.username
    let id = this.elements["jobID"].value
    fetch('/AdminHomePage/jobModel')
        .then(response => response.json())
        .then(jobs =>{
            for(const job of jobs) {
                console.log("entered loop")
                if (job.ID == id) {
                    document.getElementById('message').textContent = 'Job ID already exists!';
                    document.getElementById('message').style.color = 'red';
                    document.getElementById('message').style.marginTop = '2px';
                    return;
                }
            }
            fetch(`/AdminHomePage/AddJob/${username}/`, {method: 'post', body: formData})
                .then(response => response.json())
                .then(data => console.log(data))
            document.getElementById('message').textContent = 'Job added successfully!';
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').style.marginTop = '2px';
            document.getElementById('form').reset()
            document.getElementById("jobCompany").value = formData.jobCompany;

        })
})

document.addEventListener('DOMContentLoaded', function(){

    let username = document.getElementById('username').dataset.username
    document.getElementById('cs').textContent = username;

    fetch('/adminModel/')
        .then(response => response.json())
        .then(admins => {
            for (const admin of admins){
                if (admin.Username == username){
                    document.getElementById("jobCompany").value = admin.CompanyName;
                    return;
                }
            }
        })
})



