document.getElementById('formInputs').addEventListener('submit', function(e) {
    e.preventDefault();


    const email = document.getElementById('Email').value.trim();
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users')) || [];


    // Find user by email
    const user = users.find(user => user.email === email);

    if (!user) {
        showMessage('Email does not exist', 'error');
        return;
    }

    // Now check password 
    if (user.password !== password){
        showMessage('Invalid password!', 'error');
        return;
    }

     showMessage('Login successful!', 'success');

// Store the logged-in user's email and ID in localStorage
    localStorage.setItem('currentUserEmail', user.email);


    // Redirect based on role after 2 seconds
    setTimeout(() => {
        window.location.href = user.role === 'admin' ? './Index3.html' : './Index6.html';
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