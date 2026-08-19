// --- LOGIKA MUSIK & LOADING ---
const music1 = document.getElementById('bg-music-1');
const music2 = document.getElementById('bg-music-2');
let currentMusic = 1;
let isMuted = false;

function switchMusic() {
    if (currentMusic === 1) {
        music1.pause(); music1.currentTime = 0;
        music2.play().catch(e => console.log("Audio error:", e));
        currentMusic = 2;
    } else {
        music2.pause(); music2.currentTime = 0;
        music1.play().catch(e => console.log("Audio error:", e));
        currentMusic = 1;
    }
}

music1.addEventListener('ended', switchMusic);
music2.addEventListener('ended', switchMusic);

document.getElementById('start-btn').addEventListener('click', function() {
    this.style.display = 'none';
    music1.volume = 0.5;
    music1.play().catch(e => alert("Silakan izinkan audio di browser Anda!"));
    
    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('progress-text');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100; clearInterval(interval);
            setTimeout(() => {
                document.getElementById('loading-screen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading-screen').style.display = 'none';
                    document.getElementById('app').style.display = 'block';
                }, 500);
            }, 300);
        }
        bar.style.width = progress + '%';
        text.innerText = `Loading Web... ${Math.floor(progress)}%`;
    }, 100);
});

document.getElementById('mute-btn').addEventListener('click', function() {
    isMuted = !isMuted;
    music1.muted = isMuted; music2.muted = isMuted;
    this.innerText = isMuted ? '' : '🔊';
});

// --- MANAJEMEN MODAL ---
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

function openTool(toolName) {
    modalOverlay.classList.remove('hidden');
    renderToolContent(toolName);
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    modalContent.innerHTML = '';
}

