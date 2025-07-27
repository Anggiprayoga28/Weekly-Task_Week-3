// DOM JavaScript untuk Hamburger Menu Navbar
document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen-elemen yang diperlukan
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const body = document.body;
    
    // Fungsi untuk membuka mobile menu
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenu.style.display = 'flex';
        body.style.overflow = 'hidden'; // Mencegah scroll pada body
        
        // Animasi hamburger menu menjadi X
        hamburgerMenu.classList.add('active');
    }
    
    // Fungsi untuk menutup mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        // Delay untuk memberikan waktu animasi selesai
        setTimeout(() => {
            mobileMenu.style.display = 'none';
        }, 300);
        body.style.overflow = 'auto'; // Kembalikan scroll pada body
        
        // Kembalikan hamburger menu ke bentuk semula
        hamburgerMenu.classList.remove('active');
    }
    
    // Event listener untuk hamburger menu click
    hamburgerMenu.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Event listener untuk tombol close
    closeMenu.addEventListener('click', function(e) {
        e.preventDefault();
        closeMobileMenu();
    });
    
    // Event listener untuk menutup menu ketika mengklik di luar area menu
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !hamburgerMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Event listener untuk menutup menu ketika menekan tombol Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Event listener untuk link di dalam mobile menu
    const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-menu-items a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Tutup menu setelah mengklik link
            closeMobileMenu();
        });
    });
    
    // Handle resize window - tutup mobile menu jika layar menjadi lebih besar
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Fungsi untuk smooth scroll jika menggunakan anchor links
    function smoothScrollToSection(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    
    // Jalankan animasi menu items ketika menu dibuka
    const originalOpenFunction = openMobileMenu;
    openMobileMenu = function() {
        originalOpenFunction();
        setTimeout(animateMenuItems, 100);
    };
});