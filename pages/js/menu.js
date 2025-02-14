// Add loading animation for images
document.querySelectorAll('.menu-card img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});