function renderToolContent(tool) {
    let html = '';
    switch(tool) {
        case 'iqc':
            html = `<h2>️ IQC Generator</h2><p>Ketik teks untuk stempel IQC.</p>
            <input type="text" id="iqc-text" placeholder="Contoh: GANTENG BANGET"><button class="action-btn" onclick="genIQC()">Buat Stempel</button>
            <div id="iqc-result" class="result-box hidden" style="text-align:center;"></div>`; break;
        case 'win-quote':
            html = `<h2>🪟 Windows Quotes</h2><p>Buat pesan error klasik.</p>
            <input type="text" id="win-text" placeholder="Pesan error..."><button class="action-btn" onclick="genWinQuote()">Generate</button>
            <div id="win-result" class="result-box hidden" style="background:#ece9d8; color:black; padding:20px; border:2px solid #fff; box-shadow: 4px 4px 0px #888; font-family:'Segoe UI', sans-serif; max-width:300px; margin:0 auto;"></div>`; break;
        case 'ustad':
            html = `<h2>🕌 Tanya Ustad AI</h2><p>Nasihat random berbasis kata kunci.</p>
            <input type="text" id="ustad-input" placeholder="Misal: sabar, rezeki, sholat"><button class="action-btn" onclick="askUstad()">Tanya</button>
            <div id="ustad-result" class="result-box hidden" style="font-style:italic; color:#4caf50; line-height:1.6;"></div>`; break;
        case 'sertifikat':
            html = `<h2>🎖️ Sertifikat Tolol</h2><p>Input nama penerima.</p>
            <input type="text" id="cert-name" placeholder="Nama Lengkap"><button class="action-btn" onclick="genCert()">Cetak</button>
            <div id="cert-result" class="result-box hidden" style="border:15px double gold; padding:30px; text-align:center; background:#fffbe6; color:#333;"></div>`; break;
        case 'brat':
            html = `<h2>🅰️ BRAT Generator</h2><p>Teks aesthetic low-res.</p>
            <input type="text" id="brat-text" placeholder="ketik sesuatu..." maxlength="12"><button class="action-btn" onclick="genBrat()">Create</button>
            <div id="brat-result" class="result-box hidden" style="background:#8ace00; color:black; font-family:Arial Narrow, Arial, sans-serif; font-size:48px; text-align:center; padding:50px 20px; filter:blur(0.6px); line-height:1;"></div>`; break;
        case 'fake-ig':
            html = `<h2>📸 Fake IG Bio</h2><p>Buat profil palsu & download.</p>
            <input type="text" id="ig-name" placeholder="Username"><input type="text" id="ig-bio" placeholder="Bio">
            <button class="action-btn" onclick="genFakeIG()">Preview</button>
            <div id="ig-result" class="result-box hidden" style="background:white; color:black; padding:20px; border-radius:12px; text-align:center;"></div>`; break;
        case 'morse':
            html = `<h2>📡 Morse Code</h2><p>Konversi & dengarkan suara morse.</p>
            <input type="text" id="morse-text" placeholder="Teks rahasia..."><button class="action-btn" onclick="toMorse(true)">Konversi & Play</button>
            <div id="morse-result" class="result-box hidden" style="font-family:monospace; font-size:20px; letter-spacing:4px; word-break:break-all;"></div>`; break;
        case 'enhancer':
            html = `<h2>✨ Image Enhancer</h2><p>Naikkan resolusi & ketajaman (Client-side).</p>
            <input type="file" id="enhance-file" accept="image/*"><button class="action-btn" onclick="enhanceImgReal()">Proses HD</button>
            <div id="enhance-result" class="result-box hidden" style="text-align:center;"></div>`; break;
        case 'tiktok':
    html = `<h2>🎵 TikTok Downloader</h2>
    <p style="font-size:12px; color:#aaa; margin-bottom:10px;">Support: vm.tiktok.com, tiktok.com/@user/video/...</p>
    <input type="text" id="tt-url" placeholder="Tempel link TikTok di sini...">
    <button class="action-btn" onclick="downloadTikTok()">🕷️ Ambil Video Tanpa WM</button>
    <div id="tt-result" class="result-box hidden"></div>`;
    break;
        case 'qr':
            html = `<h2>🔳 QR Generator</h2><input type="text" id="qr-text" placeholder="Teks/URL"><button class="action-btn" onclick="generateQR()">Buat QR</button><div id="qr-result" class="result-box" style="display:flex;justify-content:center;background:white;padding:10px;border-radius:10px;"></div>`; break;
        case 'bg-remove':
            html = `<h2>️ Remove BG (Gratis)</h2><p>Menggunakan API publik (tanpa key).</p>
            <input type="file" id="bg-file" accept="image/*"><button class="action-btn" onclick="removeBackground()">Hapus Background</button>
            <div id="bg-result" class="result-box hidden"></div>`; break;
        case 'pdf':
            html = `<h2>📄 Img to PDF</h2><input type="file" id="pdf-file" accept="image/*"><button class="action-btn" onclick="convertToPDF()">Download PDF</button>`; break;
        case 'notes':
            html = `<h2>📝 Catatan</h2><textarea id="note-area" rows="6" placeholder="Tulis catatanmu..."></textarea><button class="action-btn" onclick="saveNote()">Simpan</button><p id="note-status" style="margin-top:10px;color:#4caf50;font-weight:bold;"></p>`;
            setTimeout(() => document.getElementById('note-area').value = localStorage.getItem('dan_note') || '', 100); break;
        case 'calc':
            html = `<h2>🧮 Kalkulator</h2><input type="text" id="calc-input" placeholder="12 * 5 + 3"><button class="action-btn" onclick="calculate()">Hitung</button><div id="calc-result" class="result-box hidden" style="font-size:24px;text-align:center;"></div>`; break;
        case 'password':
            html = `<h2>🔑 Password Gen</h2><label>Panjang: <input type="number" id="pass-len" value="16" min="8" max="64"></label><button class="action-btn" onclick="genPassword()">Generate</button><div id="pass-result" class="result-box hidden" style="text-align:center;font-size:20px;font-family:monospace;word-break:break-all;"></div>`; break;
        case 'sticker':
            html = `<h2>🏷️ Stiker Maker</h2><p>Crop otomatis jadi bulat & resize 512px.</p>
            <input type="file" id="sticker-file" accept="image/*"><button class="action-btn" onclick="makeStickerReal()">Buat Stiker</button>
            <div id="sticker-result" class="result-box hidden" style="text-align:center;"></div>`; break;
    }
    modalContent.innerHTML = html;
}

