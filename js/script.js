
        // Mobile Menu Toggle
        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });

        // Header Scroll Effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    document.querySelector('.nav-links').classList.remove('active');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll Animation for Elements
        function checkScroll() {
            const fadeElements = document.querySelectorAll('.fade-in');
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
            
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (itemTop < windowHeight - 100) {
                    item.classList.add('visible');
                }
            });
        }
        
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);

document.addEventListener('DOMContentLoaded', function() {
            const carouselTrack = document.getElementById('carouselTrack');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const carouselDots = document.getElementById('carouselDots');
            const certificateModal = document.getElementById('certificateModal');
            const modalImage = document.getElementById('modalImage');
            const closeModal = document.getElementById('closeModal');
            const viewCertificateBtns = document.querySelectorAll('.view-certificate');
            
            const certificates = document.querySelectorAll('.certificate-card');
            const certificateWidth = certificates[0].offsetWidth + 30; // width + margin
            const visibleCertificates = Math.floor(carouselTrack.offsetWidth / certificateWidth);
            const totalCertificates = certificates.length;
            let currentPosition = 0;
            let maxPosition = totalCertificates - visibleCertificates;
            
            // Create dots based on number of certificate groups
            for (let i = 0; i <= maxPosition; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToPosition(i));
                carouselDots.appendChild(dot);
            }
            
            // Update dots active state
            function updateDots() {
                const dots = document.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentPosition);
                });
            }
            
            // Navigate to specific position
            function goToPosition(position) {
                if (position < 0) position = 0;
                if (position > maxPosition) position = maxPosition;
                
                currentPosition = position;
                carouselTrack.style.transform = `translateX(-${currentPosition * certificateWidth}px)`;
                updateDots();
            }
            
            // Next button event
            nextBtn.addEventListener('click', () => {
                if (currentPosition < maxPosition) {
                    goToPosition(currentPosition + 1);
                } else {
                    // Loop back to start
                    goToPosition(0);
                }
            });
            
            // Previous button event
            prevBtn.addEventListener('click', () => {
                if (currentPosition > 0) {
                    goToPosition(currentPosition - 1);
                } else {
                    // Loop to end
                    goToPosition(maxPosition);
                }
            });
            
            // View certificate modal
            viewCertificateBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const imageUrl = btn.getAttribute('data-image');
                    modalImage.src = imageUrl;
                    certificateModal.style.display = 'flex';
                });
            });
            
            // Close modal
            closeModal.addEventListener('click', () => {
                certificateModal.style.display = 'none';
            });
            
            // Close modal when clicking outside the image
            certificateModal.addEventListener('click', (e) => {
                if (e.target === certificateModal) {
                    certificateModal.style.display = 'none';
                }
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    certificateModal.style.display = 'none';
                } else if (e.key === 'ArrowLeft' && certificateModal.style.display !== 'flex') {
                    prevBtn.click();
                } else if (e.key === 'ArrowRight' && certificateModal.style.display !== 'flex') {
                    nextBtn.click();
                }
            });
            
            // Handle window resize
            window.addEventListener('resize', () => {
                const newVisibleCertificates = Math.floor(carouselTrack.offsetWidth / certificateWidth);
                maxPosition = totalCertificates - newVisibleCertificates;
                
                // Recreate dots if needed
                if (maxPosition + 1 !== document.querySelectorAll('.dot').length) {
                    carouselDots.innerHTML = '';
                    for (let i = 0; i <= maxPosition; i++) {
                        const dot = document.createElement('div');
                        dot.classList.add('dot');
                        if (i === currentPosition) dot.classList.add('active');
                        dot.addEventListener('click', () => goToPosition(i));
                        carouselDots.appendChild(dot);
                    }
                }
                
                // Adjust current position if it's beyond new max
                if (currentPosition > maxPosition) {
                    goToPosition(maxPosition);
                } else {
                    goToPosition(currentPosition);
                }
            });
            
            // Auto-advance carousel (optional)
            let autoAdvance = setInterval(() => {
                nextBtn.click();
            }, 5000);
            
            // Pause auto-advance on hover
            carouselTrack.addEventListener('mouseenter', () => {
                clearInterval(autoAdvance);
            });
            
            carouselTrack.addEventListener('mouseleave', () => {
                autoAdvance = setInterval(() => {
                    nextBtn.click();
                }, 5000);
            });
        });

      