const nameEL = document.getElementById("name");
const emailEl = document.getElementById("email");
const ageForm = document.getElementById("ageForm");
const submitBtn = document.getElementById("submit");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const resultEL = document.getElementById("result");
const regExEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const regExName = /[a-z]{3}/;
const resetBtn = document.getElementById("resetBtn")

ageForm.addEventListener("submit", async (submit) => {
  submit.preventDefault();

  nameError.textContent = "";
  emailError.textContent = "";
  resultEL.textContent = "";

  let valid = true;
  if (!regExName.test(nameEL.value)) {
    nameError.textContent = "Enter valid Name";
    nameEL.focus();
    valid = false;
  }
  if (!regExEmail.test(emailEl.value)) {
    emailError.textContent = "Enter valid Email";
    emailEl.focus();
    valid = false;
  }
  if (!valid) {
    return;
  }

  try {
    const response = await fetch(
      `https://api.agify.io?name=${nameEL.value.trim()}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);

    resultEL.textContent = `Predicted age for ${nameEL.value.trim()} is ${
      data.age
    } years`;
  } catch (error) {
    resultEL.textContent = "Error fetching data. Please try again later.";
  }
});

resetBtn.addEventListener("click", ()=>{
  nameEL.value=""
  emailEl.value=""
  nameError.textContent=""
  emailError.textContent=""
  resultEL.textContent=""
})