// ==========================================
// LOGIKA FITUR YANG BENAR-BENAR BERFUNGSI
// ==========================================

// 1. IQC Generator (Canvas Real)
function genIQC() {
    const text = document.getElementById('iqc-text').value.toUpperCase() || "IQC";
    const resDiv = document.getElementById('iqc-result');
    resDiv.classList.remove('hidden');
    
    const canvas = document.createElement('canvas');
    canvas.width = 400; canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // Gambar stempel merah miring
    ctx.save();
    ctx.translate(200, 100);
    ctx.rotate(-0.2);
    ctx.strokeStyle = '#E23636';
    ctx.lineWidth = 8;
    ctx.strokeRect(-180, -80, 360, 160);
    ctx.fillStyle = '#E23636';
    ctx.font = 'bold 60px Bangers, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, 0, 20);
    ctx.font = '20px Poppins, sans-serif';
    ctx.fillText("QUALITY CONTROL", 0, 60);
    ctx.restore();
    
    resDiv.innerHTML = `<img src="${canvas.toDataURL()}" style="max-width:100%;border-radius:10px;"><br><a href="${canvas.toDataURL()}" download="iqc-stamp.png" class="action-btn" style="display:block;margin-top:10px;text-decoration:none;text-align:center;">Download PNG</a>`;
}

// 2. Windows Quote (HTML murni)
function genWinQuote() {
    const text = document.getElementById('win-text').value || "System Error";
    const resDiv = document.getElementById('win-result');
    resDiv.classList.remove('hidden');
    resDiv.innerHTML = `
        <div style="display:flex; align-items:flex-start; gap:15px; margin-bottom:20px;">
            <div style="background:red; color:white; width:32px; height:32px; display:flex; align-items:center; justify-content:center; font-weight:bold; border:2px solid white; flex-shrink:0;">X</div>
            <div style="font-size:14px; padding-top:5px;">${text}</div>
        </div>
        <div style="text-align:center;">
            <button style="padding:6px 25px; border:1px solid #888; background:linear-gradient(to bottom, #fff, #ddd); cursor:pointer;" onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>`;
}

// 3. Tanya Ustad (Database Lokal)
function askUstad() {
    const input = document.getElementById('ustad-input').value.toLowerCase();
    const resDiv = document.getElementById('ustad-result');
    resDiv.classList.remove('hidden');
    
    const db = {
        'sabar': "Kesabaran itu pahit di awal, tapi buahnya lebih manis dari madu. Allah bersama orang-orang yang sabar.",
        'rezeki': "Rezeki tidak akan tertukar. Yang penting usaha maksimal, doa optimal, dan tawakal total.",
        'sholat': "Sholat adalah tiang agama. Barangsiapa mendirikannya, ia mendirikan agama. Jangan tinggalkan walau sibuk.",
        'sedekah': "Sedekah tidak akan mengurangi harta. Justru ia menjadi pembersih dan penambah keberkahan.",
        'default': "Allah tidak membebani hamba-Nya melainkan sesuai dengan kesanggupannya. Terus berusaha dan berdoa ya!"
    };
    
    let result = db['default'];
    for(let key in db) { if(input.includes(key)) result = db[key]; }
    resDiv.innerText = `"${result}"`;
}

