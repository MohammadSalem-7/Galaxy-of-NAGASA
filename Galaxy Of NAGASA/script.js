document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup');
    const loginForm = document.getElementById('login');
    const showLogin = document.getElementById('showLogin');
    const showSignup = document.getElementById('showSignup');
    const signupFormContainer = document.getElementById('signupForm');
    const loginFormContainer = document.getElementById('loginForm');
    const message = document.getElementById('message');

    // دالة لعرض الرسائل بشكل واضح
    function showMessage(text, color) {
        message.textContent = text;
        message.style.color = color;
    }

    // التبديل بين نموذج التسجيل وتسجيل الدخول
    showLogin.addEventListener('click', function (e) {
        e.preventDefault();
        signupFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
        showMessage('', 'black');
    });

    showSignup.addEventListener('click', function (e) {
        e.preventDefault();
        loginFormContainer.style.display = 'none';
        signupFormContainer.style.display = 'block';
        showMessage('', 'black');
    });

    // تسجيل حساب جديد (محلي فقط بدون إرسال للخادم)
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value.trim();
        const newPassword = document.getElementById('newPassword').value.trim();

        // التحقق من الحقول
        if (!newUsername || !newPassword) {
            showMessage('يرجى إدخال اسم المستخدم وكلمة المرور!', 'red');
            return;
        }

        showMessage('تم إنشاء الحساب محليًا!', 'green');
        signupForm.reset();

        // التبديل إلى نموذج تسجيل الدخول بعد 1.5 ثانية
        setTimeout(function () {
            signupFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
        }, 1500);
    });

    // تسجيل الدخول (محلي فقط بدون إرسال للخادم)
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // التحقق من الحقول
        if (!username || !password) {
            showMessage('يرجى إدخال اسم المستخدم وكلمة المرور!', 'red');
            return;
        }

        showMessage('تم تسجيل الدخول محليًا!', 'green');
        loginForm.reset();

        // تحويل المستخدم إلى الصفحة الرئيسية بعد 1.5 ثانية
        setTimeout(function () {
            window.location.href = 'first.html'; 
        }, 1500);
    });
});
