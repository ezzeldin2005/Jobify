// Function to get the current user's email (can be used anywhere in your application)
function getCurrentUserEmail() {
    return localStorage.getItem('currentUserEmail');
}

// Retrieve the data from localStorage
let email = getCurrentUserEmail();
const users = JSON.parse(localStorage.getItem('users')) || [];
const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
const user = users.find(u => u.email === email);
const profile = profiles.find(p => p.email === email);
const indexPro = profiles.findIndex(p => p.email === email);
const indexUser = users.findIndex(u => u.email === email);

let jobTitle = '', birthday = '', phoneNumber = '', about = '';
let profileImageURL = '../styles/images/default-profile-picture.png';
let backgroundURL = '../styles/images/defaultBackground.jpg';

if (profile) {
    jobTitle = profile.jobTitle || '';
    birthday = profile.birthday || '';
    phoneNumber = profile.phoneNumber || '';
    about = profile.about || '';
    profileImageURL = profile.profileImageURL || '../styles/images/default-profile-picture.png';
    backgroundURL = profile.backgroundURL || '../styles/images/defaultBackground.jpg';
}

else {
    // Create profile object
    const newProfile = {
        email,
        jobTitle,
        birthday,
        phoneNumber,
        profileImageURL,
        backgroundURL,
        about
    };
    // Save to storage
    profiles.push(newProfile);
    localStorage.setItem('profiles', JSON.stringify(profiles));
}

// display
document.querySelector('#username').innerHTML = user.username;
document.querySelector('#job').innerHTML = jobTitle;
document.querySelector('#email').innerHTML = email;
document.querySelector('#About').innerHTML = about;
document.querySelector("#imgPro").src = profileImageURL;
document.querySelector(".head").style.background = `url("${backgroundURL}") no-repeat 50% 20% / cover`;

function buildEdit(){
    // Create modal overlay
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    modalOverlay.id = "modalOverlay";

    // Create modal
    const modal = document.createElement("div");
    modal.className = "modal";

    // Create modal header
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";

    const closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.id = "closeModalBtn";
    closeBtn.innerHTML = "&times;";

    // Close modal
    closeBtn.addEventListener('click', function () {
        document.getElementById('modalOverlay').remove();
    });

    const headerTitle = document.createElement("h3");
    headerTitle.textContent = "Edit";

    modalHeader.appendChild(closeBtn);
    modalHeader.appendChild(headerTitle);

    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";

    const requiredNote = document.createElement("div");
    requiredNote.className = "required-note";
    requiredNote.textContent = "* Indicates required";

    const form = document.createElement("form");
    form.method = "post";
    form.id = "editForm";
    form.action = "test1.js";

    // function to create labeled input
    function createInput(labelText, inputId, inputType, inputName, value, required = false, readonly = false, pattern = "") {
        const label = document.createElement("label");
        label.htmlFor = inputId;
        label.textContent = labelText;

        const input = document.createElement("input");
        input.type = inputType;
        input.className = "editFormInput";
        input.id = inputId;
        input.name = inputName;
        if (required) input.required = true;
        if (readonly) input.readOnly = true;
        if (pattern) input.pattern = pattern;
        if (value) input.value = value;  // temp

        form.appendChild(label);
        form.appendChild(input);
    }

    createInput("User Name*", "userName", "text", "userName", user.username,  true);
    createInput("Email*", "Email", "email", "email", email, true, true);
    createInput("Job Title", "jobTile", "text", "jobTitle", jobTitle);
    createInput("Birthday", "birthday", "date", "birthday", birthday);
    createInput("Phone number", "phone", "tel", "phone", phoneNumber, false, false, "[0-9]{11}");

    const label = document.createElement("label");
    label.htmlFor = "about";
    label.textContent = "About";
    const textarea = document.createElement("textarea");
    textarea.name = "about";
    textarea.id = "about";
    textarea.value = about;
    textarea.style.resize = "none";
    textarea.style.height = "150px";
    textarea.style.fontSize = "16px";
    textarea.style.padding = "10px";

    form.appendChild(label);
    form.appendChild(textarea);

    modalBody.appendChild(requiredNote);
    modalBody.appendChild(form);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";

    const saveBtn = document.createElement("button");
    saveBtn.id = "saveBtn";
    saveBtn.className = "save-btn";
    saveBtn.textContent = "Save";

    // save modal
    saveBtn.addEventListener('click', function () {
        const newUsername = document.querySelector("#userName").value;
        const newJobTitle = document.querySelector("#jobTile").value;
        const newAbout = document.querySelector("#about").value;

        users[indexUser].username = newUsername;
        profiles[indexPro].jobTitle = newJobTitle;
        profiles[indexPro].birthday = document.querySelector("#birthday").value;
        profiles[indexPro].phoneNumber = document.querySelector("#phone").value;
        profiles[indexPro].about = newAbout;

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("profiles", JSON.stringify(profiles));

        document.querySelector('#username').innerHTML = newUsername;
        document.querySelector('#job').innerHTML = newJobTitle;
        document.querySelector('#About').innerHTML = newAbout;

        document.getElementById('modalOverlay').remove();
    });

    modalFooter.appendChild(saveBtn);

    modal.appendChild(modalHeader);
    modal.appendChild(modalBody);
    modal.appendChild(modalFooter);

    modalOverlay.appendChild(modal);

    document.body.appendChild(modalOverlay);
}