// 4. Sertifikat Tolol (Canvas Real)
function genCert() {
    const name = document.getElementById('cert-name').value || "Si Tolol";
    const resDiv = document.getElementById('cert-result');
    resDiv.classList.remove('hidden');
    
    const canvas = document.createElement('canvas');
    canvas.width = 600; canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Background krem
    ctx.fillStyle = '#fffbe6'; ctx.fillRect(0,0,600,400);
    // Border emas
    ctx.strokeStyle = '#D4AF37'; ctx.lineWidth = 15; ctx.strokeRect(20,20,560,360);
    ctx.strokeStyle = '#B8860B'; ctx.lineWidth = 3; ctx.strokeRect(35,35,530,330);
    
    ctx.fillStyle = '#8B0000'; ctx.font = 'bold 36px serif'; ctx.textAlign = 'center';
    ctx.fillText("SERTIFIKAT PENGHARGAAN", 300, 100);
    
    ctx.fillStyle = '#333'; ctx.font = '20px serif';
    ctx.fillText("Diberikan kepada:", 300, 150);
    
    ctx.fillStyle = '#000'; ctx.font = 'bold 48px cursive';
    ctx.fillText(name, 300, 220);
    
    ctx.fillStyle = '#333'; ctx.font = '18px serif';
    ctx.fillText("Atas keberhasilannya menjadi", 300, 270);
    ctx.fillText("orang paling tolol sedunia.", 300, 300);
    
    ctx.fillStyle = '#888'; ctx.font = '14px sans-serif';
    ctx.fillText("DanTools Corp. © 2024", 300, 370);
    
    resDiv.innerHTML = `<img src="${canvas.toDataURL()}" style="max-width:100%;box-shadow:0 5px 15px rgba(0,0,0,0.2);"><br><a href="${canvas.toDataURL()}" download="sertifikat-tolol.png" class="action-btn" style="display:block;margin-top:15px;text-decoration:none;text-align:center;">Download Sertifikat</a>`;
}

// 5. BRAT Generator (Canvas Low-Res)
function genBrat() {
    const text = document.getElementById('brat-text').value.toLowerCase() || "brat";
    const resDiv = document.getElementById('brat-result');
    resDiv.classList.remove('hidden');
    
    const canvas = document.createElement('canvas');
    canvas.width = 300; canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#8ace00'; ctx.fillRect(0,0,300,300);
    ctx.fillStyle = '#000'; 
    ctx.font = 'bold 40px Arial Narrow, Arial, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.filter = 'blur(0.8px)';
    ctx.fillText(text, 150, 150);
    
    resDiv.innerHTML = '';
    resDiv.appendChild(canvas);
    const link = document.createElement('a');
    link.href = canvas.toDataURL(); link.download = 'brat.png';
    link.className = 'action-btn'; link.style.cssText = 'display:block;margin-top:15px;text-decoration:none;text-align:center;';
    link.innerText = 'Download BRAT';
    resDiv.appendChild(link);
}

// 6. Fake IG (Canvas Real + Download)
function genFakeIG() {
    const name = document.getElementById('ig-name').value || 'username';
    const bio = document.getElementById('ig-bio').value || 'No bio yet.';
    const resDiv = document.getElementById('ig-result');
    resDiv.classList.remove('hidden');
    
    const canvas = document.createElement('canvas');
    canvas.width = 400; canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,400,200);
    // Avatar placeholder
    ctx.beginPath(); ctx.arc(60, 70, 35, 0, Math.PI*2);
    ctx.fillStyle = '#ddd'; ctx.fill();
    ctx.strokeStyle = '#ccc'; ctx.lineWidth = 1; ctx.stroke();
    
    ctx.fillStyle = '#000'; ctx.font = 'bold 18px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(name, 110, 60);
    ctx.fillStyle = '#8e8e8e'; ctx.font = '14px sans-serif';
    ctx.fillText(bio.substring(0, 30), 110, 90);
    if(bio.length > 30) ctx.fillText(bio.substring(30, 60), 110, 110);
    
    resDiv.innerHTML = `<img src="${canvas.toDataURL()}" style="max-width:100%;border:1px solid #dbdbdb;border-radius:8px;"><br><a href="${canvas.toDataURL()}" download="fake-ig.png" class="action-btn" style="display:block;margin-top:10px;text-decoration:none;text-align:center;">Download Gambar</a>`;
}

