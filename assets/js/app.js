/* =========================================================
   Homepage — video-led categories + editorial composition
   ========================================================= */
(function (w, d) {
  'use strict';
  var UM = w.UM;

  /* Each category owns one supplied cinematic film. */
  var CATS = [
    {
      key: 'caps', idx: '01', name: 'Caps',
      video: 'assets/video/v2-wa2328.mp4',
      sub: 'Embroidered, panel by panel',
      line: ['Head', 'first'],
      copy: 'Baseball, trucker, snapback, dad. The silhouette that built the brand — stitched, washed and finished in India.'
    },
    {
      key: 'hoodies', idx: '02', name: 'Hoodies',
      video: 'assets/video/v1-wa2303.mp4',
      sub: 'Heavyweight fleece, city cut',
      line: ['Weight', 'on top'],
      copy: 'Oversized bodies, double-layer hoods, graphics that read from across the road. Most drops sell through — sizes go fast.'
    },
    {
      key: 'eyewear', idx: '03', name: 'Eyewear',
      video: 'assets/video/v4-ai-evaluates.mp4',
      sub: 'Shields, wraps and clear frames',
      line: ['Eyes', 'covered'],
      copy: 'Y2K shields, mirrored wraps and everyday optics. Colour lives in the lens — everything else stays quiet.'
    }
  ];

  function catSection(c, items) {
    // a model shot from this category doubles as the video fallback + editorial plate
    // the two beefiest model files make the big editorial plates — the small
    // source shots would show upscaling artefacts at full-bleed size
    var withModel = items.filter(function (p) { return p.img && p.img.m1600; })
      .slice().sort(function (a, b) { return (b.img.mBytes || 0) - (a.img.mBytes || 0); });
    var plateA = withModel[0], plateB = withModel[1] || withModel[0];
    var fallback = (plateA && plateA.img.m1600) || (items[0] && items[0].img.a1600) || '';

    var head = items.slice(0, 6);
    var tail = items.slice(6);

    var s = d.createElement('section');
    s.className = 'cat';
    s.id = c.key;

    var html =
      /* ---- cinematic entry ---- */
      '<div class="cine">' +
        '<div class="cine__media">' +
          '<img src="' + UM.esc(fallback) + '" alt="" loading="lazy" decoding="async" ' +
               'style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">' +
          '<video data-lazy="' + c.video + '" data-loop muted playsinline preload="none" ' +
                 'style="position:absolute;inset:0"></video>' +
        '</div>' +
        '<div class="cine__scrim"></div>' +
        '<div class="cine__label">' +
          '<div>' +
            '<span class="idx rv">' + c.idx + ' / Category</span>' +
            '<h2 class="h-mega rv-mask"><span>' + c.name + '</span></h2>' +
            '<span class="sub rv" data-delay="2">' + c.sub + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="cat__bridge"></div>' +

      /* ---- catalog ---- */
      '<div class="sec" style="padding-top:clamp(30px,5vw,70px)">' +
        '<div class="wrap">' +
          '<div class="cat__head">' +
            '<div>' +
              '<h3 class="h-mid rv-mask"><span>' + c.line[0] + ' ' + c.line[1] + '</span></h3>' +
              '<p class="lede rv" data-delay="2" style="margin-top:16px">' + c.copy + '</p>' +
            '</div>' +
            '<span class="cat__count rv" data-delay="3">' + items.length + ' pieces</span>' +
          '</div>' +
          '<div class="pgrid">' + head.map(function (p, i) {
            return UM.cardHTML(p).replace('class="card rv', 'data-delay="' + (i % 4) + '" class="card rv');
          }).join('') + '</div>' +
        '</div>' +
      '</div>';

    /* ---- editorial model break: overlapping, offset, parallax ---- */
    if (plateA && plateB) {
      html +=
        '<div class="edit">' +
          '<div class="wrap edit__grid">' +
            '<div class="edit__a rv-img"><img src="' + UM.esc(plateA.img.m1600) + '" alt="' + UM.esc(plateA.title) + '" loading="lazy" decoding="async" data-px="-0.16"></div>' +
            '<div class="edit__b rv-img"><img src="' + UM.esc(plateB.img.m1600) + '" alt="' + UM.esc(plateB.title) + '" loading="lazy" decoding="async" data-px="0.2"></div>' +
            '<div class="edit__txt">' +
              '<p class="eyebrow rv">' + c.name + ' · on body</p>' +
              '<h3 class="h-big rv-mask"><span>' + c.line[0] + '<br>' + c.line[1] + '</span></h3>' +
              '<p class="rv" data-delay="3" style="margin-top:28px">' +
                '<a class="btn" href="try.html?cat=' + c.key + '" data-nav>Try ' + c.name.toLowerCase() + ' on →</a>' +
              '</p>' +
            '</div>' +
          '</div>' +
        '</div>';
    }

    /* ---- remainder of the catalog ---- */
    if (tail.length) {
      html +=
        '<div class="sec" style="padding-top:clamp(20px,4vw,50px)">' +
          '<div class="wrap"><div class="pgrid">' +
            tail.map(function (p, i) {
              return UM.cardHTML(p).replace('class="card rv', 'data-delay="' + (i % 4) + '" class="card rv');
            }).join('') +
          '</div></div>' +
        '</div>';
    }

    s.innerHTML = html;
    return s;
  }

  /* ---------------- build ---------------- */
  UM.boot({ active: 'home' });

  /* The hero film is the one video that is not lazy-gated (it sits above the
     fold), so honour save-data / 2G here and let the poster stand in for it. */
  (function () {
    var hv = d.getElementById('heroVid');
    if (!hv) return;
    if (UM.isSlow()) {
      hv.removeAttribute('autoplay');
      hv.pause();
      while (hv.firstChild) hv.removeChild(hv.firstChild);
      hv.load();
    }
  })();

  UM.getCatalog().then(function (cat) {
    var host = d.getElementById('cats');

    CATS.forEach(function (c) {
      var items = cat[c.key] || [];
      if (items.length) host.appendChild(catSection(c, items));
    });

    // featured = in-stock, spread across all three categories
    var all = UM.allProducts(cat).filter(function (p) { return p.available; });
    var pick = [], byCat = { caps: 0, hoodies: 0, eyewear: 0 };
    all.forEach(function (p) {
      if (pick.length < 10 && byCat[p._cat] < 4) { pick.push(p); byCat[p._cat]++; }
    });
    d.getElementById('featGrid').innerHTML = pick.map(function (p, i) {
      return UM.cardHTML(p).replace('class="card rv', 'data-delay="' + (i % 4) + '" class="card rv');
    }).join('');

    // count badge reflects the real catalog
    var badge = d.querySelector('.intro__badge b');
    if (badge) badge.textContent = UM.allProducts(cat).length;

    UM.mountFooter();
    UM.initReveal();
    UM.initParallax();
    UM.initVideo();
  }).catch(function (e) {
    var host = d.getElementById('cats');
    host.innerHTML = '<div class="sec"><div class="wrap"><p class="lede">Catalog failed to load — ' +
      UM.esc(e.message) + '</p></div></div>';
    UM.mountFooter();
    UM.initReveal();
  });
})(window, document);
