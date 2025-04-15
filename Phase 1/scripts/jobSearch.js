document.getElementById('drop').addEventListener('change', function(){
    if (this.value == 0){
        document.getElementById('searchInput').type = 'text';
    }

    else {
        document.getElementById('searchInput').type = 'number';

    }
    console.log(this.value);
})

document.getElementById('searchBtn').addEventListener('click', function(){
    const xhttp = new XMLHttpRequest();
    document.getElementById('cards').innerHTML = '';
    xhttp.onload = function(){
        const xhttpResponse = xhttp.responseXML;
        let inputValue = document.getElementById('drop').value;
        let searchValue = document.getElementById('searchInput').value;
        let jobs = xhttpResponse.getElementsByTagName('Job');
    
        if (inputValue == '0'){
            let regex = new RegExp(`.*${searchValue}.*`, 'i');
            for (i = 0; i < jobs.length; i++){
                if (regex.test(jobs[i].getElementsByTagName('Title')[0].textContent)){
                    let jobCard = document.createElement('div');
                    let jobTitle =  document.createElement('h3');
                    let companyName = document.createElement('p');
                    let experiance = document.createElement('p');
                    let Salary = document.createElement('p');
                    let buttonContainer = document.createElement('div');
                    let applyButton = document.createElement('button');

                    jobCard.className = 'jobCard';
                    buttonContainer.id = 'applyButtoncontainer';
                    applyButton.id = 'applyButton';
                    
                    jobTitle.innerText = 'Title: ' + jobs[i].getElementsByTagName('Title')[0].textContent;
                    companyName.innerText = 'Company: ' + jobs[i].getElementsByTagName('Company')[0].textContent;
                    experiance.innerText = 'Years of Experiance: ' + jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent;
                    Salary.innerText = 'Salary' + jobs[i].getElementsByTagName('Salary')[0].textContent;
                    applyButton.innerText = 'Apply';

                    buttonContainer.appendChild(applyButton);
                    jobCard.appendChild(jobTitle);
                    jobCard.appendChild(companyName);
                    jobCard.appendChild(experiance);
                    jobCard.appendChild(Salary);
                    jobCard.appendChild(buttonContainer);

                    document.getElementById('cards').appendChild(jobCard);
                    
                }   
            }
        }

        else{
            for (i = 0; i < jobs.length; i++){
            if (jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent == searchValue){
                let jobCard = document.createElement('div');
                    let jobTitle =  document.createElement('h3');
                    let companyName = document.createElement('p');
                    let experiance = document.createElement('p');
                    let Salary = document.createElement('p');
                    let buttonContainer = document.createElement('div');
                    let applyButton = document.createElement('button');

                    jobCard.className = 'jobCard';
                    buttonContainer.id = 'applyButtoncontainer';
                    applyButton.id = 'applyButton';
                    
                    jobTitle.innerText = 'Title: ' + jobs[i].getElementsByTagName('Title')[0].textContent;
                    companyName.innerText = 'Company: ' + jobs[i].getElementsByTagName('Company')[0].textContent;
                    experiance.innerText = 'Years of Experiance: ' + jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent;
                    Salary.innerText = 'Salary' + jobs[i].getElementsByTagName('Salary')[0].textContent;
                    applyButton.innerText = 'Apply';

                    buttonContainer.appendChild(applyButton);
                    jobCard.appendChild(jobTitle);
                    jobCard.appendChild(companyName);
                    jobCard.appendChild(experiance);
                    jobCard.appendChild(Salary);
                    jobCard.appendChild(buttonContainer);

                    document.getElementById('cards').appendChild(jobCard);
                }    
            }
        }
        
    } 

    xhttp.open('GET', "./scripts/Jobs.xml");
    xhttp.send();
})


document.getElementById('searchInput').addEventListener('input', function(){
    if (this.value.trim() == ''){
        const xhttp = new XMLHttpRequest();
        document.getElementById('cards').innerHTML = '';
        xhttp.onload = function(){
            const xhttpResponse = xhttp.responseXML;
            let inputValue = document.getElementById('drop').value;
            let searchValue = document.getElementById('searchInput').value;
            let jobs = xhttpResponse.getElementsByTagName('Job');
            for (i = 0; i < jobs.length; i++){
                let jobCard = document.createElement('div');
                let jobTitle =  document.createElement('h3');
                let companyName = document.createElement('p');
                let experiance = document.createElement('p');
                let Salary = document.createElement('p');
                let buttonContainer = document.createElement('div');
                let applyButton = document.createElement('button');

                jobCard.className = 'jobCard';
                buttonContainer.id = 'applyButtoncontainer';
                applyButton.id = 'applyButton';
                
                jobTitle.innerText = 'Title: ' + jobs[i].getElementsByTagName('Title')[0].textContent;
                companyName.innerText = jobs[i].getElementsByTagName('Company')[0].textContent;
                experiance.innerText = jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent;
                Salary.innerText = jobs[i].getElementsByTagName('Salary')[0].textContent;
                applyButton.innerText = 'Apply';

                buttonContainer.appendChild(applyButton);
                jobCard.appendChild(jobTitle);
                jobCard.appendChild(companyName);
                jobCard.appendChild(experiance);
                jobCard.appendChild(Salary);
                jobCard.appendChild(buttonContainer);

                document.getElementById('cards').appendChild(jobCard);

            }
        }
        xhttp.open('GET', "./scripts/Jobs.xml");
        xhttp.send();
    }
})
