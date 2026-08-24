/* =========================================================
   TRY & USE — live virtual try-on
   caps  -> head      (face landmarks)
   eyewear -> face    (face landmarks)
   hoodies -> shoulders (pose landmarks)
   Falls back to drag-to-place if the tracking models can't load.
   ========================================================= */
(function (w, d) {
  'use strict';
  var UM = w.UM;

  var MP = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14';
  var MODELS = {
    face: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
    pose: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task'
  };

  /* how each category sits on the body */
  var FIT = {
    caps:    { widthK: 2.55, yK: -0.92, xK: 0, needs: 'face' },
    eyewear: { widthK: 2.18, yK: 0.02, xK: 0, needs: 'face' },
    hoodies: { widthK: 2.30, yK: 0.42, xK: 0, needs: 'pose' }
  };

  var cam = d.getElementById('cam');
  var out = d.getElementById('out');
  var still = d.getElementById('still');
  var ctx = out.getContext('2d');
  var idle = d.getElementById('idle');
  var bar = d.getElementById('bar');
  var statusEl = d.getElementById('status');
  var noteEl = d.getElementById('note');
  var listEl = d.getElementById('list');
  var buyEl = d.getElementById('buy');

  var state = {
    cat: 'caps', product: null, overlay: null,
    mode: null,               // 'cam' | 'photo'
    mirror: true,
    manual: false,            // true when tracking is unavailable
    place: { x: 0.5, y: 0.35, s: 0.42, r: 0 },
    running: false
  };
  var face = null, pose = null, catalog = null;

  UM.boot({ active: 'try', loader: false });

  /* ---------------- catalog + picker ---------------- */
  UM.getCatalog().then(function (c) {
    catalog = c;
    var q = new URLSearchParams(location.search);
    var wanted = q.get('id');
    var cat = q.get('cat');
    if (cat && FIT[cat]) state.cat = cat;
    if (wanted) {
      var p = UM.findProduct(c, wanted);
      if (p && FIT[p._cat]) { state.cat = p._cat; }
    }
    setTab(state.cat);
    if (wanted) {
      var pp = UM.findProduct(c, wanted);
      if (pp) choose(pp);
    }
    UM.mountFooter();
  });

  d.getElementById('tabs').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) setTab(b.dataset.c);
  });

  function setTab(cat) {
    state.cat = cat;
    d.querySelectorAll('#tabs button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.c === cat);
    });
    var items = (catalog && catalog[cat]) || [];
    listEl.innerHTML = items.map(function (p) {
      var img = (p.cut && p.cut.a) || p.img.a900;
      return '<button class="chip" data-id="' + UM.esc(p.id) + '">' +
        '<img src="' + UM.esc(img) + '" alt="" loading="lazy">' +
        '<span>' + UM.esc(p.title) + '</span>' +
        '<em>' + UM.money(p.price) + '</em>' +
      '</button>';
    }).join('');
    listEl.querySelectorAll('.chip').forEach(function (b) {
      b.addEventListener('click', function () {
        choose(UM.findProduct(catalog, b.dataset.id));
      });
    });
    if (state.product && state.product._cat !== cat) { state.product = null; state.overlay = null; buyEl.hidden = true; }
  }

  function choose(p) {
    if (!p) return;
    state.product = p;
    state.cat = p._cat;
    d.querySelectorAll('#tabs button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.c === p._cat);
    });
    listEl.querySelectorAll('.chip').forEach(function (b) {
      b.classList.toggle('on', b.dataset.id === p.id);
    });
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () { state.overlay = img; };
    img.src = (p.cut && p.cut.a) || p.img.a900;

    buyEl.hidden = false;
    buyEl.innerHTML =
      '<div class="tryp__buyRow">' +
        '<div><b>' + UM.esc(p.title) + '</b><span>' + UM.money(p.price) + '</span></div>' +
        (p.available
          ? '<button class="btn btn--solid" id="tryAdd">Add to cart</button>'
          : '<span class="mono" style="color:var(--sold)">Sold out</span>') +
      '</div>' +
      '<a class="mono tryp__link" href="product.html?id=' + encodeURIComponent(p.id) + '" data-nav>View product →</a>';
    var add = d.getElementById('tryAdd');
    if (add) add.addEventListener('click', function () {
      var s = (p.sizes || []).filter(function (x) { return x.available; })[0];
      if (!s) return UM.toast('Out of stock');
      UM.cartAdd({
        id: p.id, variant: /default/i.test(s.label) ? 'One size' : s.label,
        variantId: s.id, title: p.title, price: p.price,
        img: (p.cut && p.cut.a) || p.img.a900, qty: 1
      });
      UM.openCart();
    });
  }

  /* ---------------- tracking models ---------------- */
  function loadModels() {
    note('Loading tracking…');
    return import(MP + '/vision_bundle.mjs').then(function (v) {
      return v.FilesetResolver.forVisionTasks(MP + '/wasm').then(function (fs) {
        return Promise.all([
          v.FaceLandmarker.createFromOptions(fs, {
            baseOptions: { modelAssetPath: MODELS.face, delegate: 'GPU' },
            runningMode: 'VIDEO', numFaces: 1
          }).then(function (m) { face = m; }).catch(function () {}),
          v.PoseLandmarker.createFromOptions(fs, {
            baseOptions: { modelAssetPath: MODELS.pose, delegate: 'GPU' },
            runningMode: 'VIDEO', numPoses: 1
          }).then(function (m) { pose = m; }).catch(function () {})
        ]);
      });
    }).then(function () {
      if (!face && !pose) throw new Error('no models');
      note('');
      state.manual = false;
    }).catch(function () {
      state.manual = true;
      note('Live tracking unavailable offline — drag to position, scroll or pinch to resize.');
    });
  }
  function note(t) { noteEl.textContent = t || ''; }

  /* ---------------- camera ---------------- */
  d.getElementById('camBtn').addEventListener('click', startCam);
  d.getElementById('photo').addEventListener('change', usePhoto);
  d.getElementById('stopBtn').addEventListener('click', stopAll);
  d.getElementById('mirrorBtn').addEventListener('click', function () { state.mirror = !state.mirror; });
  d.getElementById('shotBtn').addEventListener('click', snapshot);

  function startCam() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return note('This browser has no camera API. Use a photo instead.');
    }
    note('Requesting camera…');
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    }).then(function (stream) {
      cam.srcObject = stream;
      return cam.play();
    }).then(function () {
      state.mode = 'cam';
      idle.hidden = true; bar.hidden = false; still.hidden = true;
      d.getElementById('stage').classList.add('live');
      return loadModels();
    }).then(function () {
      state.running = true;
      requestAnimationFrame(loop);
    }).catch(function (e) {
      note(e && e.name === 'NotAllowedError'
        ? 'Camera permission denied. Allow it, or use a photo instead.'
        : 'Camera unavailable — ' + (e && e.message ? e.message : 'unknown') + '. Try a photo.');
    });
  }

  function usePhoto(e) {
    var f = e.target.files && e.target.files[0];
    if (!f) return;
    var url = URL.createObjectURL(f);
    still.onload = function () {
      state.mode = 'photo';
      state.mirror = false;
      idle.hidden = true; bar.hidden = false;
      d.getElementById('stage').classList.add('live');
      loadModels().then(function () {
        // still images use the IMAGE running mode; simplest is manual placement
        state.manual = true;
        note('');
        drawPhoto();
      });
    };
    still.src = url;
  }

  function stopAll() {
    state.running = false;
    if (cam.srcObject) { cam.srcObject.getTracks().forEach(function (t) { t.stop(); }); cam.srcObject = null; }
    still.removeAttribute('src'); still.hidden = true;
    idle.hidden = false; bar.hidden = true;
    d.getElementById('stage').classList.remove('live');
    ctx.clearRect(0, 0, out.width, out.height);
    state.mode = null;
    note('');
  }

  /* ---------------- render ---------------- */
  function fitCanvas(srcW, srcH) {
    var box = d.getElementById('stage').getBoundingClientRect();
    var scale = Math.min(box.width / srcW, box.height / srcH);
    var w2 = Math.round(srcW * scale), h2 = Math.round(srcH * scale);
    if (out.width !== w2 || out.height !== h2) { out.width = w2; out.height = h2; }
    return { w: w2, h: h2 };
  }

  function loop(ts) {
    if (!state.running || state.mode !== 'cam') return;
    if (cam.readyState >= 2) {
      var s = fitCanvas(cam.videoWidth, cam.videoHeight);
      ctx.save();
      ctx.clearRect(0, 0, s.w, s.h);
      if (state.mirror) { ctx.translate(s.w, 0); ctx.scale(-1, 1); }
      ctx.drawImage(cam, 0, 0, s.w, s.h);
      ctx.restore();

      var anchor = null;
      if (!state.manual) {
        var need = (FIT[state.cat] || FIT.caps).needs;
        try {
          if (need === 'face' && face) anchor = fromFace(face.detectForVideo(cam, ts), s);
          else if (need === 'pose' && pose) anchor = fromPose(pose.detectForVideo(cam, ts), s);
        } catch (e) { /* frame skipped */ }
      }
      if (anchor) { statusEl.textContent = 'Tracking'; drawOverlay(anchor, s); }
      else if (state.manual) { statusEl.textContent = 'Manual'; drawOverlay(manualAnchor(s), s); }
      else { statusEl.textContent = 'Looking for you…'; }
    }
    requestAnimationFrame(loop);
  }

  function drawPhoto() {
    if (state.mode !== 'photo') return;
    var s = fitCanvas(still.naturalWidth, still.naturalHeight);
    ctx.clearRect(0, 0, s.w, s.h);
    ctx.drawImage(still, 0, 0, s.w, s.h);
    drawOverlay(manualAnchor(s), s);
    statusEl.textContent = 'Photo';
  }

  function mx(p, s) { return (state.mirror ? (1 - p.x) : p.x) * s.w; }

  function fromFace(res, s) {
    if (!res || !res.faceLandmarks || !res.faceLandmarks.length) return null;
    var L = res.faceLandmarks[0];
    var le = L[33], re = L[263], top = L[10], chin = L[152];
    var x1 = mx(le, s), y1 = le.y * s.h, x2 = mx(re, s), y2 = re.y * s.h;
    var eyeD = Math.hypot(x2 - x1, y2 - y1);
    var cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
    var rot = Math.atan2(y2 - y1, x2 - x1);
    var faceH = Math.abs(chin.y - top.y) * s.h;
    var f = FIT[state.cat] || FIT.caps;
    return {
      cx: cx + f.xK * eyeD,
      cy: cy + f.yK * (state.cat === 'caps' ? faceH * 0.52 : eyeD * 0.5),
      width: eyeD * f.widthK,
      rot: rot
    };
  }

  function fromPose(res, s) {
    if (!res || !res.landmarks || !res.landmarks.length) return null;
    var L = res.landmarks[0];
    var ls = L[11], rs = L[12];
    if (!ls || !rs) return null;
    if ((ls.visibility != null && ls.visibility < 0.5) && (rs.visibility != null && rs.visibility < 0.5)) return null;
    var x1 = mx(ls, s), y1 = ls.y * s.h, x2 = mx(rs, s), y2 = rs.y * s.h;
    var sd = Math.hypot(x2 - x1, y2 - y1);
    var f = FIT.hoodies;
    return {
      cx: (x1 + x2) / 2,
      cy: (y1 + y2) / 2 + sd * f.yK,
      width: sd * f.widthK,
      rot: Math.atan2(y2 - y1, x2 - x1)
    };
  }

  function manualAnchor(s) {
    return {
      cx: state.place.x * s.w,
      cy: state.place.y * s.h,
      width: state.place.s * s.w,
      rot: state.place.r
    };
  }

  function drawOverlay(a, s) {
    var img = state.overlay;
    if (!img || !a) return;
    var ar = img.naturalHeight / img.naturalWidth;
    var w2 = a.width, h2 = w2 * ar;
    ctx.save();
    ctx.translate(a.cx, a.cy);
    ctx.rotate(a.rot);
    ctx.drawImage(img, -w2 / 2, -h2 / 2, w2, h2);
    ctx.restore();
  }

  /* ---------------- manual placement ---------------- */
  var drag = false, dx = 0, dy = 0;
  out.addEventListener('pointerdown', function (e) {
    if (!state.manual) return;
    drag = true; out.setPointerCapture(e.pointerId);
    var r = out.getBoundingClientRect();
    dx = (e.clientX - r.left) / r.width - state.place.x;
    dy = (e.clientY - r.top) / r.height - state.place.y;
  });
  out.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var r = out.getBoundingClientRect();
    state.place.x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width - dx));
    state.place.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height - dy));
    if (state.mode === 'photo') drawPhoto();
  });
  out.addEventListener('pointerup', function () { drag = false; });
  out.addEventListener('wheel', function (e) {
    if (!state.manual) return;
    e.preventDefault();
    state.place.s = Math.min(1.6, Math.max(0.08, state.place.s * (e.deltaY > 0 ? 0.94 : 1.06)));
    if (state.mode === 'photo') drawPhoto();
  }, { passive: false });

  function snapshot() {
    try {
      var url = out.toDataURL('image/png');
      var a = d.createElement('a');
      a.href = url; a.download = 'urban-monkey-tryon.png';
      d.body.appendChild(a); a.click(); a.remove();
      UM.toast('Snapshot saved');
    } catch (e) { UM.toast('Could not save snapshot'); }
  }

  w.addEventListener('resize', function () { if (state.mode === 'photo') drawPhoto(); });
})(window, document);
