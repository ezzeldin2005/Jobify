window.onload = function () {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const xhttpResponse = xhttp.responseXML;
        let jobs = xhttpResponse.getElementsByTagName('Job');

        for (let i = 0; i < jobs.length; i++) {
            let jobCard = document.createElement('div');
            let jobTitle = document.createElement('h3');
            let companyName = document.createElement('p');
            let experiance = document.createElement('p');
            let salary = document.createElement('p');
            let buttonContainer = document.createElement('div');
            let applyButton = document.createElement('button');

            jobCard.className = 'jobCard';
            buttonContainer.id = 'applyButtoncontainer';
            applyButton.id = 'applyButton';

            jobTitle.innerText = 'Title: ' + jobs[i].getElementsByTagName('Title')[0].textContent;
            companyName.innerText = 'Company: ' + jobs[i].getElementsByTagName('Company')[0].textContent;
            experiance.innerText = 'Years of Experience: ' + jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent;
            salary.innerText = 'Salary: ' + jobs[i].getElementsByTagName('Salary')[0].textContent;
            applyButton.innerText = 'Apply';

            buttonContainer.appendChild(applyButton);
            jobCard.appendChild(jobTitle);
            jobCard.appendChild(companyName);
            jobCard.appendChild(experiance);
            jobCard.appendChild(salary);
            jobCard.appendChild(buttonContainer);

            document.getElementById('cards').appendChild(jobCard);
        }
    };

    xhttp.open("GET", "./scripts/Jobs.xml");
    xhttp.send();
};

let list = document.getElementById('list');
let select = document.getElementById('select');
let searchBar = document.getElementById('searchelecontainer');  
let text = document.getElementById('selectText');
let options = document.getElementsByClassName('options');

for(option of options){
    option.onclick = function(){
        text.innerHTML = this.innerHTML;
    }
}

select.onclick = function () {
    list.classList.toggle('open');

    if (list.classList.contains('open')) {
        searchBar.style.setProperty('margin-bottom', '100px');
    } else {
        searchBar.style.removeProperty('margin-bottom');
    }
};

document.getElementById('searchBtn').addEventListener('click', function(){
    const xhttp = new XMLHttpRequest();
    document.getElementById('cards').innerHTML = '';
    xhttp.onload = function(){
        const xhttpResponse = xhttp.responseXML;
        let inputValue = text.innerHTML;
        let searchValue = document.getElementById('searchInput').value;
        let jobs = xhttpResponse.getElementsByTagName('Job');
    
        if (inputValue == 'By Title'){
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
            let regex = new RegExp(`.*${searchValue}.*`, 'i');
            for (i = 0; i < jobs.length; i++){
            if (regex.test(jobs[i].getElementsByTagName('YearsofExperiance')[0].textContent)){
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
        xhttp.open('GET', "./scripts/Jobs.xml");
        xhttp.send();
    }
})
