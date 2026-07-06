// ============================================
// 360° PRODUCT VIEWER with motion
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --- DOM Elements ---
    const stage = document.getElementById('productStage');
    const imageContainer = document.getElementById('productImageContainer');
    const productImage = document.getElementById('productImage');
    const productImg = document.getElementById('productImg');
    const shadow = document.getElementById('productShadow');
    const hint = document.getElementById('interactionHint');
    const controls = document.querySelector('.controls');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomLevel = document.getElementById('zoomLevel');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const shippingBtn = document.getElementById('shippingBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // --- State ---
    let rotation = 0;
    let zoom = 1;
    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 2;
    let isDragging = false;
    let lastX = 0;
    let currentRotation = 0;
    let velocity = 0;
    let lastDragX = 0;
    let isRevealed = false;
    let isRevealAnimating = false;

    // --- Product images ---
    const productImages = [
        { angle: 0, src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop&crop=center' },
        { angle: 45, src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop&crop=center' },
        { angle: 90, src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop&crop=center' },
        { angle: 135, src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop&crop=center' },
        { angle: 180, src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop&crop=center' },
        { angle: 225, src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop&crop=center' },
        { angle: 270, src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop&crop=center' },
        { angle: 315, src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop&crop=center' },
    ];

    // --- Helper: Update product transform ---
    function updateProduct(rotationAngle, scaleValue, yOffset, opacityValue) {
        const normalized = ((rotationAngle % 360) + 360) % 360;
        const currentScale = scaleValue !== undefined ? scaleValue : zoom;
        const y = yOffset !== undefined ? yOffset : 0;
        const opacity = opacityValue !== undefined ? opacityValue : 1;
        
        const rotateY = normalized;
        const rotateX = Math.sin(normalized * Math.PI / 180) * 3;
        
        productImage.style.transform = `
            rotateY(${rotateY}deg) 
            rotateX(${rotateX}deg) 
            scale(${currentScale})
        `;
        
        imageContainer.style.opacity = opacity;
        imageContainer.style.transform = `translateY(${y}%) scale(1)`;
        
        if (shadow) {
            const shadowX = Math.sin(normalized * Math.PI / 180) * 25;
            const shadowScale = 1 + Math.sin(normalized * Math.PI / 180) * 0.15;
            shadow.style.transform = `translateX(${shadowX}px) scale(${shadowScale})`;
        }
    }

    // --- Reveal Animation ---
    function triggerReveal() {
        if (isRevealed || isRevealAnimating) return;
        isRevealAnimating = true;

        // Start from hidden, above
        imageContainer.style.opacity = '0';
        imageContainer.style.transform = 'translateY(-120%) scale(1)';
        productImage.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';

        void imageContainer.offsetWidth;

        const duration = 4000;
        const startTime = performance.now();
        const startY = -120;
        const endY = 0;
        const totalRotation = 360;

        function animateReveal(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const eased = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            let yPos;
            if (progress < 0.7) {
                const dropProgress = progress / 0.7;
                const dropEased = dropProgress < 0.5 
                    ? 2 * dropProgress * dropProgress 
                    : 1 - Math.pow(-2 * dropProgress + 2, 2) / 2;
                yPos = startY + (endY - startY) * dropEased;
            } else {
                const bounceProgress = (progress - 0.7) / 0.3;
                const bounce = Math.sin(bounceProgress * Math.PI * 2) * (1 - bounceProgress) * 15;
                yPos = endY + bounce;
            }
            
            const revealRotation = totalRotation * eased;
            const normalized = ((revealRotation % 360) + 360) % 360;
            const rotateY = normalized;
            const rotateX = Math.sin(normalized * Math.PI / 180) * 3;
            
            productImage.style.transform = `
                rotateY(${rotateY}deg) 
                rotateX(${rotateX}deg) 
                scale(${zoom})
            `;
            
            imageContainer.style.opacity = progress < 0.1 ? progress / 0.1 : 1;
            imageContainer.style.transform = `translateY(${yPos}%) scale(1)`;
            
            if (shadow) {
                const shadowX = Math.sin(normalized * Math.PI / 180) * 25;
                const shadowScale = 1 + Math.sin(normalized * Math.PI / 180) * 0.15;
                shadow.style.transform = `translateX(${shadowX}px) scale(${shadowScale})`;
                shadow.style.opacity = Math.min(progress * 2, 1);
                shadow.style.transform += ` scale(${0.5 + progress * 0.5})`;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animateReveal);
            } else {
                isRevealed = true;
                isRevealAnimating = false;
                
                rotation = 0;
                updateProduct(rotation, zoom, 0, 1);
                
                hint.classList.add('visible');
                controls.classList.add('visible');
                
                if (shadow) {
                    shadow.classList.add('reveal');
                    shadow.style.opacity = '1';
                }
                
                console.log('Product revealed!');
            }
        }

        requestAnimationFrame(animateReveal);
    }

    // --- Zoom ---
    function updateZoom(newZoom) {
        zoom = Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM);
        zoomLevel.textContent = zoom.toFixed(1) + '×';
        if (isRevealed) {
            updateProduct(rotation, zoom, 0, 1);
        }
    }

    // --- Drag ---
    function startDrag(e) {
        if (!isRevealed || isRevealAnimating) return;
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        isDragging = true;
        lastX = clientX;
        lastDragX = clientX;
        currentRotation = rotation;
        stage.style.cursor = 'grabbing';
        hint.style.opacity = '0';
    }

    function moveDrag(e) {
        if (!isDragging || !isRevealed) return;
        e.preventDefault();
        
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - lastDragX;
        velocity = deltaX * 0.4;
        
        rotation = (rotation + velocity) % 360;
        updateProduct(rotation, zoom, 0, 1);
        
        lastDragX = clientX;
    }

    function endDrag(e) {
        if (!isDragging || !isRevealed) return;
        isDragging = false;
        stage.style.cursor = 'grab';
        
        if (Math.abs(velocity) > 1) {
            let momentumId = null;
            let momentum = velocity;
            
            function momentumStep() {
                momentum *= 0.96;
                if (Math.abs(momentum) < 0.3) {
                    cancelAnimationFrame(momentumId);
                    return;
                }
                rotation = (rotation + momentum) % 360;
                updateProduct(rotation, zoom, 0, 1);
                momentumId = requestAnimationFrame(momentumStep);
            }
            momentumStep();
        }
        
        setTimeout(() => {
            if (!isDragging && isRevealed) {
                hint.style.opacity = '0.6';
            }
        }, 3000);
    }

    // --- Wheel ---
    function handleWheel(e) {
        if (!isRevealed) return;
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        updateZoom(zoom + delta);
    }

    // --- Keyboard ---
    function handleKeyboard(e) {
        if (e.key === '+' || e.key === '=') {
            updateZoom(zoom + 0.1);
            e.preventDefault();
        }
        if (e.key === '-') {
            updateZoom(zoom - 0.1);
            e.preventDefault();
        }
    }

    // --- Button Actions ---
    function handleAddToCart() {
        if (!isRevealed) return;
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = 'Added! ✦';
        addToCartBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.style.transform = 'scale(1)';
        }, 1500);
        console.log('Add to cart: Signature Edition - 50ml - $280 CAD');
    }

    function handleShipping() {
        if (!isRevealed) return;
        const originalText = shippingBtn.textContent;
        shippingBtn.textContent = '✓ Details';
        shippingBtn.style.borderColor = 'var(--color-accent)';
        setTimeout(() => {
            shippingBtn.textContent = originalText;
            shippingBtn.style.borderColor = '';
        }, 2000);
        console.log('Shipping information displayed');
    }

    function handleCheckout() {
        if (!isRevealed) return;
        const originalText = checkoutBtn.textContent;
        checkoutBtn.textContent = '✓ Processing...';
        checkoutBtn.style.borderColor = 'var(--color-accent)';
        setTimeout(() => {
            checkoutBtn.textContent = originalText;
            checkoutBtn.style.borderColor = '';
        }, 2000);
        console.log('🔒 Checkout initiated');
    }

    // --- Event Listeners ---
    stage.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', endDrag);
    
    stage.addEventListener('touchstart', startDrag, { passive: true });
    document.addEventListener('touchmove', moveDrag, { passive: false });
    document.addEventListener('touchend', endDrag, { passive: true });
    
    stage.addEventListener('wheel', handleWheel, { passive: false });
    
    zoomInBtn.addEventListener('click', () => updateZoom(zoom + 0.1));
    zoomOutBtn.addEventListener('click', () => updateZoom(zoom - 0.1));
    addToCartBtn.addEventListener('click', handleAddToCart);
    shippingBtn.addEventListener('click', handleShipping);
    checkoutBtn.addEventListener('click', handleCheckout);
    
    document.addEventListener('keydown', handleKeyboard);

    stage.addEventListener('mouseenter', () => {
        if (!isDragging && isRevealed) {
            hint.style.opacity = '0.8';
        }
    });
    
    stage.addEventListener('mouseleave', () => {
        if (!isDragging && isRevealed) {
            hint.style.opacity = '0.4';
        }
    });

    // --- Auto-Reveal on load ---
    setTimeout(() => {
        triggerReveal();
    }, 800);

    console.log('360° Product Experience loaded');
    console.log('Auto-reveal starting in 0.8s...');
});