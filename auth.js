// File ini digunakan oleh semua halaman (login, register, home, index)

// ========== FUNGSI VALIDASI ==========
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) {
        return {
            isValid: false,
            message: "Password minimal 8 karakter"
        };
    }
    
    if (!/[a-z]/.test(password)) {
        return {
            isValid: false,
            message: "Password harus mengandung minimal 1 huruf kecil"
        };
    }
    
    if (!/[A-Z]/.test(password)) {
        return {
            isValid: false,
            message: "Password harus mengandung minimal 1 huruf besar"
        };
    }
    
    if (!/[!@#$%^&*\/><]/.test(password)) {
        return {
            isValid: false,
            message: "Password harus mengandung minimal 1 karakter spesial (!@#$%^&*\/><)"
        };
    }
    
    return {
        isValid: true,
        message: "Password valid"
    };
}

// ========== FUNGSI UI HELPER ==========
function showError(inputElement, message) {
    const existingError = inputElement.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    inputElement.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    
    inputElement.parentNode.appendChild(errorDiv);
}

function clearError(inputElement) {
    const existingError = inputElement.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    inputElement.classList.remove('error');
}

function togglePasswordVisibility(passwordId, toggleId) {
    const passwordInput = document.getElementById(passwordId);
    const toggleIcon = document.getElementById(toggleId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// ========== FUNGSI LOCALSTORAGE (SOAL NO 3) ==========
function saveUserToLocalStorage(userData) {
    try {
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
        console.log('User data saved to localStorage:', userData);
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getUserFromLocalStorage() {
    try {
        const userData = localStorage.getItem('loggedInUser');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

function removeUserFromLocalStorage() {
    try {
        localStorage.removeItem('loggedInUser');
        console.log('User data removed from localStorage');
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

function isUserLoggedIn() {
    const userData = getUserFromLocalStorage();
    return userData !== null;
}

// ========== FUNGSI REDIRECT & AUTH CHECK (POIN 3A) ==========
function checkLoginStatus() {
    const currentPage = window.location.pathname;
    const isLoggedIn = isUserLoggedIn();
    
    // Halaman yang memerlukan login
    const protectedPages = ['/index/home.html'];
    
    // Halaman auth (login/register)
    const authPages = ['/index/login.html', '/index/register.html'];
    
    if (isLoggedIn) {
        // Jika sudah login dan berada di halaman auth, redirect ke home
        if (authPages.some(page => currentPage.includes(page))) {
            window.location.href = '/index/index.html';
        }
    } else {
        // Jika belum login dan mengakses halaman yang dilindungi, redirect ke login
        if (protectedPages.some(page => currentPage.includes(page))) {
            alert('Anda harus login terlebih dahulu!');
            window.location.href = '/index/login.html';
        }
    }
}

// ========== FUNGSI LOGOUT (POIN 3D) ==========
function logout() {
    if (removeUserFromLocalStorage()) {
        alert('Logout berhasil!');
        window.location.href = '/index/index.html';
    } else {
        alert('Terjadi kesalahan saat logout');
    }
}

// ========== FUNGSI UPDATE HEADER (POIN 3B) ==========
function updateHeaderForLoggedInUser() {
    const userData = getUserFromLocalStorage();
    const navbarAuth = document.querySelector('.navbar-auth');
    
    if (userData && navbarAuth) {
        // User sudah login, ganti tombol dengan info user dan dropdown
        navbarAuth.innerHTML = `
            <div class="user-dropdown">
                <div class="user-info-header" onclick="toggleUserDropdown()">
                    <div class="user-avatar">${userData.name.charAt(0).toUpperCase()}</div>
                    <span class="user-name">${userData.name}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="dropdown-menu" id="userDropdown">
                    <div class="user-info">
                        <div>${userData.name}</div>
                        <div style="font-size: 12px; color: #666; font-weight: normal;">${userData.email}</div>
                    </div>
                    <div class="dropdown-item" onclick="goToProfile()">
                        <i class="fas fa-user"></i> Profile
                    </div>
                    <div class="dropdown-item" onclick="goToSettings()">
                        <i class="fas fa-cog"></i> Settings
                    </div>
                    <div class="dropdown-item" onclick="logout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </div>
                </div>
            </div>
        `;
        console.log('Header updated for logged in user:', userData);
    } else if (!userData && navbarAuth) {
        // User belum login, tampilkan tombol Sign in/Sign Up
        navbarAuth.innerHTML = `
            <a href="/index/login.html" class="btn btn-outline">Sign in</a>
            <a href="/index/register.html" class="btn btn-primary">Sign Up</a>
        `;
        console.log('Header updated for guest user');
    }
}

// ========== FUNGSI DROPDOWN (POIN 3C) ==========
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
        console.log('Dropdown toggled:', dropdown.classList.contains('show') ? 'shown' : 'hidden');
    }
}

function closeDropdownOnClickOutside(event) {
    const dropdown = document.getElementById('userDropdown');
    const userInfo = document.querySelector('.user-info-header');
    
    if (dropdown && userInfo && !userInfo.contains(event.target)) {
        dropdown.classList.remove('show');
    }
}

function goToProfile() {
    alert('Fitur Profile akan segera hadir!');
    toggleUserDropdown();
}

function goToSettings() {
    alert('Fitur Settings akan segera hadir!');
    toggleUserDropdown();
}

// ========== FUNGSI SETUP VALIDASI ==========
function setupEmailValidation(emailInputId) {
    const emailInput = document.getElementById(emailInputId);
    if (!emailInput) return;
    
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        
        if (email === '') {
            showError(this, 'Email tidak boleh kosong');
        } else if (!validateEmail(email)) {
            showError(this, 'Format email tidak valid');
        } else {
            clearError(this);
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            const email = this.value.trim();
            if (email !== '' && validateEmail(email)) {
                clearError(this);
            }
        }
    });
}

function setupPasswordValidation(passwordInputId) {
    const passwordInput = document.getElementById(passwordInputId);
    if (!passwordInput) return;
    
    passwordInput.addEventListener('blur', function() {
        const password = this.value;
        
        if (password === '') {
            showError(this, 'Password tidak boleh kosong');
        } else {
            const validation = validatePassword(password);
            if (!validation.isValid) {
                showError(this, validation.message);
            } else {
                clearError(this);
            }
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            const password = this.value;
            if (password !== '') {
                const validation = validatePassword(password);
                if (validation.isValid) {
                    clearError(this);
                }
            }
        }
    });
}

// ========== INISIALISASI HALAMAN LOGIN ==========
function initLoginPage() {
    setupEmailValidation('email');
    setupPasswordValidation('password');
    
    const toggleIcon = document.getElementById('toggleIcon');
    if (toggleIcon) {
        toggleIcon.addEventListener('click', function() {
            togglePasswordVisibility('password', 'toggleIcon');
        });
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            let isValid = true;
            
            // Validasi input
            if (email === '') {
                showError(document.getElementById('email'), 'Email tidak boleh kosong');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError(document.getElementById('email'), 'Format email tidak valid');
                isValid = false;
            }
            
            if (password === '') {
                showError(document.getElementById('password'), 'Password tidak boleh kosong');
                isValid = false;
            } else {
                const passwordValidation = validatePassword(password);
                if (!passwordValidation.isValid) {
                    showError(document.getElementById('password'), passwordValidation.message);
                    isValid = false;
                }
            }
            
            if (isValid) {
                // Buat object user data
                const userData = {
                    email: email,
                    loginTime: new Date().toISOString(),
                    name: email.split('@')[0] // Menggunakan bagian email sebelum @ sebagai nama
                };
                
                // Simpan ke localStorage
                if (saveUserToLocalStorage(userData)) {
                    console.log('Login input data:', { email, password });
                    alert('Login berhasil! Mengarahkan ke halaman utama...');
                    
                    setTimeout(() => {
                        window.location.href = '/index/index.html';
                    }, 1000);
                } else {
                    alert('Terjadi kesalahan saat menyimpan data login');
                }
            }
        });
    }
}

// ========== INISIALISASI HALAMAN REGISTER ==========
function initRegisterPage() {
    // Setup validasi dengan ID yang benar untuk register
    setupEmailValidation('Email');
    setupPasswordValidation('Password');
    
    const toggleIcon = document.getElementById('toggleIcon');
    if (toggleIcon) {
        toggleIcon.addEventListener('click', function() {
            togglePasswordVisibility('Password', 'toggleIcon');
        });
    }
    
    const registerForm = document.querySelector('form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.querySelector('input[name="Email"]');
            const passwordInput = document.querySelector('input[name="Password"]');
            const termsCheckbox = document.getElementById('terms');
            
            const email = emailInput ? emailInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';
            const termsChecked = termsCheckbox ? termsCheckbox.checked : false;
            
            let isValid = true;
            
            // Validasi email
            if (email === '') {
                if (emailInput) showError(emailInput, 'Email tidak boleh kosong');
                isValid = false;
            } else if (!validateEmail(email)) {
                if (emailInput) showError(emailInput, 'Format email tidak valid');
                isValid = false;
            }
            
            // Validasi password
            if (password === '') {
                if (passwordInput) showError(passwordInput, 'Password tidak boleh kosong');
                isValid = false;
            } else {
                const passwordValidation = validatePassword(password);
                if (!passwordValidation.isValid) {
                    if (passwordInput) showError(passwordInput, passwordValidation.message);
                    isValid = false;
                }
            }
            
            // Validasi terms
            if (!termsChecked) {
                alert('Anda harus menyetujui syarat dan ketentuan');
                isValid = false;
            }
            
            if (isValid) {
                console.log('Register input data:', { email, password });
                alert('Registrasi berhasil! Mengarahkan ke halaman login...');
                
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
            }
        });
    }
}