document.getElementById('edit-btn').addEventListener('click', function () {
    buildEdit();
});

// Background
const cameraBtn = document.getElementById("background-btn");
const dropdownMenu = document.getElementById("dropdownMenu");
const changeBtn = document.getElementById("fileInput");
const deleteBtn = document.getElementById("delete-btn");

cameraBtn.addEventListener("click", () => {
    if (backgroundURL === '../styles/images/defaultBackground.jpg')
        document.querySelector("#delete-btn").style.display = "none";
    else
        document.querySelector("#delete-btn").style.display = "block";

    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

changeBtn.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newURL = e.target.result;
            profiles[indexPro].backgroundURL = newURL;
            localStorage.setItem("profiles", JSON.stringify(profiles));
            document.querySelector(".head").style.background = `url("${newURL}") no-repeat 50% 20% / cover`;
        };
        reader.readAsDataURL(file);
    }
});


deleteBtn.addEventListener("click", () => {
    profiles[indexPro].backgroundURL = "../styles/images/defaultBackground.jpg";
    localStorage.setItem("profiles", JSON.stringify(profiles));
    document.querySelector(".head").style.background = 'url("styles/images/defaultBackground.jpg") no-repeat 50% 20% / cover';
});

// Close when clicking outside
window.onclick = (e) => {
    if (!event.target.matches('#background-btn')) {
        dropdownMenu.style.display = "none";
    }

    if (e.target === modal) modal.style.display = "none";
};

// Profile picture
const modal = document.getElementById("profileModal");
const openBtn = document.getElementById("imgPro");
const closeBtn = document.querySelector(".close");
const changeProPicBtn = document.getElementById("profileInput");
const deleteproPicBtn = document.getElementById("deleteProPic-btn");

// Open modal
openBtn.onclick = () => {
    document.getElementById("profile-image").src = profileImageURL;
    modal.style.display = "flex";
}

// Close modal
closeBtn.onclick = () => modal.style.display = "none";


changeProPicBtn.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profiles[indexPro].profileImageURL = e.target.result;
            localStorage.setItem("profiles", JSON.stringify(profiles));
            document.querySelector("#imgPro").src = e.target.result;
            document.querySelector("#profile-image").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

deleteproPicBtn.addEventListener("click", () => {
    profiles[indexPro].profileImageURL = "../styles/images/default-profile-picture.png";
    localStorage.setItem("profiles", JSON.stringify(profiles));
    document.querySelector("#imgPro").src = "styles/images/default-profile-picture.png";
    document.querySelector("#profile-image").src = "styles/images/default-profile-picture.png";
});

document.getElementById('Logout').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserId');
    window.location.href = './index0.html'; // Redirect to your login page
});