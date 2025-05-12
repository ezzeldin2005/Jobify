document.addEventListener('DOMContentLoaded', function() {
    const adminCheckbox = document.getElementById('cbox');
    const companyNameInput = document.getElementById('companyName');
    let box = document.getElementById('companyNameBox');

    // Toggle requirement based on checkbox
    adminCheckbox.addEventListener('change', function() {
        if (this.checked) {
            companyNameInput.required = this.checked;
            box.style.display = 'block';
            box.style.marginTop = '5px';
        }
        else{
            box.style.display = 'none';
        }
    });
});

document.getElementById('formInput').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('userName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('cPassword').value;
    const isAdmin = document.getElementById('cbox').checked;

    // Password validation
    if (password !== confirmPass) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    // Check if user exists
    const endpoint = isAdmin ? '/adminModel/' : '/userModel/';
    const formData = new FormData(this);

    fetch(endpoint)
        .then(response => response.json())
        .then(users => {
            for (user of users) {
                if (user.Username == username || user.Email == email) {
                    showMessage('Username or email already exists!', 'error');
                    return;
                }
            }
            fetch('/Signup/', {method: 'post', body: formData})
                .then(response => response.json())
                .then(data => console.log(data))

            document.getElementById('formInput').reset();
            showMessage('Registration successful!', 'success');
            setTimeout(() => {
            window.location.href = isAdmin ? `/AdminHomePage/${username}` : `/UserHomePage/${username}`;
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



