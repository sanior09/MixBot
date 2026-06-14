// ฟังก์ชันสำหรับตรวจจับการเลื่อนหน้าจอ (Scroll Observer)
const observerOptions = {
    threshold: 0.15 // เริ่มแสดงผลเมื่อ Section ปรากฏขึ้นมา 15%
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // ถ้าเป็นตัวเลขสถิติ ให้เริ่มนับ
            if (entry.target.classList.contains('stat-item')) {
                animateNumbers(entry.target.querySelector('.stat-number'));
            }
        }
    });
}, observerOptions);

// ฟังก์ชันตัวเลขวิ่ง
function animateNumbers(el) {
    const target = +el.getAttribute('data-target');
    const count = +el.innerText;
    const speed = 200; 
    const inc = target / speed;

    if (count < target) {
        el.innerText = (count + inc).toFixed(1);
        setTimeout(() => animateNumbers(el), 1);
    } else {
        el.innerText = target;
    }
}

// สั่งให้ Observer ทำงานกับทุก Element ที่มี Class 'reveal' หรือ 'reveal-stagger'
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(section => {
        observer.observe(section);
    });
    document.querySelectorAll('.stat-item').forEach(stat => {
        observer.observe(stat);
    });
});

// ระบบ Navbar เปลี่ยนสีเมื่อ Scroll และปุ่ม Back to Top
const navbar = document.querySelector('.navbar');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTopBtn.style.display = 'block';
    } else {
        navbar.classList.remove('scrolled');
        backToTopBtn.style.display = 'none';
    }
}, { passive: true });

// ฟังก์ชันเลื่อนกลับด้านบน
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});