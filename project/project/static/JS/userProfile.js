window.onload = function () {

    // Function to get the current user's email
    function getCurrentUserEmail() {
        return localStorage.getItem('currentUserEmail');
    }

    const email = getCurrentUserEmail();
    if (!email) {
        console.error('No user email found in localStorage');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    const user = users.find(u => u.email === email);
    const profile = profiles.find(p => p.email === email);
    const indexPro = profiles.findIndex(p => p.email === email);
    const indexUser = users.findIndex(u => u.email === email);

    if (!user || !profile) {
        console.error('User or profile data is missing');
        return;
    }

    let jobTitle = profile.jobTitle || '';
    let phoneNumber = profile.phoneNumber || '';
    let about = profile.about || '';
    let profileImageURL = profile.profileImageURL || '../styles/images/default-profile-picture.png';
    let backgroundURL = profile.backgroundURL || '../styles/images/defaultBackground.jpg';

    // Display user data
    document.querySelector('#username').innerHTML = user.username;
    document.querySelector('#job').innerHTML = jobTitle;
    document.querySelector('#email').innerHTML = email;
    document.querySelector('#About').innerHTML = about;
    document.querySelector("#imgPro").src = profileImageURL;
    document.querySelector(".head").style.background = `url("${backgroundURL}") no-repeat 50% 20% / cover`;

    function buildEdit() {
        const modalOverlay = document.createElement("div");
        modalOverlay.className = "modal-overlay";
        modalOverlay.id = "modalOverlay";

        const modal = document.createElement("div");
        modal.className = "modal";

        const modalHeader = document.createElement("div");
        modalHeader.className = "modal-header";

        const closeBtn = document.createElement("span");
        closeBtn.className = "close-btn";
        closeBtn.id = "closeModalBtn";
        closeBtn.innerHTML = "&times;";
        closeBtn.addEventListener('click', () => modalOverlay.remove());

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

        function createInput(labelText, inputId, inputType, inputName, value, required = false, readonly = false, pattern = "") {
            const label = document.createElement("label");
            label.htmlFor = inputId;
            label.textContent = labelText;

            const input = document.createElement("input");
            input.type = inputType;
            input.className = "editFormInput";
            input.id = inputId;
            input.name = inputName;
            input.value = value || '';
            if (required) input.required = true;
            if (readonly) input.readOnly = true;
            if (pattern) input.pattern = pattern;

            form.appendChild(label);
            form.appendChild(input);
        }

        createInput("User Name*", "userName", "text", "userName", user.username, true);
        createInput("Email*", "Email", "email", "email", email, true, true);
        createInput("Job Title", "jobTile", "text", "jobTitle", jobTitle);
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

        saveBtn.addEventListener('click', function () {
            users[indexUser].username = document.querySelector("#userName").value;
            profiles[indexPro].jobTitle = document.querySelector("#jobTile").value;
            profiles[indexPro].phoneNumber = document.querySelector("#phone").value;
            profiles[indexPro].about = document.querySelector("#about").value;

            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("profiles", JSON.stringify(profiles));

            document.querySelector('#username').innerHTML = users[indexUser].username;
            document.querySelector('#job').innerHTML = profiles[indexPro].jobTitle;
            document.querySelector('#About').innerHTML = profiles[indexPro].about;

            modalOverlay.remove();
        });

        modalFooter.appendChild(saveBtn);
        modal.appendChild(modalHeader);
        modal.appendChild(modalBody);
        modal.appendChild(modalFooter);
        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);
    }

    document.getElementById('edit-btn').addEventListener('click', buildEdit);

    // Background
    const cameraBtn = document.getElementById("background-btn");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const changeBtn = document.getElementById("fileInput");
    const deleteBtn = document.getElementById("delete-btn");

    cameraBtn.addEventListener("click", () => {
        deleteBtn.style.display = (backgroundURL === '../styles/images/defaultBackground.jpg') ? "none" : "block";
        dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
    });

    changeBtn.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                backgroundURL = e.target.result;
                profiles[indexPro].backgroundURL = backgroundURL;
                localStorage.setItem("profiles", JSON.stringify(profiles));
                document.querySelector(".head").style.background = `url("${backgroundURL}") no-repeat 50% 20% / cover`;
            };
            reader.readAsDataURL(file);
        }
    });

    deleteBtn.addEventListener("click", () => {
        backgroundURL = "../styles/images/defaultBackground.jpg";
        profiles[indexPro].backgroundURL = backgroundURL;
        localStorage.setItem("profiles", JSON.stringify(profiles));
        document.querySelector(".head").style.background = `url("styles/images/defaultBackground.jpg") no-repeat 50% 20% / cover`;
    });

    window.addEventListener("click", (e) => {
        if (!e.target.matches('#background-btn')) dropdownMenu.style.display = "none";
    });

    // Profile picture modal
    const modal = document.getElementById("profileModal");
    const openBtn = document.getElementById("imgPro");
    const closeBtn = document.querySelector(".close");
    const changeProPicBtn = document.getElementById("profileInput");
    const deleteproPicBtn = document.getElementById("deleteProPic-btn");

    openBtn.onclick = () => {
        document.getElementById("profile-image").src = profileImageURL;
        modal.style.display = "flex";
    };

    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    changeProPicBtn.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImageURL = e.target.result;
                profiles[indexPro].profileImageURL = profileImageURL;
                localStorage.setItem("profiles", JSON.stringify(profiles));
                document.querySelector("#imgPro").src = profileImageURL;
                document.querySelector("#profile-image").src = profileImageURL;
            };
            reader.readAsDataURL(file);
        }
    });

    deleteproPicBtn.addEventListener("click", () => {
        profileImageURL = "../styles/images/default-profile-picture.png"
        profiles[indexPro].profileImageURL = profileImageURL;
        localStorage.setItem("profiles", JSON.stringify(profiles));
        document.querySelector("#imgPro").src = "styles/images/default-profile-picture.png";
        document.querySelector("#profile-image").src = "styles/images/default-profile-picture.png";
    });

    document.getElementById('Logout').addEventListener('click', function (e) {
    
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('currentUserId');

    });
};
