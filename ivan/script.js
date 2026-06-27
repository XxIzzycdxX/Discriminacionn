// ============================================
// SCRIPT PARA PÁGINA DE CLASISMO (V1 y V2)
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. MANEJO DEL FORMULARIO DE CONTACTO
    // ==========================================
    
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            status.textContent = '⏳ Enviando mensaje...';
            status.className = 'form-status-v2';
            status.style.color = '#d4a853';
            
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Enviando...</span> <i class="fas fa-spinner fa-spin"></i>';
            
            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    status.textContent = '✅ ¡Mensaje enviado con éxito! Te responderemos pronto.';
                    status.className = 'form-status-v2 success';
                    status.style.color = '#2e7d32';
                    form.reset();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Error al enviar');
                    });
                }
            })
            .catch(error => {
                status.textContent = '❌ Hubo un error al enviar. Intenta de nuevo.';
                status.className = 'form-status-v2 error';
                status.style.color = '#c62828';
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Enviar mensaje</span> <i class="fas fa-paper-plane"></i>';
            });
        });
    }

    // ==========================================
    // 2. SCROLL SUAVE PARA ENLACES DE NAVEGACIÓN
    // ==========================================
    
    const navLinks = document.querySelectorAll('.nav-links-clasismo a, .nav-cta-clasismo, .nav-links-v2 a, .nav-cta-v2');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==========================================
    // 3. ANIMACIÓN DE ESTADÍSTICAS (CONTADORES)
    // ==========================================
    
    const statNumbers = document.querySelectorAll('.stat-number-clasismo, .stat-number-v2');
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            if (/\d/.test(text)) {
                const numMatch = text.match(/(\d+\.?\d*)([KkMm%]?)/);
                if (numMatch) {
                    let baseNumber = parseFloat(numMatch[1]);
                    const suffix = numMatch[2] || '';
                    let targetNumber = baseNumber;
                    
                    if (suffix.toLowerCase() === 'k') {
                        targetNumber = baseNumber * 1000;
                    } else if (suffix.toLowerCase() === 'm') {
                        targetNumber = baseNumber * 1000000;
                    } else if (suffix === '%') {
                        targetNumber = baseNumber;
                    }
                    
                    let current = 0;
                    const increment = Math.ceil(targetNumber / 30);
                    const duration = 1500;
                    const steps = 30;
                    const stepTime = duration / steps;
                    
                    let interval = setInterval(() => {
                        current += increment;
                        if (current >= targetNumber) {
                            current = targetNumber;
                            clearInterval(interval);
                        }
                        
                        let displayNum = current;
                        let displaySuffix = '';
                        
                        if (current >= 1000000) {
                            displayNum = (current / 1000000).toFixed(1);
                            displaySuffix = 'M';
                        } else if (current >= 1000) {
                            displayNum = (current / 1000).toFixed(1);
                            displaySuffix = 'K';
                        }
                        
                        if (Number.isInteger(displayNum) || displayNum % 1 === 0) {
                            displayNum = Math.floor(displayNum);
                        }
                        
                        if (typeof displayNum === 'number' && Number.isInteger(displayNum)) {
                            displayNum = displayNum.toString();
                        }
                        
                        if (targetNumber < 1000) {
                            stat.textContent = Math.floor(current);
                        } else {
                            stat.textContent = displayNum + displaySuffix;
                        }
                        
                        if (suffix === '%' && current >= targetNumber) {
                            stat.textContent = Math.floor(current) + '%';
                        }
                    }, stepTime);
                }
            }
        });
    }

    // ==========================================
    // 4. OBSERVADOR DE INTERSECCIÓN PARA ESTADÍSTICAS
    // ==========================================
    
    const statsSection = document.querySelector('#datos');
    let statsAnimated = false;
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    setTimeout(animateCounters, 500);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(statsSection);
    }

    // ==========================================
    // 5. EFECTO DE PARALLAX EN EL HERO
    // ==========================================
    
    const hero = document.querySelector('.hero-clasismo, .hero-v2');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < 500) {
                hero.style.backgroundPositionY = scrollPosition * 0.3 + 'px';
            }
        });
    }

    // ==========================================
    // 6. VALIDACIÓN DE ENLACES EXTERNOS
    // ==========================================
    
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        if (!link.getAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ==========================================
    // 7. MOSTRAR AÑO ACTUAL EN EL FOOTER
    // ==========================================
    
    const footerYear = document.querySelector('.footer-bottom-clasismo p, .footer-bottom-v2 p');
    if (footerYear) {
        const year = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2026', year);
    }

    // ==========================================
    // 8. MENSAJE EN CONSOLA
    // ==========================================
    
    console.log('%c⚖️ Clasismo - La Discriminación Invisible', 'font-size: 20px; font-weight: bold; color: #d4a853;');
    console.log('%cSitio educativo sin fines de lucro.', 'font-size: 14px; color: #4a4a5a;');
    console.log('%cLa clase social no determina tu valor. Infórmate y actúa.', 'font-size: 14px; color: #d4a853;');

    // ==========================================
    // 9. COMPORTAMIENTO DEL TELÉFONO
    // ==========================================
    
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true;
            } else {
                e.preventDefault();
                alert('📞 En dispositivos móviles, este enlace te permitirá llamar al número de emergencia.');
            }
        });
    });

    console.log('✅ Todos los scripts cargados correctamente.');
});