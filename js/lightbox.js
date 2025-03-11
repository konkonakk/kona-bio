document.addEventListener('DOMContentLoaded', function() {
    // Lightbox functionality for art gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentIndex = 0;
    
    // Open lightbox when gallery item is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-src');
            lightboxImg.src = imgSrc;
            currentIndex = index;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });
    
    // Close lightbox when close button is clicked
    closeBtn.addEventListener('click', () => {
        closeLightbox();
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigate to previous image
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxImage();
    });
    
    // Navigate to next image
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightboxImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateLightboxImage();
        }
    });
    
    // Helper function to update lightbox image
    function updateLightboxImage() {
        const imgSrc = galleryItems[currentIndex].getAttribute('data-src');
        
        // Add a fade effect
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = imgSrc;
            lightboxImg.style.opacity = '1';
        }, 300);
    }
    
    // Helper function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Preload gallery images for smoother experience
    function preloadGalleryImages() {
        galleryItems.forEach(item => {
            const imgSrc = item.getAttribute('data-src');
            const img = new Image();
            img.src = imgSrc;
        });
    }
    
    // Call preload function
    preloadGalleryImages();
});
