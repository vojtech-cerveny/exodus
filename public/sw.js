if (!self.define) {
  let e,
    s = {};
  const c = (c, i) => (
    (c = new URL(c + ".js", i).href),
    s[c] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = c), (e.onload = s), document.head.appendChild(e);
        } else (e = c), importScripts(c), s();
      }).then(() => {
        let e = s[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, a) => {
    const n = e || ("document" in self ? document.currentScript.src : "") || location.href;
    if (s[n]) return;
    let o = {};
    const d = (e) => c(e, n),
      t = { module: { uri: n }, exports: o, require: d };
    s[n] = Promise.all(i.map((e) => t[e] || d(e))).then((e) => (a(...e), o));
  };
}
define(["./workbox-07a7b4f2"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/_next/app-build-manifest.json", revision: "2ec4e66bb7a9630363c294b42b44304f" },
        { url: "/_next/static/VlB3CHqdohExyfdu_0mcY/_buildManifest.js", revision: "b222cbf4d8e1f47e27a8925222733e53" },
        { url: "/_next/static/VlB3CHqdohExyfdu_0mcY/_ssgManifest.js", revision: "b6652df95db52feb4daf4eca35380933" },
        { url: "/_next/static/chunks/0e5ce63c-52040efca64a0d80.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/13b76428-ed7816e722e80a35.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/2273-556c6a49957c8e41.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/231-cacc75de47007a42.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/2618-78b9a12382e9b7e7.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/2967-4771e3a8488d7e40.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/3304-38c8a0f1a8e3d203.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/5314-394ca350812f7dff.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/5468-19911c1028ac2a4a.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/7023-5e776bca06d9c62d.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/7042-f16d94ea26ea5db7.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/7776-e72e61ad84712639.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/7885-fc4cec01d619e9a2.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/8297-954482cc542be862.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/9031-26bd048a35665fcf.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/924-0e4e0521aa49e88d.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/9725-bcfcead34c5c7769.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/app/_not-found/page-a93d780e5fd36f36.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        {
          url: "/_next/static/chunks/app/articles/%5Bid%5D/page-b768b9272eca8d78.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        { url: "/_next/static/chunks/app/articles/layout-c4d0893a3822fda3.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/app/articles/page-172a0d234856996d.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/app/auth/login/page-40530bfed4bf833c.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/app/bookmarks/page-b24c3d06016f89f7.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        {
          url: "/_next/static/chunks/app/bratrstvo/%5Bid%5D/invite/%5Binvite%5D/page-10ca89eaec1aaf86.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        {
          url: "/_next/static/chunks/app/bratrstvo/%5Bid%5D/page-088b73528e7a30a1.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        { url: "/_next/static/chunks/app/bratrstvo/page-6306ec957a5e7a59.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        {
          url: "/_next/static/chunks/app/exodus/dny/%5Bid%5D/layout-3bdc64eeb1cf4738.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        {
          url: "/_next/static/chunks/app/exodus/dny/%5Bid%5D/page-3990d2062d5013c5.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        { url: "/_next/static/chunks/app/exodus/dny/page-d7572547fef2efa0.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/app/exodus/layout-1a2b52452294551b.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/app/exodus/page-ca8a9f75eb4a13e9.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/app/exodus/today/page-2ea0b62b8b224708.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        {
          url: "/_next/static/chunks/app/exodus/ukony/%5Bid%5D/page-a08223e284c8a438.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        { url: "/_next/static/chunks/app/exodus/ukony/page-ae0a406d9987e844.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        {
          url: "/_next/static/chunks/app/kralovske-leto/dny/%5Bid%5D/layout-b0c046cb3b63dc26.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        {
          url: "/_next/static/chunks/app/kralovske-leto/dny/%5Bid%5D/page-be3cb67bedc7eb4f.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        {
          url: "/_next/static/chunks/app/kralovske-leto/dny/page-c492558171bc12e1.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        {
          url: "/_next/static/chunks/app/kralovske-leto/layout-b9b850715c579453.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        { url: "/_next/static/chunks/app/kralovske-leto/page-d0befa082221777d.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        {
          url: "/_next/static/chunks/app/kralovske-leto/today/page-d7fb53d1b6c8f1b3.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        { url: "/_next/static/chunks/app/layout-800f79bf4f7dc120.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/app/not-found-f88dc86ec6b90280.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/app/page-0f3318724cddffab.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/app/privacy/page-9e3ad5b6c5f2bbb7.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        {
          url: "/_next/static/chunks/app/terms-of-service/page-a2fa3de4d454df3d.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        {
          url: "/_next/static/chunks/app/tydenni-setkani/layout-6c6324a117de2678.js",
          revision: "VlB3CHqdohExyfdu_0mcY",
        },
        { url: "/_next/static/chunks/app/tydenni-setkani/page-4c62164010836e06.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/fd9d1056-81a530d22cd63fce.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/framework-20adfd98f723306f.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/main-app-0b2a4707da4ee7a7.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/main-db46128712d816de.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/pages/_app-00b74eae5e8dab51.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/pages/_error-c72a1f77a3c0be1b.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js", revision: "79330112775102f91e1010318bae2bd3" },
        { url: "/_next/static/chunks/webpack-6da44639d60932be.js", revision: "VlB3CHqdohExyfdu_0mcY" },
        { url: "/_next/static/css/54cec8c265287fd1.css", revision: "54cec8c265287fd1" },
        { url: "/_next/static/media/8a04fb296c4aade6-s.p.ttf", revision: "01643be9fa75a4523c77ac348b242aed" },
        { url: "/_next/static/media/crown.f1d769b4.svg", revision: "86f068069c54bbc015d72db148f53f92" },
        { url: "/_next/static/media/ec1a1eae803b668e-s.p.woff2", revision: "313812e61a1aacffa37a0e33e321d6b2" },
        { url: "/_next/static/media/exodus.96160229.svg", revision: "23bd26d75096df1a4d4adfcce87f4509" },
        { url: "/books/exodus90-denni-texty.epub", revision: "d0eb15958fa185ea957af70cc73bae33" },
        { url: "/books/exodus90-denni-texty.mobi", revision: "600cf14a68c3776c5c0ea9c733269d20" },
        { url: "/files/exodus90.aux", revision: "8d27e8745996c6dbb8dd6671810a386b" },
        { url: "/files/exodus90.fdb_latexmk", revision: "421274937dee11e6acdfe8a2c583c6ba" },
        { url: "/files/exodus90.fls", revision: "84c52319f6d22432c2a379fddd817470" },
        { url: "/files/exodus90.log", revision: "d3de94c8a771f2e8b73c8bd0a1dca36b" },
        { url: "/files/exodus90.pdf", revision: "e97e98ae3ff2143a1dc7a1e410ea5a1b" },
        { url: "/files/exodus90.synctex.gz", revision: "86be97cac90517d0274e7a9ffa2475fa" },
        { url: "/files/exodus90.tex", revision: "310df1b5d1f79cf5c22318d6506c6fa9" },
        { url: "/icons/google-white.svg", revision: "a3bd6c06347696f2a7281bad80e45b1c" },
        { url: "/icons/google.svg", revision: "d427f87872997ed8723367d2137dacb9" },
        { url: "/icons/login.svg", revision: "30c5b82ea82e0fe66c25db3bacdd97b8" },
        { url: "/icons/mood-good.svg", revision: "8e9da39b89283c4cc6ae83cefc037fdd" },
        { url: "/icons/mood-neutral.svg", revision: "460475a8ad0a010f1df0a07efb262bf8" },
        { url: "/icons/mood-sad.svg", revision: "b02479fac57e8b9a89f374191ddb8a6f" },
        { url: "/icons/pwa/android-chrome-192x192.png", revision: "b867da66fd6177779b52d580199aa724" },
        { url: "/icons/pwa/android-chrome-384x384.png", revision: "16f656aa8309ca50d3d7aa921d529fe7" },
        { url: "/icons/pwa/icon-512x512.png", revision: "26f39c22bd836deb86eaeae92beae7b1" },
        { url: "/icons/pwa/ios/100.png", revision: "b2f82b69d97bfc44d45e04ca1fc7b2aa" },
        { url: "/icons/pwa/ios/1024.png", revision: "02bc1b76152d68e5e598ce099d8daa08" },
        { url: "/icons/pwa/ios/114.png", revision: "c4092bf0bced588c1681119ed3ab3df9" },
        { url: "/icons/pwa/ios/120.png", revision: "29e876c407b97be267147cf49c045df9" },
        { url: "/icons/pwa/ios/128.png", revision: "4f0e66495d5edfc1dd01267899cc1bfa" },
        { url: "/icons/pwa/ios/144.png", revision: "05175913876c1f7e668ef29ba8a23ba1" },
        { url: "/icons/pwa/ios/152.png", revision: "0f53de4f1eda4dd8346428b704a1ab15" },
        { url: "/icons/pwa/ios/16.png", revision: "99a2300e3b9342b93cc526c85106d2ba" },
        { url: "/icons/pwa/ios/167.png", revision: "ea97f3f43dc5f4982612dbdfe2e29c0d" },
        { url: "/icons/pwa/ios/180.png", revision: "1bbd0c59df3adc0485e1f91aca41667d" },
        { url: "/icons/pwa/ios/192.png", revision: "80ce58ebefebe636448a3c67d316b143" },
        { url: "/icons/pwa/ios/20.png", revision: "d983435f1f280ff18c6376c685e865fc" },
        { url: "/icons/pwa/ios/256.png", revision: "dfaeff9a07b71d7b5ba3a45baaedbc7c" },
        { url: "/icons/pwa/ios/29.png", revision: "419b462d21ee42c543a9c8912ccf417c" },
        { url: "/icons/pwa/ios/32.png", revision: "88f084299c83884ce4208cdfebe3fd64" },
        { url: "/icons/pwa/ios/40.png", revision: "43462208c87abdb80927f5fa9fe4dfd3" },
        { url: "/icons/pwa/ios/50.png", revision: "fbbac3dc0fc6d1915f8805efffb295f1" },
        { url: "/icons/pwa/ios/512.png", revision: "2a456235c41e76c5ffb9279ff5e25f60" },
        { url: "/icons/pwa/ios/57.png", revision: "5453ed2efed67f3b46201c29c00ca4f2" },
        { url: "/icons/pwa/ios/58.png", revision: "c930d10d3613134cd9dc24dbd987b577" },
        { url: "/icons/pwa/ios/60.png", revision: "e4f4a6220f9ac5ab9750c0dfaad2be02" },
        { url: "/icons/pwa/ios/64.png", revision: "77aca1ae7db86c684ee167fcd5de6344" },
        { url: "/icons/pwa/ios/72.png", revision: "c865073906e705c84286504670f6f410" },
        { url: "/icons/pwa/ios/76.png", revision: "69a17fef7b76d3bb4cbcfcf43e755cf4" },
        { url: "/icons/pwa/ios/80.png", revision: "481ca297a9f6c51993424534a3be04fd" },
        { url: "/icons/pwa/ios/87.png", revision: "d6bc201f17f6360625c505685a7c4be9" },
        { url: "/icons/pwa/og.png", revision: "1b29804756f4ab33dac5c78a99a9f910" },
        { url: "/icons/table-askeze.svg", revision: "2b1e466581a3913407c4ec15d489a745" },
        { url: "/icons/table-cviceni.svg", revision: "4f41ff59cc7ec3fe63ed285539019488" },
        { url: "/icons/table-datum.svg", revision: "a81556b1704c3a6af15019358553756f" },
        { url: "/icons/table-note.svg", revision: "414b445d12fe0367906e08eefd8da658" },
        { url: "/icons/table-posledni-zmena.svg", revision: "667436bb6e8714e45ce3c8485429210d" },
        { url: "/icons/table-sprcha.svg", revision: "aec2f63d203b8101f95a5864b0ef2b1e" },
        { url: "/icons/table-svata-hodinka.svg", revision: "29ea3ec96093756f112261536617ec48" },
        { url: "/icons/table-uzivatel.svg", revision: "e88d3d0446c860fcdcee61dc027bfb52" },
        { url: "/icons/table-zhodnoceni.svg", revision: "f48d00379297e4ed2c746d8325075490" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        { url: "/sounds/gong.mp3", revision: "fac8a1dccd49f35b1d5d3e7e6a8a7637" },
        { url: "/vercel.svg", revision: "61c6b19abff40ea7acd577be818f3976" },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: c, state: i }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, { status: 200, statusText: "OK", headers: s.headers })
                : s,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      "GET",
    );
});
