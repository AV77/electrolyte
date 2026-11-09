/* VideoHub — all browsing and presentation controls, no framework/build/network required. */
(() => {
  'use strict';
  const all = Array.isArray(window.SEMINAR_VIDEOS) ? window.SEMINAR_VIDEOS : [];
  const $ = id => document.getElementById(id);
  const icon = (name) => `<svg aria-hidden="true"><use href="#ico-${name}"/></svg>`;
  const esc = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
  // Copy your own non-explicit MP4 to this location; all topics share it.
  const INTRO_VIDEO_PATH = 'assets/intro.mp4';
  const INTRO_ON_RESTART = true;
  let introSerial = 0;
  let introUnavailable = false;
  const topicGroups = ['Electrolytes', 'Membrane Potentials', 'Transport & Pumps', 'Muscle'];
  const groupColors = { 'Electrolytes':'#a56126','Membrane Potentials':'#367684','Transport & Pumps':'#4f7f61','Muscle':'#985670' };
  const viewNames = {
    home:'Popular Videos',videos:'All Videos',featured:'Featured Videos',trending:'Trending Videos',
    newest:'Newest Videos',shorts:'Quick Lessons',recommended:'Recommended for You',
    channels:'Channels',playlists:'Playlists',categories:'Browse Categories',creators:'Seminar Creators',
    history:'Watch History',later:'Watch Later',liked:'Liked Videos',seminar:'Electrolytes Seminar'
  };
  const state = { view:'home', filter:'All', query:'', sort:'popular', layout:'grid', current:null, previousView:'home', intro:false };
  const byId = Object.fromEntries(all.map((item, i) => [item.id, {...item, order:i, popularity:item.popularity ?? (all.length-i)}]));
  const entries = all.map(item => byId[item.id]);

  function storageGet(key, fallback=[]) {
    try { const val=JSON.parse(localStorage.getItem(`videohub-${key}`)); return Array.isArray(val) ? val : fallback; } catch { return fallback; }
  }
  function storageSave(key, data) { try {localStorage.setItem(`videohub-${key}`,JSON.stringify(data));} catch {} }
  let liked = storageGet('liked'), later=storageGet('later'), watched=storageGet('history');
  let toastTimer;
  const isMobile = () => window.matchMedia('(max-width:740px)').matches;
  function toast(message) {
    const node=$('toast'); node.textContent=message;node.classList.add('is-visible');
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.classList.remove('is-visible'),2500);
  }
  function setTitle(title) { document.title = `${title} — VideoHub`; }
  function linkFor(id) {
    const url=new URL(location.href); url.searchParams.set('watch',id);url.searchParams.delete('view');url.searchParams.delete('intro');return url.toString();
  }
  function pushUrl(state, url) {
    // Some browsers restrict history state changes when a site is opened via file://.
    // In that case we still navigate within the already-open gallery.
    try { window.history.pushState(state, '', url); } catch {}
  }
  function viewUrl(view) {
    const url=new URL(location.href);url.searchParams.delete('watch');url.searchParams.delete('intro');
    if(view==='home') url.searchParams.delete('view'); else url.searchParams.set('view',view);
    return url.toString();
  }
  function renderImage(video, loading='lazy') {
    const main=esc(video.thumbnail || `thumbnails/${video.id}.webp`);
    const backup=esc(video.thumbnailFallback || `thumbnails/fallback/${video.id}.svg`);
    return `<img class="cover-image" src="${main}" data-fallback="${backup}" alt="" loading="${loading}">`;
  }
  function activateImageFallback(container) {
    container.querySelectorAll('.cover-image').forEach(img=>{
      img.addEventListener('error',()=>{
        if(img.dataset.fallback && !img.dataset.triedFallback){img.dataset.triedFallback='yes';img.src=img.dataset.fallback;}
        else {img.remove();}
      });
      if(img.complete && img.naturalWidth===0){
        if(img.dataset.fallback){img.dataset.triedFallback='yes';img.src=img.dataset.fallback;}
      }
    });
  }
  function card(video) {
    return `<article class="video-card" data-id="${esc(video.id)}">
      <a class="video-card__link" href="${esc(linkFor(video.id))}" data-watch="${esc(video.id)}" aria-label="Open ${esc(video.title)}">
        <div class="video-card__thumb" style="--tile-color:${esc(video.accent||'#58727b')}" data-fallback="${esc(video.symbol||'AP')}">
          ${renderImage(video)}<span class="video-card__play" aria-hidden="true">▶</span>
          <span class="thumb-badges"><span class="thumb-quality">HD</span><span class="thumb-duration">${String(video.slides || 3).padStart(2,'0')} slides</span></span>
        </div>
        <div class="video-card__details"><div class="avatar" aria-hidden="true">AV</div>
          <div class="video-card__text"><h2 class="video-card__title" title="${esc(video.title)}">${esc(video.title)}</h2><div class="video-card__author">Anmol.V</div>
          <div class="video-card__stats">${esc(video.views||'1.2K')} views · ${video.postedDays ? `${video.postedDays} days ago` : 'Featured topic'}</div></div>
        </div></a>
      <button class="video-card__menu" data-save="${esc(video.id)}" type="button" aria-label="Add ${esc(video.short||video.title)} to Watch later" title="Add to Watch later"></button>
    </article>`;
  }
  function videoMatchesFilter(video, filter) {
    if(filter==='All')return true;
    if(topicGroups.includes(filter))return video.category===filter;
    const query = filter.toLowerCase();
    const haystack = [video.id,video.title,video.short,...(video.tags||[])].join(' ').toLowerCase();
    if(filter==='Na+')return video.id==='sodium' || video.id==='sodium-potassium-pump';
    if(filter==='K+')return video.id==='potassium' || video.id==='sodium-potassium-pump';
    if(filter==='Ca2+')return video.id==='calcium' || video.id==='muscle-contraction';
    if(filter==='Cl-')return video.id==='chloride';
    return haystack.includes(query);
  }
  function getVideos() {
    let items=entries.slice();
    if(state.view==='featured')items=items.filter(v=>v.featured!==false).slice(0,8);
    if(state.view==='shorts')items=items.filter(v=>v.duration && Number(v.duration.split(':')[0])<4);
    if(state.view==='liked')items=liked.map(id=>byId[id]).filter(Boolean);
    if(state.view==='later')items=later.map(id=>byId[id]).filter(Boolean);
    if(state.view==='history')items=watched.map(id=>byId[id]).filter(Boolean);
    if(state.filter!=='All')items=items.filter(v=>videoMatchesFilter(v,state.filter));
    if(state.query.trim()) {
      const query=state.query.trim().toLowerCase();
      items=items.filter(v=>[v.id,v.title,v.short,v.category,v.description,...(v.tags||[])].join(' ').toLowerCase().includes(query));
    }
    if(state.view==='trending')items.sort((a,b)=> (b.viewsValue||b.popularity)-(a.viewsValue||a.popularity));
    else if(state.view==='newest')items.sort((a,b)=> (a.postedDays??100)-(b.postedDays??100));
    else if(state.view==='history'||state.view==='later'||state.view==='liked') { /* User-selected order first. */ }
    else if(state.sort==='newest')items.sort((a,b)=>(a.postedDays??100)-(b.postedDays??100));
    else if(state.sort==='az')items.sort((a,b)=>a.title.localeCompare(b.title));
    else if(state.sort==='popular')items.sort((a,b)=>b.popularity-a.popularity);
    else items.sort((a,b)=>a.order-b.order);
    return items;
  }
  function collections() {
    if(!['categories','channels','playlists'].includes(state.view))return '';
    const names=state.view==='playlists'
      ? [{name:'Membrane Potentials',label:'01',hint:'Start with the voltage'},{name:'Electrolytes',label:'Na⁺',hint:'Meet the ions'},{name:'Transport & Pumps',label:'ATP',hint:'Keeping the gradients'},{name:'Muscle',label:'Ca²⁺',hint:'From impulse to movement'}]
      : topicGroups.map((name,i)=>({name,label:['Na⁺','AP','ATP','Ca²⁺'][i],hint:state.view==='channels'?'Anmol.V series':'Explore videos'}));
    return names.map(group=>`<button type="button" class="collection" data-collection="${esc(group.name)}"><span class="collection__art" style="--cover-color:${esc(groupColors[group.name])}">${esc(group.label)}</span><span class="collection__body"><span class="collection__name">${esc(group.name)}</span><span class="collection__count">${entries.filter(v=>v.category===group.name).length} presentations · ${esc(group.hint)}</span></span></button>`).join('');
  }
  function renderGrid() {
    const items=getVideos();
    const heading=state.query.trim()?`Results for “${state.query.trim()}”`:(viewNames[state.view]||'Popular Videos');
    $('gridTitle').innerHTML=`${esc(heading)} <span class="orange-diamond" aria-hidden="true"></span>`;
    $('videoCount').textContent=`${items.length} ${items.length===1?'video':'videos'}`;
    $('gridSubheading').textContent=state.view==='history'?'Recently watched':state.view==='liked'?'Your favorites':state.view==='later'?'Saved for later':state.view==='newest'?'Just uploaded':state.view==='trending'?'Most watched':state.view==='shorts'?'Short decks':'Featured videos';
    $('videoGrid').innerHTML=items.map(card).join('');
    $('videoGrid').classList.toggle('is-list',state.layout==='list');
    activateImageFallback($('videoGrid'));
    const showCollections = ['categories','channels','playlists'].includes(state.view) && !state.query;
    $('collections').hidden=!showCollections;
    if(showCollections)$('collections').innerHTML=collections();
    $('emptyState').hidden=items.length>0 || showCollections;
    $('emptyDetail').textContent=(state.view==='liked'||state.view==='later'||state.view==='history')
      ? 'Open a presentation, or save one using the controls beneath the player.'
      : 'Try another search or switch to All.';
    document.querySelectorAll('[data-filter]').forEach(el=>el.classList.toggle('is-active',el.dataset.filter===state.filter));
    document.querySelectorAll('[data-view]').forEach(el=>el.classList.toggle('is-active',el.dataset.view===state.view));
    $('sortSelect').value=state.sort;
    setTitle(heading);
  }
  function closeSidebarOnMobile() { if(isMobile()) { $('layout').classList.remove('sidebar-open');$('sidebarToggle').setAttribute('aria-expanded','false'); } }
  function showHome({scroll=true}={}) {
    cancelIntro();
    state.current=null;$('homeView').hidden=false;$('watchView').hidden=true;$('deckFrame').removeAttribute('src');$('playerIdle').classList.remove('is-loaded');
    renderGrid();closeSidebarOnMobile();if(scroll)window.scrollTo({top:0,behavior:'instant'});
  }
  function setView(view,{navigate=true}={}) {
    state.view=Object.hasOwn(viewNames,view)?view:'home';state.filter='All';state.query='';$('searchInput').value='';
    if(navigate)pushUrl({view:state.view},viewUrl(state.view));
    showHome();
  }
  function setFilter(filter) {
    if(state.current) {state.view='home';pushUrl({},viewUrl('home'));}
    state.filter=filter;showHome({scroll:false});
  }
  function renderRelated(video) {
    const related=entries.filter(v=>v.id!==video.id).sort((a,b)=>Number(b.category===video.category)-Number(a.category===video.category)).slice(0,10);
    $('relatedGrid').innerHTML=related.map(v=>`<a class="related" href="${esc(linkFor(v.id))}" data-watch="${esc(v.id)}"><div class="related__thumb" style="background:${esc(v.accent||'#444')}">${renderImage(v)}<small>${String(v.slides||3).padStart(2,'0')} slides</small></div><div><div class="related__title">${esc(v.title)}</div><div class="related__meta">Anmol.V</div><div class="related__meta">${esc(v.views)} views</div></div></a>`).join('');
    activateImageFallback($('relatedGrid'));
  }
  function updateSaveButtons() {
    if(!state.current)return;
    const id=state.current.id;
    $('likeBtn').classList.toggle('is-on',liked.includes(id));$('likeBtn').setAttribute('aria-pressed',liked.includes(id));
    $('watchLaterBtn').classList.toggle('is-on',later.includes(id));$('watchLaterBtn').setAttribute('aria-pressed',later.includes(id));
    $('likeBtn').querySelector('span').textContent=liked.includes(id)?'Liked':'Like';
    $('watchLaterBtn').querySelector('span').textContent=later.includes(id)?'Saved':'Watch later';
  }
  function cancelIntro() {
    ++introSerial;
    $('preDeckIntroVideo').pause();
    $('preDeckIntro').hidden=true;
    $('introPlayBtn').hidden=true;
  }
  function revealDeck(video) {
    cancelIntro();
    $('playerIdle').classList.remove('is-loaded');
    const iframe=$('deckFrame');
    iframe.hidden=false;
    iframe.src=video.deck;
  }
  function startDeck(video,{withIntro=true}={}) {
    cancelIntro();
    $('deckFrame').removeAttribute('src');
    $('deckFrame').hidden=true;
    $('playerIdle').classList.add('is-loaded');
    if (!withIntro || introUnavailable) { revealDeck(video); return; }
    const clip=$('preDeckIntroVideo');
    const serial=introSerial;
    $('preDeckIntro').hidden=false;
    $('introPlayBtn').hidden=true;
    // Deliberately set the source only when the clip is needed. A missing file
    // triggers the error handler and gracefully opens the slides instead.
    clip.src=INTRO_VIDEO_PATH;
    clip.load();
    playIntro(serial);
  }
  function playIntro(serial=introSerial) {
    const clip=$('preDeckIntroVideo');
    if (serial!==introSerial || $('preDeckIntro').hidden) return;
    const play=clip.play();
    if (play && typeof play.catch==='function') play.catch(error=>{
      if (serial!==introSerial || $('preDeckIntro').hidden) return;
      if(error?.name==='NotAllowedError') {
        // Deep links may lack a user gesture, so show a manual Play button.
        $('introPlayBtn').hidden=false;
      } else {
        introUnavailable=true;
        if(state.current)revealDeck(state.current);
      }
    });
  }
  function finishIntro() {
    if($('preDeckIntro').hidden || !state.current)return;
    revealDeck(state.current);
  }
  function loadVideo(video,{scroll=true}={}) {
    state.current=video;
    $('homeView').hidden=true;$('watchView').hidden=false;
    $('watchCrumb').textContent=`/ ${video.category}`;
    $('watchTitle').textContent=video.title;
    $('watchViews').textContent=`${video.views||'1K'} views`;
    $('watchDate').textContent='Anmol.V';
    $('watchSlides').textContent=`${video.slides||3} slides`;
    $('watchDescription').textContent=video.description||'A short physiology presentation.';
    $('watchTags').innerHTML=(video.tags||[]).map(tag=>`<span>#${esc(tag)}</span>`).join('');
    $('fullscreenDeckTitle').textContent=video.short||video.title;
    startDeck(video);
    renderRelated(video);updateSaveButtons();closeSidebarOnMobile();
    setTitle(video.title);
    watched=[video.id,...watched.filter(id=>id!==video.id)].slice(0,100);storageSave('history',watched);
    if(scroll)window.scrollTo({top:0,behavior:'instant'});
  }
  function goVideo(id,{navigate=true}={}) {
    const video=byId[id];if(!video)return;
    if(!state.current)state.previousView=state.view;
    if(navigate)pushUrl({watch:id},linkFor(id));
    loadVideo(video);
  }
  function returnToGrid(){setView(state.previousView||'home');}
  function changeSaved(kind,id){
    const target=kind==='liked'?liked:later;
    const was=target.includes(id);const next=was?target.filter(v=>v!==id):[id,...target];
    if(kind==='liked'){liked=next;storageSave('liked',liked);}else{later=next;storageSave('later',later);}
    if(state.current)updateSaveButtons();
    if(state.view==='liked'||state.view==='later')renderGrid();
    toast(kind==='liked' ? (was?'Removed from liked videos':'Added to liked videos') : (was?'Removed from Watch later':'Added to Watch later'));
  }
  function restart(){ if(state.current)startDeck(state.current,{withIntro:INTRO_ON_RESTART}); }
  function openModal(title,body){$('modalTitle').textContent=title;$('modalBody').innerHTML=body;$('modalBackdrop').hidden=false;$('modalDone').focus();}
  function closeModal(){$('modalBackdrop').hidden=true;}
  function runAction(action){
    if(action==='upload')openModal('Add your own presentations','<p>This is a static site, so Upload doesn’t send files anywhere. Add your Reveal.js deck to <code>decks/your-topic/</code>, put its thumbnail in <code>thumbnails/</code>, then add an entry in <code>data/videos.js</code>.</p><p>Changes appear when you refresh the page. See <code>README.md</code> for a full example.</p>');
    if(action==='join'||action==='login')openModal('No account needed','<p>VideoHub is a self-contained classroom presentation parody. There are no accounts, uploads, ads or online tracking.</p><p>Liked videos, Watch later and History are saved in your browser only.</p>');
    if(action==='about')openModal('About VideoHub','<p>Looks like a streaming site. Actually an electrolyte physiology seminar.</p><p>Every video tile launches an individual local HTML slide deck, including Reveal.js presentations. Your own slides and images stay on your computer.</p>');
    if(action==='help')openModal('Presenter controls','<p><strong>Watch a topic:</strong> click its thumbnail. <strong>Present:</strong> use the Fullscreen button below the slides. Navigate with left and right arrows once the slides have focus.</p><p><strong>Shortcuts:</strong> <code>/</code> search, <code>Esc</code> back to gallery (outside fullscreen), <code>I</code> replay opening screen. Use the browser Back button to return to previous pages.</p>');
  }
  function showIntro(){state.intro=true;$('intro').hidden=false;$('site').inert=true;document.body.style.overflow='hidden';$('enterBtn').focus();}
  function hideIntro(){state.intro=false;$('intro').hidden=true;$('site').inert=false;document.body.style.overflow='';try{sessionStorage.setItem('videohub-entered','yes');}catch{}$('main').focus({preventScroll:true});}
  function route(){const params=new URL(location.href).searchParams;const selected=byId[params.get('watch')];if(selected)loadVideo(selected,{scroll:false});else{state.view=params.get('view') in viewNames?params.get('view'):'home';state.filter='All';state.query='';$('searchInput').value='';showHome({scroll:false});}}

  document.addEventListener('click',event=>{
    const watch=event.target.closest('[data-watch]');
    if(watch && event.button===0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey){event.preventDefault();goVideo(watch.dataset.watch);return;}
    const view=event.target.closest('[data-view]');if(view){setView(view.dataset.view);return;}
    const filter=event.target.closest('[data-filter]');if(filter){setFilter(filter.dataset.filter);return;}
    const collection=event.target.closest('[data-collection]');if(collection){state.view='videos';state.filter=collection.dataset.collection;pushUrl({},viewUrl('videos'));showHome();return;}
    const saved=event.target.closest('[data-save]');if(saved){changeSaved('later',saved.dataset.save);return;}
    const action=event.target.closest('[data-action]');if(action){runAction(action.dataset.action);return;}
    if(isMobile() && $('layout').classList.contains('sidebar-open') && !event.target.closest('#sidebar') && !event.target.closest('#sidebarToggle'))closeSidebarOnMobile();
  });
  $('brandLink').addEventListener('click',e=>{e.preventDefault();setView('home');});
  $('searchForm').addEventListener('submit',e=>{e.preventDefault();$('searchInput').blur();});
  $('searchInput').addEventListener('input',e=>{state.query=e.target.value;if(state.view!=='videos' && state.view!=='home'){state.view='videos';state.filter='All';}if(state.current){state.view='videos';state.filter='All';pushUrl({},viewUrl('videos'));}showHome({scroll:false});});
  $('sortSelect').addEventListener('change',e=>{state.sort=e.target.value;renderGrid();});
  $('gridBtn').addEventListener('click',()=>{state.layout='grid';$('gridBtn').classList.add('is-active');$('listBtn').classList.remove('is-active');renderGrid();});
  $('listBtn').addEventListener('click',()=>{state.layout='list';$('listBtn').classList.add('is-active');$('gridBtn').classList.remove('is-active');renderGrid();});
  $('sidebarToggle').addEventListener('click',()=>{
    const layout=$('layout');
    if(isMobile()){const opened=layout.classList.toggle('sidebar-open');$('sidebarToggle').setAttribute('aria-expanded',opened);}
    else {const collapsed=layout.classList.toggle('sidebar-collapsed');$('sidebarToggle').setAttribute('aria-expanded',!collapsed);}
  });
  $('resetFiltersBtn').addEventListener('click',()=>{state.query='';$('searchInput').value='';state.filter='All';if(['history','liked','later'].includes(state.view))state.view='home';renderGrid();});
  $('backButton').addEventListener('click',returnToGrid);
  $('likeBtn').addEventListener('click',()=>state.current&&changeSaved('liked',state.current.id));
  $('watchLaterBtn').addEventListener('click',()=>state.current&&changeSaved('later',state.current.id));
  $('shareBtn').addEventListener('click',async()=>{
    if(!state.current)return;
    const url=linkFor(state.current.id);
    try{await navigator.clipboard.writeText(url);toast('Link copied to clipboard');}
    catch{openModal('Share this presentation',`<p>Copy this URL to open the same topic directly:</p><p style="overflow-wrap:anywhere;color:#ff9900">${esc(url)}</p>`);}
  });
  $('nextBtn').addEventListener('click',()=>{if(!state.current)return;const next=entries[(state.current.order+1)%entries.length];goVideo(next.id);});
  $('restartBtn').addEventListener('click',restart);
  $('introSkipBtn').addEventListener('click',finishIntro);
  $('introPlayBtn').addEventListener('click',()=>playIntro());
  $('preDeckIntroVideo').addEventListener('ended',finishIntro);
  $('preDeckIntroVideo').addEventListener('playing',()=>{$('introPlayBtn').hidden=true;});
  $('preDeckIntroVideo').addEventListener('error',()=>{
    if($('preDeckIntro').hidden)return;
    introUnavailable=true;
    finishIntro();
  });
  $('deckFrame').addEventListener('load',()=>{
    if(!$('deckFrame').hidden)$('playerIdle').classList.add('is-loaded');
  });
  $('fullscreenBtn').addEventListener('click',async()=>{
    const stage=$('fullscreenTarget');
    try { if(document.fullscreenElement)await document.exitFullscreen(); else if(stage.requestFullscreen)await stage.requestFullscreen(); else toast('Browser fullscreen not supported'); }
    catch{toast('Fullscreen blocked. Try F11 or your browser fullscreen key.');}
  });
  document.addEventListener('fullscreenchange',()=>{
    const button=$('fullscreenBtn'); const on=!!document.fullscreenElement;
    button.innerHTML=`${icon(on?'minimize':'fullscreen')}<span>${on?'Exit fullscreen':'Fullscreen'}</span>`;
  });
  $('enterBtn').addEventListener('click',hideIntro);
  $('notReadyBtn').addEventListener('click',()=>{$('introNote').textContent='That’s okay. Even neurons need a refractory period. Enter when you’re ready.';});
  $('modalClose').addEventListener('click',closeModal);
  $('modalDone').addEventListener('click',closeModal);
  $('modalBackdrop').addEventListener('click',e=>{if(e.target===$('modalBackdrop'))closeModal();});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape' && !$('modalBackdrop').hidden){closeModal();return;}
    if(state.intro){if(event.key==='Enter')hideIntro();return;}
    if(event.key.toLowerCase()==='s' && !$('preDeckIntro').hidden && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){
      event.preventDefault();finishIntro();return;
    }
    if(document.fullscreenElement)return;
    const typing=['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);
    if(event.key==='/' && !typing){event.preventDefault();if(state.current)setView('videos');$('searchInput').focus();}
    if(event.key.toLowerCase()==='i'&&!typing)showIntro();
    if(event.key==='Escape' && state.current && !typing)returnToGrid();
  });
  window.addEventListener('popstate',route);
  route();
  // A theatrical intro appears once per browser tab and can be replayed with I or ?intro=1.
  let entered=false;try{entered=sessionStorage.getItem('videohub-entered')==='yes';}catch{}
  if(!entered || new URL(location.href).searchParams.get('intro')==='1')showIntro();
})();
