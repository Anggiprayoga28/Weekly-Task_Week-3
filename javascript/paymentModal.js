        // Payment method selection
        const paymentMethods = document.querySelectorAll('.payment-method');
        const payButton = document.getElementById('payButton');
        let selectedMethod = null;

        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                // Remove selected class from all methods
                paymentMethods.forEach(m => m.classList.remove('selected'));
                
                // Add selected class to clicked method
                this.classList.add('selected');
                selectedMethod = this.dataset.method;
                
                // Enable pay button and update styling
                payButton.disabled = false;
                payButton.textContent = 'Pay your order';
                payButton.className = 'w-full py-4 bg-blue-500 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-blue-600 active:translate-y-0.5';
            });
        });

        // Modal functionality
        const modal = document.getElementById('paymentModal');
        const modalClose = document.getElementById('modalClose');
        const copyButton = document.getElementById('copyButton');
        const successMessage = document.getElementById('successMessage');
        const checkPaymentButton = document.getElementById('checkPaymentButton');
        const payLaterButton = document.getElementById('payLaterButton');

        // Open modal when pay button is clicked
        payButton.addEventListener('click', function() {
            if (selectedMethod && !this.disabled) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });

        // Close modal functions
        function closeModal() {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto'; // Restore background scrolling
            successMessage.classList.add('hidden');
        }

        // Close modal when X button is clicked
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });

        // Close modal when clicking outside the modal content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('flex')) {
                closeModal();
            }
        });

        // Copy virtual account number
        copyButton.addEventListener('click', function() {
            const virtualAccount = document.getElementById('virtualAccount').textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(virtualAccount).then(function() {
                // Show success message
                successMessage.classList.remove('hidden');
                
                // Hide success message after 3 seconds
                setTimeout(function() {
                    successMessage.classList.add('hidden');
                }, 3000);
            }).catch(function(err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = virtualAccount;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                successMessage.classList.remove('hidden');
                setTimeout(function() {
                    successMessage.classList.add('hidden');
                }, 3000);
            });
        });

        // Check payment button
        checkPaymentButton.addEventListener('click', function() {
            // You can add navigation to check payment page here
            alert('Redirecting to payment verification page...');
            closeModal();
            // window.location.href = 'halaman9.html';
        });

        // Pay later button
        payLaterButton.addEventListener('click', function() {
            closeModal();
            alert('Payment saved for later. You can complete it anytime.');
        });

        // Generate random virtual account based on selected payment method
        function generateVirtualAccount(method) {
            const prefixes = {
                'bca': '014',
                'bri': '002',
                'gopay': '021',
                'dana': '021',
                'ovo': '021',
                'visa': '400',
                'google-pay': '500',
                'paypal': '600'
            };
            
            const prefix = prefixes[method] || '888';
            const randomNumbers = Math.floor(Math.random() * 10000000000000).toString().padStart(13, '0');
            return prefix + randomNumbers;
        }

        // Update virtual account when payment method is selected
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                const virtualAccountEl = document.getElementById('virtualAccount');
                const newVirtualAccount = generateVirtualAccount(this.dataset.method);
                virtualAccountEl.textContent = newVirtualAccount;
            });
        });