document.addEventListener('DOMContentLoaded', function() {
    const adminCheckbox = document.getElementById('cbox');
    const companyNameInput = document.getElementById('companyName');
    
    // Toggle requirement based on checkbox
    if (adminCheckbox) {
        adminCheckbox.addEventListener('change', function() {
            companyNameInput.required = this.checked;
        });
    }
});

document.getElementById('formInputs').addEventListener('submit', function(e) {
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
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
        showMessage('Username or email already exists!', 'error');
        return;
    }

    // Create user object (with basic password obfuscation)
    const user = {
        username,
        email,
        password, 
        companyName: isAdmin ? companyName : null,
        role: isAdmin ? 'admin' : 'user',
    };

    // Save to storage
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Reset form and show success
    this.reset();
    showMessage('Registration successful!', 'success');

    // Store the logged-in user's email and ID in localStorage
    localStorage.setItem('currentUserEmail', user.email);

    // Redirect based on role
    setTimeout(() => {
        window.location.href = isAdmin ? './Index3.html' : './Index6.html';
    }, 2000);
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

