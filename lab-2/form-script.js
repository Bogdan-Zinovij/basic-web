const validationRules = {
    name: /^[A-ZА-ЯІЇЄ][a-zа-яіїє]+ [A-ZА-ЯІЇЄ]\.[A-ZА-ЯІЇЄ]\.$/,
    variant: /^[0-9]{2}$/,
    group: /^[A-ZА-ЯІЇЄ]{2}-[0-9]{2}$/,
    faculty: /^[A-ZА-ЯІЇЄ]{4}$/,
    birth: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d$/,
};

function resetErrors(formData) {
    for (const element of Object.values(formData)) {
        element.style.borderColor = "black";
    }
}

function generateOutput(formData) {
    const outputData = `
    <h3>Введені дані:</h3>
    <ul>
      <li>ПІБ: <span>${formData.name.value}</span></li>
      <li>Варіант: <span>${formData.variant.value}</span></li>
      <li>Група: <span>${formData.group.value}</span></li>
      <li>Факультет: <span>${formData.faculty.value}</span></li>
      <li>Дата народження: <span>${formData.birth.value}</span></li>
    </ul>
  `;

    formOutputContainer.insertAdjacentHTML("afterbegin", outputData);
}

function validateFormData(formData, validationRules) {
    resetErrors(formData);
    let errCounter = 0;
    for (const key of Object.keys(formData)) {
        const isValid = +validationRules[key].test(formData[key].value);
        if (!isValid) {
            formData[key].style.borderColor = "red";
            errCounter++;
        }
    }

    if (!errCounter) {
        generateOutput(formData);
    }
}

const formContainer = document.querySelector(".register-form-container");
const formOutputContainer = document.querySelector(".form-output-container");
const submitBtn = document.querySelector(".button");

const formData = {
    name: document.getElementById("name"),
    variant: document.getElementById("variant"),
    group: document.getElementById("group"),
    faculty: document.getElementById("faculty"),
    birth: document.getElementById("birth"),
};

submitBtn.addEventListener("click", () => {
    validateFormData(formData, validationRules);
});
