document.addEventListener('DOMContentLoaded', () => {
    // ─── Original CTA Button Logic ────────────────────────────────
    const nextBtn = document.querySelector('.primary-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            window.location.href = '/write/';
        });
    }

    // ─── Sticky CTA Scroll Detection ─────────────────────────────
    const stickyCta = document.getElementById('sticky-cta');
    if (stickyCta) {
        const toggleStickyCta = () => {
            if (window.scrollY > 10) {
                stickyCta.classList.remove('translate-y-full');
                stickyCta.classList.add('translate-y-0');
            } else {
                stickyCta.classList.add('translate-y-full');
                stickyCta.classList.remove('translate-y-0');
            }
        };
        toggleStickyCta();
        window.addEventListener('scroll', toggleStickyCta, { passive: true });
    }
});
