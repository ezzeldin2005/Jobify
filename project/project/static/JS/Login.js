document.getElementById('formInputs').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('Email').value.trim();
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    //get user and admin data
    Promise.all([
        fetch('/userModel/').then(response => response.json()),
        fetch('/adminModel/').then(response => response.json())
    ])
    .then(([users, admins]) => {
            // find a match in both models
            const user = users.find(user => user.Email === email && user.Password === password);
            const admin = admins.find(admin => admin.Email === email && admin.Password === password);

            if(user){
                showMessage('Login successful!', 'success');
                // Redirect to user home page
                setTimeout(() => {
                    window.location.href = `/UserHomePage/${user.Username}`;
                }, 2000);
            }
            else if (admin) {
                showMessage('Login successful!', 'success');

                // Redirect to admin home page
                setTimeout(() => {
                    window.location.href = `/AdminHomePage/${admin.Username}`;
                }, 2000);
            } else {
                showMessage('Invalid email or password!', 'error');
            }
        }
    )


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