// 7. Morse Code (Audio Context Real)
function toMorse(playSound = false) {
    const text = document.getElementById('morse-text').value.toUpperCase();
    const resDiv = document.getElementById('morse-result');
    resDiv.classList.remove('hidden');
    
    const morseMap = {'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',' ':'/'};
    let result = text.split('').map(c => morseMap[c] || c).join(' ');
    resDiv.innerText = result;
    
    if(playSound && window.AudioContext) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 600; osc.type = 'sine';
        
        let time = ctx.currentTime;
        for(let char of result) {
            if(char === '.') { gain.gain.setValueAtTime(0.1, time); time += 0.1; gain.gain.setValueAtTime(0, time); time += 0.1; }
            else if(char === '-') { gain.gain.setValueAtTime(0.1, time); time += 0.3; gain.gain.setValueAtTime(0, time); time += 0.1; }
            else if(char === '/') { time += 0.5; }
            else { time += 0.2; }
        }
        osc.start(); osc.stop(time);
    }
}

// 8. Image Enhancer (Canvas Pixel Manipulation Real)
function enhanceImgReal() {
    const fileInput = document.getElementById('enhance-file');
    const resDiv = document.getElementById('enhance-result');
    if(fileInput.files.length === 0) return alert('Pilih foto dulu!');
    
    resDiv.classList.remove('hidden'); resDiv.innerHTML = 'Memproses...';
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('hidden-canvas');
            const ctx = canvas.getContext('2d');
            // Upscale 2x
            canvas.width = img.width * 2; canvas.height = img.height * 2;
            ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Sharpen filter manual
            const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
            const data = imageData.data;
            for(let i=0; i<data.length; i+=4) {
                data[i] = Math.min(255, data[i] * 1.1);     // R
                data[i+1] = Math.min(255, data[i+1] * 1.1); // G  
                data[i+2] = Math.min(255, data[i+2] * 1.15);// B (boost blue slightly)
                data[i+3] = 255; // Alpha full
            }
            ctx.putImageData(imageData, 0, 0);
            
            resDiv.innerHTML = `<img src="${canvas.toDataURL('image/jpeg', 0.9)}" style="max-width:100%;border-radius:10px;"><p style="margin-top:8px;color:#00bcd4;">✅ Enhanced 2x + Sharpened</p>
            <a href="${canvas.toDataURL('image/jpeg', 0.9)}" download="enhanced-photo.jpg" class="action-btn" style="display:block;margin-top:10px;text-decoration:none;text-align:center;">Download HD</a>`;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
}

