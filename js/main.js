
document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.querySelector('.navbar'); window.addEventListener('scroll',()=>nav?.classList.toggle('scrolled',scrollY>50));
 document.querySelector('.menu-toggle')?.addEventListener('click',()=>document.querySelector('.nav-links')?.classList.toggle('open'));
 document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
 const active=document.body.dataset.page; document.querySelector(`[data-page-link="${active}"]`)?.classList.add('active');
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
 document.querySelectorAll('a[href$=".html"]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey)return;}));
 document.querySelectorAll('.gallery-item img').forEach(img=>img.addEventListener('click',()=>{const l=document.querySelector('.lightbox');if(l){l.querySelector('img').src=img.src;l.classList.add('open')}}));
 document.querySelector('.lightbox-close')?.addEventListener('click',()=>document.querySelector('.lightbox')?.classList.remove('open'));
 document.querySelector('.lightbox')?.addEventListener('click',e=>{if(e.target.classList.contains('lightbox'))e.currentTarget.classList.remove('open')});
 document.querySelectorAll('.media-tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.media-tab,.media-panel').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.getElementById(btn.dataset.target).classList.add('active')}));
 const embed=document.getElementById('live-frame'); if(embed&&window.VGR_CONFIG)embed.src=`https://www.youtube.com/embed/${VGR_CONFIG.youtubeVideoId}?rel=0`;
 const insta=document.getElementById('instagram-feed');if(insta&&VGR_CONFIG?.elfsightAppId!=='YOUR_ELFSIGHT_APP_ID'){insta.innerHTML=`<div class="elfsight-app-${VGR_CONFIG.elfsightAppId}" data-elfsight-app-lazy></div>`;const s=document.createElement('script');s.src='https://static.elfsight.com/platform/platform.js';s.async=true;document.body.appendChild(s)}
 startCountdown();
});
function startCountdown(){const box=document.getElementById('countdown');if(!box||!window.VGR_CONFIG)return;const target=new Date(VGR_CONFIG.nextRace.date);const tick=()=>{let d=Math.max(0,target-new Date());const vals=[Math.floor(d/864e5),Math.floor(d%864e5/36e5),Math.floor(d%36e5/6e4),Math.floor(d%6e4/1e3)];['days','hours','minutes','seconds'].forEach((k,i)=>{const el=document.getElementById(k);if(el)el.textContent=String(vals[i]).padStart(2,'0')})};tick();setInterval(tick,1000)}
