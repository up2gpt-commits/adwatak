#!/usr/bin/env python3
"""Quick audit: count remaining English strings in ID tools."""
import os, re

base = "/home/ops123/adwatak/src/app/id/tools"
indo_words = ['hitung','kalkulator','konverter','pemeriksa','pendeteksi','penghasil',
    'penggabung','pemisah','penghapus','pencari','pengubah','pengompres','pengunduh',
    'kata','angka','teks','warna','tanggal','waktu','berat','tinggi','usia','nama',
    'kalori','pinjaman','gaji','emas','keuntungan','cicilan','zakat','sedekah',
    'kiblat','hijri','shalat','tasbih','menit','detik','bagi','simpan','hapus',
    'ubah','kirim','salin','tempel','tambah','kurang','masukkan','pilih','cari',
    'hasil','biaya','tiket','hotel','mekkah','madinah','transport','pengeluaran',
    'beras','daging','kurma','puasa','budak','pakaian','miskin','per hari',
    'merdekakan','berturut','dhuhr','subuh','maghrib','isya','fajar','syuruq',
    'lorem','ipsum','pembuat','pembaca','pemformat','penghitung','pembersih',
    'pembanding','pengubah','pengatur','pengecil','penggabung','pemisah',
    'pengubah','pengompres','pengunduh','penghapus','pemeriksa','pendeteksi',
    'pencari','pengubah','penghasil','konverter','kalkulator','kompresor',
    'pembangkitan','pengode','pengembangan','enkripsi','segera','hadir','lainnya',
    'baru','alat','islami','pengembang','harian','laba','majemuk','margin']

tools = sorted([d for d in os.listdir(base) if os.path.isdir(os.path.join(base, d))])
for tool in tools:
    cf = os.path.join(base, tool, "Client.tsx")
    if not os.path.exists(cf): continue
    with open(cf) as f:
        content = f.read()
    
    count = 0
    samples = []
    for m in re.finditer(r'["\x27]([A-Z][a-zA-Z\s()\x2d\d,;:.!?\x27`]{15,})["\x27]', content):
        text = m.group(1)
        if re.search(r'[\xe9\xe8\xea\xeb\xe0\xe2\xf9\xfb\xfc\xf4\xf6\xee\xef\xe7]', text): continue
        if text.startswith('http') or len(text) < 8: continue
        if text in ['Lorem Ipsum']: continue
        if any(iw in text.lower() for iw in indo_words): continue
        
        # Skip if already in the dictionary (was applied)
        id_dict = ["Age Calculator","BMI Calculator","Calorie Calculator","Word Counter",
            "Password Generator","QR Generator","QR Code Generator","QR Reader",
            "Invoice Generator","Name Generator","Random Number","Stopwatch",
            "Text Cleaner","Text Case","Text Compare","Base64 Encoder","Hash Generator",
            "JSON Formatter","SEO Audit","Compound Interest","Profit Margin",
            "Currency Converter","Color Converter","Image Resizer","Image Compressor",
            "Image to PDF","PDF Merger","PDF Splitter","PDF Compressor","PDF to Word",
            "Remove Background","YouTube Thumbnail Downloader","WhatsApp Link",
            "Number to Words","Bio Generator","Hijri Converter","Qibla Direction",
            "Prayer Times","Tasbeeh Counter","Fidyah Kaffarah","AI Content Detector",
            "Paraphrasing Tool","Grammar Checker","Markdown Editor","CSS Minifier",
            "Encryption Tool","Time Zone Converter","Plagiarism Checker",
            "Keyword Research Tool","Mortgage Calculator","Installment Calculator",
            "Loan Calculator","Salary Calculator","VAT Calculator","EMI Calculator",
            "Gold Calculator","Ideal Weight","Date Duration","Percentage Calculator",
            "Zakat Calculator","Umrah Calculator","Qibla Camera","Typing Test",
            "Metric","Imperial","Enter","Original","Result","Preview","Warning"]
        if text in id_dict: continue
        
        count += 1
        if len(samples) < 3:
            samples.append(text[:70])
    
    if count > 0:
        print(f"ID {tool}: {count} EN")
        for s in samples:
            print(f"  -> {s}")
        print()

for tool in tools:
    cf = os.path.join(base, tool, "Client.tsx")
    if not os.path.exists(cf): continue
    with open(cf) as f:
        content = f.read()
    
    # Count long strings (SEO content, FAQ answers)
    long_count = 0
    for m in re.finditer(r'["\x27]([A-Z][a-zA-Z\s()\x2d\d,;:.!?\x27`]{60,})["\x27]', content):
        text = m.group(1)
        if re.search(r'[\xe9\xe8\xea\xeb\xe0\xe2\xf9\xfb\xfc\xf4\xf6\xee\xef\xe7]', text): continue
        if any(iw in text.lower() for iw in indo_words): continue
        if text.startswith('http'): continue
        long_count += 1
    
    if long_count > 0:
        pass

print("Done")
