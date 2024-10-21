document.querySelectorAll('.cta-btn').forEach(button => {
    button.addEventListener('click', () => {
        href="nexbuy.html"
    });
});


const productImages = document.querySelectorAll('.product');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    productImages.forEach((product) => {
        const productTop = product.getBoundingClientRect().top;
        
        if (productTop < windowHeight - 100) {
            product.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

document.querySelectorAll('.cta-btn').forEach(button => {
    button.addEventListener('click', () => {
        href = "nexbuy.html";
    });
});


const fadeInElements = document.querySelectorAll('.fade-in');

// Intersection Observer to handle fade-in on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe all fade-in elements
fadeInElements.forEach((element) => {
    observer.observe(element);
});

