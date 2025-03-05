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

    // تسجيل حساب جديد
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value.trim();
        const newPassword = document.getElementById('newPassword').value.trim();
        const submitButton = signupForm.querySelector('button[type="submit"]');

        // التحقق من الحقول
        if (!newUsername || !newPassword) {
            showMessage('يرجى إدخال اسم المستخدم وكلمة المرور!', 'red');
            return;
        }

        // تعطيل الزر أثناء الإرسال
        submitButton.disabled = true;
        showMessage('جاري إنشاء الحساب...', 'blue');

        // إرسال البيانات إلى الخادم
        fetch('register_process.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: newUsername, password: newPassword })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showMessage('تم إنشاء الحساب بنجاح!', 'green');
                signupForm.reset();

                // التبديل إلى نموذج تسجيل الدخول بعد 1.5 ثانية
                setTimeout(function () {
                    signupFormContainer.style.display = 'none';
                    loginFormContainer.style.display = 'block';
                }, 1500);
            } else {
                showMessage(data.message || 'حدث خطأ أثناء إنشاء الحساب!', 'red');
            }
        })
        .catch(() => {
            showMessage('حدث خطأ في الاتصال بالخادم!', 'red');
        })
        .finally(() => {
            submitButton.disabled = false;
        });
    });

    // تسجيل الدخول
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const submitButton = loginForm.querySelector('button[type="submit"]');

        // التحقق من الحقول
        if (!username || !password) {
            showMessage('يرجى إدخال اسم المستخدم وكلمة المرور!', 'red');
            return;
        }

        // تعطيل الزر أثناء الإرسال
        submitButton.disabled = true;
        showMessage('جاري تسجيل الدخول...', 'blue');

        // إرسال البيانات إلى الخادم
        fetch('login_process.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showMessage('تم تسجيل الدخول بنجاح!', 'green');
                loginForm.reset();

                // تحويل المستخدم إلى الصفحة الرئيسية بعد 1.5 ثانية
                setTimeout(function () {
                    window.location.href = 'first.html'; 
                }, 1500);
            } else {
                showMessage(data.message || 'اسم المستخدم أو كلمة المرور غير صحيحة!', 'red');
            }
        })
        .catch(() => {
            showMessage('حدث خطأ في الاتصال بالخادم!', 'red');
        })
        .finally(() => {
            submitButton.disabled = false;
        });
    });
});
