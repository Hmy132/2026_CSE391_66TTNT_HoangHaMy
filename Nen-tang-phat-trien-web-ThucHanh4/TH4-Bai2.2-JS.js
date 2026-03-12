const form = document.getElementById("orderForm");
const orderWrapper = document.getElementById("orderWrapper");
const confirmWrapper = document.getElementById("confirmWrapper");
const successWrapper = document.getElementById("successWrapper");
const inputProduct = document.getElementById("product");
const inputQuantity = document.getElementById("quantity");
const inputDate = document.getElementById("deliveryDate");
const inputAddress = document.getElementById("address");
const inputNotes = document.getElementById("notes");
const radiosPayment = document.getElementsByName("payment");
const totalPriceSpan = document.getElementById("totalPrice");
const charCountSpan = document.getElementById("charCount");
const errorProduct = document.getElementById("productError");
const errorQuantity = document.getElementById("quantityError");
const errorDate = document.getElementById("dateError");
const errorAddress = document.getElementById("addressError");
const errorNotes = document.getElementById("notesError");
const errorPayment = document.getElementById("paymentError");
const prices = {
    "Áo": 150000,
    "Quần": 200000,
    "Giày": 350000
};
function showError(inputElement, errorElement, message) {
    if (inputElement.tagName !== "DIV" && inputElement.type !== "radio") {
        inputElement.classList.add("input-error");
    }
    errorElement.textContent = message;
    errorElement.classList.add("show");
}

function clearError(inputElement, errorElement) {
    if (inputElement.tagName !== "DIV" && inputElement.type !== "radio") {
        inputElement.classList.remove("input-error");
    }
    errorElement.textContent = "";
    errorElement.classList.remove("show");
}

function updateTotal() {
    let productKey = inputProduct.value;
    let qty = parseInt(inputQuantity.value);

    if (productKey !== "" && !isNaN(qty) && qty > 0) {
        let total = prices[productKey] * qty;
        totalPriceSpan.textContent = total.toLocaleString("vi-VN");
    } else {
        totalPriceSpan.textContent = "0";
    }
}

inputProduct.addEventListener("change", updateTotal);
inputQuantity.addEventListener("input", updateTotal);

function validateProduct() {
    if (inputProduct.value === "") {
        showError(inputProduct, errorProduct, "Vui lòng chọn một sản phẩm.");
        return false;
    }
    clearError(inputProduct, errorProduct);
    return true;
}

function validateQuantity() {
    let qty = parseInt(inputQuantity.value);
    if (isNaN(qty) || inputQuantity.value === "") {
        showError(inputQuantity, errorQuantity, "Vui lòng nhập số lượng.");
        return false;
    } else if (qty < 1 || qty > 99) {
        showError(inputQuantity, errorQuantity, "Số lượng phải từ 1 đến 99.");
        return false;
    }
    clearError(inputQuantity, errorQuantity);
    return true;
}

function validateDate() {
    let dateStr = inputDate.value;
    if (dateStr === "") {
        showError(inputDate, errorDate, "Vui lòng chọn ngày giao hàng.");
        return false;
    }

    let selectedDate = new Date(dateStr);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);

    if (selectedDate < today) {
        showError(inputDate, errorDate, "Không thể chọn ngày trong quá khứ.");
        return false;
    } else if (selectedDate > maxDate) {
        showError(inputDate, errorDate, "Ngày giao hàng không được quá 30 ngày từ hôm nay.");
        return false;
    }
    
    clearError(inputDate, errorDate);
    return true;
}

function validateAddress() {
    let val = inputAddress.value.trim();
    if (val === "") {
        showError(inputAddress, errorAddress, "Vui lòng nhập địa chỉ giao hàng.");
        return false;
    } else if (val.length < 10) {
        showError(inputAddress, errorAddress, "Địa chỉ phải dài ít nhất 10 ký tự.");
        return false;
    }
    clearError(inputAddress, errorAddress);
    return true;
}

function validateNotes() {
    let val = inputNotes.value;
    let len = val.length;
    charCountSpan.textContent = `${len}/200`;

    if (len > 200) {
        charCountSpan.classList.add("limit-reached");
        showError(inputNotes, errorNotes, "Ghi chú không được vượt quá 200 ký tự.");
        return false;
    } else {
        charCountSpan.classList.remove("limit-reached");
        clearError(inputNotes, errorNotes);
        return true;
    }
}

function validatePayment() {
    let isChecked = false;
    for (let i = 0; i < radiosPayment.length; i++) {
        if (radiosPayment[i].checked) {
            isChecked = true;
            break;
        }
    }

    if (!isChecked) {
        showError(document.querySelector('.radio-group'), errorPayment, "Vui lòng chọn phương thức thanh toán.");
        return false;
    }
    clearError(document.querySelector('.radio-group'), errorPayment);
    return true;
}
inputProduct.addEventListener("change", validateProduct);
inputQuantity.addEventListener("blur", validateQuantity);
inputQuantity.addEventListener("input", () => clearError(inputQuantity, errorQuantity));
inputDate.addEventListener("blur", validateDate);
inputDate.addEventListener("change", () => clearError(inputDate, errorDate));
inputAddress.addEventListener("blur", validateAddress);
inputAddress.addEventListener("input", () => clearError(inputAddress, errorAddress));
inputNotes.addEventListener("input", validateNotes);

for (let radio of radiosPayment) {
    radio.addEventListener("change", validatePayment);
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = validateProduct() & validateQuantity() & validateDate() & 
                  validateAddress() & validateNotes() & validatePayment();

    if (isValid) {
        document.getElementById("summaryProduct").textContent = inputProduct.options[inputProduct.selectedIndex].text;
        document.getElementById("summaryQuantity").textContent = inputQuantity.value;
        let d = new Date(inputDate.value);
        document.getElementById("summaryDate").textContent = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
        
        document.getElementById("summaryTotal").textContent = totalPriceSpan.textContent;
        orderWrapper.classList.add("hidden");
        confirmWrapper.classList.remove("hidden");
    }
});

document.getElementById("btnCancel").addEventListener("click", function() {
    confirmWrapper.classList.add("hidden");
    orderWrapper.classList.remove("hidden");
});

document.getElementById("btnConfirm").addEventListener("click", function() {
    confirmWrapper.classList.add("hidden");
    successWrapper.classList.remove("hidden");
});