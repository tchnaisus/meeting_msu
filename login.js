/* Meeting MSU - Login page logic */

const form = document.querySelector("#loginForm");

function validateUsername(value) {
  if (/[\u0E00-\u0E7F]/.test(value)) {
    return false;
  }
  if (/[^a-zA-Z0-9_-]/.test(value)) {
    return false;
  }
  return value.length >= 3;
}

function validatePassword(value) {
  if (/[\u0E00-\u0E7F]/.test(value)) {
    return false;
  }
  if (/[^a-zA-Z0-9!@#$%^&*()_+-=]/.test(value)) {
    return false;
  }
  return value.length >= 6;
}

function setFieldState(field, isValid) {
  field.classList.toggle("valid", isValid);
  field.classList.toggle("invalid", !isValid);
}

function handleFieldValidation() {
  const usernameField = document.querySelector("#username");
  const passwordField = document.querySelector("#password");

  const usernameValue = usernameField.value.trim();
  const passwordValue = passwordField.value.trim();

  if (usernameValue === "") {
    usernameField.classList.remove("valid", "invalid");
  } else {
    setFieldState(usernameField, validateUsername(usernameValue));
  }

  if (passwordValue === "") {
    passwordField.classList.remove("valid", "invalid");
  } else {
    setFieldState(passwordField, validatePassword(passwordValue));
  }
}

function handleLogin(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  const role = document.querySelector("#role").value;

  if (!username || !password) {
    alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
    return;
  }

  if (!role) {
    alert("กรุณาเลือกบทบาท");
    document.querySelector("#role").focus();
    return;
  }

  if (!validateUsername(username)) {
    alert("ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษรและไม่มีอักขระห้าม");
    return;
  }

  if (!validatePassword(password)) {
    alert("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษรและไม่มีอักขระห้าม");
    return;
  }

  // ในตัวอย่างนี้ เราแสดงผลลัพธ์พื้นฐาน; ในโปรดักชั่น ให้ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อยืนยันตัวตน
  const payload = {
    username,
    role,
  };

  // ปุ่มจะถูกปิดชั่วคราวเพื่อป้องกันการส่งซ้ำ
  const submitButton = document.querySelector("#submitBtn");
  submitButton.disabled = true;
  submitButton.textContent = "กำลังเข้าสู่ระบบ...";

  window.setTimeout(() => {
    submitButton.disabled = false;
    submitButton.textContent = "เข้าสู่ระบบ";
    alert(`เข้าสู่ระบบสำเร็จ!\n\nชื่อผู้ใช้: ${username}\nบทบาท: ${role}`);

    // หากต้องการให้เปลี่ยนเส้นทางไปยังหน้าหลักของบทบาท
    // ให้แก้ไขตามเส้นทางจริงของระบบ
    // window.location.href = `/dashboard/${role.toLowerCase()}`;
  }, 750);
}

document.querySelector("#username").addEventListener("input", handleFieldValidation);
document.querySelector("#password").addEventListener("input", handleFieldValidation);

document.querySelector(".small-link").addEventListener("click", function(event) {
  event.preventDefault();
  alert("หากคุณลืมรหัสผ่าน กรุณาติดต่อผู้ดูแลระบบของมหาวิทยาลัยเพื่อขอรีเซ็ตรหัสผ่านใหม่\n\n📧 อีเมล: admin@msu.ac.th\n📞 โทร: 02-123-4567\n\nขอบคุณที่ใช้ระบบการประชุม MSU");
});

form.addEventListener("submit", handleLogin);
