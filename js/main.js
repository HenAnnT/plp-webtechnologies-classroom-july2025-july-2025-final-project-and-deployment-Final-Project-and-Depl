

document.addEventListener('DOMContentLoaded', function() {
    // Set year in footer(s)
    const year = new Date().getFullYear();
    const y = document.getElementById('year');
    const y2 = document.getElementById('year-2');
    const y3 = document.getElementById('year-3');
    if(y) y.textContent = year;
    if(y2) y2.textContent = year;
    if(y3) y3.textContent = year;

    // Accessible nav toggles (there are 3 header instances)
    [['nav-toggle','primary-nav'], ['nav-toggle-2','primary-nav-2'], ['nav-toggle-3','primary-nav-3']].forEach(pair=>{
        const btn = document.getElementById(pair[0]);
        const nav = document.getElementById(pair[1]);
        if(!btn || !nav) return;
        btn.addEventListener('click', ()=>{
            const open = nav.classList.toggle('open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    });

    // Simple slider (no external dependencies)
    (function slider(){
        const slidesWrap = document.querySelector('.slides');
        if(!slidesWrap) return;
        const slides = Array.from(slidesWrap.querySelectorAll('.slide'));
        let index = 0;

        function show(i){
            // clamp
            if(i<0) i = slides.length -1;
            if(i>=slides.length) i = 0;
            index = i;
            // arrange slides horizontally and translate container
            slides.forEach((s,si)=>{
                s.style.display = 'block';
                s.style.minWidth = slidesWrap.clientWidth + 'px';
            });
            slidesWrap.style.display = 'flex';
            slidesWrap.style.transition = 'transform 400ms ease';
            slidesWrap.style.transform = 'translateX(' + (-index * slidesWrap.clientWidth) + 'px)';
        }

        window.addEventListener('resize', ()=> show(index));
        document.getElementById('prev')?.addEventListener('click', ()=> show(index-1));
        document.getElementById('next')?.addEventListener('click', ()=> show(index+1));

        // auto-advance
        let auto = setInterval(()=> show(index+1), 5000);
        slidesWrap.addEventListener('mouseenter', ()=> clearInterval(auto));
        slidesWrap.addEventListener('mouseleave', ()=> auto = setInterval(()=> show(index+1), 5000));

        show(0);
    })();

    // Contact form validation (client-side only)
    const form = document.getElementById('contact-form');
    if(form){
        const status = document.getElementById('form-status');
        form.addEventListener('submit', function(e){
            e.preventDefault();
            status.textContent = '';
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            if(name.length < 2){
                status.textContent = 'Please enter your name (at least 2 characters).';
                form.name.focus();
                return;
            }
            // simple email regex
            const emailRe = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if(!emailRe.test(email)){
                status.textContent = 'Please enter a valid email address.';
                form.email.focus();
                return;
            }
            // emulate successful submission
            status.textContent = 'Thanks — your message has been received (demo).';
            form.reset();
        });
    }
});
