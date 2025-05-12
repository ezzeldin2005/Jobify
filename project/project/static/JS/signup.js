document.addEventListener('DOMContentLoaded', function() {
    const adminCheckbox = document.getElementById('cbox');
    const companyNameInput = document.getElementById('companyName');

    // Toggle requirement based on checkbox
    if (adminCheckbox) {
        adminCheckbox.addEventListener('change', function() {
            companyNameInput.required = this.checked;
            let box = document.getElementById('companyNameBox');
            box.style.display = 'block';
            box.style.marginTop = '5px';
        });
    }
});

// Function to get the current user's email
function getCurrentUserEmail() {
    return localStorage.getItem('currentUserEmail');
}

document.getElementById('formInput').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('userName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('cPassword').value;
    const companyName = document.getElementById('companyName').value.trim();
    const isAdmin = document.getElementById('cbox').checked;
    const message = document.getElementById('message');


    // Password validation
    if (password !== confirmPass) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    // Check if user exists
     const endpoint = isAdmin ? '/adminModel/' : '/userModel/';

    fetch(endpoint)
        .then(response => response.json())
        .then(users => {
            for (user of users) {
                if (user.Username == username || user.Email == email) {
                    showMessage('Username or email already exists!', 'error');
                    document.getElementById('formInput').reset();
                    return;
                }
            }
            document.getElementById('formInput').reset();
            showMessage('Registration successful!', 'success');
            setTimeout(() => {
            window.location.href = isAdmin ? `/AdminHomePage/${username}` : `/UserHomePage${username}`;
        }, 2000);
        })



});

function showMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = type === 'error' ? 'red' : 'green';
    messageElement.style.marginTop = '0px';

    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.style.color = '';
    }, 5000);
}



