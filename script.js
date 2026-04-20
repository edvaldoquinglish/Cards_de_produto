// Interatividade dos Cards de Produto
document.addEventListener('DOMContentLoaded', function() {
    
    // Wishlist toggle
    const wishlistButtons = document.querySelectorAll('.btn-wishlist');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('Produto adicionado aos favoritos!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Produto removido dos favoritos!');
            }
        });
    });
    
    // Expandable card
    const expandButton = document.querySelector('.btn-expand');
    const expandableCard = document.querySelector('.expandable');
    
    if (expandButton) {
        expandButton.addEventListener('click', function() {
            expandableCard.classList.toggle('expanded');
            
            if (expandableCard.classList.contains('expanded')) {
                this.innerHTML = '<i class="fas fa-chevron-up"></i> Menos Informações';
            } else {
                this.innerHTML = '<i class="fas fa-chevron-down"></i> Mais Informações';
            }
        });
    }
    
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            
            // Remove active from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active to clicked option
            this.classList.add('active');
            
            // Update product image based on color (simulação)
            console.log(`Cor selecionada: ${color}`);
        });
    });
    
    // Size selection
    const sizeOptions = document.querySelectorAll('.size-option');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active from all options
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active to clicked option
            this.classList.add('active');
        });
    });
    
    // Parallax effect
    const parallaxCard = document.querySelector('.parallax');
    
    if (parallaxCard) {
        parallaxCard.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const foreground = this.querySelector('.parallax-foreground');
            if (foreground) {
                foreground.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
            }
        });
        
        parallaxCard.addEventListener('mouseleave', function() {
            const foreground = this.querySelector('.parallax-foreground');
            if (foreground) {
                foreground.style.transform = 'translate(0, 0)';
            }
        });
    }
    
    // Add to cart functionality
    const cartButtons = document.querySelectorAll('.btn-cart');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            showNotification(`${productTitle} adicionado ao carrinho!`);
            
            // Animation effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Quick view
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            showNotification(`Visualização rápida: ${productTitle}`);
        });
    });
    
    // 3D card tilt effect
    const basic3dCards = document.querySelectorAll('.basic-3d');
    
    basic3dCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Utility function for notifications
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards for animation
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});