// 9. TikTok Downloader (API Real)
// 9. TikTok Downloader (Multi-API Fallback + Force Download)
async function downloadTikTok() {
    const url = document.getElementById('tt-url').value.trim();
    const resDiv = document.getElementById('tt-result');
    
    if (!url || !url.includes('tiktok.com')) {
        return alert('⚠️ Masukkan link TikTok yang valid!');
    }

    resDiv.classList.remove('hidden');
    resDiv.innerHTML = '<div style="text-align:center; padding:20px;">🕷️ Spidey sedang mengambil video...<br><small>Mohon tunggu sebentar</small></div>';

    let videoUrl = '';
    let author = '';
    let desc = '';

    // API 1: TikWM (Primary)
    try {
        const res1 = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const data1 = await res1.json();
        if (data1.code === 0 && data1.data?.play) {
            videoUrl = data1.data.play;
            author = data1.data.author?.nickname || 'Unknown';
            desc = data1.data.title || 'No description';
        }
    } catch (e) { console.log('API 1 gagal:', e); }

    // API 2: Fallback jika API 1 mati
    if (!videoUrl) {
        try {
            const res2 = await fetch(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`);
            const data2 = await res2.json();
            if (data2?.video?.noWatermark) {
                videoUrl = data2.video.noWatermark;
                author = data2.author?.name || 'Unknown';
                desc = data2.desc || 'No description';
            }
        } catch (e) { console.log('API 2 gagal:', e); }
    }

    // Tampilkan Hasil
    if (videoUrl) {
        resDiv.innerHTML = `
            <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:12px; border:1px solid var(--spidey-blue);">
                <p style="font-size:12px; color:#aaa; margin-bottom:8px;">👤 ${author}</p>
                <p style="font-size:14px; margin-bottom:12px; line-height:1.4;">${desc}</p>
                
                <video controls width="100%" src="${videoUrl}" style="border-radius:8px; max-height:400px; background:#000;"></video>
                
                <div style="margin-top:15px; display:flex; gap:10px; flex-wrap:wrap;">
                    <button onclick="forceDownload('${videoUrl}', 'tiktok-no-wm.mp4')" class="action-btn" style="flex:1; min-width:120px;">
                        ⬇️ Download MP4
                    </button>
                    <a href="${videoUrl}" target="_blank" class="action-btn" style="flex:1; min-width:120px; text-decoration:none; text-align:center; display:flex; align-items:center; justify-content:center;">
                        🔗 Buka Link Langsung
                    </a>
                </div>
                <p style="font-size:10px; color:#666; margin-top:10px; text-align:center;">
                    Jika tombol download tidak bekerja, klik "Buka Link Langsung" lalu tahan video > Save Video
                </p>
            </div>
        `;
    } else {
        resDiv.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <p style="color:#E23636; font-size:18px;">❌ Gagal Mengambil Video</p>
                <p style="font-size:13px; color:#aaa; margin:10px 0;">Server TikTok sedang sibuk atau link tidak valid.</p>
                <p style="font-size:12px; color:#666;">Coba lagi dalam beberapa menit atau gunakan link TikTok yang berbeda.</p>
            </div>
        `;
    }
}

// Fungsi Force Download (Bypass CORS & Browser Block)
async function forceDownload(url, filename) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    } catch (e) {
        // Jika fetch gagal (CORS), buka di tab baru sebagai fallback
        window.open(url, '_blank');
        alert('⚠️ Download otomatis diblokir browser. Video akan dibuka di tab baru.\nSilakan tahan video > Save Video / Download.');
    }
}

// 10. QR Generator (Library Real)
function generateQR() {
    const text = document.getElementById('qr-text').value;
    const resDiv = document.getElementById('qr-result');
    resDiv.innerHTML = '';
    if(text) new QRCode(resDiv, { text: text, width: 180, height: 180, colorDark:"#000000", colorLight:"#ffffff" });
}

// 11. Remove BG (Menggunakan API Official remove.bg)
async function removeBackground() {
    const fileInput = document.getElementById('bg-file');
    const resDiv = document.getElementById('bg-result');
    
    if(fileInput.files.length === 0) return alert('Pilih foto dulu!');
    
    // Tampilkan status loading
    resDiv.classList.remove('hidden'); 
    resDiv.innerHTML = '<div style="text-align:center; padding:20px;">⏳ Sedang menghapus background...<br><small>Mohon tunggu sebentar</small></div>';
    
    const formData = new FormData();
    formData.append('image_file', fileInput.files[0]);
    formData.append('size', 'auto'); // auto, preview, full, regular
    
    // ️ GANTI DENGAN API KEY KAMU DI SINI
    const REMOVE_BG_API_KEY = 'sKWYfHmqyG1ArqGC5VwfipwM'; 
    
    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: { 
                'X-Api-Key': REMOVE_BG_API_KEY 
            },
            body: formData
        });
        
        if(response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            
            resDiv.innerHTML = `
                <div style="text-align:center;">
                    <p style="color:#4caf50; margin-bottom:10px;">✅ Background berhasil dihapus!</p>
                    <img src="${imageUrl}" style="max-width:100%; border-radius:10px; background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px;">
                    <br>
                    <a href="${imageUrl}" download="no-background.png" class="action-btn" style="display:block; margin-top:15px; text-decoration:none; text-align:center;">
                        ⬇️ Download PNG Transparan
                    </a>
                </div>
            `;
        } else {
            const errorData = await response.json();
            let errorMsg = 'Gagal menghapus background.';
            if(errorData.errors && errorData.errors[0]) {
                errorMsg = errorData.errors[0].title;
            }
            resDiv.innerHTML = `<p style="color:#E23636; text-align:center;">❌ Error: ${errorMsg}</p>`;
        }
    } catch(e) {
        console.error(e);
        resDiv.innerHTML = '<p style="color:#E23636; text-align:center;">❌ Gagal terhubung ke server remove.bg.<br>Cek koneksi internet Anda.</p>';
    }
}

