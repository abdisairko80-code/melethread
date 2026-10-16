document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-shop-btn');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // 2. Sticky Navbar & Back to Top Button
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 5. Product Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    // Small animation delay for smooth re-flow
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 6. Pre-fill Order Form when clicking "Order Now"
    const orderBtns = document.querySelectorAll('.order-btn');
    const productSelect = document.getElementById('product');

    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productName = btn.getAttribute('data-product');
            if (productName && productSelect) {
                productSelect.value = productName;
            }
        });
    });

    // 7. Form Submission & Notification
    const orderForm = document.getElementById('orderForm');
    const notification = document.getElementById('notification');

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show notification toast
            notification.classList.add('show');
            
            // Hide notification after 3.5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3500);

            // Reset form
            orderForm.reset();
        });
    }

    // 8. Gallery Lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });

});