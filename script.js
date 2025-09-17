(function(){
    const $ = (s, r=document) => r.querySelector(s);

    // Burger nav (mobile)
    const burger = $('#burger');
    const navLinks = $('#navLinks');
    if(burger && navLinks){
    burger.addEventListener('click', ()=>{
        const isShown = navLinks.style.display === 'flex';
        navLinks.style.display = isShown ? 'none' : 'flex';
        if(!isShown){ navLinks.style.flexDirection = 'column'; navLinks.style.gap='12px'; }
    });
    window.addEventListener('resize', ()=> { if(window.innerWidth > 860) navLinks.style.display = ''; });
    }

    // Year
    const yearNode = document.getElementById('year');
    if(yearNode) yearNode.textContent = new Date().getFullYear();

    // Photo upload & local persistence
    const photoInput = $('#photoInput');
    const profilePhoto = $('#profilePhoto');
    const storageKey = 'mbj:profile:v3';

    function setAvatar(src){
    if(profilePhoto) profilePhoto.src = src;
    }

    (function initAvatar(){
    try{
        const saved = localStorage.getItem(storageKey);
        if(saved){ setAvatar(saved); return; }
    }catch(e){}
    // placeholder initials
    const size = 512;
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const g = ctx.createLinearGradient(0,0,size,size);
    g.addColorStop(0,'#ffffff'); g.addColorStop(1,'#eef6fb');
    ctx.fillStyle = g; ctx.fillRect(0,0,size,size);
    ctx.fillStyle = '#183152'; ctx.font = 'bold 180px sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('MB', size/2, size/2);
    setAvatar(canvas.toDataURL('image/png'));
    })();

    if(photoInput){
    photoInput.addEventListener('change', function(e){
        const file = e.target.files && e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = function(){ try{ localStorage.setItem(storageKey, this.result); }catch(e){} setAvatar(this.result); };
        reader.readAsDataURL(file);
    });
    }

    // Contact form: validation + mailto fallback
    const form = $('#contactForm');
    const status = $('#formStatus');
    if(form){
    form.addEventListener('submit', function(e){
        e.preventDefault();
        const name = $('#name').value.trim();
        const email = $('#email').value.trim();
        const subject = $('#subject').value.trim() || 'Contact portfolio';
        const message = $('#message').value.trim();
        const trap = $('#company').value.trim();
        if(trap) return; // honeypot bot
        if(!name || !email || !message){ status.textContent = 'Veuillez remplir tous les champs requis.'; return; }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ status.textContent = "Adresse e-mail invalide."; return; }
        const mailto = `mailto:mekebernardjunior932@gmail.com?subject=${encodeURIComponent(subject + ' — ' + name)}&body=${encodeURIComponent('Nom: ' + name + '\\nEmail: ' + email + '\\n\\n' + message)}`;
        window.location.href = mailto;
        status.textContent = "Ouverture de votre client e-mail...";
        form.reset();
    });
    }

    // Call button
    const callBtn = $('#callBtn');
    if(callBtn){
    callBtn.addEventListener('click', ()=> { window.location.href = 'tel:+237659183245'; });
    }

    // CV download buttons
    const cvSide = $('#cvDownloadSide');
    const cvHead = $('#downloadCv');
    const cvFile = 'CV_Meke_Bernard_2025_complet.pdf'; // place your CV next to index.html
    [cvSide, cvHead].forEach(btn=>{
    if(btn) btn.addEventListener('click', ()=> window.open(cvFile, '_blank'));
    });

    // Contact primary scroll
    const contactPrimary = $('#contactBtn');
    if(contactPrimary){
    contactPrimary.addEventListener('click', ()=> {
        const el = document.getElementById('contact');
        if(el) el.scrollIntoView({behavior:'smooth', block:'center'});
    });
    }

})();