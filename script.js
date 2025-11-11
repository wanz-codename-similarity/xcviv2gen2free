// ====== GLOBAL VARIABLES ======
let userData = null;
let selectedEndpoint = "send";
let selectedLabel = "Force Close";

// ====== BASE API URL ======
const API_BASE = '/api/connect';

// ====== AUTHENTICATION FUNCTIONS ======
function showLogin() {
  document.getElementById('loginRoot').style.display = 'flex';
  document.getElementById('dashboardRoot').style.display = 'none';
}

function showDashboard() {
  document.getElementById('loginRoot').style.display = 'none';
  document.getElementById('dashboardRoot').style.display = 'block';

  if (!userData) {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser && storedUser.username) {
      userData = storedUser;
    }
  }

  console.log('[DEBUG] showDashboard() -> userData:', userData);

  setTimeout(() => {
    loadUserData();
  }, 300);
}

window.addEventListener('load', async () => {
  createParticles();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token || !user) {
    showLogin();
  } else {
    try {
      userData = JSON.parse(user);
      console.log('[DEBUG] Restored userData from localStorage:', userData);
      await new Promise(r => setTimeout(r, 300));
      showDashboard();
    } catch (err) {
      console.error('Restore user error:', err);
      showLogin();
    }
  }
});

// ====== LOGIN FUNCTIONALITY ======
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const loading = document.getElementById('loginLoading');
  
  loading.classList.add('active');
  
  try {
    const response = await fetch(`${API_BASE}?login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});
    
    const result = await response.json();
    
    if (result.ok && result.auth) {
      showToast('Login berhasil! Selamat datang, ' + username + '!', 'success');
      
      // Simpan data user
      userData = {
        username: result.auth.username,
        role: result.auth.role,
        createdAt: result.auth.createdAt,
        expired: result.auth.expired
      };
      
      localStorage.setItem('token', result.auth.token || 'dummy-token');
      localStorage.setItem('user', JSON.stringify(userData));
      
      showDashboard();
      
      setTimeout(() => {
  loadUserData();
  loadSenders();
}, 500);
      
    } else {
      showToast(result.error || 'Login gagal! Username atau Password salah.', 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
    showToast('Terjadi kesalahan saat login. Coba lagi.', 'error');
  } finally {
    loading.classList.remove('active');
  }
});

// ====== AUTHENTICATED FETCH ======
async function authenticatedFetch(action = '', body = {}) {
  const token = localStorage.getItem('token');
  if (!token) {
    showLogin();
    throw new Error('Unauthorized');
  }

  const url = action ? `${API_BASE}?${action}` : API_BASE;

  // treat senders as GET (backend expects GET for status/senders)
  const isGetRequest = action === 'senders';

  try {
    const response = await fetch(isGetRequest ? url : url, {
      method: isGetRequest ? 'GET' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': token } : {})
      },
      // only attach body for non-GET
      ...(isGetRequest ? {} : { body: JSON.stringify(body) })
    });

    if (response.status === 401) {
      // unauthorized -> clear session & show login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      showLogin();
      throw new Error('Unauthorized');
    }

    // try/catch JSON parse in case backend returns non-json (defensive)
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.warn('[authenticatedFetch] Non-JSON response for', url, '=>', text);
      return { ok: false, error: 'Invalid response from server', raw: text };
    }
  } catch (err) {
    console.error('[authenticatedFetch] Network or fetch error:', err);
    return { ok: false, error: err.message || 'Network error' };
  }
}

// ====== UTILITY FUNCTIONS ======
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  
  if (type === 'error') {
    toast.style.background = 'linear-gradient(90deg, var(--secondary), #ff6b6b)';
  } else if (type === 'success') {
    toast.style.background = 'linear-gradient(90deg, var(--primary), #4cd964)';
  } else {
    toast.style.background = 'linear-gradient(90deg, var(--secondary), var(--primary))';
  }
  
  toast.style.display = 'block';
  
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

// ====== POPUP KONFIRMASI ======
function showConfirmation(message) {
  return new Promise((resolve) => {
    const popup = document.getElementById('confirmationPopup');
    const msg = document.getElementById('popupMessage');
    const btnCancel = document.getElementById('popupCancel');
    const btnConfirm = document.getElementById('popupConfirm');

    msg.textContent = message;
    popup.style.display = 'flex';

    const closePopup = () => (popup.style.display = 'none');

    btnCancel.onclick = () => {
      closePopup();
      resolve(false);
    };
    btnConfirm.onclick = () => {
      closePopup();
      resolve(true);
    };
  });
}

function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = Math.min(20, Math.floor(window.innerWidth / 25));
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 4 + 1;
    const posX = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// ====== DASHBOARD FUNCTIONS ======
async function loadUserData() {
  try {
    document.getElementById('accountLoading').classList.add('active');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      userData = user;
      updateAccountInfo(user);

      // ✅ kasih delay biar userData sudah siap
      setTimeout(async () => {
        await loadSenders();
        await loadSendersForAttack();
      }, 500);
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  } finally {
    document.getElementById('accountLoading').classList.remove('active');
  }
}

function updateAccountInfo(user) {
  document.getElementById('accountName').textContent = user.username;
  document.getElementById('accountRole').textContent = user.role || 'Premium';
  
  // Format tanggal
  const createdDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : '-';
  const expiryDate = user.expired ? new Date(user.expired).toLocaleDateString('id-ID') : '-';
  
  document.getElementById('accountCreated').textContent = createdDate;
  document.getElementById('accountExpiry').textContent = expiryDate;
}

// ====== SENDER MANAGEMENT ======
async function loadSenders() {
  try {
  if (!userData || !userData.username) {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  if (storedUser && storedUser.username) {
    userData = storedUser;
  }
}
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || userData?.username || null;

    const sendersContainer = document.getElementById('sendersContainer');
    if (!username) {
      sendersContainer.innerHTML = `
        <p style="text-align:center;color:var(--text);">
          Tidak dapat memuat sender, akun belum terdeteksi.
        </p>`;
      return;
    }

    const result = await authenticatedFetch('senders', {
  owner: userData.username
});
    console.log('[CHECK] loadSenders() userData:', userData);
console.log('[CHECK] loadSenders() localStorage user:', localStorage.getItem('user'));

    if (result.ok && Array.isArray(result.senders)) {
      const userSenders = result.senders.filter(s =>
  (s.owner || '').toLowerCase() === (username || '').toLowerCase()
);
      console.log('[DEBUG] Sender milik user:', userSenders);

      if (userSenders.length > 0) {
        sendersContainer.innerHTML = userSenders.map(sender => `
          <div class="sender-item">
            <div class="sender-info">
              <span class="sender-name">${sender.name || sender.phone}</span>
              <span class="sender-number">${sender.phone}</span>
              <span class="sender-status ${sender.status === 'connected' ? 'connected' : 'disconnected'}">
                ${sender.status === 'connected' ? 'Aktif' : 'Tidak Aktif'}
              </span>
            </div>
            <button class="delete-sender-btn" data-name="${sender.name}" data-phone="${sender.phone}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `).join('');
      } else {
        sendersContainer.innerHTML = `
          <p style="text-align:center;color:var(--text);">
            Belum ada sender terhubung untuk akun <b>${username}</b>.
          </p>`;
      }
    } else {
      sendersContainer.innerHTML = `
        <p style="text-align:center;color:var(--text);">Gagal memuat sender.</p>`;
    }
  } catch (err) {
    console.error('[loadSenders] Error:', err);
    document.getElementById('sendersContainer').innerHTML =
      `<p style="text-align:center;color:var(--text);">Error memuat sender.</p>`;
  }
}