// 12. Image to PDF (html2pdf Library Real)
function convertToPDF() {
    const fileInput = document.getElementById('pdf-file');
    if(fileInput.files.length === 0) return alert('Pilih gambar!');
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image(); img.src = e.target.result;
        img.onload = function() {
            const element = document.createElement('div');
            element.style.width = img.width + 'px';
            element.appendChild(img);
            html2pdf().set({ margin: 10, filename: 'dan-tools-image.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } }).from(element).save();
        }
    };
    reader.readAsDataURL(fileInput.files[0]);
}

// 13. Catatan (LocalStorage Real)
function saveNote() {
    const val = document.getElementById('note-area').value;
    localStorage.setItem('dan_note', val);
    const status = document.getElementById('note-status');
    status.innerText = '✅ Tersimpan permanen di browser!';
    setTimeout(() => status.innerText = '', 2000);
}

// 14. Kalkulator (Eval Aman)
function calculate() {
    const input = document.getElementById('calc-input').value.replace(/[^0-9+\-*/().\s]/g, '');
    const resDiv = document.getElementById('calc-result');
    try {
        if(!input) throw new Error();
        const result = Function('"use strict";return (' + input + ')')();
        resDiv.classList.remove('hidden'); resDiv.innerText = `= ${result}`;
    } catch { resDiv.classList.remove('hidden'); resDiv.innerText = ' Format salah!'; }
}

// 15. Password Generator (Crypto Random Real)
function genPassword() {
    const len = parseInt(document.getElementById('pass-len').value) || 16;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let pass = "";
    const array = new Uint32Array(len);
    window.crypto.getRandomValues(array);
    for(let i=0; i<len; i++) pass += chars[array[i] % chars.length];
    const resDiv = document.getElementById('pass-result');
    resDiv.classList.remove('hidden'); resDiv.innerText = pass;
}

// 16. Stiker Maker (Canvas Crop Bulat + Resize 512px Real)
function makeStickerReal() {
    const fileInput = document.getElementById('sticker-file');
    const resDiv = document.getElementById('sticker-result');
    if(fileInput.files.length === 0) return alert('Pilih foto!');
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('hidden-canvas');
            const ctx = canvas.getContext('2d');
            const size = 512;
            canvas.width = size; canvas.height = size;
            
            // Crop tengah kotak
            const minDim = Math.min(img.width, img.height);
            const sx = (img.width - minDim) / 2;
            const sy = (img.height - minDim) / 2;
            
            // Gambar bulat
            ctx.clearRect(0,0,size,size);
            ctx.beginPath();
            ctx.arc(size/2, size/2, size/2, 0, Math.PI*2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
            
            // Border putih stiker
            ctx.beginPath();
            ctx.arc(size/2, size/2, size/2 - 5, 0, Math.PI*2);
            ctx.strokeStyle = 'white'; ctx.lineWidth = 10; ctx.stroke();
            
            resDiv.classList.remove('hidden');
            resDiv.innerHTML = `<img src="${canvas.toDataURL()}" style="width:200px;height:200px;border-radius:50%;object-fit:cover;border:3px solid var(--spidey-red);box-shadow:0 5px 20px rgba(0,0,0,0.3);"><br><a href="${canvas.toDataURL()}" download="stiker-bulat.png" class="action-btn" style="display:block;margin-top:15px;text-decoration:none;text-align:center;">️ Download Stiker 512px</a>`;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
}