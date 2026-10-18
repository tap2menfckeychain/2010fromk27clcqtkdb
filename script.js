/* ============ Thiệp 20/10 gửi Cô — tương tác (nội dung sửa ở data.js) ============ */
(() => {
  "use strict";

  const D = window.THIEP || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const R = (a, b) => a + Math.random() * (b - a);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tenCo = (D.tenCo || "").trim();
  const goi = tenCo ? `Cô ${tenCo}` : "Cô";
  const lop = (D.lop || "").trim();
  const tuAi = (D.nguoiGui || (lop ? `Tập thể lớp ${lop}` : "")).trim();
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };

  /* =====================================================================
     NỘI DUNG
     ===================================================================== */
  if (tenCo) document.title = `Gửi ${goi} · 20.10 💐`;
  $("#tagName").textContent = tenCo ? goi : "Cô của chúng em";
  $("#tagSub").textContent = lop ? `cố vấn học tập · lớp ${lop}` : "cố vấn học tập của chúng em";
  $("#mastLop").textContent = lop;
  $("#coverImg").src = D.anhBia || "anh/co-bia.jpg";
  $("#coverName").textContent = goi;
  $("#quoteText").textContent = D.trichDan || "";
  $("#quoteBy").textContent = lop ? `— Lớp ${lop}` : "";

  (D.phamChat || []).forEach((q, i) => {
    const li = el("li", "q-item rv");
    li.append(el("span", "q-num", String(i + 1).padStart(2, "0")), el("h3", "q-title", q.tieuDe), el("p", "q-text", q.noiDung));
    $("#qList").appendChild(li);
  });

  const POS = ["50% 38%", "36% 40%", "45% 50%"];
  (D.khoanhKhac || []).forEach((m, i) => {
    const art = el("article", "spread");
    const fig = el("figure", "sp-img");
    const frame = el("div", "sp-frame");
    const img = el("img");
    img.src = m.anh;
    img.alt = m.tieuDe || "";
    img.loading = "lazy";
    img.style.setProperty("--pos", m.viTri || POS[i % POS.length]);
    img.addEventListener("load", () => { if (img.naturalWidth > img.naturalHeight * 1.15) art.classList.add("wide"); });
    frame.appendChild(img);
    fig.append(el("span", "sp-shape"), frame, el("span", "sp-num", String(i + 1).padStart(2, "0")));
    const txt = el("div", "sp-text");
    txt.append(el("p", "eyebrow", m.nhan || ""), el("h3", "h3", m.tieuDe || ""), el("p", "sp-p", m.noiDung || ""));
    art.append(fig, txt);
    $("#moments").appendChild(art);
  });

  $("#salute").textContent = `Kính gửi ${goi},`;
  (D.loiThu || []).forEach((t, i) => {
    const p = el("p", "", t);
    p.style.transitionDelay = 0.25 + i * 0.35 + "s";
    $("#letterBody").appendChild(p);
  });
  $("#signName").textContent = tuAi;
  $("#endFrom").textContent = tuAi;

  /* =====================================================================
     CÁNH HOA RƠI
     ===================================================================== */
  const cv = $("#petals"), cx = cv.getContext("2d");
  const PETAL_COLORS = ["#f6b6c9", "#f3a1bb", "#fbd3df", "#eda0b9", "#fde4ec"];
  let W = 0, H = 0, petals = [], ambient = false, running = false, last = 0;

  function sizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function addPetal(p) {
    petals.push(Object.assign({
      x: R(0, W), y: -20, vx: R(-10, 10), vy: R(28, 60), g: 0,
      rot: R(0, 6.3), vr: R(-1.5, 1.5), flip: R(0, 6.3), vf: R(1.5, 3.5),
      s: R(6, 11), sway: R(14, 30), ph: R(0, 6.3), life: 0, max: 14,
      c: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]
    }, p));
    if (!running) { running = true; last = performance.now(); requestAnimationFrame(tick); }
  }
  function petalBurst(x, y, n = 40) {
    if (reduce) n = Math.min(n, 10);
    for (let i = 0; i < n; i++) {
      const a = R(-Math.PI * 0.95, -Math.PI * 0.05), sp = R(160, 480);
      addPetal({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 300, max: R(2.2, 3.4) });
    }
  }
  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (ambient && !reduce && petals.length < 22 && Math.random() < dt * 2.2) addPetal({});
    cx.clearRect(0, 0, W, H);
    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.life += dt;
      if (p.life > p.max || p.y > H + 30) { petals.splice(i, 1); continue; }
      if (p.g) {
        const drag = Math.pow(0.97, dt * 60);
        p.vx *= drag;
        p.vy = Math.min(p.vy * drag + p.g * dt, 130);
      }
      p.x += (p.vx + Math.sin(p.life * 1.6 + p.ph) * p.sway) * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      p.flip += p.vf * dt;
      const s = p.s;
      cx.save();
      cx.globalAlpha = Math.min(1, (p.max - p.life) * 1.5) * 0.9;
      cx.translate(p.x, p.y);
      cx.rotate(p.rot);
      cx.scale(1, Math.cos(p.flip));
      cx.fillStyle = p.c;
      cx.beginPath();
      cx.moveTo(0, -s);
      cx.bezierCurveTo(s * 0.95, -s * 0.45, s * 0.6, s * 0.85, 0, s);
      cx.bezierCurveTo(-s * 0.6, s * 0.85, -s * 0.95, -s * 0.45, 0, -s);
      cx.fill();
      cx.restore();
    }
    if (petals.length || ambient) requestAnimationFrame(tick);
    else { running = false; cx.clearRect(0, 0, W, H); }
  }
  function setAmbient(on) {
    // rời bìa / phần kết thì cánh hoa đang rơi tan dần, không che chữ khi đọc
    if (!on && ambient) petals.forEach((p) => { if (!p.g) p.max = Math.min(p.max, p.life + 1.2); });
    ambient = on;
    if (on && !running) { running = true; last = performance.now(); requestAnimationFrame(tick); }
  }

  /* =====================================================================
     NHẠC
     ===================================================================== */
  const bgm = $("#bgm"), musicBtn = $("#music");
  bgm.src = (D.nhac && D.nhac.file) || "nhac/khuc-cam-on.wav";
  musicBtn.title = (D.nhac && D.nhac.ten) || "Nhạc nền";
  let pausedByHide = false;
  const playMusic = () => { const p = bgm.play(); if (p && p.catch) p.catch(() => {}); };
  bgm.addEventListener("play", () => musicBtn.classList.remove("paused"));
  bgm.addEventListener("pause", () => musicBtn.classList.add("paused"));
  musicBtn.addEventListener("click", () => (bgm.paused ? playMusic() : bgm.pause()));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (!bgm.paused) { bgm.pause(); pausedByHide = true; }
    } else if (pausedByHide) { pausedByHide = false; playMusic(); }
  });

  /* =====================================================================
     MỞ HỘP QUÀ
     ===================================================================== */
  const gift = $("#gift");
  let opened = false;
  function openGift() {
    if (opened) return;
    opened = true;
    playMusic();
    gift.classList.add("open");
    document.body.classList.remove("locked");
    musicBtn.hidden = false;
    setTimeout(() => {
      $("#cover").classList.add("in");
      $$("#cover .rv").forEach((r, i) => setTimeout(() => r.classList.add("in"), 250 + i * 180));
      petalBurst(W / 2, H * 0.45, 46);
      setAmbient(true);
    }, 700);
    setTimeout(() => { gift.hidden = true; }, 1700);
  }
  $("#giftBow").addEventListener("click", openGift);
  gift.addEventListener("click", (e) => { if (e.target.closest(".gift-panel, .ribbon")) openGift(); });

  /* =====================================================================
     HIỆN DẦN KHI CUỘN, THANH TIẾN ĐỘ, ẢNH TRÔI NHẸ
     ===================================================================== */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting || !opened) continue;
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
  $$("main section").forEach((sec) => {
    if (sec.id === "cover") return;
    $$(".rv", sec).forEach((r, i) => { r.style.transitionDelay = Math.min(i, 6) * 0.08 + "s"; io.observe(r); });
  });
  $$(".spread").forEach((s) => io.observe(s));

  // cánh hoa rơi khi đang xem bìa hoặc phần kết
  const petalZones = new IntersectionObserver((entries) => {
    let any = false;
    for (const e of entries) if (e.isIntersecting) any = true;
    if (opened) setAmbient(any || isZoneVisible());
  }, { threshold: 0.25 });
  const zones = [$("#cover"), $("#end")];
  zones.forEach((z) => petalZones.observe(z));
  function isZoneVisible() {
    return zones.some((z) => { const r = z.getBoundingClientRect(); return r.bottom > H * 0.25 && r.top < H * 0.75; });
  }

  const progress = $("#progress");
  const frames = () => $$(".sp-frame img");
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
      if (reduce) return;
      for (const img of frames()) {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < -50 || r.top > innerHeight + 50) continue;
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        img.style.setProperty("--py", (Math.max(-1, Math.min(1, p)) * -28).toFixed(1) + "px");
      }
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* =====================================================================
     ALBUM: XẤP ẢNH VUỐT TỪNG TẤM
     ===================================================================== */
  const photos = Array.isArray(D.anhLop) ? D.anhLop : [];
  const deck = $("#deck");
  const ROT = [-3, 3.5, -5, 2.5, 5, -2];
  const cards = photos.map((p) => {
    const c = el("div", "card");
    const img = el("img");
    img.src = p.anh;
    img.alt = p.chuThich || "";
    img.draggable = false;
    c.appendChild(img);
    deck.appendChild(c);
    return c;
  });
  let order = cards.map((_, i) => i);
  let busy = false;

  function place(ci, pos) {
    const c = cards[ci];
    c.style.zIndex = String(cards.length - pos);
    c.style.opacity = pos > 3 ? "0" : "1";
    c.style.transform = pos === 0
      ? "none"
      : `translate(${pos * 6}px, ${pos * 8}px) rotate(${ROT[ci % ROT.length]}deg) scale(${1 - pos * 0.035})`;
  }
  function caption() {
    const top = photos[order[0]];
    if (!top) return;
    $("#deckCap").textContent = top.chuThich || "";
    $("#deckCount").textContent = `${order[0] + 1} / ${photos.length}`;
  }
  function layout() {
    order.forEach(place);
    caption();
  }
  function nextCard(dir = 1) {
    if (busy || cards.length < 2) return;
    busy = true;
    const ci = order[0], c = cards[ci];
    // tấm trên cùng bay ra, các tấm còn lại nhích lên
    c.style.zIndex = String(cards.length + 1);
    c.style.transform = `translate(${dir * 125}%, -24px) rotate(${dir * 18}deg)`;
    c.style.opacity = "0";
    order.push(order.shift());
    order.forEach((k, pos) => { if (k !== ci) place(k, pos); });
    caption();
    setTimeout(() => {
      // đặt lại tấm vừa bay xuống đáy xấp
      c.style.transition = "none";
      place(ci, order.length - 1);
      c.style.opacity = "0";
      void c.offsetWidth;
      c.style.transition = "";
      c.style.opacity = order.length - 1 > 3 ? "0" : "1";
      busy = false;
    }, 420);
  }
  function prevCard() {
    if (busy || cards.length < 2) return;
    busy = true;
    order.unshift(order.pop());
    const c = cards[order[0]];
    c.style.transition = "none";
    c.style.zIndex = String(cards.length + 1);
    c.style.transform = "translate(-125%, -24px) rotate(-18deg)";
    c.style.opacity = "0";
    void c.offsetWidth;
    c.style.transition = "";
    layout();
    setTimeout(() => { busy = false; }, 420);
  }

  let drag = null;
  deck.addEventListener("pointerdown", (e) => {
    if (busy || !cards.length) return;
    drag = { x: e.clientX, y: e.clientY, dx: 0, moved: false, id: e.pointerId };
    cards[order[0]].style.transition = "none";
  });
  deck.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    drag.dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (!drag.moved && Math.abs(drag.dx) > 8 && Math.abs(drag.dx) > Math.abs(dy)) {
      drag.moved = true;
      try { deck.setPointerCapture(e.pointerId); } catch (err) { /* bỏ qua */ }
    }
    if (drag.moved) cards[order[0]].style.transform = `translate(${drag.dx}px, ${dy * 0.15}px) rotate(${drag.dx * 0.05}deg)`;
  });
  function endDrag(e, cancelled) {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    const c = cards[order[0]];
    c.style.transition = "";
    const { dx, moved } = drag;
    drag = null;
    if (moved && Math.abs(dx) > 70) nextCard(dx > 0 ? 1 : -1);
    else if (!moved && !cancelled) nextCard(1);
    else layout();
  }
  deck.addEventListener("pointerup", (e) => endDrag(e, false));
  deck.addEventListener("pointercancel", (e) => endDrag(e, true));
  deck.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") { e.preventDefault(); nextCard(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prevCard(); }
  });
  $("#deckNext").addEventListener("click", () => nextCard(1));
  $("#deckPrev").addEventListener("click", prevCard);
  layout();

  // xem ảnh lớn
  const lb = $("#lightbox");
  function openLB(src, cap) {
    $("#lbImg").src = src;
    $("#lbCap").textContent = cap || "";
    lb.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add("open")));
  }
  function closeLB() {
    lb.classList.remove("open");
    setTimeout(() => { if (!lb.classList.contains("open")) lb.hidden = true; }, 320);
  }
  $("#deckZoom").addEventListener("click", () => { const p = photos[order[0]]; if (p) openLB(p.anh, p.chuThich); });
  $("#lbClose").addEventListener("click", closeLB);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLB(); });
  $$(".sp-frame img").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLB(img.src, img.alt));
  });

  /* =====================================================================
     BÓ HOA LỜI CHÚC
     ===================================================================== */
  const wishes = Array.isArray(D.loiChuc) ? D.loiChuc : [];
  const SPOTS = [
    { t: "rose", x: 150, y: 104, s: 30, z: 5 },
    { t: "tulip", x: 102, y: 128, s: 1.1, z: 3 },
    { t: "daisy", x: 199, y: 126, s: 21, z: 3 },
    { t: "rose", x: 113, y: 74, s: 21, z: 1 },
    { t: "tulip", x: 188, y: 72, s: 1, z: 1 },
    { t: "daisy", x: 150, y: 164, s: 17, z: 6 },
    { t: "daisy", x: 76, y: 98, s: 15, z: 0 },
    { t: "rose", x: 224, y: 96, s: 17, z: 0 }
  ];
  const f1 = (v) => (+v).toFixed(1);
  function rose(Rr) {
    let s = "";
    for (let k = 0; k < 5; k++) s += `<ellipse cx="0" cy="${f1(-Rr * 0.58)}" rx="${f1(Rr * 0.5)}" ry="${f1(Rr * 0.46)}" transform="rotate(${k * 72 + 18})" fill="url(#gRose2)"/>`;
    s += `<circle r="${f1(Rr * 0.72)}" fill="url(#gRose)"/>`;
    s += `<path d="M${f1(-Rr * 0.46)} ${f1(Rr * 0.12)}A${f1(Rr * 0.46)} ${f1(Rr * 0.46)} 0 1 1 ${f1(Rr * 0.34)} ${f1(Rr * 0.32)}" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/>`;
    s += `<path d="M${f1(-Rr * 0.24)} ${f1(-Rr * 0.02)}A${f1(Rr * 0.26)} ${f1(Rr * 0.26)} 0 1 1 ${f1(Rr * 0.16)} ${f1(Rr * 0.2)}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.4" stroke-linecap="round"/>`;
    s += `<circle r="${f1(Rr * 0.1)}" fill="#b9507a" fill-opacity=".45"/>`;
    return s;
  }
  function tulip(k) {
    return `<g transform="scale(${k})">` +
      `<path d="M-13-4C-15 13-7 21 0 21 7 21 15 13 13-4 9 1 5-11 0-15-5-11-9 1-13-4Z" fill="url(#gTulip)"/>` +
      `<path d="M-6-2C-5 10-2 18 0 21 2 18 5 10 6-2 3 2 1-6 0-9-1-6-3 2-6-2Z" fill="#f7a6c0" fill-opacity=".9"/>` +
      `<path d="M-9 0C-10 9-6 15-2 18" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.4" stroke-linecap="round"/>` +
      `</g>`;
  }
  function daisy(r) {
    let s = "";
    for (let k = 0; k < 10; k++) s += `<ellipse cx="0" cy="${f1(-r * 0.6)}" rx="${f1(r * 0.22)}" ry="${f1(r * 0.48)}" transform="rotate(${k * 36})" fill="url(#gDaisy)"/>`;
    s += `<circle r="${f1(r * 0.3)}" fill="#e7b467"/><circle cx="${f1(-r * 0.08)}" cy="${f1(-r * 0.09)}" r="${f1(r * 0.1)}" fill="#fff" fill-opacity=".5"/>`;
    return s;
  }
  function babyBreath(x, y) {
    let s = "";
    for (let k = 0; k < 7; k++) s += `<circle cx="${f1(x + R(-11, 11))}" cy="${f1(y + R(-9, 9))}" r="${f1(R(1.6, 3))}" fill="#fff" fill-opacity=".95"/>`;
    return s;
  }
  function leaf(x, y, a, len = 26) {
    return `<ellipse cx="${x}" cy="${y}" rx="${f1(len * 0.34)}" ry="${len}" transform="rotate(${a} ${x} ${y})" fill="url(#gLeaf)"/>`;
  }

  const spots = SPOTS.slice(0, Math.min(SPOTS.length, wishes.length));
  const GATHER = { x: 150, y: 292 };
  let svg = `<defs>
    <radialGradient id="gRose" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="#f9b9cd"/><stop offset="1" stop-color="#dc6690"/></radialGradient>
    <radialGradient id="gRose2" cx="50%" cy="30%" r="70%"><stop offset="0" stop-color="#ffd6e2"/><stop offset="1" stop-color="#ef8eb0"/></radialGradient>
    <linearGradient id="gTulip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc9d9"/><stop offset="1" stop-color="#e5739c"/></linearGradient>
    <radialGradient id="gDaisy" cx="50%" cy="100%" r="100%"><stop offset="0" stop-color="#ffe0ea"/><stop offset=".6" stop-color="#fff"/></radialGradient>
    <linearGradient id="gLeaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9d0b4"/><stop offset="1" stop-color="#83a381"/></linearGradient>
    <linearGradient id="gWrapB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6d4df"/><stop offset="1" stop-color="#e9b1c4"/></linearGradient>
    <linearGradient id="gWrapF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffaf8"/><stop offset="1" stop-color="#f5d6e0"/></linearGradient>
  </defs>`;
  svg += `<path d="M56 150Q150 106 244 150L176 330 124 330Z" fill="url(#gWrapB)"/>`;
  svg += leaf(86, 150, -38) + leaf(214, 150, 38) + leaf(110, 104, -18, 24) + leaf(192, 100, 20, 24) + leaf(66, 178, -58, 22) + leaf(234, 178, 58, 22) + leaf(150, 70, 0, 22);
  svg += babyBreath(78, 128) + babyBreath(222, 124) + babyBreath(134, 56) + babyBreath(168, 54) + babyBreath(92, 92) + babyBreath(208, 88);
  spots.forEach((p, i) => {
    svg += `<path class="stem" data-i="${i}" d="M${p.x} ${p.y}Q${f1((p.x + GATHER.x) / 2 + (p.x - 150) * 0.15)} ${f1((p.y + GATHER.y) / 2)} ${GATHER.x} ${GATHER.y}"/>`;
  });
  spots
    .map((p, i) => ({ p, i }))
    .sort((a, b) => a.p.z - b.p.z)
    .forEach(({ p, i }) => {
      const body = p.t === "rose" ? rose(p.s) : p.t === "tulip" ? tulip(p.s) : daisy(p.s);
      svg += `<g transform="translate(${p.x} ${p.y})"><g class="fl" data-i="${i}">${body}</g></g>`;
    });
  svg += `<path d="M46 192L98 210 150 244 202 210 254 192 172 344Q150 352 128 344Z" fill="url(#gWrapF)"/>`;
  svg += `<path d="M98 210L138 342M202 210L162 342" fill="none" stroke="#e7a9bd" stroke-opacity=".5" stroke-width="1.4"/>`;
  svg += `<g transform="translate(150 300)"><g class="bq-bow"><use href="#bow" x="-50" y="-32" width="100" height="68"/></g></g>`;
  const bqSvg = $("#bqSvg");
  bqSvg.innerHTML = svg;
  $$(".stem", bqSvg).forEach((s) => s.style.setProperty("--len", s.getTotalLength().toFixed(1)));

  let given = 0;
  const bqBtn = $("#bqBtn"), bqWish = $("#bqWish"), bqCount = $("#bqCount");
  bqCount.textContent = `0/${wishes.length}`;
  bqWish.textContent = "Bó hoa đang chờ những lời chúc đầu tiên…";
  bqBtn.addEventListener("click", () => {
    if (given >= wishes.length) return;
    const i = given++;
    const stem = $(`.stem[data-i="${i}"]`, bqSvg), fl = $(`.fl[data-i="${i}"]`, bqSvg);
    if (stem) stem.classList.add("on");
    if (fl) setTimeout(() => fl.classList.add("on"), 250);
    bqWish.classList.add("swap");
    setTimeout(() => { bqWish.textContent = wishes[i]; bqWish.classList.remove("swap"); }, 300);
    $("#bqList").appendChild(el("li", "", wishes[i]));
    bqCount.textContent = `${given}/${wishes.length}`;
    const r = bqSvg.getBoundingClientRect();
    if (given === wishes.length) {
      setTimeout(() => {
        $(".bq-wrap").classList.add("done");
        bqWish.textContent = "Bó hoa này, cả lớp gửi tặng Cô 💐";
        petalBurst(r.left + r.width / 2, r.top + r.height * 0.4, 60);
      }, 900);
      bqBtn.disabled = true;
      bqBtn.firstChild.textContent = "Bó hoa đã trọn vẹn ♡ ";
    } else {
      petalBurst(r.left + r.width / 2, r.top + r.height * 0.35, 10);
    }
  });

  /* =====================================================================
     KHỞI ĐỘNG
     ===================================================================== */
  $("#btnTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);
  [D.anhBia, ...(D.khoanhKhac || []).map((m) => m.anh)].forEach((src) => { if (src) { const i = new Image(); i.src = src; } });
})();