async function loadSendersForAttack() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || userData?.username || null;

    const result = await authenticatedFetch('senders');
    const senderSelect = document.getElementById('senderSelect');
    senderSelect.innerHTML = '<option value="" disabled selected>Pilih sender</option>';

    if (result.ok && Array.isArray(result.senders)) {
      const userSenders = result.senders.filter(sender =>
  (sender.owner || '').toLowerCase() === (username || '').toLowerCase() &&
  sender.status === 'connected'
);

      userSenders.forEach(sender => {
        const option = document.createElement('option');
        option.value = sender.name;
        option.textContent = `${sender.name} (${sender.phone})`;
        senderSelect.appendChild(option);
      });

      console.log('[DEBUG] Sender aktif untuk attack:', userSenders);
    } else {
      console.warn('[WARN] Tidak ada sender ditemukan.');
    }
  } catch (error) {
    console.error('Error loading senders for attack:', error);
  }
}

// ====== HAPUS / DISCONNECT SENDER ======
async function deleteSenderHandler(senderName, phoneNumber) {
  const confirmDelete = await showConfirmation(
    `Yakin ingin memutus koneksi sender <b>${senderName}</b> (${phoneNumber})?`
  );
  if (!confirmDelete) return;

  showToast(`Memutus koneksi ${senderName}...`, 'info');

  const result = await authenticatedFetch('disconnect', { name: senderName, phone: phoneNumber });
  if (result.ok) {
    showToast(`Sender ${senderName} berhasil diputus!`, 'success');
    await loadSenders();
  } else {
    showToast(`Gagal memutus sender ${senderName}.`, 'error');
  }
}

// ====== TAB NAVIGATION ======
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.menu-item').forEach(i => {
      i.classList.remove('active');
    });
    
    this.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
    
    if (tabId !== 'tools') {
      document.getElementById('toolContent').innerHTML = '';
    }
    
    if (tabId === 'account') {
      loadSenders();
    }
    
    if (tabId === 'whatsapp') {
      loadSendersForAttack();
    }
  });
});

// ====== ADD SENDER FUNCTIONALITY ======
document.getElementById('addSenderBtn').addEventListener('click', showAddSenderForm);

