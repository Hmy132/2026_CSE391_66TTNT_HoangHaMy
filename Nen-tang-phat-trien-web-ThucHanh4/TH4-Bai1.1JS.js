console.log ("Haloooooooooo");
const inputHoten = document.getElementById("Hoten");
const inputDiem = document.getElementById("Diem");
const btnThem = document.getElementById("btnThem");
const DanhSach = document.getElementById("DanhSach")
const TongSV = document.getElementById ("TongSV")
const DiemTB = document.getElementById ("DiemTB")

let DanhSachSinhVien = [];
btnThem.addEventListener("click", function () {
    console.log("Nút thêm đã hoạt động")
});
function TinhXepLoai (Diem) {
    if (Diem >= 8.5) return "Giỏi";
    if (Diem >= 7.0) return "Khá";
    if (Diem >= 5.0) return "Trung Bình";
    return "Yếu";
}
function HienThiDanhSach() {
    DanhSach.innerHTML = "";
    
    let tongDiemCuaLop = 0;
    for (let i = 0; i < DanhSachSinhVien.length; i++) {
        let sv = DanhSachSinhVien[i];
        tongDiemCuaLop += sv.diem;
        let tr = document.createElement("tr");
        if (sv.diem < 5.0) {
            tr.classList.add("bg-warning");
        }
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${sv.hoTen}</td>
            <td>${sv.diem}</td>
            <td>${sv.xepLoai}</td>
            <td><button class="btnXoa" data-index="${i}" style="background-color: red;">Xóa</button></td>`;
    
        DanhSach.appendChild(tr);
    }
    TongSV.textContent = DanhSachSinhVien.length;
    if (DanhSachSinhVien.length > 0) {
        let diemTB = tongDiemCuaLop / DanhSachSinhVien.length;
        DiemTB.textContent = diemTB.toFixed(1);
    } else {
        DiemTB.textContent = "0.0";
    }
}
btnThem.addEventListener ("click", function () {
    let Ten = inputHoten.value.trim ();
    let DiemSo = parseFloat (inputDiem.value);
    if (Ten === "") {
        alert ("Vui lòng nhập họ tên sinh viên!");
        return;
    }
    if (isNaN (DiemSo) || DiemSo < 0 || DiemSo >10 ) {
        alert ("Vui lòng nhập đúng khoảng điểm!");
        return;
    }
    let sv = {
        hoTen: Ten,
        diem: DiemSo,
        xepLoai: TinhXepLoai(DiemSo)
    };
    DanhSachSinhVien.push (sv);
console.log("Danh sách sinh viên hiện tại:", DanhSachSinhVien);
HienThiDanhSach();
    inputHoten.value = "";
    inputDiem.value = "";
    inputHoten.focus ();
});
inputDiem.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        btnThem.click();
    }
});
DanhSach.addEventListener("click", function (event) {
    if (event.target.classList.contains("btnXoa")) {
        let viTri = event.target.getAttribute("data-index");
        let xacNhan = confirm("Bạn có chắc muốn xóa sinh viên này không?");
        if (xacNhan == true) {
            DanhSachSinhVien.splice(viTri, 1);
            HienThiDanhSach();
        }
    }
});