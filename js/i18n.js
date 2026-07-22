
const translations={
 en:{nav_home:'Home',nav_team:'Team',nav_drivers:'Drivers',nav_cars:'Cars',nav_schedule:'Schedule',nav_news:'News',nav_media:'Media',nav_live:'Live',nav_sponsors:'Sponsors',nav_contact:'Contact',footer_tag:'Driven by Passion. Built on Purpose.'},
 es:{nav_home:'Inicio',nav_team:'Equipo',nav_drivers:'Pilotos',nav_cars:'Autos',nav_schedule:'Calendario',nav_news:'Noticias',nav_media:'Media',nav_live:'En Vivo',nav_sponsors:'Auspiciadores',nav_contact:'Contacto',footer_tag:'Impulsados por la pasión. Construidos con propósito.'}
};
function setLanguage(lang){localStorage.setItem('vgrLang',lang);document.documentElement.lang=lang;document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(translations[lang]?.[k])el.textContent=translations[lang][k]});document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));document.querySelectorAll('[data-lang]').forEach(el=>{if(el.classList.contains('lang-btn'))return;el.hidden=el.dataset.lang!==lang});}
document.addEventListener('DOMContentLoaded',()=>setLanguage(localStorage.getItem('vgrLang')||'en'));
