function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('svg');
            
    if (input.type === 'password') {
        input.type = 'text';
         icon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L7.05 12.707"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18"></path>
            `;
    } else {
                input.type = 'password';
                icon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                `;
            }
        }


        document.addEventListener('DOMContentLoaded', function() {
            const hamburgerMenu = document.getElementById('hamburger-menu');
            

            if (!document.getElementById('mobile-menu')) {
                const mobileMenuHTML = `
                    <div id="mobile-menu" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
                        <div class="bg-white w-64 h-full p-6">
                            <div class="flex justify-between items-center mb-8">
                                <img src="/asset/icon/tickitz-blu.svg" alt="logo" class="w-24">
                                <button id="close-menu" class="text-2xl">&times;</button>
                            </div>
                            <div class="mobile-menu-items space-y-4">
                                <a href="halaman3.html" class="block py-2 text-gray-800 hover:text-blue-500">Home</a>
                                <a href="halaman4.html" class="block py-2 text-gray-800 hover:text-blue-500">Movie</a>
                                <a href="halaman5.html" class="block py-2 text-gray-800 hover:text-blue-500">Buy Ticket</a>
                            </div>
                        </div>
                    </div>
                `;
                document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
            }

            const mobileMenu = document.getElementById('mobile-menu');
            const closeMenu = document.getElementById('close-menu');
            const body = document.body;
            
            function openMobileMenu() {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                body.style.overflow = 'hidden';
                hamburgerMenu.classList.add('active');
            }
            
            function closeMobileMenu() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                body.style.overflow = 'auto';
                hamburgerMenu.classList.remove('active');
            }
            
            hamburgerMenu.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (mobileMenu.classList.contains('hidden')) {
                    openMobileMenu();
                } else {
                    closeMobileMenu();
                }
            });
            
            closeMenu.addEventListener('click', function(e) {
                e.preventDefault();
                closeMobileMenu();
            });
            
            document.addEventListener('click', function(e) {
                if (!mobileMenu.classList.contains('hidden') && 
                    !mobileMenu.contains(e.target) && 
                    !hamburgerMenu.contains(e.target)) {
                    closeMobileMenu();
                }
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                    closeMobileMenu();
                }
            });
            
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768 && !mobileMenu.classList.contains('hidden')) {
                    closeMobileMenu();
                }
            });
        });