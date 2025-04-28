let users, user, profiles, profile, email, appliedJobs;
let currentJobToApply = null;

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
    applyButton.className = 'applyButton';
    applyButton.id = `applyButton${job['id']}`;

    jobTitle.innerHTML = '<span class="label">Title: </span><br>' + job['title'];
    jobId.innerHTML = '<span class="label">Job ID: </span><br>' + job['id'];
    companyName.innerHTML = '<span class="label">Company: </span><br>' + job['company'];
    experiance.innerHTML = '<span class="label">Years of Experiance: </span><br>' + job['yearsOfExperiance'];
    Salary.innerHTML = '<span class="label">Salary: </span><br>' + job['salary'];
    status.innerHTML = '<span class="label">Status: </span><br>' + job['status'];
    jobDescription.innerHTML = '<span class="label">Job description: </span><br>' + job['description'];

    // Check if the user applied for this job before or not
    if (appliedJobs.some(j => j.jobID === job['id'])) {
        applyButton.innerHTML = 'Applied';
        applyButton.className = 'applied';
        applyButton.disabled = true;
    }
    else{
        applyButton.innerHTML = 'Apply';
        applyButton.addEventListener('click', () => openApplyPopup(job));
    }

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


// Get the current user's email
function getCurrentUserEmail() {
    return localStorage.getItem('currentUserEmail');
}


/* Start display all jobs onload */

window.onload = function () {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    users = JSON.parse(localStorage.getItem("users")) || [];
    profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    email = getCurrentUserEmail();
    user = users.find(u => u.email === email);
    profile = profiles.find(p => p.email === email);

    for (let i = 0; i < jobs.length; i++) {
        addJobCard(jobs[i]);
    }
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
            if (regex.test(jobs[i]['title'])){
                addJobCard(jobs[i]);

            }
        }
    }

    else{
        let regex = new RegExp(`.*${searchValue}.*`, 'i');
        for (i = 0; i < jobs.length; i++){
            if (regex.test(jobs[i]['yearsOfExperiance'])){
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
            if (regex.test(jobs[i]['title'])){
                addJobCard(jobs[i]);

            }
        }
    }

    else{
        let regex = new RegExp(`.*${searchValue}.*`, 'i');
        for (i = 0; i < jobs.length; i++){
            if (regex.test(jobs[i]['yearsOfExperiance'])){
                addJobCard(jobs[i]);
            }
        }
    }
})

/* End search for results 'typing' */


/* Start apply for a job */
function openApplyPopup(job) {
    currentJobToApply = job;
    document.querySelector('#applyPopup').style.display = 'flex';
    document.querySelector('#applyPopup h2').textContent = 'Apply to ' + job.company;
    document.querySelector('#email').value = email;
    document.querySelector('#phoneNumber').value = profile.phoneNumber;
    document.querySelector('#profilePic').src = profile.profileImageURL;
    document.querySelector('.name').innerText = user.username;
}

// Submit for apply
document.getElementById('applyBtn').addEventListener('click', function (e){
    e.preventDefault();

    const form = document.getElementById('applyForm');
    const fileInput = document.getElementById('file-input');

    if (!form.checkValidity()) {
        form.reportValidity(); // this will show the browser validation messages
    }
    else if (!fileInput.files.length) {
        // No resume selected
        document.getElementById('cvMessage').style.display = 'block';
    }
    else {
        let applyBtnCard = document.querySelector(`#applyButton${currentJobToApply['id']}`);
        document.getElementById('cvMessage').style.display = 'none';
        document.getElementById('applyPopup').style.display = 'none';
        applyBtnCard.disabled = true;
        applyBtnCard.innerHTML = 'Applied';
        applyBtnCard.className = 'applied';

        let appliedJob = {
            Email: email,
            jobID: currentJobToApply['id']
        };

        appliedJobs.push(appliedJob);
        localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));

        // Close the modal (pop up)
        document.getElementById('applyPopup').style.display = 'none';
    }
});

// Close pop-up when X is clicked
document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('applyPopup').style.display = 'none';
});

// Close pop-up when clicking outside content
window.addEventListener('click', function(e) {
    if (e.target == document.getElementById('applyPopup')) {
        document.getElementById('applyPopup').style.display = 'none';
    }
});

// I did that because the file input is hidden (For a pretty view)
document.getElementById('uploadArea').addEventListener('click', function() {
    document.getElementById('file-input').click();
});

// ديه شويه حركات كده
document.getElementById('file-input').addEventListener('change', function() {
    const fileName = this.files[0]?.name || 'No file chosen';
    document.getElementById('uploadArea').innerHTML = `<p><i class="fas fa-file-upload"></i><br>${fileName}</p>`;
});


// finally, the end of the apply

// Logout
document.getElementById('Logout').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserId');
    window.location.href = './index0.html'; // Redirect to your login page
});