function showAddSenderForm() {
  const accountTab = document.getElementById('account');
  accountTab.innerHTML = `
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <button id="backToAccount" style="width: auto; padding: 8px 15px; background: rgba(255, 0, 64, 0.7);">
          <i class="fas fa-arrow-left" style="margin-right: 8px;"></i>
          Kembali
        </button>
        <h3 style="color: var(--primary); margin: 0;">Tambah Sender Baru</h3>
      </div>
      
      <div class="pairing-options">
        <div class="pairing-option active" data-method="pairing">
          <i class="fas fa-key"></i>
          <span>Pairing Code</span>
        </div>
      </div>
      
      <form id="addSenderForm">
        <div class="form-group">
          <label for="senderName">Nama Sender</label>
          <i class="fas fa-user"></i>
          <input type="text" id="senderName" placeholder="Nama untuk sender" required />
        </div>
        
        <div id="pairingSection">
          <div class="form-group">
            <label for="senderNumber">Nomor WhatsApp (dengan kode negara)</label>
            <i class="fas fa-phone"></i>
            <input type="text" id="senderNumber" placeholder="628xxxxxxxxxx" required />
          </div>
          <div class="pairing-instruction">
            <i class="fas fa-info-circle"></i>
            Masukkan nomor dengan kode negara (contoh: 628xxx)
          </div>
          <button type="submit" id="requestPairingBtn">
            <i class="fas fa-key" style="margin-right: 8px;"></i>
            Request Pairing Code
          </button>
        </div>
      </form>
      
      <div id="pairingResult" style="display: none; margin-top: 20px;">
        <div class="status">
          <h3>Pairing Code</h3>
          <p id="pairingCodeDisplay" style="font-size: 24px; font-weight: bold; text-align: center; color: var(--primary); margin: 10px 0;"></p>
          <button class="copy-btn" id="copyPairingCode">
            <i class="fas fa-copy" style="margin-right: 8px;"></i>
            Copy Code
          </button>
          <p style="text-align: center; margin-top: 10px;">
            Masukkan kode ini di WhatsApp > Linked Devices > Link a Device
          </p>
          <div id="pairingStatus" style="margin-top: 15px;">
            <p>Status: <span id="pairingStatusText">Menunggu koneksi...</span></p>
            <p class="retry-count" id="pairingRetryCount"></p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Event listeners untuk form tambah sender
  document.getElementById('backToAccount').addEventListener('click', function() {
    location.reload();
  });
  
  document.getElementById('addSenderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    await requestPairingCodeHandler();
  });
  
  document.getElementById('copyPairingCode').addEventListener('click', copyPairingCode);
}

async function requestPairingCodeHandler() {
  const senderName = document.getElementById('senderName').value.trim();
  const phoneNumber = document.getElementById('senderNumber').value.trim();

  if (!senderName || !phoneNumber) {
    showToast('Isi semua field!', 'error');
    return;
  }

  
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  if (cleanPhone.length < 8 || cleanPhone.length > 15) {
    showToast('Nomor tidak valid. Pastikan hanya angka dan panjang 8–15 digit.', 'error');
    return;
  }

  if (cleanPhone.startsWith('0')) {
    showToast('Nomor tidak boleh diawali dengan 0. Gunakan format kode negara, contoh: 62xxx / 1xxx / 91xxx', 'error');
    return;
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const owner = user.username || userData?.username || 'unknown';
  console.log('[PAIR DEBUG] owner:', owner, 'sender:', senderName, 'phone:', cleanPhone);

  try {
    const result = await authenticatedFetch('pair', {
      name: senderName,
      phone: cleanPhone,
      owner
    });

    if (result.ok && result.pairing_code) {
      showToast('Pairing code berhasil diminta!', 'success');

      document.getElementById('pairingResult').style.display = 'block';
      document.getElementById('pairingCodeDisplay').textContent = result.pairing_code;

      startPairingStatusPolling(senderName, cleanPhone);
    } else {
      showToast(result.error || 'Gagal meminta pairing code', 'error');
    }
  } catch (error) {
    console.error('Request pairing error:', error);
    showToast('Terjadi kesalahan saat meminta pairing code', 'error');
  }
}

function copyPairingCode() {
  const pairingElement = document.getElementById('pairingCodeDisplay');
  if (!pairingElement) {
    showToast('Kode pairing belum tersedia.', 'error');
    return;
  }

  const pairingCode = pairingElement.textContent.trim();

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(pairingCode)
      .then(() => showToast('Pairing code berhasil disalin!', 'success'))
      .catch(() => showToast('Gagal menyalin kode ke clipboard.', 'error'));
  } else {
    const tempInput = document.createElement('input');
    tempInput.value = pairingCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('Pairing code berhasil disalin!', 'success');
    } catch (e) {
      showToast('Clipboard tidak didukung di browser ini.', 'error');
    }
    document.body.removeChild(tempInput);
  }
}

function startPairingStatusPolling(senderName, phoneNumber) {
  let pollingCount = 0;
  const maxPolling = 60; // 5 menit (5 detik interval)
  
  const pollingInterval = setInterval(async () => {
    pollingCount++;
    
    if (pollingCount > maxPolling) {
      clearInterval(pollingInterval);
      document.getElementById('pairingStatusText').textContent = '⏰ Timeout: Pairing gagal';
      document.getElementById('pairingStatusText').style.color = '#ff0040';
      showToast('Pairing timeout, silakan coba lagi', 'error');
      return;
    }
    
    document.getElementById('pairingRetryCount').textContent = `Percobaan: ${pollingCount}/${maxPolling}`;
    
    try {
      // Check status dengan mengambil daftar sender terbaru
      const result = await authenticatedFetch('senders');
      
      if (result.ok && result.senders) {
        const connectedSender = result.senders.find(sender => {
  const apiPhone = String(sender.phone || '').replace(/\D/g, '');
  const inputPhone = String(phoneNumber || '').replace(/\D/g, '');
  const apiOwner = (sender.owner || '').toLowerCase();
  const localOwner = (userData.username || '').toLowerCase();

  return (
    apiPhone === inputPhone &&
    apiOwner === localOwner &&
    sender.status === 'connected'
  );
});
        
        if (connectedSender) {
  document.getElementById('pairingStatusText').textContent = '✅ Terhubung!';
  document.getElementById('pairingStatusText').style.color = '#00ff00';
  showToast(`Sender ${senderName} berhasil terhubung!`, 'success');
  clearInterval(pollingInterval);

  // Kembalikan tampilan dashboard ke tab akun utama
  const dashboardRoot = document.getElementById('dashboardRoot');
  const accountTab = document.getElementById('account');

  accountTab.innerHTML = `
    <div class="card">
      <div class="loading" id="accountLoading">
        <div class="spinner"></div>
        <span>Memuat data...</span>
      </div>

      <div class="profile">
        <img src="https://raw.githubusercontent.com/NdikzDatabase/Database/main/Database/1762488853081-d8u4pk.jpg" alt="XCVI Avatar">
      </div>

      <div class="title">INFORMATION USER</div>

      <div class="account-info">
        <div class="info-item"><span class="info-label">Nama Akun:</span><span class="info-value" id="accountName">-</span></div>
        <div class="info-item"><span class="info-label">Role:</span><span class="info-value" id="accountRole">-</span></div>
        <div class="info-item"><span class="info-label">Tanggal Dibuat:</span><span class="info-value" id="accountCreated">-</span></div>
        <div class="info-item"><span class="info-label">Tanggal Berakhir:</span><span class="info-value" id="accountExpiry">-</span></div>
      </div>

      <div class="senders-list">
        <h3 style="margin-bottom: 10px; color: var(--primary);">Sender Terkoneksi</h3>
        <div id="sendersContainer"></div>
      </div>

      <button id="addSenderBtn">
        <i class="fas fa-plus" style="margin-right: 8px;"></i>
        Tambah Sender
      </button>

      <button id="accountLogoutBtn" style="margin-top: 10px; background: rgba(255, 0, 64, 0.7);">
        <i class="fas fa-sign-out-alt" style="margin-right: 8px;"></i>
        Logout
      </button>
    </div>
  `;

  // Bind event tombol kembali
  document.getElementById('addSenderBtn').addEventListener('click', showAddSenderForm);
  document.getElementById('accountLogoutBtn').addEventListener('click', async () => {
  const confirmLogout = await showConfirmation('Apakah kamu yakin ingin logout dari akun ini?');
  if (!confirmLogout) return;

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  showToast('Logout berhasil. Sampai jumpa lagi!', 'success');
  showLogin();
});

  // Refresh data akun & sender
  await loadUserData();
}
      }
    } catch (error) {
      console.error('Pairing polling error:', error);
    }
  }, 5000); // Poll setiap 5 detik
}

// ====== ATTACK FUNCTIONALITY ======
// Modal helpers (sinkron dengan index.html)
function showModal({ target = '-', sender = '-', status = 'Sukses', extra = '' } = {}) {
  const modal = document.getElementById('attackModal');
  if (!modal) return;
  document.getElementById('modalTarget').textContent = target;
  document.getElementById('modalSender').textContent = sender;
  document.getElementById('modalStatus').textContent = status;
  document.getElementById('modalExtra').textContent = extra || '';
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
}
function hideModal() {
  const modal = document.getElementById('attackModal');
  if (!modal) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}
// Close modal on overlay or close button
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'modalCloseBtn') hideModal();
  if (e.target && e.target.id === 'attackModalOverlay') hideModal();
});

// --- Replacement attack handler: optimistic UI + background processing ---
document.getElementById('attackForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const targetNumber = document.getElementById('targetNumber').value.trim();
  const attackOption = document.getElementById('attackOption').value;
  const senderName = document.getElementById('senderSelect').value;
  const loading = document.getElementById('attackLoading');
  const attackStatus = document.getElementById('attackStatus');
  const attackDetails = document.getElementById('attackDetails');

  // Validasi (jangan ubah)
  if (!targetNumber) { showToast('Masukkan nomor target!', 'error'); return; }
  if (!attackOption) { showToast('Pilih opsi serangan!', 'error'); return; }
  if (!senderName) { showToast('Pilih sender!', 'error'); return; }

  const cleanTarget = targetNumber.replace(/\D/g, '');
  if (!/^\d+$/.test(cleanTarget) || cleanTarget.startsWith('0') || cleanTarget.length < 8 || cleanTarget.length > 15) {
    showToast('Format nomor target tidak valid (contoh: 628xx).', 'error');
    return;
  }

  // Cari nomor sender (tetap synchronous awal)
  (async () => {
    let senderPhone = null;
    try {
      const all = await authenticatedFetch('senders');
      if (all.ok && Array.isArray(all.senders)) {
        const found = all.senders.find(s => (s.name || '') === senderName);
        if (found) senderPhone = String(found.phone || '');
      }
    } catch (err) {
      console.warn('[attack] gagal ambil phone sender:', err);
    }

    if (!senderPhone) {
      showToast('Gagal mendapatkan nomor sender. Refresh daftar sender dan coba lagi.', 'error');
      return;
    }

    const endpointMap = {
      'force-close': 'send',
      'invisible': 'send2',
      'blank-click': 'send3',
      'null-steam': 'send4',
      'ghost-flood': 'send5',
      'ios-attack': 'send6'
    };
    const endpoint = endpointMap[attackOption] || 'send';

    // --- Optimistic / quick feedback ---
    loading.classList.add('active');                 // tampilkan overlay loading di card
    attackStatus.textContent = 'Sukses';            // optimistic UI: langsung tunjukkan sukses singkat
    attackDetails.textContent = `Target: ${cleanTarget} | Opsi: ${attackOption.toUpperCase()} | Sender: ${senderName}`;

    // juga tunjukkan modal ringkas sebagai konfirmasi cepat (optimistic)
    setTimeout(() => {
      loading.classList.remove('active');
      showModal({
        target: cleanTarget,
        sender: senderPhone,
        status: 'Sukses',
        extra: 'Permintaan terkirim. Proses akan berjalan di latar belakang.'
      });
    }, 700);

    // Buat entry UI yang akan diupdate ketika backend selesai
    const statusEntryId = 'attack-entry-' + Date.now();
    attackDetails.insertAdjacentHTML('afterend', `
      <div id="${statusEntryId}" class="attack-entry" style="margin-top:10px;">
        <div class="attack-entry-header"><strong>Proses:</strong> <span class="entry-status">Sukses attack</span></div>
        <div class="attack-entry-body">
          <div class="progress-bar" style="width:100%; background:rgba(255,255,255,0.06); height:8px; border-radius:6px; overflow:hidden; margin-top:8px;">
            <div class="progress-fill" style="width:40%; height:100%; transition: width 400ms ease;"></div>
          </div>
          <div class="entry-log" style="font-size:12px; color:var(--text); margin-top:8px;">Serangan berhasil di proses...</div>
        </div>
      </div>
    `);

    const entry = document.getElementById(statusEntryId);
    const progressFill = entry.querySelector('.progress-fill');
    const entryStatus = entry.querySelector('.entry-status');
    const entryLog = entry.querySelector('.entry-log');

    // Kirim request di background — ketika respon datang, update entry & modal
    (async () => {
      try {
        const payload = { name: senderName, phone: senderPhone, to: cleanTarget };

        // indikasi awal
        progressFill.style.width = '50%';
        entryLog.textContent = 'Menghubungi server...';

        const res = await authenticatedFetch(endpoint, payload);

        // jika backend mengembalikan array progress, kita bisa iterasi (tampilkan ringkasan)
        if (res && Array.isArray(res.progress) && res.progress.length) {
          entryLog.textContent = 'Progres:\n' + res.progress.map((p, i) => `${i+1}. ${p}`).join(' — ');
          const extraWidth = Math.min(40, res.progress.length * 8);
          progressFill.style.width = Math.min(100, 60 + extraWidth) + '%';
        }

        // final update berdasarkan res.ok
        if (res && res.ok) {
          progressFill.style.width = '100%';
          entryStatus.textContent = 'Selesai';
          entryLog.textContent = res.message || (res.raw && res.raw.message) || 'Permintaan berhasil diproses.';
          attackStatus.textContent = `Selesai: ${res.message || 'Serangan selesai'}`;

          // update modal jika masih terbuka
          showModal({
            target: cleanTarget,
            sender: senderPhone,
            status: 'Selesai',
            extra: res.message || 'Serangan selesai.'
          });
        } else {
          progressFill.style.width = '100%';
          entryStatus.textContent = 'Gagal';
          const errMsg = (res && (res.error || res.message)) || 'Terjadi kesalahan saat memproses.';
          entryLog.textContent = errMsg;
          attackStatus.textContent = `Gagal: ${errMsg}`;

          showModal({
            target: cleanTarget,
            sender: senderPhone,
            status: 'Gagal',
            extra: errMsg
          });
        }
      } catch (err) {
        console.error('[attack background] error:', err);
        progressFill.style.width = '100%';
        entryStatus.textContent = 'Gagal';
        entryLog.textContent = 'Terjadi kesalahan jaringan saat memproses.';
        attackStatus.textContent = 'Gagal (network).';

        showModal({
          target: cleanTarget,
          sender: senderPhone,
          status: 'Gagal',
          extra: 'Kesalahan jaringan saat memproses.'
        });
      }
    })();

  })();
});

// ====== TOOLS FUNCTIONALITY ======
document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('click', function() {
    const tool = this.getAttribute('data-tool');
    showToolContent(tool);
  });
});

function showToolContent(tool) {
  const toolContent = document.getElementById('toolContent');
  let content = '';

  switch (tool) {
    // 🔹 CEK BANNED
    case 'banned':
      content = `
        <div class="card">
          <h3 style="text-align:center;margin-bottom:15px;color:var(--primary);">
            Cek Status Banned WhatsApp
          </h3>
          <form id="bannedForm">
            <div class="form-group">
              <label for="whatsappNumber">Nomor WhatsApp</label>
              <i class="fas fa-phone"></i>
              <input type="text" id="whatsappNumber" placeholder="628xxxxxxxxxx" required />
            </div>
            <button type="submit"><i class="fas fa-search" style="margin-right:8px;"></i>Cek Banned</button>
          </form>
          <div id="bannedResult" class="status" style="display:none;margin-top:15px;">
            <h3>Hasil Pengecekan</h3>
            <p id="bannedStatus">-</p>
          </div>
        </div>`;
      break;

    // 🔹 TIKTOK DOWNLOADER
    case 'ttdownloader':
      content = `
        <div class="card">
          <h3 style="text-align:center;margin-bottom:15px;color:var(--primary);">TikTok Downloader</h3>
          <form id="ttDownloadForm">
            <div class="form-group">
              <label for="tiktokUrl">URL TikTok</label>
              <i class="fab fa-tiktok"></i>
              <input type="text" id="tiktokUrl" placeholder="https://vm.tiktok.com/xxxxx" required />
            </div>
            <button type="submit"><i class="fas fa-download" style="margin-right:8px;"></i>Download Video</button>
          </form>
          <div id="ttResult" class="status" style="display:none;margin-top:15px;">
            <h3>Hasil Download</h3>
            <p id="ttStatus">-</p>
          </div>
        </div>`;
      break;

    // 🔹 SPAM NGL
    case 'spamngl':
      content = `
        <div class="card">
          <h3 style="text-align:center;margin-bottom:15px;color:var(--primary);">Spam NGL</h3>
          <form id="spamForm">
            <div class="form-group">
              <label for="nglLink">Link NGL</label>
              <i class="fas fa-link"></i>
              <input type="text" id="nglLink" placeholder="https://ngl.link/username" required />
            </div>
            <div class="form-group">
              <label for="message">Pesan</label>
              <i class="fas fa-comment"></i>
              <input type="text" id="message" placeholder="Pesan untuk dikirim" required />
            </div>
            <div class="form-group">
              <label for="count">Jumlah</label>
              <i class="fas fa-hashtag"></i>
              <input type="number" id="count" placeholder="10" min="1" max="100" required />
            </div>
            <button type="submit"><i class="fas fa-paper-plane" style="margin-right:8px;"></i>Mulai Spam</button>
          </form>
          <div id="spamResult" class="status" style="display:none;margin-top:15px;">
            <h3>Status Spam</h3>
            <p id="spamStatus">-</p>
          </div>
        </div>`;
      break;

    // 🔹 CEK IP WEBSITE
    case 'checkip':
      content = `
        <div class="card">
          <h3 style="text-align:center;margin-bottom:15px;color:var(--primary);">Cek IP Website</h3>
          <form id="ipForm">
            <div class="form-group">
              <label for="websiteUrl">URL Website</label>
              <i class="fas fa-globe"></i>
              <input type="text" id="websiteUrl" placeholder="https://example.com" required />
            </div>
            <button type="submit"><i class="fas fa-search" style="margin-right:8px;"></i>Cek IP</button>
          </form>
          <div id="ipResult" class="status" style="display:none;margin-top:15px;">
            <h3>Hasil Pengecekan</h3>
            <p id="ipStatus">-</p>
          </div>
        </div>`;
      break;

    // 🔹 STALK INSTAGRAM
    case 'stalkig':
      content = `
        <div class="card">
          <h3 style="text-align:center;margin-bottom:15px;color:var(--primary);">Stalk Instagram</h3>
          <form id="stalkIgForm">
            <div class="form-group">
              <label for="instagramUsername">Username Instagram</label>
              <i class="fab fa-instagram"></i>
              <input type="text" id="instagramUsername" placeholder="username" required />
            </div>
            <button type="submit"><i class="fas fa-search" style="margin-right:8px;"></i>Stalk Profile</button>
          </form>
          <div id="stalkIgResult" class="status" style="display:none;margin-top:15px;">
            <h3>Hasil Stalking</h3>
            <p id="stalkIgStatus">-</p>
          </div>
        </div>`;
      break;

    // 🔹 STALK TIKTOK
    case 'stalktt':
      content = `
        <div class="card">
          <h3 style="text-align:center;margin-bottom:15px;color:var(--primary);">Stalk TikTok</h3>
          <form id="stalkTtForm">
            <div class="form-group">
              <label for="tiktokUsername">Username TikTok</label>
              <i class="fab fa-tiktok"></i>
              <input type="text" id="tiktokUsername" placeholder="username" required />
            </div>
            <button type="submit"><i class="fas fa-search" style="margin-right:8px;"></i>Stalk Profile</button>
          </form>
          <div id="stalkTtResult" class="status" style="display:none;margin-top:15px;">
            <h3>Hasil Stalking</h3>
            <p id="stalkTtStatus">-</p>
          </div>
        </div>`;
      break;

    // 🔹 IQC (Image Quick Creator)
    case 'iqc':
      content = `
        <div class="card">
          <h3 style="text-align:center;color:var(--primary);margin-bottom:15px;">
            IQC
          </h3>
          <form id="iqcForm" style="margin-top:10px;">
            <div class="form-group">
              <label><i class="fab fa-apple"></i> Masukkan Deskripsi</label>
              <input type="text" id="iqcPrompt" placeholder="contoh: Manusia kuat" required>
            </div>
            <button type="submit" class="btn-primary">Generate IQC</button>
          </form>
          <div id="iqcResult" style="display:none;margin-top:15px;">
            <p id="iqcStatus" style="text-align:center;">Hasil akan muncul di sini...</p>
            <img id="iqcImage" style="max-width:100%;border-radius:12px;margin-top:10px;display:none;">
          </div>
        </div>`;
      break;

    // 🔹 DEFAULT
    default:
      content = `<div class="card"><p style="text-align:center;">Pilih tool untuk melihat detailnya</p></div>`;
  }

  // Render HTML
  toolContent.innerHTML = content;

  // 🔗 Event Binding dinamis
  const handlers = {
    banned: handleBannedCheck,
    ttdownloader: handleTTDownload,
    spamngl: handleSpam,
    checkip: handleIPCheck,
    stalkig: handleStalkIG,
    stalktt: handleStalkTT,
    iqc: handleIQC
  };

  const form = toolContent.querySelector('form');
  if (form && handlers[tool]) {
    form.addEventListener('submit', handlers[tool]);
  }
}

async function handleBannedCheck(e) {
  e.preventDefault();
  const number = document.getElementById('whatsappNumber').value.trim();
  const resultDiv = document.getElementById('bannedResult');
  const statusP = document.getElementById('bannedStatus');

  // Normalisasi dan validasi nomor (internasional)
  const cleanNumber = number.replace(/\D/g, '');
  if (!/^\d+$/.test(cleanNumber) || cleanNumber.startsWith('0') || cleanNumber.length < 8 || cleanNumber.length > 15) {
    showToast('Format nomor tidak valid. Gunakan format internasional (contoh: 628xx, 1xxxx, 44xxxx).', 'error');
    return;
  }

  // --- PERIKSA ADA SESSION / SENDER TERHUBUNG UNTUK USER INI ---
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || userData?.username || null;

    // Ambil daftar senders (frontend menganggap endpoints 'senders' menggunakan GET)
    const sendersResp = await authenticatedFetch('senders');
    if (!(sendersResp && sendersResp.ok && Array.isArray(sendersResp.senders))) {
      showToast('Tidak dapat memverifikasi session. Coba lagi nanti.', 'error');
      return;
    }

    const connectedSenders = sendersResp.senders.filter(s =>
      (s.owner || '').toLowerCase() === (username || '').toLowerCase() &&
      (s.status === 'connected' || s.connected === true)
    );

    if (!connectedSenders.length) {
      showToast('Tidak ada session sender yang terhubung untuk akun ini. Harap tambahkan sender terlebih dahulu.', 'error');
      return;
    }
    // -------------------------------------------------------

    // Kirim request cekban ke server (server nantinya yang melakukan validasi actual)
    const resp = await authenticatedFetch('cekban', { phone: cleanNumber });

    if (resp && resp.ok) {
      const banned = !!resp.isBanned;
      const needOfficial = !!resp.isNeedOfficialWa;
      const statusText = banned ? 'BANNED' : 'TIDAK BANNED';
      const color = banned ? '#ff0040' : '#00b4ff';
      const infoLines = [
        `Diperiksa dengan: ${resp.checkedWith || 'panel'}`,
        `Butuh Official WA: ${needOfficial ? 'YA' : 'TIDAK'}`
      ];
      const rawPreview = resp.raw ? JSON.stringify(resp.raw).slice(0, 350) : '';

      resultDiv.style.display = 'block';
      resultDiv.innerHTML = `
        <p id="bannedStatus" style="font-weight:700; color:${color};">Status: ${statusText}</p>
        <p style="font-size:13px; color:var(--text); margin-top:6px;">${infoLines.join(' • ')}</p>
        <pre style="display:block; margin-top:8px; font-size:12px; color:rgba(255,255,255,0.75); background: rgba(0,0,0,0.2); padding:8px; border-radius:6px; max-height:120px; overflow:auto;">${rawPreview}</pre>
      `;
      showToast(`Pengecekan selesai untuk ${cleanNumber}`, 'success');
    } else {
      showToast(resp && resp.error ? resp.error : 'Gagal memeriksa status', 'error');
    }
  } catch (err) {
    console.error('Banned check error:', err);
    showToast('Terjadi kesalahan saat memeriksa status', 'error');
  }
}

async function handleTTDownload(e) {
  e.preventDefault();
  const urlInput = document.getElementById('tiktokUrl');
  const resultDiv = document.getElementById('ttResult');
  const statusP = document.getElementById('ttStatus');

  const url = urlInput.value.trim();
  if (!url) {
    showToast('Masukkan URL TikTok!', 'error');
    return;
  }

  statusP.textContent = 'Mengambil data video...';
  statusP.style.color = 'var(--text)';
  resultDiv.style.display = 'block';

  try {
    const resp = await authenticatedFetch('ttdownload', { url });

    if (!resp.ok || !resp.result) {
      showToast(resp.error || 'Gagal mengambil video.', 'error');
      statusP.textContent = 'Gagal mengambil data video.';
      statusP.style.color = '#ff0040';
      return;
    }

    const r = resp.result;
    const videoUrl = r.data;
    const title = r.title || 'Video TikTok';
    const author = r.author?.nickname || r.author?.fullname || 'Unknown';
    const duration = r.duration || '-';

    // Buat tampilan preview
    resultDiv.innerHTML = `
      <div style="text-align:left;">
        <h4 style="color:var(--primary);">${title}</h4>
        <p style="font-size:13px;">Author: ${author} • Durasi: ${duration}</p>
        <video id="ttPreviewVideo" controls playsinline style="width:100%;max-height:400px;border-radius:8px;background:#000;margin-top:10px;">
          <source src="${videoUrl}" type="video/mp4">
          Browser tidak mendukung video preview.
        </video>
        <div style="display:flex;gap:10px;margin-top:12px;">
          <button id="ttDownloadBtn" style="flex:1;">Download ke Galeri</button>
          <a href="${videoUrl}" target="_blank" style="flex:1;text-align:center;text-decoration:none;background:rgba(0,0,0,0.3);padding:10px;border-radius:8px;color:var(--text);">Buka Asli</a>
        </div>
      </div>
    `;

    // Tombol download
    document.getElementById('ttDownloadBtn').onclick = async function () {
      try {
        showToast('Mempersiapkan video...', 'info');
        const res = await fetch(videoUrl);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `${title.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 60)}.mp4`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
        showToast('Video diunduh! Cek folder Downloads/Galeri.', 'success');
      } catch (err) {
        console.error('Download gagal:', err);
        showToast('Gagal mengunduh video. Coba klik "Buka Asli".', 'error');
      }
    };
  } catch (err) {
    console.error('TTDownload error:', err);
    statusP.textContent = 'Terjadi kesalahan.';
    statusP.style.color = '#ff0040';
    showToast('Gagal memuat video.', 'error');
  }
}

async function handleSpam(e) {
  e.preventDefault();
  const linkInput = document.getElementById('nglLink'); // ini di HTML lo
  const messageInput = document.getElementById('message');
  const countInput = document.getElementById('count');
  const resultDiv = document.getElementById('spamResult');
  const statusP = document.getElementById('spamStatus');

  const link = (linkInput && linkInput.value || '').trim();
  const message = (messageInput && messageInput.value || '').trim();
  let count = parseInt(countInput && countInput.value, 10) || 1;

  if (!link || !message) {
    showToast('Isi semua field!', 'error');
    return;
  }
  if (count < 1) count = 1;
  if (count > 50) count = 50;

  
  let username = link;
  try {
    const u = new URL(link);
    username = u.pathname.replace(/^\/+|\/+$/g, '') || u.hostname || link;
  } catch (err) {

    username = link;
  }

  // update UI
  resultDiv.style.display = 'block';
  statusP.textContent = `Mengirim ${count} pesan ke ${username}...`;
  statusP.style.color = 'var(--text)';

  try {
    // panggil backend proxy
    const resp = await authenticatedFetch('spamngl', { username, message, count });

    if (!resp || !resp.ok) {
      const errMsg = (resp && (resp.error || resp.raw && resp.raw.message)) || 'Gagal menjalankan spam';
      statusP.textContent = `Gagal: ${errMsg}`;
      statusP.style.color = 'var(--secondary)';
      showToast(errMsg, 'error');
      return;
    }

    // sukses — tampilkan summary dari API
    const raw = resp.raw || {};
    const msg = raw.message || raw.msg || 'Permintaan dikirim.';
    statusP.textContent = `Selesai: ${msg}`;
    statusP.style.color = 'var(--primary)';
    showToast('Spam NGL terproses. Periksa hasil pada respons server.', 'success');

    // tampilkan raw response (opsional, bisa di-hide)
    resultDiv.innerHTML = `
      <div style="text-align:left;">
        <p style="font-size:13px; color:var(--text)"><strong>Server:</strong> ${raw.creator || ''}</p>
        <pre style="white-space:pre-wrap; font-size:12px; color:var(--text); background:rgba(0,0,0,0.2); padding:8px; border-radius:6px;">${JSON.stringify(raw, null, 2)}</pre>
      </div>
    `;
  } catch (err) {
    console.error('handleSpam error:', err);
    statusP.textContent = 'Terjadi kesalahan saat mengirim spam.';
    statusP.style.color = 'var(--secondary)';
    showToast('Gagal memproses permintaan spam', 'error');
  }
}

async function handleIPCheck(e) {
  e.preventDefault();
  const url = document.getElementById('websiteUrl').value.trim();
  const resultDiv = document.getElementById('ipResult');
  const statusP = document.getElementById('ipStatus');

  if (!url) {
    showToast('Masukkan URL website yang valid!', 'error');
    return;
  }

  resultDiv.style.display = 'block';
  statusP.textContent = '🔍 Mengecek IP...';
  statusP.style.color = 'var(--text)';

  try {
    const resp = await authenticatedFetch('checkip', { url });

    if (!resp.ok || !resp.result) {
      showToast(resp.error || 'Gagal mendapatkan informasi host.', 'error');
      statusP.textContent = 'Gagal mengambil data IP.';
      statusP.style.color = '#ff0040';
      return;
    }

    const r = resp.result;
    statusP.innerHTML = `
      <b>IP:</b> ${r.ip || '-'}<br>
      <b>ISP:</b> ${r.isp || '-'}<br>
      <b>Organisasi:</b> ${r.organisation || '-'}<br>
      <b>Wilayah:</b> ${r.region || '-'}<br>
      <b>Kota:</b> ${r.city || '-'}<br>
      <b>Zona Waktu:</b> ${r.timezone || '-'}<br>
      <b>Range:</b> ${r.range || '-'}
    `;
    statusP.style.color = '#00b4ff';
    showToast('✅ Informasi IP berhasil diambil!', 'success');
  } catch (err) {
    console.error('[handleIPCheck] error:', err);
    statusP.textContent = '❌ Terjadi kesalahan.';
    statusP.style.color = '#ff0040';
    showToast('Terjadi kesalahan saat memeriksa IP.', 'error');
  }
}

async function handleStalkIG(e) {
  e.preventDefault();
  const username = document.getElementById('instagramUsername').value.trim();
  const resultDiv = document.getElementById('stalkIgResult');
  const statusP = document.getElementById('stalkIgStatus');

  if (!username) {
    showToast('Masukkan username Instagram!', 'error');
    return;
  }

  statusP.textContent = 'Mengambil data profil...';
  resultDiv.style.display = 'block';

  try {
    const resp = await authenticatedFetch('igstalk', { username });

    if (!resp.ok || !resp.result || !resp.result.profile) {
      showToast(resp.error || 'Gagal mengambil data IG.', 'error');
      statusP.textContent = 'Gagal mengambil data IG.';
      statusP.style.color = '#ff0040';
      return;
    }

    const profile = resp.result.profile;
    const posts = resp.result.latest_posts || [];

    resultDiv.innerHTML = `
      <div style="text-align:center;">
        <img src="${profile.profile_picture_hd}" 
             style="width:120px;height:120px;border-radius:50%;margin-bottom:10px;">
        <h3 style="color:var(--primary);">@${profile.username}</h3>
        <p>${profile.full_name || ''}</p>
        <p style="font-size:13px;color:var(--text);">${profile.biography || ''}</p>
        <p style="font-size:13px;">Followers: ${profile.followers} • Following: ${profile.following} • Posts: ${profile.posts}</p>
        <a href="${profile.external_url}" target="_blank" style="font-size:13px;color:var(--primary);text-decoration:none;">${profile.external_url || ''}</a>
      </div>
      <hr style="margin:15px 0;border-color:rgba(255,255,255,0.1)">
      <div class="ig-posts-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:10px;">
        ${posts.slice(0, 9).map(p => `
          <div class="ig-post-item" style="position:relative;">
            ${
              p.type === 'video' 
              ? `<video src="${p.media[0].url}" controls style="width:100%;border-radius:8px;"></video>`
              : `<img src="${p.media[0].url}" style="width:100%;border-radius:8px;object-fit:cover;">`
            }
          </div>
        `).join('')}
      </div>
    `;
    showToast(`Profil ${profile.username} berhasil dimuat!`, 'success');
  } catch (err) {
    console.error('[IGSTALK] error:', err);
    showToast('Terjadi kesalahan saat mengambil data Instagram.', 'error');
  }
}

async function handleStalkTT(e) {
  e.preventDefault();
  const username = document.getElementById('tiktokUsername').value.trim();
  const resultDiv = document.getElementById('stalkTtResult');
  const statusP = document.getElementById('stalkTtStatus');

  if (!username) {
    showToast('Masukkan username TikTok!', 'error');
    return;
  }

  statusP.textContent = 'Mengambil data profil...';
  resultDiv.style.display = 'block';

  try {
    const resp = await authenticatedFetch('tiktokstalk', { username });

    if (!resp.ok || !resp.result) {
      showToast(resp.error || 'Gagal mengambil data TikTok.', 'error');
      statusP.textContent = 'Gagal mengambil data TikTok.';
      statusP.style.color = '#ff0040';
      return;
    }

    const profile = resp.result;
    const stats = profile.stats || {};

    resultDiv.innerHTML = `
      <div style="text-align:center;">
        <img src="${profile.avatar}" 
             style="width:120px;height:120px;border-radius:50%;margin-bottom:10px;">
        <h3 style="color:var(--primary);">@${profile.username}</h3>
        <p>${profile.name || ''}</p>
        <p style="font-size:13px;color:var(--text);">${profile.description || ''}</p>
        <p style="font-size:13px;">
          Followers: ${stats.followers || 0} • Following: ${stats.following || 0} • Likes: ${stats.likes || 0}
        </p>
        <p style="font-size:13px;">Region: ${profile.region?.toUpperCase() || 'N/A'}</p>
        <a href="${profile.link}" target="_blank" 
           style="font-size:13px;color:var(--primary);text-decoration:none;">
           ${profile.link || ''}
        </a>
      </div>
    `;

    showToast(`Profil @${profile.username} berhasil dimuat!`, 'success');
  } catch (err) {
    console.error('[TIKTOKSTALK] error:', err);
    showToast('Terjadi kesalahan saat mengambil data TikTok.', 'error');
  }
}

async function handleIQC(e) {
  e.preventDefault();
  const prompt = document.getElementById('iqcPrompt').value.trim();
  const resultDiv = document.getElementById('iqcResult');
  const statusP = document.getElementById('iqcStatus');

  if (!prompt) {
    showToast('Masukkan teks prompt terlebih dahulu!', 'error');
    return;
  }

  resultDiv.style.display = 'block';
  statusP.textContent = '⏳ Sedang membuat gambar...';
  statusP.style.color = 'var(--text)';

  try {
    const resp = await fetch('/api/connect?iqc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') || ''
      },
      body: JSON.stringify({ prompt })
    });

    if (!resp.ok) throw new Error('Gagal memuat gambar.');

    const blob = await resp.blob();
    const imgUrl = URL.createObjectURL(blob);

    resultDiv.innerHTML = `
      <h4 style="color:var(--primary);text-align:center;">Gambar dari IQC:</h4>
      <div style="display:flex;justify-content:center;margin-top:10px;">
        <img src="${imgUrl}" alt="IQC Result" style="max-width:100%;border-radius:10px;box-shadow:0 0 15px rgba(0,0,0,0.3);">
      </div>
      <a href="${imgUrl}" download="iqc_image.png" class="btn-primary" style="display:block;text-align:center;margin-top:15px;">📥 Download Gambar</a>
    `;
    showToast('✅ Gambar berhasil dibuat!', 'success');
  } catch (err) {
    console.error('[IQC Error]:', err);
    statusP.textContent = '❌ Gagal membuat gambar.';
    statusP.style.color = '#ff0040';
    showToast('Terjadi kesalahan saat membuat gambar.', 'error');
  }
}

document.querySelector('[data-tool="vercel"]').addEventListener('click', showDeployVercelForm);

function showDeployVercelForm() {
  const toolContent = document.getElementById('toolContent');
  toolContent.innerHTML = `
    <div class="card">
      <div class="title">Deploy ke Vercel</div>
      <form id="vercelDeployForm" enctype="multipart/form-data">
        <div class="form-group">
          <label for="vercelFile">Pilih File (HTML atau ZIP)</label>
          <input type="file" id="vercelFile" name="file" accept=".zip,.html" required />
        </div>
        <div class="form-group">
          <label for="vercelDomain">Nama Domain (opsional)</label>
          <input type="text" id="vercelDomain" name="domain" placeholder="contoh: mykisah" />
        </div>
        <button type="submit" id="vercelDeployBtn">
          <i class="fas fa-cloud-upload-alt" style="margin-right:8px;"></i>
          Deploy Sekarang
        </button>
      </form>
      <div id="vercelDeployResult" style="margin-top:15px;"></div>
    </div>
  `;

  const form = document.getElementById('vercelDeployForm');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('vercelDeployBtn');
    const resultDiv = document.getElementById('vercelDeployResult');
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Deploying...`;

    try {
      const formData = new FormData(form);
      const response = await fetch('/api/connect?deploy-vercel', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (result.ok) {
        resultDiv.innerHTML = `
          <p style="color:var(--primary);">✅ ${result.message}</p>
          <p><a href="${result.deployUrl}" target="_blank">${result.deployUrl}</a></p>
        `;
        showToast("Deploy berhasil!", "success");
      } else {
        resultDiv.innerHTML = `<p style="color:var(--secondary);">❌ ${result.error}</p>`;
        showToast(result.error, "error");
      }
    } catch (err) {
      console.error(err);
      resultDiv.innerHTML = `<p style="color:var(--secondary);">Error: ${err.message}</p>`;
      showToast("Gagal melakukan deploy", "error");
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-cloud-upload-alt" style="margin-right:8px;"></i> Deploy Sekarang`;
    }
  });
}


