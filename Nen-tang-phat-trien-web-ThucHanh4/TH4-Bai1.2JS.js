const inputFullName = document.getElementById("fullName");
const inputScore = document.getElementById("score");
const btnAdd = document.getElementById("btnAdd");
const studentList = document.getElementById("studentList");
const textTotalStudents = document.getElementById("totalStudents");
const textAverageScore = document.getElementById("averageScore");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const colScore = document.getElementById("colScore");
const sortIcon = document.getElementById("sortIcon");

let students = [
];

let sortDirection = 0; 

function calculateGrade(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung Bình";
    return "Yếu";
}

function applyFilters() {
    let keyword = searchInput.value.toLowerCase().trim();
    let selectedFilter = filterSelect.value;

    let filteredStudents = students.filter(student => {
        let isNameMatch = student.fullName.toLowerCase().includes(keyword);
        let isGradeMatch = (selectedFilter === "Tất cả" || student.grade === selectedFilter);
        return isNameMatch && isGradeMatch; 
    });

    if (sortDirection !== 0) {
        filteredStudents.sort((a, b) => {
            if (sortDirection === 1) return a.score - b.score; 
            if (sortDirection === -1) return b.score - a.score; 
        });
    }

    renderTable(filteredStudents);
}

function renderTable(displayArray = students) {
    studentList.innerHTML = "";
    let totalClassScore = 0;

    if (displayArray.length === 0) {
        studentList.innerHTML = `<tr><td colspan="5" class="empty-row">Không tìm thấy kết quả nào phù hợp</td></tr>`;
    } else {
        for (let i = 0; i < displayArray.length; i++) {
            let student = displayArray[i];
            let tr = document.createElement("tr");
            
            if (student.score < 5.0) { 
                tr.classList.add("bg-warning"); 
            }

            let originalIndex = students.indexOf(student);

            tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${student.fullName}</td>
                <td>${student.score}</td>
                <td>${student.grade}</td>
                <td><button class="btnDelete" data-index="${originalIndex}" style="background-color: red;">Xóa</button></td>
            `;
            studentList.appendChild(tr);
        }
    }
    textTotalStudents.textContent = students.length;
    for (let student of students) { 
        totalClassScore += student.score; 
    }
    
    if (students.length > 0) {
        textAverageScore.textContent = (totalClassScore / students.length).toFixed(1);
    } else {
        textAverageScore.textContent = "0.0";
    }
}

searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);

colScore.addEventListener("click", () => {
    if (sortDirection === 0 || sortDirection === -1) {
        sortDirection = 1;
        sortIcon.textContent = "▲";
    } else {
        sortDirection = -1;
        sortIcon.textContent = "▼";
    }
    applyFilters(); 
});

btnAdd.addEventListener("click", () => {
    let nameVal = inputFullName.value.trim();
    let scoreVal = parseFloat(inputScore.value);

    if (nameVal === "") { 
        alert("Vui lòng nhập họ tên sinh viên!"); 
        return; 
    }
    if (isNaN(scoreVal) || scoreVal < 0 || scoreVal > 10) { 
        alert("Vui lòng nhập đúng khoảng điểm (0 - 10)!"); 
        return; 
    }

    let newStudent = { 
        fullName: nameVal, 
        score: scoreVal, 
        grade: calculateGrade(scoreVal) 
    };

    students.push(newStudent);
    
    inputFullName.value = ""; 
    inputScore.value = ""; 
    inputFullName.focus();
    
    applyFilters(); 
});

inputScore.addEventListener("keypress", (event) => {
    if (event.key === "Enter") { btnAdd.click(); }
});

studentList.addEventListener("click", (event) => {
    if (event.target.classList.contains("btnDelete")) {
        let originalIndex = event.target.getAttribute("data-index");
        if (confirm("Chắc chắn muốn xóa?")) {
            students.splice(originalIndex, 1);
            applyFilters(); 
        }
    }
});

applyFilters();