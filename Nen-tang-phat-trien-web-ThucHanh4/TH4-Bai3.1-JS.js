const form = document.getElementById("registerForm");
const registerWrapper = document.getElementById("registerWrapper");
const successWrapper = document.getElementById("successWrapper");
const registeredName = document.getElementById("registeredName");
const inputFullName = document.getElementById("fullName");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const inputPassword = document.getElementById("password");
const inputConfirmPassword = document.getElementById("confirmPassword");
const radioMale = document.getElementById("genderMale");
const radioFemale = document.getElementById("genderFemale");
const checkTerms = document.getElementById("terms");
const errorName = document.getElementById("nameError");
const errorEmail = document.getElementById("emailError");
const errorPhone = document.getElementById("phoneError");
const errorPassword = document.getElementById("passwordError");
const errorConfirmPassword = document.getElementById("confirmPasswordError");
const errorGender = document.getElementById("genderError");
const errorTerms = document.getElementById("termsError");
const nameCharCount = document.getElementById("nameCharCount");
const togglePasswordBtn = document.getElementById("togglePassword");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
function showError(inputElement, errorElement, message) {
    if (inputElement.type !== "radio" && inputElement.type !== "checkbox") {
        inputElement.classList.add("input-error");
        inputElement.classList.remove("input-success");
    }
    errorElement.textContent = message;
    errorElement.classList.add("show");
}

function clearError(inputElement, errorElement) {
    if (inputElement.type !== "radio" && inputElement.type !== "checkbox") {
        inputElement.classList.remove("input-error");
    }
    errorElement.textContent = "";
    errorElement.classList.remove("show");
}
inputFullName.addEventListener("input", function() {
    let len = this.value.length;
    nameCharCount.textContent = `${len}/50`;
    if (len >= 50) {
        nameCharCount.classList.add("limit");
    } else {
        nameCharCount.classList.remove("limit");
    }
    clearError(inputFullName, errorName);
});
togglePasswordBtn.addEventListener("click", function() {
    if (inputPassword.type === "password") {
        inputPassword.type = "text";
        this.innerHTML = '<i class="bi bi-eye"></i>'; 
    } else {
        inputPassword.type = "password";
        this.innerHTML = '<i class="bi bi-eye-slash"></i>'; 
    }
});
inputPassword.addEventListener("input", function() {
    let val = this.value;
    let strengthLevel = 0;
    if (val.length >= 8) strengthLevel++;
    if (/[A-Z]/.test(val)) strengthLevel++;
    if (/[a-z]/.test(val)) strengthLevel++;
    if (/[0-9]/.test(val)) strengthLevel++;
    if (/[^A-Za-z0-9]/.test(val)) strengthLevel++;

    if (val.length === 0) {
        strengthBar.style.width = "0%";
        strengthText.textContent = "";
    } else if (strengthLevel <= 2) {
        strengthBar.style.width = "33%";
        strengthBar.style.backgroundColor = "red";
        strengthText.textContent = "Yếu";
        strengthText.style.color = "red";
    } else if (strengthLevel >= 3 && strengthLevel <= 4) {
        strengthBar.style.width = "66%";
        strengthBar.style.backgroundColor = "#ffc400";
        strengthText.textContent = "Trung bình";
        strengthText.style.color = "#ffc400";
    } else {
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "green";
        strengthText.textContent = "Mạnh";
        strengthText.style.color = "green";
    }
    
    clearError(inputPassword, errorPassword);
});
function validateFullName() {
    let value = inputFullName.value.trim();
    let regex = /^[a-zA-ZÀ-ỹ\s]+$/; 
    
    if (value === "") {
        showError(inputFullName, errorName, "Họ tên không được để trống.");
        return false;
    } else if (value.length < 3) {
        showError(inputFullName, errorName, "Họ tên phải có ít nhất 3 ký tự.");
        return false;
    } else if (!regex.test(value)) {
        showError(inputFullName, errorName, "Họ tên chỉ được chứa chữ cái.");
        return false;
    }
    clearError(inputFullName, errorName);
    return true;
}

function validateEmail() {
    let value = inputEmail.value.trim();
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === "") {
        showError(inputEmail, errorEmail, "Email không được để trống.");
        return false;
    } else if (!regex.test(value)) {
        showError(inputEmail, errorEmail, "Email không đúng định dạng.");
        return false;
    }
    clearError(inputEmail, errorEmail);
    return true;
}

function validatePhone() {
    let value = inputPhone.value.trim();
    let regex = /^0[0-9]{9}$/;
    if (value === "") {
        showError(inputPhone, errorPhone, "Số điện thoại không được để trống.");
        return false;
    } else if (!regex.test(value)) {
        showError(inputPhone, errorPhone, "SĐT phải gồm 10 chữ số và bắt đầu bằng số 0.");
        return false;
    }
    clearError(inputPhone, errorPhone);
    return true;
}

function validatePassword() {
    let value = inputPassword.value;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; 
    
    if (value === "") {
        showError(inputPassword, errorPassword, "Mật khẩu không được để trống.");
        return false;
    } else if (!regex.test(value)) {
        showError(inputPassword, errorPassword, "Mật khẩu ≥ 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 số.");
        return false;
    }
    
    if (inputConfirmPassword.value !== "") validateConfirmPassword();
    clearError(inputPassword, errorPassword);
    return true;
}

function validateConfirmPassword() {
    let value = inputConfirmPassword.value;
    if (value === "") {
        showError(inputConfirmPassword, errorConfirmPassword, "Vui lòng xác nhận mật khẩu.");
        return false;
    } else if (value !== inputPassword.value) {
        showError(inputConfirmPassword, errorConfirmPassword, "Mật khẩu xác nhận không khớp.");
        return false;
    }
    clearError(inputConfirmPassword, errorConfirmPassword);
    return true;
}

function validateGender() {
    if (!radioMale.checked && !radioFemale.checked) {
        showError(radioMale, errorGender, "Vui lòng chọn giới tính.");
        return false;
    }
    clearError(radioMale, errorGender);
    return true;
}

function validateTerms() {
    if (!checkTerms.checked) {
        showError(checkTerms, errorTerms, "Bạn phải đồng ý với điều khoản sử dụng.");
        return false;
    }
    clearError(checkTerms, errorTerms);
    return true;
}
inputFullName.addEventListener("blur", validateFullName);
inputEmail.addEventListener("blur", validateEmail);
inputPhone.addEventListener("blur", validatePhone);
inputPassword.addEventListener("blur", validatePassword);
inputConfirmPassword.addEventListener("blur", validateConfirmPassword);
radioMale.addEventListener("change", validateGender);
radioFemale.addEventListener("change", validateGender);
checkTerms.addEventListener("change", validateTerms);
inputEmail.addEventListener("input", () => clearError(inputEmail, errorEmail));
inputPhone.addEventListener("input", () => clearError(inputPhone, errorPhone));
inputConfirmPassword.addEventListener("input", () => clearError(inputConfirmPassword, errorConfirmPassword));
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValidForm = validateFullName() & validateEmail() & validatePhone() & 
                      validatePassword() & validateConfirmPassword() & 
                      validateGender() & validateTerms();

    if (isValidForm) {
        let userName = inputFullName.value.trim();
        registerWrapper.classList.add("hidden");
        successWrapper.classList.remove("hidden");
        registeredName.textContent = userName;
    }
});