// ====== LOGOUT FUNCTIONALITY ======
document.getElementById('accountLogoutBtn').addEventListener('click', async () => {
  const confirmLogout = await showConfirmation('Apakah kamu yakin ingin logout dari akun ini?');
  if (!confirmLogout) return;

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  showToast('Logout berhasil. Sampai jumpa lagi!', 'success');
  showLogin();
});

// ====== EVENT DELEGATION UNTUK DELETE SENDER ======
document.addEventListener('click', async function (e) {
  const btn = e.target.closest('.delete-sender-btn');
  if (!btn) return;

  const senderName = btn.dataset.name;
  const phoneNumber = btn.dataset.phone;

  console.log('[DELETE CLICKED]', senderName, phoneNumber);

  const confirmDelete = await showConfirmation(
    `Yakin ingin memutus koneksi sender ${senderName} (${phoneNumber})?`
  );
  if (!confirmDelete) return;

  showToast(`Memutus koneksi ${senderName}...`, 'info');
  const result = await authenticatedFetch('disconnect', {
    name: senderName,
    phone: phoneNumber
  });

  if (result.ok) {
    showToast(`Sender ${senderName} berhasil diputus!`, 'success');
    await loadSenders();
  } else {
    showToast(`Gagal memutus sender ${senderName}.`, 'error');
  }
});

// ====== REAL-TIME RUNTIME FUNCTION ======
function updateRuntime() {
  const runtimeElement = document.getElementById('runtime');
  if (!runtimeElement) return;

  const now = new Date();
  const options = {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };

  const formatter = new Intl.DateTimeFormat('id-ID', options);
  const formattedDate = formatter.format(now);
  
  runtimeElement.textContent = formattedDate;
}

// Initialize runtime when page loads and tab becomes active
document.addEventListener('DOMContentLoaded', function() {
  // Update runtime every second
  setInterval(updateRuntime, 1000);
  
  // Add event listener for info tab
  document.querySelector('[data-tab="info"]')?.addEventListener('click', function() {
    updateRuntime(); // Update immediately when tab is clicked
  });
});

// Pastikan fungsi updateRuntime juga dipanggil ketika tab info aktif
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', function() {
    if (this.getAttribute('data-tab') === 'info') {
      setTimeout(updateRuntime, 100);
    }
  });
});

// ====== ORIENTATION HANDLER ======
window.addEventListener('orientationchange', function() {
  setTimeout(() => {
    document.getElementById('particles').innerHTML = '';
    createParticles();
  }, 300);
});