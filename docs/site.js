const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);menu.textContent=open?'Close menu':'Menu';});
document.querySelectorAll('.site-nav details').forEach(el=>el.addEventListener('toggle',()=>{if(el.open)document.querySelectorAll('.site-nav details').forEach(other=>{if(other!==el)other.open=false;});}));
const dialog=document.querySelector('#drawer'),body=dialog?.querySelector('.drawer-body'),title=dialog?.querySelector('h2');let opener;
function closeDrawer(){dialog.close();body.replaceChildren();document.body.classList.remove('no-scroll');opener?.focus();}
dialog?.querySelector('.close').addEventListener('click',closeDrawer);
dialog?.addEventListener('cancel',e=>{e.preventDefault();closeDrawer();});
dialog?.addEventListener('click',e=>{if(e.target===dialog&&e.clientX<dialog.getBoundingClientRect().left)closeDrawer();});
document.addEventListener('click',e=>{
 const photo=e.target.closest('[data-photo]'),book=e.target.closest('[data-booking]');
 if(!photo&&!book)return;
 e.preventDefault();opener=photo||book;body.replaceChildren();title.textContent=photo?'Photo viewer':(book.dataset.title||'Register with SoundSpace');
 if(photo){const wrap=document.createElement('div');wrap.className='drawer-photo';const im=document.createElement('img');im.src=photo.dataset.photo;im.alt=photo.querySelector('img')?.alt||'SoundSpace photograph';wrap.append(im);body.append(wrap);}
 else {const p=document.createElement('p');p.className='drawer-note';const link=document.createElement('a');link.href=book.href;link.target='_blank';link.rel='noopener';link.textContent='Open registration in a new tab';p.append(link);const frame=document.createElement('iframe');frame.title=title.textContent;frame.src=book.href;frame.allow='payment';body.append(p,frame);}
 document.body.classList.add('no-scroll');dialog.showModal();
});
document.querySelectorAll('[data-load-provider]').forEach(button=>button.addEventListener('click',()=>{
 const panel=button.closest('.provider'),slot=panel.querySelector('.provider-slot');const frame=document.createElement('iframe');frame.title=button.dataset.title;frame.className='provider-frame';frame.allow='payment';frame.src=button.dataset.loadProvider;slot.replaceChildren(frame);button.textContent='Calendar loaded';button.disabled=true;panel.querySelector('.loading').textContent='If the calendar does not appear, use the direct link above.';
}));
document.querySelectorAll('[data-expand-provider]').forEach(button=>button.addEventListener('click',()=>{const panel=button.closest('.provider');panel.classList.toggle('expanded');if(panel.classList.contains('expanded')){panel.style.gridColumn='1 / -1';button.textContent='Restore width';}else{panel.style.gridColumn='';button.textContent='Expand calendar';}}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.site-nav details').forEach(d=>d.open=false);}});

document.querySelectorAll('[data-load-video]').forEach(button=>button.addEventListener('click',()=>{const frame=document.createElement('iframe');frame.src=button.dataset.loadVideo;frame.title=button.dataset.title;frame.className='video-frame';frame.allow='fullscreen; picture-in-picture';frame.setAttribute('allowfullscreen','');button.closest('.video-panel').querySelector('.video-slot').replaceChildren(frame);button.textContent='Video loaded';button.disabled=true;}));
