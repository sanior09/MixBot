// ฟังก์ชันสำหรับตรวจจับการเลื่อนหน้าจอ (Scroll Observer)
const observerOptions = {
    threshold: 0.15 
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
// ฟังก์ชันตัวเลขวิ่งแบบเสถียรและจำกัด Frame Rate ไม่ให้พุ่งเกินเป้าหมาย
function animateNumbers(el) {
    const target = +el.getAttribute('data-target');
    if (target === 0) {
        el.innerText = "0";
        return;
    }
    
    let start = 0;
    const duration = 1500; // วิ่งให้เสร็จภายใน 1.5 วินาที
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            const currentValue = start + (target - start) * progress;
            el.innerText = currentValue.toFixed(target % 1 === 0 ? 0 : 1);
            requestAnimationFrame(updateNumber);
        } else {
            el.innerText = target;
        }
    }
    requestAnimationFrame(updateNumber);
}

// สั่งให้ Observer ทำงานร่วมกับ DOM
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(section => {
        observer.observe(section);
    });
    document.querySelectorAll('.stat-item').forEach(stat => {
        observer.observe(stat);
    });

    // ระบบ Navbar เปลี่ยนสีเมื่อ Scroll และจัดการความปลอดภัยปุ่ม Back to Top
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            if (navbar) navbar.classList.add('scrolled');
            if (backToTopBtn) backToTopBtn.style.display = 'block';
        } else {
            if (navbar) navbar.classList.remove('scrolled');
            if (backToTopBtn) backToTopBtn.style.display = 'none';
        }
    }, { passive: true });

    // ฟังก์ชันคลิกเลื่อนกลับด้านบนแบบนุ่มนวล
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ระบบตรวจจับฟอร์มและแจ้งเตือนจำลองความล้ำสมัย
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('🎉 ระบบบันทึกข้อมูลของท่านเรียบร้อยแล้ว แขนกลของเรากำลังประมวลผลคิวจองและเจ้าหน้าที่จะติดต่อกลับไปครับท่าน!');
            contactForm.reset();
        });
    }
});