const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

function addPatient(){
    const pname=document.getElementById("name").value;
    console.log(pname)
    const age=document.getElementById("age").value;
    console.log(age)
    const gender= document.querySelector('input[name="gender"]:checked').value;
    console.log(gender)
    const condition=document.getElementById("condition").value;
    console.log(condition)

if(pname && gender&& age && condition){
    patients.push({pname, gender, age, condition })
    console.log(patients)
    resetForm(); 
    generateReport();
}
}
function resetForm(){
    document.getElementById("name").value= "";
    document.getElementById("age").value="";
    document.getElementById("condition").value="";
    document.querySelector('input[name="gender"]:checked').checked = false;


}

function generateReport() {
    const numPatients = patients.length;
    const conditionsCount = {
      Diabetes: 0,
      Thyroid: 0,
      "High Blood Pressure": 0,
    };
    const genderConditionsCount = {
      Male: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
      Female: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
    };

    for (const patient of patients) {
      conditionsCount[patient.condition]++;
      genderConditionsCount[patient.gender][patient.condition]++;
    }

    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
      report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    report.innerHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
      report.innerHTML += `${gender}:<br>`;
      for (const condition in genderConditionsCount[gender]) {
        report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
      }
    }
  }

addPatientButton.addEventListener("click", addPatient);

function searchCondition(){
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    //use fetch to get json
    fetch("health_analysis.json")
        .then (response => response.json())
        .then (data =>{
            const condition= data.conditions.filter(item=> item.name.toLowerCase()===input);
            console.log(condition)
            if(condition[0]){
              const symptoms = condition[0].symptoms.join(', ');
              const prevention = condition[0].prevention.join(', ');
              const treatment = condition[0].treatment;
              resultDiv.innerHTML += `<h2>${condition[0].name}</h2>`;
              resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;
              resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
              resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
              resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
            } else {
                resultDiv.innerHTML = 'Condition not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
          });
    
}
btnSearch.addEventListener('click', searchCondition);