let id = "1";

function buildEdit(users){
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

    //Retrieve the data from the xml file
    let firstName, lastName, Email, jobTitle, birthday, phoneNumber

    for (let i = 0; i < users.length; i++) {
        const userId = users[i].getElementsByTagName('Id')[0].textContent;

        if (id === userId) {
            firstName = users[i].getElementsByTagName('FirstName')[0].textContent;
            lastName = users[i].getElementsByTagName('LastName')[0].textContent;
            Email = users[i].getElementsByTagName('Email')[0].textContent;
            jobTitle = users[i].getElementsByTagName('JobTile')[0].textContent;
            birthday = users[i].getElementsByTagName('Birthday')[0].textContent;
            phoneNumber = users[i].getElementsByTagName('PhoneNumber')[0].textContent;
        }
    }

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
    function createInput(labelText, inputId, inputType, inputName, required = false, value, pattern = "") {
        const label = document.createElement("label");
        label.htmlFor = inputId;
        label.textContent = labelText;

        const input = document.createElement("input");
        input.type = inputType;
        input.id = inputId;
        input.name = inputName;
        if (required) input.required = true;
        if (pattern) input.pattern = pattern;
        if (value) input.value = value;  // temp

        form.appendChild(label);
        form.appendChild(input);
    }

    createInput("First name*", "firstName", "text", "fname", true, firstName);
    createInput("Last name*", "lastName", "text", "lname", true, lastName);
    createInput("Email*", "Email", "email", "email", true, Email);
    createInput("Job Title", "jobTile", "text", "jobTitle",false, jobTitle);
    createInput("Birthday", "birthday", "date", "birthday", false, birthday);
    createInput("Phone number", "phone", "tel", "phone", false, phoneNumber, "[0-9]{11}");

    modalBody.appendChild(requiredNote);
    modalBody.appendChild(form);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";

    const saveBtn = document.createElement("button");
    saveBtn.id = "saveBtn";
    saveBtn.className = "save-btn";
    saveBtn.textContent = "Save";

    // save modal   temporary
    saveBtn.addEventListener('click', function () {
        document.getElementById('modalOverlay').remove();
    });

    modalFooter.appendChild(saveBtn);

    modal.appendChild(modalHeader);
    modal.appendChild(modalBody);
    modal.appendChild(modalFooter);

    modalOverlay.appendChild(modal);

    document.body.appendChild(modalOverlay);
}

function buildBackgroundEdit(users){

}

document.getElementById('edit-btn').addEventListener('click', function () {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (){
        const xmlDoc = xhttp.responseXML;
        const users = xmlDoc.getElementsByTagName("user");
        buildEdit(users);
    }
    xhttp.open("GET", "scripts/userProfiles.xml");
    xhttp.send();
});

document.getElementById('edit-background-btn').addEventListener('click', function () {
    // Create modal overlay
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    modalOverlay.id = "modalOverlay";

    // Create modal
    const modal = document.createElement("div");
    modal.className = "modal-background";

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
    headerTitle.textContent = "Cover image";

    modalHeader.appendChild(closeBtn);
    modalHeader.appendChild(headerTitle);

});

// Background
const cameraBtn = document.getElementById("background-btn");
const dropdownMenu = document.getElementById("dropdownMenu");
const changeBtn = document.getElementById("fileInput");
const deleteBtn = document.getElementById("delete-btn");

cameraBtn.addEventListener("click", () => {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

changeBtn.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newURL = e.target.result;
            document.querySelector(".head").style.background = `url("${newURL}") no-repeat 50% 20% / cover`;
        };
        reader.readAsDataURL(file);
    }
});


deleteBtn.addEventListener("click", () => {
    document.querySelector(".head").style.background = 'url("styles/images/defaultBackground.jpg") no-repeat 50% 20% / cover';
});

// Profile picture
const modal = document.getElementById("profileModal");
const openBtn = document.getElementById("imgPro");
const closeBtn = document.querySelector(".close");
const changeProPicBtn = document.getElementById("profileInput");
const deleteproPicBtn = document.getElementById("deleteProPic-btn");

// Open modal
openBtn.onclick = () => modal.style.display = "flex";

// Close modal
closeBtn.onclick = () => modal.style.display = "none";

// Close when clicking outside
window.onclick = (e) => {
    if (!event.target.matches('#background-btn')) {
        dropdownMenu.style.display = "none";
    }

    if (e.target === modal) modal.style.display = "none";
};

changeProPicBtn.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector("#imgPro").src = e.target.result;
            document.querySelector("#profile-image").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

deleteproPicBtn.addEventListener("click", () => {
    document.querySelector("#imgPro").src = "styles/images/default-profile-picture.png";
    document.querySelector("#profile-image").src = "styles/images/default-profile-picture.png";
});