let backgroundUrl;

let showData = function(form)
{
    const mediaPrefix = "/media/";

    document.getElementById('myName').innerHTML = form.userName;
    document.getElementById('userName').value = form.userName;
    document.getElementById('job').innerHTML = form.jobsTitle;
    document.getElementById('jobTitle').value = form.jobsTitle;
    document.getElementById('email').innerHTML = form.email;
    document.getElementById('Email').value = form.email;
    document.getElementById('About').innerHTML = form.bio;
    document.getElementById('about').value = form.bio;
    document.getElementById('phone').value = form.phone_number;
    document.querySelector("#imgPro").src = mediaPrefix + form.profilePic;
    document.querySelector("#profile-image").src = mediaPrefix + form.profilePic;
    document.querySelector(".head").style.background = `url(${mediaPrefix + form.backgroundPic}) no-repeat 50% 20% / cover`;
    backgroundUrl = mediaPrefix + form.backgroundPic;
}


// retrieve data
window.onload = function () {
    let username = document.getElementById('username').dataset.username
    fetch('/UserHomePage/profileModel')
        .then(response => response.json())
        .then(forms => {
            for(form of forms)
            {
                if(form.userName == username)
                {
                    showData(form);
                    break;
                }
            }
        });
};


document.getElementById('edit-btn').addEventListener('click', () => {
    document.getElementById("modalOverlay").style.display = "flex";
});

document.getElementById("closeModalBtn").addEventListener('click', () => {
    document.getElementById("modalOverlay").style.display = "none";
});

window.addEventListener("click", (e) => {
        if (!e.target.matches('#background-btn')) dropdownMenu.style.display = "none";
});


document.getElementById("saveBtn").addEventListener('click', function (e) {
    e.preventDefault();
    let username = document.getElementById('username').dataset.username;
    console.log(document.getElementById('editForm').elements["userName"].value);
    let editedProfile = {
        USERNAME: document.getElementById('editForm').elements["userName"].value,
        EMAIL: document.getElementById('editForm').elements["Email"].value,
        JOBTITLE: document.getElementById('editForm').elements["jobTitle"].value,
        PHONE: document.getElementById('editForm').elements["phone"].value,
        ABOUT: document.getElementById('editForm').elements["about"].value,
    };

    fetch(`/UserHomePage/UpdateInformation/${username}/`, { method: 'PUT',body: JSON.stringify(editedProfile) })
    .then(response => response.json())
    .then(data => console.log(data))

    window.location.href = `/UserHomePage/Profile/${username}/`;
})

document.getElementById("background-btn").addEventListener("click", () => {
    console.log(backgroundUrl);
    document.getElementById("delete-btn").style.display = (backgroundUrl === '/media/defaults/default-profile-picture.png') ? "none" : "block";
    document.getElementById("dropdownMenu").style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
});


document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64String = e.target.result;

            let username = document.getElementById('username').dataset.username;

            fetch(`/UserHomePage/UploadBackgroundBase64/${username}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: base64String }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.background_url) {
                    document.querySelector(".head").style.background = `url("${data.background_url}") no-repeat 50% 20% / cover`;
                } else {
                    console.error("Upload failed:", data);
                }
            })
            .catch(error => console.error("Error uploading:", error));
        };
        reader.readAsDataURL(file);
    }
});


document.getElementById("delete-btn").addEventListener("click", function () {
    let username = document.getElementById('username').dataset.username;

    fetch(`/UserHomePage/DeleteBackground/${username}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.background_url) {
            document.querySelector(".head").style.background = `url("${data.background_url}") no-repeat 50% 20% / cover`;
        } else {
            console.error("Failed to reset background:", data);
        }
    })
    .catch(error => console.error("Error:", error));
});


document.getElementById("profileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    const username = document.getElementById('username').dataset.username;

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64Image = e.target.result;

            fetch(`/UserHomePage/UpdateProfilePicture/${username}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: base64Image })
            })
            .then(response => response.json())
            .then(data => {
                if (data.profile_url) {
                    document.querySelector("#profile-image").src = data.profile_url;
                    document.querySelector("#imgPro").src = data.profile_url;
                } else {
                    console.error("Failed to update profile picture.");
                }
            });
        };
        reader.readAsDataURL(file);
    }
});


document.getElementById("deleteProPic-btn").addEventListener("click", function () {
    const username = document.getElementById('username').dataset.username;

    fetch(`/UserHomePage/DeleteProfilePicture/${username}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.profile_url) {
            document.querySelector("#profile-image").src = data.profile_url;
            document.querySelector("#imgPro").src = data.profile_url;
        } else {
            console.error("Failed to delete profile picture.");
        }
    });
});


document.getElementById("imgPro").onclick = () => {
        document.getElementById("profileModal").style.display = "flex";
    };

document.querySelector(".close").onclick = () => {
        document.getElementById("profileModal").style.display = "none";
    };