// script.js
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup');
    const loginForm = document.getElementById('login');
    const showLogin = document.getElementById('showLogin');
    const showSignup = document.getElementById('showSignup');
    const signupFormContainer = document.getElementById('signupForm');
    const loginFormContainer = document.getElementById('loginForm');
    const message = document.getElementById('message');

    // التبديل بين نموذج التسجيل وتسجيل الدخول
    showLogin.addEventListener('click', function (e) {
        e.preventDefault();
        signupFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
        message.textContent = '';
    });

    showSignup.addEventListener('click', function (e) {
        e.preventDefault();
        loginFormContainer.style.display = 'none';
        signupFormContainer.style.display = 'block';
        message.textContent = '';
    });

    // تسجيل حساب جديد
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // التحقق من وجود مستخدم بنفس الاسم
        if (localStorage.getItem(newUsername)) {
            message.textContent = 'اسم المستخدم موجود بالفعل!';
            message.style.color = 'red';
        } else {
            // حفظ البيانات في localStorage
            localStorage.setItem(newUsername, newPassword);
            message.textContent = 'تم إنشاء الحساب بنجاح!';
            message.style.color = 'green';
            signupForm.reset();
        }
    });

    // تسجيل الدخول
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // التحقق من البيانات
        const savedPassword = localStorage.getItem(username);
        if (savedPassword === password) {
            message.textContent = 'تم تسجيل الدخول بنجاح!';
            message.style.color = 'green';
            loginForm.reset();

            // تحويل المستخدم إلى صفحة أخرى بعد تسجيل الدخول
            setTimeout(function () {
                window.location.href = 'first.html'; // اسم الصفحة اللي هيتحول ليها
            }, 1000); // تأخير 1 ثانية قبل التحويل
        } else {
            message.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة!';
            message.style.color = 'red';
        }
    });
});
