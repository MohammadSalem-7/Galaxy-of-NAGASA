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

        // عرض رسالة تحميل
        message.textContent = 'جاري إنشاء الحساب...';
        message.style.color = 'blue';

        // إرسال البيانات إلى الخادم
        fetch('register_process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: newUsername, password: newPassword })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                message.textContent = 'تم إنشاء الحساب بنجاح!';
                message.style.color = 'green';
                signupForm.reset();

                // التبديل إلى نموذج تسجيل الدخول بعد إنشاء الحساب
                setTimeout(function () {
                    signupFormContainer.style.display = 'none';
                    loginFormContainer.style.display = 'block';
                }, 1000); // تأخير 1 ثانية قبل التبديل
            } else {
                message.textContent = data.message || 'حدث خطأ أثناء إنشاء الحساب!';
                message.style.color = 'red';
            }
        })
        .catch(error => {
            message.textContent = 'حدث خطأ في الاتصال بالخادم!';
            message.style.color = 'red';
        });
    });

    // تسجيل الدخول
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // عرض رسالة تحميل
        message.textContent = 'جاري تسجيل الدخول...';
        message.style.color = 'blue';

        // إرسال البيانات إلى الخادم
        fetch('login_process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                message.textContent = 'تم تسجيل الدخول بنجاح!';
                message.style.color = 'green';
                loginForm.reset();

                // تحويل المستخدم إلى صفحة أخرى بعد تسجيل الدخول
                setTimeout(function () {
                    window.location.href = 'first.html'; // اسم الصفحة اللي هيتحول ليها
                }, 1000); // تأخير 1 ثانية قبل التحويل
            } else {
                message.textContent = data.message || 'اسم المستخدم أو كلمة المرور غير صحيحة!';
                message.style.color = 'red';
            }
        })
        .catch(error => {
            message.textContent = 'حدث خطأ في الاتصال بالخادم!';
            message.style.color = 'red';
        });
    });
});
