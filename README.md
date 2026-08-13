# Gimik Perasmian Telefon — Versi Public Hosting

Laman statik ini boleh dibuka pada iPhone atau Android melalui internet. Tiada Python, pangkalan data, atau local server diperlukan.

## Cara paling mudah: Netlify Drop

1. Extract fail ZIP ini.
2. Buka https://app.netlify.com/drop
3. Seret **folder `public-gimmick`** ke halaman tersebut.
4. Tunggu sehingga pautan awam dipaparkan, kemudian buka pautan itu di telefon atau jadikan QR code.

## Cloudflare Pages

1. Log masuk Cloudflare, buka **Workers & Pages → Create → Pages → Upload assets**.
2. Beri nama projek, kemudian seret folder ini atau fail ZIP.
3. Tekan **Deploy site** dan gunakan pautan `.pages.dev` yang diberi.

## GitHub Pages

1. Cipta repository baharu dan upload `index.html`, `style.css`, `tablet.css`, serta `script.js` ke root repository.
2. Buka **Settings → Pages**.
3. Di bawah **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, kemudian Save.
4. Tunggu pautan awam GitHub Pages dipaparkan.

## Penggunaan semasa majlis

- Buka pautan awam pada telefon dan gunakan mod skrin penuh jika sesuai.
- Pada iPad/iPhone, buka melalui Safari kemudian **Share → Add to Home Screen** dan lancarkan melalui ikon tersebut untuk paparan penuh tanpa bar browser.
- Pastikan volume telefon dinaikkan. iPhone membenarkan bunyi selepas interaksi sentuhan; getaran web bergantung pada sokongan browser/peranti.
- Seluruh skrin ialah kawasan sensor. Letakkan tapak tangan kanan pada mana-mana bahagian paparan; sentuhan pertama juga akan cuba mengaktifkan mod fullscreen jika browser menyokongnya.
- Butang **ULANG SEMULA** tersedia untuk rehearsal.
- Uji pautan pada telefon dan sambungan internet sebenar sebelum majlis.

Semua aset terkandung dalam tiga fail utama dan tiada sambungan ke server dibuat selepas laman dimuatkan.