// ========== EVENT LISTENER UTAMA ==========
document.addEventListener('DOMContentLoaded', function() {
    // Cek status login saat halaman dimuat (Poin 3a)
    checkLoginStatus();
    
    // Update header untuk semua halaman
    updateHeaderForLoggedInUser();
    
    // Inisialisasi berdasarkan halaman
    if (document.getElementById('loginForm')) {
        initLoginPage();
        console.log('Login page initialized');
    } else if (document.querySelector('.progress-step')) {
        initRegisterPage();
        console.log('Register page initialized');
    }
    
    // Event listener untuk menutup dropdown
    document.addEventListener('click', closeDropdownOnClickOutside);
    
    // ========== HAMBURGER MENU HANDLER (SOAL NO 1) ==========
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    
    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.toggle('active');
            console.log('Hamburger menu clicked, mobile menu toggled');
        });
    }
    
    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.remove('active');
            console.log('Mobile menu closed');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && hamburgerMenu && !hamburgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
});

// ========== CSS STYLING ==========
const authCSS = `
.form-control.error, 
.form-group input.error {
    border-color: #e74c3c !important;
    background-color: #fdf2f2 !important;
}

.error-message {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 5px;
    display: block;
}

.user-dropdown {
    position: relative;
    display: inline-block;
}

.user-info-header {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 8px;
    transition: background-color 0.2s;
}

.user-info-header:hover {
    background-color: rgba(255,255,255,0.1);
}

.user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #4c6ef5;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
}

.user-name {
    color: white;
    font-weight: 500;
}

.dropdown-menu {
    display: none;
    position: absolute;
    right: 0;
    top: 50px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    min-width: 200px;
    z-index: 1000;
}

.dropdown-menu.show {
    display: block;
}

.dropdown-item {
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #333;
}

.dropdown-item:hover {
    background-color: #f8f9fa;
}

.dropdown-item:last-child {
    border-bottom: none;
}

.user-info {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    background-color: #f8f9fa;
}

.fas {
    width: 16px;
}

/* ========== HAMBURGER MENU STYLING (SOAL NO 1) ========== */
.hamburger-menu {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: 5px;
    z-index: 1001;
}

.hamburger-menu span {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 3px 0;
    transition: 0.3s;
    border-radius: 2px;
}

.hamburger-menu:hover span {
    background-color: #4c6ef5;
}

.mobile-menu {
    display: none;
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100vh;
    background: white;
    z-index: 1000;
    transition: left 0.3s ease;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
}

.mobile-menu.active {
    left: 0;
}

.mobile-menu-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mobile-menu-items {
    padding: 20px 0;
}

.mobile-menu-items a {
    display: block;
    padding: 15px 20px;
    text-decoration: none;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.2s;
}

.mobile-menu-items a:hover {
    background-color: #f8f9fa;
    color: #4c6ef5;
}

.mobile-auth {
    padding: 20px;
    border-top: 1px solid #eee;
}

.mobile-auth .btn {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
    padding: 12px;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.2s;
}

.mobile-auth .btn-outline {
    border: 2px solid #4c6ef5;
    color: #4c6ef5;
    background: transparent;
}

.mobile-auth .btn-outline:hover {
    background: #4c6ef5;
    color: white;
}

.mobile-auth .btn-primary {
    background: #4c6ef5;
    color: white;
    border: 2px solid #4c6ef5;
}

.mobile-auth .btn-primary:hover {
    background: #364fc7;
    border-color: #364fc7;
}

.close-menu {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.2s;
}

.close-menu:hover {
    background-color: #f0f0f0;
    color: #333;
}

/* Show hamburger menu on mobile */
@media (max-width: 768px) {
    .hamburger-menu {
        display: flex;
    }
    
    .navbar-menu {
        display: none;
    }
    
    .navbar-auth {
        display: none;
    }
    
    .mobile-menu {
        display: block;
    }
}
`;

// Tambahkan CSS ke head
const style = document.createElement('style');
style.textContent = authCSS;
document.head.appendChild(style);