let currentStep = 1;
const totalSteps = 3;
const step1Div = document.getElementById("step1");
const step2Div = document.getElementById("step2");
const step3Div = document.getElementById("step3");
const progressBar = document.getElementById("progressBar");
const currentStepText = document.getElementById("currentStepText");
const multiStepWrapper = document.getElementById("multiStepWrapper");
const successWrapper = document.getElementById("successWrapper");
const inputFullName = document.getElementById("fullName");
const inputDob = document.getElementById("dob");
const radioMale = document.getElementById("genderMale");
const radioFemale = document.getElementById("genderFemale");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputConfirmPassword = document.getElementById("confirmPassword");
const errorName = document.getElementById("nameError");
const errorDob = document.getElementById("dobError");
const errorGender = document.getElementById("genderError");
const errorEmail = document.getElementById("emailError");
const errorPassword = document.getElementById("passwordError");
const errorConfirmPassword = document.getElementById("confirmPasswordError");
function showError(inputElement, errorElement, message) {
    if (inputElement.type !== "radio") {
        inputElement.classList.add("input-error");
    }
    errorElement.textContent = message;
    errorElement.classList.add("show");
}

function clearError(inputElement, errorElement) {
    if (inputElement.type !== "radio") {
        inputElement.classList.remove("input-error");
    }
    errorElement.textContent = "";
    errorElement.classList.remove("show");
}
function validateStep1() {
    let isNameValid = true;
    let nameVal = inputFullName.value.trim();
    if (nameVal === "" || nameVal.length < 3 || !/^[a-zA-ZÀ-ỹ\s]+$/.test(nameVal)) {
        showError(inputFullName, errorName, "Họ tên phải >= 3 ký tự và chỉ chứa chữ.");
        isNameValid = false;
    } else {
        clearError(inputFullName, errorName);
    }
    let isDobValid = true;
    if (inputDob.value === "") {
        showError(inputDob, errorDob, "Vui lòng chọn ngày sinh.");
        isDobValid = false;
    } else {
        clearError(inputDob, errorDob);
    }
    let isGenderValid = true;
    if (!radioMale.checked && !radioFemale.checked) {
        showError(radioMale, errorGender, "Vui lòng chọn giới tính.");
        isGenderValid = false;
    } else {
        clearError(radioMale, errorGender);
    }
    return isNameValid & isDobValid & isGenderValid; 
}
function validateStep2() {
    let isEmailValid = true;
    let emailVal = inputEmail.value.trim();
    if (emailVal === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        showError(inputEmail, errorEmail, "Email không hợp lệ.");
        isEmailValid = false;
    } else {
        clearError(inputEmail, errorEmail);
    }

    let isPasswordValid = true;
    let passVal = inputPassword.value;
    if (passVal === "" || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(passVal)) {
        showError(inputPassword, errorPassword, "Mật khẩu ≥ 8 ký tự, gồm 1 chữ hoa, 1 thường, 1 số.");
        isPasswordValid = false;
    } else {
        clearError(inputPassword, errorPassword);
    }

    let isConfirmValid = true;
    if (inputConfirmPassword.value === "" || inputConfirmPassword.value !== passVal) {
        showError(inputConfirmPassword, errorConfirmPassword, "Mật khẩu xác nhận không khớp.");
        isConfirmValid = false;
    } else {
        clearError(inputConfirmPassword, errorConfirmPassword);
    }

    return isEmailValid & isPasswordValid & isConfirmValid;
}
function updateStepUI() {
    step1Div.classList.add("hidden");
    step2Div.classList.add("hidden");
    step3Div.classList.add("hidden");
    if (currentStep === 1) step1Div.classList.remove("hidden");
    if (currentStep === 2) step2Div.classList.remove("hidden");
    if (currentStep === 3) step3Div.classList.remove("hidden");
    currentStepText.textContent = currentStep;
    progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
}
function populateSummary() {
    document.getElementById("sumName").textContent = inputFullName.value;
    let d = new Date(inputDob.value);
    document.getElementById("sumDob").textContent = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
    
    document.getElementById("sumGender").textContent = radioMale.checked ? "Nam" : "Nữ";
    document.getElementById("sumEmail").textContent = inputEmail.value;
}
document.getElementById("btnNext1").addEventListener("click", function() {
    if (validateStep1()) {
        currentStep = 2;
        updateStepUI();
    }
});
document.getElementById("btnNext2").addEventListener("click", function() {
    if (validateStep2()) {
        populateSummary();
        currentStep = 3;
        updateStepUI();
    }
});
document.getElementById("btnPrev2").addEventListener("click", function() {
    currentStep = 1;
    updateStepUI();
});
document.getElementById("btnPrev3").addEventListener("click", function() {
    currentStep = 2;
    updateStepUI();
});
inputFullName.addEventListener("input", () => clearError(inputFullName, errorName));
inputDob.addEventListener("change", () => clearError(inputDob, errorDob));
radioMale.addEventListener("change", () => clearError(radioMale, errorGender));
radioFemale.addEventListener("change", () => clearError(radioFemale, errorGender));

inputEmail.addEventListener("input", () => clearError(inputEmail, errorEmail));
inputPassword.addEventListener("input", () => clearError(inputPassword, errorPassword));
inputConfirmPassword.addEventListener("input", () => clearError(inputConfirmPassword, errorConfirmPassword));
document.getElementById("multiStepForm").addEventListener("submit", function(e) {
    e.preventDefault();
    multiStepWrapper.classList.add("hidden");
    successWrapper.classList.remove("hidden");
});