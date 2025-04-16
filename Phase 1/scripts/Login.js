document.getElementById('Login').addEventListener('click', function(){

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function(){
        const xhttpResponse = xhttp.responseXML;
        const Email = document.getElementById('Email').value;
        const password = document.getElementById('password').value;
        const users = xhttpResponse.getElementsByTagName('user');
        const admins = xhttpResponse.getElementsByTagName('admin');
        
        let matchFound = false;
        
        for (let i = 0; i < users.length; i++) {

            const userEmail = users[i].getElementsByTagName('email')[0].textContent.trim();
            const userPassword = users[i].getElementsByTagName('password')[0].textContent.trim();
            
            if (userEmail === Email && userPassword === password) {
                
                window.location.href = "./Index6.html";
                matchFound = true;
                break;
            }
        }

        for (let i = 0; i < admins.length; i++) {

            const adminEmail = admins[i].getElementsByTagName('email')[0].textContent.trim();
            const adminPassword = admins[i].getElementsByTagName('password')[0].textContent.trim();
            
            if (adminEmail === Email && adminPassword === password) {
            
                window.location.href = "./Index3.html";
                matchFound = true;
                break;
            }
        }

        if (!matchFound) {
            alert("Invalid email or password");
        }

    }

    xhttp.open('GET', "./scripts/Login.xml");
    xhttp.send();
})