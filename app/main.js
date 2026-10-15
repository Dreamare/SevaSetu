/* ═══════════════════════════════════════════════════════
   SEVASETU · Motor Principal de la Aplicación
   Plataforma comunitaria de confianza · MVP Funcional
   ═══════════════════════════════════════════════════════ */

import './style.css';
import {
  KARMA_LEVELS, MUDRAS, SKILLS_CATALOG, SEED_USERS, SEED_REQUESTS,
  SEED_CHAT_MESSAGES, SEED_KARMA_LEDGER,
  getKarmaLevel, getKarmaProgress, getUserById, getSkillStatusLabel,
  getSkillStatusClass, filterLeakedData, calculateKarmaForRating,
  calculateGuruPenalty, checkLevelUp, generatePin
} from './data.js';

// ─── Estado Global ───
const state = {
  currentRole: 'sevaka', // 'sevaka' | 'yajamana' | 'shramana'
  currentView: 'home',
  currentUser: null,
  selectedProfile: null,
  activeChat: null,
  activeSeva: null,
  uberNotification: null,
  chatMessages: [...SEED_CHAT_MESSAGES],
  users: JSON.parse(JSON.stringify(SEED_USERS)),
  requests: JSON.parse(JSON.stringify(SEED_REQUESTS)),
  karmaLedger: [...SEED_KARMA_LEDGER],
  reviewState: { rating: 0, comment: '', privateAnswers: [true, true, false], selectedBadge: null, submitted: false },
  kavachaActive: false,
  registerModal: false,
  sankalpaPending: null,
  pinVerification: { type: null, correctPin: null, enteredDigits: ['', '', '', ''] },
};

// Configurar usuario actual según rol
function setCurrentUserByRole() {
  switch (state.currentRole) {
    case 'sevaka':
      state.currentUser = state.users.find(u => u.id === 'user_002'); // Claudia - Ācārya
      break;
    case 'yajamana':
      state.currentUser = state.users.find(u => u.id === 'user_003'); // Ernesto - Solicitante
      break;
    case 'shramana':
      // Si el usuario actual ya es un Śramaṇa registrado, mantenerlo; sino, default Laura
      if (!state.currentUser || state.currentUser.karmaLevel !== 1) {
        state.currentUser = state.users.find(u => u.id === 'user_005'); // Laura - Nuevo
      }
      break;
  }
}

setCurrentUserByRole();

// ─── Renderizado Principal ───
function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderTopBar()}
    ${state.kavachaActive ? renderKavachaBar() : ''}
    <main class="main-content" id="mainContent">
      ${renderCurrentView()}
    </main>
    ${renderBottomNav()}
    ${state.uberNotification ? renderUberNotification() : ''}
    ${state.registerModal ? renderRegisterModal() : ''}
  `;
  attachEventListeners();
}

// ─── Barra Superior ───
function renderTopBar() {
  return `
    <header class="top-bar" id="topBar">
      <div class="top-bar__logo" id="brandLogoHome">
        <div class="top-bar__logo-frame">
          <img src="/logo.jpg" alt="SevaSetu" />
        </div>
        <div class="top-bar__brand-text">
          <div class="top-bar__name">SEVASETU <span class="top-bar__sanskrit">सेवासेतु</span></div>
          <div class="top-bar__tagline">El Puente del Servicio</div>
        </div>
      </div>

      <nav class="top-bar__nav" id="topBarNav">
        <button class="top-bar__nav-link ${state.currentView === 'home' ? 'active' : ''}" data-view="home" id="topNavHome">Inicio</button>
        <button class="top-bar__nav-link ${state.currentView === 'explore' ? 'active' : ''}" data-view="explore" id="topNavExplore">Explorar</button>
        <button class="top-bar__nav-link ${state.currentView === 'chat' ? 'active' : ''}" data-view="chat" id="topNavChat">Chat</button>
        <button class="top-bar__nav-link ${state.currentView === 'profile' ? 'active' : ''}" data-view="profile" id="topNavProfile">Mi Perfil</button>
      </nav>

      <div class="role-switcher" id="roleSwitcher">
        <button class="role-switcher__btn ${state.currentRole === 'sevaka' ? 'active' : ''}" data-role="sevaka" id="btnRoleSevaka" title="Modo Prestador">
          <span>🛠️</span> Sevaka
        </button>
        <button class="role-switcher__btn ${state.currentRole === 'yajamana' ? 'active' : ''}" data-role="yajamana" id="btnRoleYajamana" title="Modo Solicitante">
          <span>🤝</span> Yajamāna
        </button>
        <button class="role-switcher__btn ${state.currentRole === 'shramana' ? 'active' : ''}" data-role="shramana" id="btnRoleShramana" title="Modo Aprendiz">
          <span>🌱</span> Śramaṇa
        </button>
      </div>
    </header>
  `;
}

// ─── Barra Kavacha ───
function renderKavachaBar() {
  return `
    <div class="kavacha-bar" id="kavachaBar">
      <div>
        <span class="kavacha-bar__pulse"></span>
        🛡️ Modo Escudo Kavacha activo — Seguimiento en vivo compartido con tu contacto de confianza
      </div>
      <button onclick="document.getElementById('kavachaBar').remove(); window.__state.kavachaActive = false;" style="background:transparent;color:var(--bg-chandan);font-weight:700;font-size:0.9rem;padding:2px 8px;">✕</button>
    </div>
  `;
}

// ─── Navegación Inferior ───
function renderBottomNav() {
  const items = [
    { id: 'home', icon: '🏠', label: 'Inicio' },
    { id: 'explore', icon: '🔍', label: 'Explorar' },
    { id: 'chat', icon: '💬', label: 'Chat' },
    { id: 'profile', icon: '👤', label: 'Perfil' },
  ];
  return `
    <nav class="bottom-nav" id="bottomNav">
      ${items.map(item => `
        <button class="bottom-nav__item ${state.currentView === item.id ? 'active' : ''}" data-view="${item.id}" id="nav-${item.id}">
          <span class="bottom-nav__icon">${item.icon}</span>
          ${item.label}
        </button>
      `).join('')}
    </nav>
  `;
}

// ─── Router de Vistas ───
function renderCurrentView() {
  switch (state.currentView) {
    case 'home': return renderHomeView();
    case 'explore': return renderExploreView();
    case 'chat': return renderChatView();
    case 'profile': return renderProfileView();
    case 'profile-detail': return renderProfileDetailView();
    case 'seva-flow': return renderSevaFlowView();
    case 'review': return renderReviewView();
    case 'register': return renderRegistrationView();
    default: return renderHomeView();
  }
}

// ═══════════════════════════════════════════════════════
// VISTA: INICIO (MANDALA SAGRADO Y ACCIONES BENTO)
// ═══════════════════════════════════════════════════════
function renderHomeView() {
  const user = state.currentUser;
  const level = getKarmaLevel(user.karmaPoints);
  const progress = getKarmaProgress(user.karmaPoints);
  const nextLevel = KARMA_LEVELS.find(l => l.level === level.level + 1);

  // Cálculo para SVG Circular Mandala
  const radius = 70;
  const circumference = 2 * Math.PI * radius; // ~439.8
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return `
    <!-- HERO: MANDALA SAGRADO DE KARMA -->
    <div class="karma-mandala-hero">
      <div class="hero-beacon-ribbon">
        <span class="beacon-dot"></span>
        <span>Red Paramparā Activa · ${user.zone}</span>
      </div>

      <!-- Medidor Circular Mandala SVG -->
      <div class="mandala-gauge">
        <svg viewBox="0 0 160 160">
          <defs>
            <linearGradient id="mandalaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#A67C37" />
              <stop offset="50%" stop-color="#B85A3A" />
              <stop offset="100%" stop-color="#38664B" />
            </linearGradient>
          </defs>
          <circle class="mandala-track" cx="80" cy="80" r="${radius}" />
          <circle class="mandala-fill" cx="80" cy="80" r="${radius}" 
            stroke-dasharray="${circumference}" 
            stroke-dashoffset="${strokeDashoffset}" />
        </svg>

        <div class="mandala-center">
          <div class="mandala-avatar">${user.avatar}</div>
          <div class="mandala-points">${user.karmaPoints}</div>
          <div class="mandala-pts-label">Karma Pts</div>
        </div>
      </div>

      <div class="hero-user-name">${user.displayName}</div>
      <div class="hero-level-chip ${level.level >= 4 ? 'hero-level-chip--kamsya' : 'hero-level-chip--sindhoor'}">
        <span>${level.emoji}</span> Nivel ${level.level} · ${level.name} (${level.title})
      </div>

      <p class="hero-mantra-subtext">
        ${state.currentRole === 'shramana'
          ? 'Iniciado en observación comunitaria. Tu conducta en tus primeros favores edifica tu Karma y honra a tu padrino.'
          : state.currentRole === 'sevaka'
          ? 'Tu servicio desinteresado (Sevā) teje el puente de honor. Cada favor impecable desbloquea prestigio y llaves Dīkṣā.'
          : 'Solicitudes protegidas bajo honor digital Sankalpa. Calificaciones objetivas y sin intermediarios bancarios.'}
      </p>

      ${nextLevel ? `
        <div style="background: rgba(35, 57, 77, 0.04); border: 1px dashed var(--border-mitti); border-radius: var(--radius-md); padding: 8px 14px; margin-top: var(--space-xs); font-size: 0.75rem; color: var(--text-vibhuti); display: inline-flex; align-items: center; gap: 6px;">
          <span>🎯</span> Próximo rango: <strong>${nextLevel.name}</strong> a los ${nextLevel.min} pts (+3 Llaves Dīkṣā)
        </div>
      ` : `
        <div style="background: rgba(166, 124, 55, 0.08); border: 1px solid var(--prestige-kamsya); border-radius: var(--radius-md); padding: 8px 14px; font-size: 0.75rem; color: var(--prestige-kamsya); font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
          <span>🕉️</span> Rango Máximo: Miembro del Consejo de Mediación Panchayat
        </div>
      `}

      <!-- TRIO DE MÉTRICAS BENTO -->
      <div class="bento-metrics-grid">
        <div class="bento-metric-card">
          <div class="bento-metric-card__value">${user.completedSevas}</div>
          <div class="bento-metric-card__label">Favores Sevā</div>
        </div>
        <div class="bento-metric-card">
          <div class="bento-metric-card__value"><span style="color:var(--prestige-kamsya); font-size:1rem;">★</span> ${user.avgRating.toFixed(1)}</div>
          <div class="bento-metric-card__label">Honor Comunitario</div>
        </div>
        <div class="bento-metric-card">
          <div class="bento-metric-card__value"><span style="color:var(--accent-geru); font-size:1rem;">🔑</span> ${user.dikshaKeys.filter(k => k.status === 'available').length}</div>
          <div class="bento-metric-card__label">Llaves Dīkṣā</div>
        </div>
      </div>
    </div>

    <!-- DECK DE ACCIONES RÁPIDAS (BENTO TILES) -->
    <div class="action-deck action-deck--dual">
      ${state.currentRole === 'yajamana' ? `
        <div class="action-tile action-tile--hero" id="btnNewSeva">
          <div class="action-tile__icon-box">🙏</div>
          <div class="action-tile__body">
            <h3 class="action-tile__title">Solicitar un Favor</h3>
            <p class="action-tile__desc">Emite una necesidad al radar comunitario de confianza.</p>
          </div>
        </div>
        <div class="action-tile" id="btnExploreQuick">
          <div class="action-tile__icon-box">🔍</div>
          <div class="action-tile__body">
            <h3 class="action-tile__title">Explorar Linajes</h3>
            <p class="action-tile__desc">Descubre maestros y discípulos con habilidades avaladas.</p>
          </div>
        </div>
      ` : state.currentRole === 'sevaka' ? `
        <div class="action-tile action-tile--hero" id="btnSimulateNotification">
          <div class="action-tile__icon-box">📡</div>
          <div class="action-tile__body">
            <h3 class="action-tile__title">Radar de Sevā</h3>
            <p class="action-tile__desc">Simular favor entrante estilo Uber Wave en tu zona.</p>
          </div>
        </div>
        <div class="action-tile" id="btnProfileQuick">
          <div class="action-tile__icon-box">🔑</div>
          <div class="action-tile__body">
            <h3 class="action-tile__title">Tus Llaves Dīkṣā</h3>
            <p class="action-tile__desc">Invita y apadrina miembros bajo tu prestigio solidario.</p>
          </div>
        </div>
      ` : `
        <div class="action-tile action-tile--hero" id="btnRegister">
          <div class="action-tile__icon-box">🔑</div>
          <div class="action-tile__body">
            <h3 class="action-tile__title">Ingresar Código Dīkṣā</h3>
            <p class="action-tile__desc">Redime tu llave de invitación e iníciate con un Guru.</p>
          </div>
        </div>
        <div class="action-tile" id="btnExploreQuick">
          <div class="action-tile__icon-box">🏛️</div>
          <div class="action-tile__body">
            <h3 class="action-tile__title">Conocer Maestros</h3>
            <p class="action-tile__desc">Explora los Ācāryas activos en la red comunitaria.</p>
          </div>
        </div>
      `}
    </div>

    <!-- LIBRO MAYOR DE KARMA (HISTORIAL VERIFICADO) -->
    <div class="card mb-md">
      <div class="flex justify-between items-center mb-md">
        <h3 style="font-family: var(--font-heading); font-size: 1.25rem;">Libro Mayor de Honor</h3>
        <span class="text-vibhuti font-mono" style="font-size:0.7rem;">HASH COMUNITARIO</span>
      </div>
      ${state.karmaLedger
        .filter(e => e.userId === user.id)
        .slice(0, 5)
        .map(entry => `
          <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid var(--border-delicate);">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="width:36px; height:36px; border-radius:var(--radius-sm); background:var(--surface-khadi); border:1px solid var(--border-mitti); display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
                ${entry.event === 'seva_completed' ? '🤝' : entry.event === 'shishya_bonus' ? '🎁' : entry.event === 'shishya_penalty' ? '⚖️' : '⚡'}
              </div>
              <div>
                <div style="font-size:0.85rem; font-weight:600; color:var(--primary-nila); line-height:1.2;">${entry.detail}</div>
                <div class="text-vibhuti font-mono" style="font-size:0.68rem; margin-top:2px;">${entry.date} · Id: ${entry.userId.slice(-6)}</div>
              </div>
            </div>
            <span class="font-mono" style="font-weight:700; font-size:0.92rem; color:${entry.points >= 0 ? 'var(--success-tulsi)' : 'var(--danger-sindoor)'}; padding:3px 8px; border-radius:var(--radius-pill); background:${entry.points >= 0 ? 'rgba(56,102,75,0.08)' : 'rgba(168,56,59,0.08)'};">
              ${entry.points >= 0 ? '+' : ''}${entry.points}
            </span>
          </div>
        `).join('') || '<p class="text-vibhuti" style="font-size:0.85rem;">Aún no hay transacciones en el libro mayor.</p>'}
    </div>

    <!-- ÁRBOL PARAMPARĀ (MAPA DE LINAJE SAGRADO) -->
    ${user.parampara.length > 0 ? `
      <div class="card">
        <div class="parampara-tree__title">
          <span>🌳</span> Linaje Sagrado Paramparā
        </div>
        <div class="parampara-thread">
          ${user.parampara.map((ancestor, i) => `
            <div class="parampara-node">
              <div class="parampara-node__pin">
                <div class="parampara-node__pin-inner"></div>
              </div>
              <div class="parampara-node__card">
                <div>
                  <div class="parampara-node__name">${ancestor}</div>
                  <div class="parampara-node__tier-tag">Ascendencia nivel ${i + 1}</div>
                </div>
                <span style="font-size:0.8rem; color:var(--prestige-kamsya);">🏛️ Guru</span>
              </div>
            </div>
          `).join('')}
          
          <div class="parampara-node parampara-node--current">
            <div class="parampara-node__pin">
              <div class="parampara-node__pin-inner"></div>
            </div>
            <div class="parampara-node__card">
              <div>
                <div class="parampara-node__name">${user.displayName} (Tú)</div>
                <div class="parampara-node__tier-tag">${level.emoji} ${level.name} (${level.title}) · ${user.karmaPoints} pts</div>
              </div>
              <span class="badge active" style="font-size:0.7rem; padding:3px 8px;">Activo</span>
            </div>
          </div>

          ${user.shishyas.length > 0 ? user.shishyas.map(sid => {
            const s = getUserById(sid);
            if (!s) return '';
            const sLevel = getKarmaLevel(s.karmaPoints);
            return `
              <div class="parampara-node">
                <div class="parampara-node__pin" style="border-color:var(--success-tulsi);">
                  <div class="parampara-node__pin-inner" style="background:var(--success-tulsi);"></div>
                </div>
                <div class="parampara-node__card">
                  <div>
                    <div class="parampara-node__name">${s.displayName}</div>
                    <div class="parampara-node__tier-tag">Discípulo · ${sLevel.name} · ${s.karmaPoints} pts</div>
                  </div>
                  <span style="font-size:0.75rem; color:var(--success-tulsi); font-weight:600;">🌿 Ahijado</span>
                </div>
              </div>
            `;
          }).join('') : ''}
        </div>
      </div>
    ` : ''}
  `;
}

// ═══════════════════════════════════════════════════════
// VISTA: EXPLORAR
// ═══════════════════════════════════════════════════════
function renderExploreView() {
  const otherUsers = state.users.filter(u => u.id !== state.currentUser.id);

  return `
    <div class="explore-header">
      <h2>Explorar Comunidad</h2>
      <p>Encuentra prestadores de confianza en tu red Paramparā</p>
    </div>

    <div class="search-bar">
      <input type="text" placeholder="Buscar por habilidad, nombre o zona..." id="searchInput" />
    </div>

    <div class="filter-chips mb-md" id="filterChips">
      <button class="filter-chip active" data-filter="all">Todos</button>
      <button class="filter-chip" data-filter="tan_seva">🛠️ Tan-Sevā</button>
      <button class="filter-chip" data-filter="man_seva">🧠 Man-Sevā</button>
      <button class="filter-chip" data-filter="available">🟢 Disponibles</button>
    </div>

    <div id="userList">
      ${otherUsers.map(user => {
        const level = getKarmaLevel(user.karmaPoints);
        return `
          <div class="seva-list-item" data-user-id="${user.id}" id="profile-${user.id}">
            <div class="seva-list-item__avatar">${user.avatar}</div>
            <div class="seva-list-item__body">
              <div class="seva-list-item__name">${user.displayName}</div>
              <div class="seva-list-item__skill">
                ${user.skills.map(s => s.icon + ' ' + s.name).join(' · ')}
              </div>
              <div class="seva-list-item__meta">
                <span class="profile-level level-${level.level}">${level.emoji} ${level.name}</span>
                <span>★ ${user.avgRating.toFixed(1)}</span>
                <span class="seva-list-item__status">
                  <span class="status-dot ${user.isAvailable ? 'status-dot--available' : 'status-dot--offline'}"></span>
                  ${user.isAvailable ? 'Disponible' : 'Ocupado'}
                </span>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ═══════════════════════════════════════════════════════
// VISTA: PERFIL DETALLADO
// ═══════════════════════════════════════════════════════
function renderProfileDetailView() {
  const user = state.selectedProfile || state.currentUser;
  const level = getKarmaLevel(user.karmaPoints);
  const progress = getKarmaProgress(user.karmaPoints);
  const isOwnProfile = user.id === state.currentUser.id;

  return `
    <button class="btn btn--secondary btn--sm mb-md" id="btnBack" style="align-self:flex-start;">
      ← Volver
    </button>

    <div class="card yantra-pattern">
      <div class="profile-header">
        <div class="profile-avatar">${user.avatar}</div>
        <div class="profile-info">
          <div class="profile-name">${user.displayName}</div>
          <span class="profile-level level-${level.level}">
            ${level.emoji} Nivel ${level.level} · ${level.name} (${level.title})
          </span>
          <div class="profile-zone">${user.zone} · ~1.5 km</div>
        </div>
      </div>

      <!-- Karma -->
      <div class="karma-meter">
        <div class="karma-meter__header">
          <span class="karma-meter__label">Karma</span>
          <span class="karma-meter__value">${user.karmaPoints} pts</span>
        </div>
        <div class="karma-meter__bar">
          <div class="karma-meter__fill" style="width: ${progress}%"></div>
        </div>
        <div class="karma-meter__range">
          <span>${level.min}</span>
          <span>${level.max === Infinity ? '∞' : level.max}</span>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid mt-md">
        <div class="stat-card">
          <div class="stat-card__value">${user.completedSevas}</div>
          <div class="stat-card__label">Favores</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value">★ ${user.avgRating.toFixed(1)}</div>
          <div class="stat-card__label">Calificación</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value">${user.shishyas.length}</div>
          <div class="stat-card__label">Discípulos</div>
        </div>
      </div>

      <!-- Habilidades -->
      <div class="skills-section">
        <div class="skills-section__title">Habilidades</div>
        ${user.skills.map(skill => `
          <span class="skill-tag ${getSkillStatusClass(skill.status)}">
            <span class="skill-tag__icon">${skill.icon}</span>
            ${skill.name}
            <span class="skill-tag__category">${skill.category === 'tan_seva' ? 'Tan' : 'Man'}</span>
            —
            <em style="font-size:0.7rem;">${getSkillStatusLabel(skill.status)} (${skill.completedCount} servicios)</em>
          </span>
        `).join('')}
      </div>

      <!-- Insignias -->
      ${user.badges.length > 0 ? `
        <div class="skills-section mt-sm">
          <div class="skills-section__title">Insignias (Mudrās)</div>
          <div class="badges-row">
            ${user.badges.map(bId => {
              const b = MUDRAS[bId];
              return b ? `<span class="badge"><span class="badge__icon">${b.icon}</span> ${b.name}</span>` : '';
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Linaje Paramparā -->
      <div class="parampara-tree">
        <div class="parampara-tree__title">🌳 Linaje Paramparā</div>
        ${user.parampara.map((ancestor, i) => `
          <div class="parampara-node">
            <div class="parampara-node__dot guru"></div>
            <div class="parampara-node__info">
              <div class="parampara-node__name">${ancestor}</div>
              <div class="parampara-node__role">Nivel de ascendencia ${i + 1}</div>
            </div>
          </div>
        `).join('')}
        <div class="parampara-node">
          <div class="parampara-node__dot current"></div>
          <div class="parampara-node__info">
            <div class="parampara-node__name">${user.displayName}</div>
            <div class="parampara-node__role">${level.name} · Nivel ${level.level}</div>
          </div>
        </div>
        ${user.shishyas.map(sid => {
          const s = state.users.find(u => u.id === sid);
          if (!s) return '';
          const sLevel = getKarmaLevel(s.karmaPoints);
          return `
            <div class="parampara-node">
              <div class="parampara-node__dot"></div>
              <div class="parampara-node__info">
                <div class="parampara-node__name">${s.displayName}</div>
                <div class="parampara-node__role">Śiṣya · ${sLevel.name} · ${s.karmaPoints} pts</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Botón de contacto -->
    ${!isOwnProfile ? `
      <button class="btn btn--primary btn--full mt-md" id="btnContactSeva">
        🙏 Contactar para un Favor
      </button>
    ` : ''}

    <!-- Reseñas Verificadas de la Comunidad (Doble Ciego) -->
    ${(() => {
      const verified = state.requests.filter(r => 
        r.status === 'completed' && r.reviews && r.reviews.revealed &&
        (r.providerId === user.id || r.requesterId === user.id)
      );
      if (verified.length === 0) return '';
      return `
        <div class="card mt-md">
          <div class="skills-section__title" style="margin-bottom: var(--space-sm);">
            🔐 Reseñas Comunitarias (Doble Ciego Verificado)
          </div>
          ${verified.map(r => {
            const isProv = r.providerId === user.id;
            const rev = isProv ? r.reviews.requesterReview : r.reviews.providerReview;
            if (!rev) return '';
            return `
              <div style="padding: var(--space-sm) 0; border-bottom: 1px solid var(--border-mitti);">
                <div class="flex justify-between items-center" style="font-size:0.82rem;">
                  <strong>${rev.authorName}</strong>
                  <span style="color:var(--prestige-kamsya); letter-spacing:1px;">${'★'.repeat(rev.rating)}</span>
                </div>
                <p style="font-size:0.8rem; font-style:italic; margin:4px 0; color:var(--text-kajal); line-height:1.4;">
                  "${rev.comment}"
                </p>
                <div class="flex justify-between items-center" style="font-size:0.72rem; color:var(--text-vibhuti);">
                  <span>${r.skillIcon} ${r.skillName} · ${rev.date || r.createdAt}</span>
                  ${rev.badge ? `<span class="badge" style="padding:2px 8px; font-size:0.7rem;"><span class="badge__icon">${MUDRAS[rev.badge]?.icon || '✨'}</span> ${MUDRAS[rev.badge]?.name || ''}</span>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    })()}

    <!-- Llaves Dīkṣā (solo propio perfil) -->
    ${isOwnProfile && user.dikshaKeys.length > 0 ? `
      <div class="diksha-section mt-md">
        <div class="skills-section__title">🔑 Llaves de Invitación Dīkṣā</div>
        <p class="text-vibhuti" style="font-size:0.78rem; margin-bottom:var(--space-sm);">
          Cada llave invita a un nuevo miembro bajo tu padrinazgo. Tu Karma responde por ellos.
        </p>
        ${user.dikshaKeys.map(key => `
          <span class="diksha-key ${key.status === 'available' ? 'diksha-key--available' : 'diksha-key--used'}">
            🔑 ${key.code}
            ${key.redeemedBy ? ` → ${getUserById(key.redeemedBy)?.displayName || ''}` : ''}
          </span>
        `).join('')}
      </div>
    ` : ''}
  `;
}

// ═══════════════════════════════════════════════════════
// VISTA: PERFIL PROPIO
// ═══════════════════════════════════════════════════════
function renderProfileView() {
  state.selectedProfile = state.currentUser;
  return renderProfileDetailView();
}

// ═══════════════════════════════════════════════════════
// VISTA: CHAT
// ═══════════════════════════════════════════════════════
function renderChatView() {
  const activeRequest = state.activeSeva || state.requests.find(r => r.status === 'completed' && (r.requesterId === state.currentUser.id || r.providerId === state.currentUser.id));
  
  if (!activeRequest) {
    return `
      <div class="empty-state">
        <div class="empty-state__icon">💬</div>
        <div class="empty-state__title">Sin conversaciones activas</div>
        <div class="empty-state__text">
          Cuando aceptes o solicites un favor, aquí aparecerá el chat seguro con filtro anti-fuga.
        </div>
        <button class="btn btn--primary mt-lg" id="btnStartDemoChat">
          Iniciar Conversación Demo
        </button>
      </div>
    `;
  }

  const otherUserId = activeRequest.requesterId === state.currentUser.id ? activeRequest.providerId : activeRequest.requesterId;
  const otherUser = state.users.find(u => u.id === otherUserId);
  const isSankalpaAgreed = activeRequest.status === 'sankalpa_agreed' || activeRequest.status === 'in_progress' || activeRequest.status === 'completed';
  const messages = state.chatMessages.filter(m => m.sevaId === activeRequest.id);

  return `
    <div class="chat-container">
      <!-- Header del chat -->
      <div class="chat-header-bar">
        <div class="chat-header-user">
          <div class="chat-header-avatar">${otherUser?.avatar || '👤'}</div>
          <div>
            <div style="font-weight:700; font-size:0.95rem; color:var(--primary-nila); font-family:var(--font-heading);">${otherUser?.displayName || 'Usuario'}</div>
            <div class="chat-security-status-badge">
              <span>🛡️</span> ${isSankalpaAgreed ? 'Acuerdo Sankalpa Sellado · Datos Abiertos' : 'Escudo Anti-Fuga Activo · Canal Cifrado'}
            </div>
          </div>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn--danger btn--sm" id="btnKavacha" title="Modo Escudo Kavacha" style="padding:6px 12px; font-size:0.75rem;">
            🛡️ Kavacha
          </button>
        </div>
      </div>

      <!-- Mensajes -->
      <div class="chat-messages" id="chatMessages">
        ${messages.map(msg => {
          if (msg.type === 'sankalpa') {
            return `<div class="chat-bubble chat-bubble--system">📜 ${msg.text}</div>`;
          }
          if (msg.type === 'blocked') {
            return `<div class="chat-bubble chat-bubble--blocked">🚫 ${msg.text}</div>`;
          }
          const isSent = msg.senderId === state.currentUser.id;
          return `
            <div class="chat-bubble ${isSent ? 'chat-bubble--sent' : 'chat-bubble--received'}">
              ${msg.text}
              <div class="chat-bubble__time">${msg.timestamp}</div>
            </div>
          `;
        }).join('')}

        ${isSankalpaAgreed ? renderSankalpaCard(activeRequest) : ''}
      </div>

      <!-- Acciones de estado del flujo -->
      ${!isSankalpaAgreed && activeRequest.status === 'negotiating' ? `
        <div style="padding: var(--space-sm) var(--space-md); border-top: 1px solid var(--border-mitti); background: var(--surface-khadi);">
          <button class="btn btn--geru btn--full btn--sm" id="btnConfirmSankalpa">
            🤝 Confirmar Acuerdo Sankalpa
          </button>
        </div>
      ` : ''}

      ${isSankalpaAgreed && activeRequest.status === 'sankalpa_agreed' ? `
        <div style="padding: var(--space-sm) var(--space-md); border-top: 1px solid var(--border-mitti); background: var(--surface-khadi);">
          <button class="btn btn--primary btn--full btn--sm" id="btnStartPin">
            🔢 Verificar PIN de Inicio (Llegada)
          </button>
        </div>
      ` : ''}

      ${activeRequest.status === 'in_progress' ? `
        <div style="padding: var(--space-sm) var(--space-md); border-top: 1px solid var(--border-mitti); background: var(--surface-khadi);">
          <button class="btn btn--geru btn--full btn--sm" id="btnEndPin">
            ✅ Ingresar PIN de Finalización (Cierre y Pago)
          </button>
        </div>
      ` : ''}

      ${activeRequest.status === 'completed' ? `
        <div style="padding: var(--space-sm) var(--space-md); border-top: 1px solid var(--border-mitti); background: var(--surface-khadi);">
          <button class="btn btn--geru btn--full btn--sm" id="btnGoToReview">
            ⭐ Ver / Gestionar Evaluación Doble Ciego
          </button>
        </div>
      ` : ''}

      <!-- Input del chat -->
      <div class="chat-input-bar" id="chatInputBar">
        <input type="text" placeholder="Escribe un mensaje de coordinación..." id="chatInput" />
        <button class="btn btn--primary btn--sm" id="btnSendChat">Enviar</button>
      </div>
    </div>
  `;
}

// ─── Tarjeta Sankalpa (Pergamino Sagrado Digital) ───
function renderSankalpaCard(request) {
  return `
    <div class="sankalpa-card">
      <div class="sankalpa-card__title">
        <span>📜</span> Pacto de Honor Digital (Sankalpa)
      </div>
      <div style="margin-bottom:8px;">
        <div style="font-size:0.68rem; text-transform:uppercase; color:var(--text-vibhuti); font-weight:700; letter-spacing:0.04em;">Descripción del Favor</div>
        <div style="font-size:0.85rem; font-weight:600; color:var(--text-kajal); line-height:1.3;">${request.description}</div>
      </div>
      <div style="margin-bottom:8px;">
        <div style="font-size:0.68rem; text-transform:uppercase; color:var(--text-vibhuti); font-weight:700; letter-spacing:0.04em;">Compensación Justa Acordada</div>
        <div style="font-size:0.88rem; font-weight:700; color:var(--primary-nila); font-family:var(--font-mono);">${request.compensationNote}</div>
      </div>
      <div style="margin-bottom:8px;">
        <div style="font-size:0.68rem; text-transform:uppercase; color:var(--text-vibhuti); font-weight:700; letter-spacing:0.04em;">Modalidad Comunitaria</div>
        <div style="font-size:0.8rem; color:var(--text-vibhuti); font-weight:600;">${request.category === 'tan_seva' ? '🛠️ Tan-Sevā (Oficio Manual)' : '🧠 Man-Sevā (Gestión y Asesoría)'}</div>
      </div>
      <div class="sankalpa-card__signatures">
        <div class="sankalpa-sig">
          <div class="sankalpa-sig__label">Sello Solicitante</div>
          <div class="sankalpa-sig__status">✓ Sancionado</div>
        </div>
        <div class="sankalpa-sig">
          <div class="sankalpa-sig__label">Sello Prestador</div>
          <div class="sankalpa-sig__status">✓ Sancionado</div>
        </div>
      </div>
      <div style="text-align:center; margin-top:10px; font-size:0.68rem; color:var(--prestige-kamsya); font-family:var(--font-mono); letter-spacing:0.05em;">
        SANKALPA-ID: ${request.id.toUpperCase()} · ${request.createdAt}
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════
// VISTA: FLUJO DE SEVĀ (PIN)
// ═══════════════════════════════════════════════════════
function renderSevaFlowView() {
  const pin = state.pinVerification;
  const isStart = pin.type === 'start';
  
  return `
    <div class="text-center" style="padding: var(--space-xl) 0;">
      <h2>${isStart ? '🔢 PIN de Inicio' : '✅ PIN de Finalización'}</h2>
      <p class="text-vibhuti mt-sm" style="font-size:0.85rem; max-width:300px; margin:var(--space-sm) auto;">
        ${isStart 
          ? 'El prestador debe ingresar el PIN que aparece en la pantalla del solicitante para confirmar su llegada.'
          : 'El solicitante entrega este PIN tras realizar el pago directo. Esto cierra el servicio.'}
      </p>
      
      <div style="margin: var(--space-lg) 0;">
        <div class="text-vibhuti" style="font-size:0.75rem; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:var(--space-sm);">
          PIN Correcto (visible para la contraparte)
        </div>
        <div class="font-mono" style="font-size:2rem; font-weight:700; color:var(--primary-nila); letter-spacing:0.3em;">
          ${pin.correctPin}
        </div>
      </div>

      <div class="pin-input-group" id="pinInputGroup">
        <input type="text" maxlength="1" class="pin-digit" data-index="0" id="pinDigit0" inputmode="numeric" />
        <input type="text" maxlength="1" class="pin-digit" data-index="1" id="pinDigit1" inputmode="numeric" />
        <input type="text" maxlength="1" class="pin-digit" data-index="2" id="pinDigit2" inputmode="numeric" />
        <input type="text" maxlength="1" class="pin-digit" data-index="3" id="pinDigit3" inputmode="numeric" />
      </div>

      <button class="btn btn--primary btn--full mt-md" id="btnVerifyPin">
        ${isStart ? 'Validar Llegada' : 'Confirmar Cierre del Servicio'}
      </button>

      <button class="btn btn--secondary btn--full mt-sm" id="btnBackFromPin">
        ← Volver al Chat
      </button>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════
// VISTA: RESEÑA DOBLE CIEGO
// ═══════════════════════════════════════════════════════
function renderReviewView() {
  const activeSeva = state.activeSeva || state.requests.find(r => r.status === 'completed') || state.requests[0];
  if (!activeSeva.reviews) {
    activeSeva.reviews = { providerReview: null, requesterReview: null, revealed: false };
  }

  const isProvider = state.currentUser.id === activeSeva.providerId || (state.currentRole === 'sevaka');
  const myRoleKey = isProvider ? 'providerReview' : 'requesterReview';
  const otherRoleKey = isProvider ? 'requesterReview' : 'providerReview';
  const myReview = activeSeva.reviews[myRoleKey];
  const otherReview = activeSeva.reviews[otherRoleKey];
  const revealed = activeSeva.reviews.revealed;

  const providerUser = state.users.find(u => u.id === activeSeva.providerId) || state.users[1];
  const requesterUser = state.users.find(u => u.id === activeSeva.requesterId) || state.users[2];
  const counterparty = isProvider ? requesterUser : providerUser;

  // CASO 1: AMBAS RESEÑAS ENVIADAS -> REVELACIÓN SIMULTÁNEA DOBLE CIEGO
  if (revealed && activeSeva.reviews.providerReview && activeSeva.reviews.requesterReview) {
    const pRev = activeSeva.reviews.providerReview;
    const rRev = activeSeva.reviews.requesterReview;
    return `
      <div class="review-section">
        <div style="font-size:2.4rem; margin-bottom:var(--space-xs);">✨</div>
        <h2>Revelación Simultánea Doble Ciego</h2>
        <p class="text-vibhuti mt-xs" style="font-size:0.85rem; max-width:360px; margin:0 auto var(--space-md);">
          Ambas partes han enviado su evaluación. Conforme al principio de ecuanimidad de SevaSetu, las reseñas se revelan juntas e indelebles.
        </p>

        <div class="karma-impact-banner">
          <div class="karma-impact-banner__title">
            <span>⚖️</span> Impacto en el Libro Mayor de Karma
          </div>
          <ul class="karma-impact-banner__list">
            <li>• <strong>${providerUser.displayName}</strong>: +${calculateKarmaForRating(rRev.rating)} pts por calificación ${rRev.rating}★ de su servicio.</li>
            <li>• <strong>${requesterUser.displayName}</strong>: +10 pts de Karma por pago exacto y trato digno comprobado.</li>
            <li>• <strong>Algoritmo Comunitario</strong>: 3 preguntas de seguridad privadas archivadas anónimamente con retardo temporal.</li>
          </ul>
        </div>

        <div class="double-blind-grid">
          <!-- Tarjeta Solicitante -> Prestador -->
          <div class="double-blind-card">
            <div class="double-blind-card__author">
              <span>${requesterUser.displayName} (Solicitante)</span>
              <span class="double-blind-card__stars">${'★'.repeat(rRev.rating)}</span>
            </div>
            <div class="text-vibhuti" style="font-size:0.75rem;">Para ${providerUser.displayName} · ${activeSeva.skillName}</div>
            <p class="double-blind-card__comment">"${rRev.comment}"</p>
            ${rRev.badge ? `
              <div class="badges-row mt-xs">
                <span class="badge"><span class="badge__icon">${MUDRAS[rRev.badge]?.icon || '✨'}</span> ${MUDRAS[rRev.badge]?.name || ''}</span>
              </div>
            ` : ''}
            <div class="double-blind-card__security mt-xs">
              <span>🔒 3/3 respuestas de seguridad verificadas</span>
            </div>
          </div>

          <!-- Tarjeta Prestador -> Solicitante -->
          <div class="double-blind-card">
            <div class="double-blind-card__author">
              <span>${providerUser.displayName} (Prestador)</span>
              <span class="double-blind-card__stars">${'★'.repeat(pRev.rating)}</span>
            </div>
            <div class="text-vibhuti" style="font-size:0.75rem;">Para ${requesterUser.displayName} · Cumplimiento de acuerdo</div>
            <p class="double-blind-card__comment">"${pRev.comment}"</p>
            ${pRev.badge ? `
              <div class="badges-row mt-xs">
                <span class="badge"><span class="badge__icon">${MUDRAS[pRev.badge]?.icon || '✨'}</span> ${MUDRAS[pRev.badge]?.name || ''}</span>
              </div>
            ` : ''}
            <div class="double-blind-card__security mt-xs">
              <span>🔒 3/3 respuestas de seguridad verificadas</span>
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--full mt-md" id="btnBackHome">
          ✓ Volver al Inicio
        </button>
      </div>
    `;
  }

  // CASO 2: EL USUARIO YA ENVIÓ SU PARTE, PERO LA CONTRAPARTE AÚN NO
  if (myReview && !revealed) {
    return `
      <div class="empty-state">
        <div class="empty-state__icon">🔒</div>
        <div class="empty-state__title">Evaluación Sellada en Doble Ciego</div>
        <div class="empty-state__text">
          Tu calificación para <strong>${counterparty.displayName}</strong> y tus 3 respuestas privadas han sido encriptadas.
          La reseña de la contraparte permanece estrictamente bloqueada hasta que ambas partes hayan enviado su evaluación.
        </div>
        <div class="review-blind-notice mt-md">
          <span class="review-blind-notice__icon">🔐</span>
          Mecanismo Doble Ciego: Ninguna parte lee antes de calificar para garantizar total imparcialidad
        </div>

        <div style="background:var(--surface-khadi); border:1px dashed var(--border-mitti); border-radius:var(--radius-md); padding:var(--space-md); margin:var(--space-md) 0; text-align:left;">
          <div style="font-size:0.78rem; font-weight:600; color:var(--text-vibhuti); text-transform:uppercase; margin-bottom:var(--space-xs);">
            🧪 Simulador de Auditoría
          </div>
          <p style="font-size:0.8rem; color:var(--text-kajal); margin-bottom:var(--space-sm);">
            Puedes cambiar de rol arriba a <strong>${isProvider ? 'Yajamāna' : 'Sevaka'}</strong> para probar el flujo mutuo, o pulsar este simulador para emitir la evaluación de la contraparte:
          </p>
          <button class="btn btn--geru btn--full btn--sm" id="btnSimulateCounterReview">
            ⚡ Simular Envío de Evaluación de ${counterparty.displayName} (Revelar Ambos)
          </button>
        </div>

        <button class="btn btn--secondary btn--full mt-sm" id="btnBackHome">
          Volver al Inicio
        </button>
      </div>
    `;
  }

  // CASO 3: EL USUARIO DEBE ENVIAR SU EVALUACIÓN
  const rev = state.reviewState;
  return `
    <div class="review-section">
      <h2>Evaluar el Servicio</h2>
      <p class="text-vibhuti mt-xs" style="font-size:0.85rem;">
        Evaluando a <strong>${counterparty.displayName}</strong> (${isProvider ? 'Solicitante' : 'Prestador'})
      </p>

      <div class="review-blind-notice mt-md">
        <span class="review-blind-notice__icon">🔐</span>
        Evaluación Doble Ciego — La contraparte no verá tu calificación hasta que también envíe la suya
      </div>

      <!-- Estrellas -->
      <div class="review-stars" id="reviewStars">
        ${[1,2,3,4,5].map(n => `
          <button class="review-star ${rev.rating >= n ? 'active' : ''}" data-rating="${n}" id="star-${n}">★</button>
        `).join('')}
      </div>
      <p class="font-mono text-geru" style="font-size:0.85rem;">
        ${rev.rating > 0 ? `${rev.rating}/5 estrellas` : 'Selecciona una calificación obligatoria'}
      </p>

      <!-- Comentario -->
      <div class="form-group mt-md" style="text-align:left;">
        <label>Comentario Público (Visible al completarse el doble ciego)</label>
        <textarea id="reviewComment" rows="3" placeholder="Describe tu experiencia objetiva con ${counterparty.displayName}...">${rev.comment}</textarea>
      </div>

      <!-- Preguntas Privadas de Seguridad (Community Standing) -->
      <div class="review-private-questions">
        <div class="skills-section__title" style="margin-bottom: var(--space-sm);">
          🔒 Preguntas Privadas de Seguridad (Community Standing)
        </div>
        <p class="text-vibhuti" style="font-size:0.75rem; margin-bottom: var(--space-md);">
          Estas respuestas son 100% confidenciales. Nunca se muestran a la contraparte ni en su perfil. Alimentan anónimamente el motor de Karma y confianza.
        </p>
        
        <div class="review-private-question">
          <span class="review-private-question__text">¿Volverías a interactuar / contratar a esta persona sin dudarlo?</span>
          <div class="review-private-question__toggle">
            <button class="toggle-btn ${rev.privateAnswers[0] === true ? 'active-yes' : ''}" data-q="0" data-a="yes" id="q0-yes">Sí</button>
            <button class="toggle-btn ${rev.privateAnswers[0] === false ? 'active-no' : ''}" data-q="0" data-a="no" id="q0-no">No</button>
          </div>
        </div>
        
        <div class="review-private-question">
          <span class="review-private-question__text">¿Se respetó el acuerdo pactado sin presiones ni cobros imprevistos?</span>
          <div class="review-private-question__toggle">
            <button class="toggle-btn ${rev.privateAnswers[1] === true ? 'active-yes' : ''}" data-q="1" data-a="yes" id="q1-yes">Sí</button>
            <button class="toggle-btn ${rev.privateAnswers[1] === false ? 'active-no' : ''}" data-q="1" data-a="no" id="q1-no">No</button>
          </div>
        </div>
        
        <div class="review-private-question">
          <span class="review-private-question__text">¿Te sentiste incómodo/a o inseguro/a en algún momento del trato?</span>
          <div class="review-private-question__toggle">
            <button class="toggle-btn ${rev.privateAnswers[2] === false ? 'active-yes' : ''}" data-q="2" data-a="no" id="q2-yes">No</button>
            <button class="toggle-btn ${rev.privateAnswers[2] === true ? 'active-no' : ''}" data-q="2" data-a="yes" id="q2-no">Sí</button>
          </div>
        </div>
      </div>

      <!-- Insignias opcionales (Mudrās) -->
      <div class="mt-lg" style="text-align:left;">
        <div class="skills-section__title">Otorgar Insignia de Reconocimiento (Mudrā)</div>
        <div class="badges-row mt-sm">
          ${Object.values(MUDRAS).map(m => `
            <button class="badge ${rev.selectedBadge === m.id ? 'active' : ''}" id="badge-${m.id}" data-badge="${m.id}" style="cursor:pointer; border:${rev.selectedBadge === m.id ? '2px solid var(--primary-nila)' : '1px solid var(--border-mitti)'};">
              <span class="badge__icon">${m.icon}</span> ${m.name}
            </button>
          `).join('')}
        </div>
      </div>

      <button class="btn btn--primary btn--full mt-lg" id="btnSubmitReview" ${rev.rating === 0 ? 'disabled style="opacity:0.5;"' : ''}>
        🔒 Enviar Evaluación Confidencial
      </button>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════
// VISTA: REGISTRO CON CÓDIGO DĪKṢĀ
// ═══════════════════════════════════════════════════════
function renderRegistrationView() {
  return `
    <div class="text-center" style="padding: var(--space-xl) 0;">
      <img src="/logo.jpg" alt="SevaSetu" style="width:64px; height:64px; border-radius:var(--radius-md); margin:0 auto var(--space-md); display:block;" />
      <h2>Registro por Invitación</h2>
      <p class="text-vibhuti mt-sm" style="font-size:0.85rem; max-width:320px; margin:var(--space-sm) auto;">
        SevaSetu es una red cerrada de confianza. Necesitas un código de invitación Dīkṣā emitido por un miembro activo con Karma suficiente.
      </p>

      <div class="card mt-lg" style="text-align:left;">
        <div class="form-group">
          <label>Código de Invitación Dīkṣā</label>
          <input type="text" id="dikshaCodeInput" placeholder="Ej: DK-AP-001" class="font-mono" style="text-transform:uppercase; letter-spacing:0.1em; text-align:center; font-size:1.1rem;" />
          <div id="dikshaError" class="form-error hidden">⚠️ Código inválido o ya utilizado</div>
          <div id="dikshaSuccess" class="hidden" style="color:var(--success-tulsi); font-size:0.8rem; margin-top:var(--space-xs); display:flex; align-items:center; gap:4px;">✓ Código válido</div>
        </div>

        <div class="form-group">
          <label>Nombre de Pila</label>
          <input type="text" id="regName" placeholder="Tu nombre de pila" />
        </div>

        <div class="form-group">
          <label>Zona / Barrio Aproximado</label>
          <input type="text" id="regZone" placeholder="Ej: Laureles — Medellín" />
        </div>

        <div class="form-group">
          <label>Selecciona hasta 2 habilidades iniciales</label>
          <div id="skillSelector" style="display:flex; flex-wrap:wrap; gap:4px;">
            ${[...SKILLS_CATALOG.tan_seva, ...SKILLS_CATALOG.man_seva].map(skill => `
              <button class="filter-chip" data-skill-id="${skill.id}" id="skillSel-${skill.id}">
                ${skill.icon} ${skill.name}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="form-group">
          <label style="display:flex; align-items:flex-start; gap:var(--space-sm); text-transform:none; letter-spacing:0; font-weight:400; font-size:0.78rem; color:var(--text-kajal);">
            <input type="checkbox" id="habeasDataConsent" style="width:auto; margin-top:2px;" />
            Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 y la política de privacidad de SevaSetu para recibir notificaciones de servicios compatibles con mi perfil.
          </label>
        </div>

        <button class="btn btn--primary btn--full" id="btnCompleteRegister">
          🔑 Completar Registro
        </button>
      </div>

      <button class="btn btn--secondary btn--full mt-md" id="btnBackFromRegister">
        ← Volver
      </button>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════
// MODAL: REGISTRO DĪKṢĀ BLOQUEADO
// ═══════════════════════════════════════════════════════
function renderRegisterModal() {
  return `
    <div class="modal-overlay" id="registerModalOverlay">
      <div class="modal">
        <div class="modal__title">🔒 Acceso Restringido</div>
        <div class="modal__subtitle">
          SevaSetu es una comunidad cerrada basada en la confianza del padrinazgo. 
          Para unirte necesitas un código de invitación <strong>Dīkṣā</strong> emitido 
          por un miembro activo con nivel de Karma suficiente.
        </div>
        <div style="text-align:center; padding: var(--space-md); background: var(--bg-chandan); border-radius:var(--radius-md); border: 1px solid var(--border-mitti);">
          <div style="font-size:2.5rem; margin-bottom:var(--space-sm);">🔑</div>
          <p class="text-vibhuti" style="font-size:0.82rem;">
            Cada miembro recibe <strong>+3 llaves Dīkṣā</strong> al subir de nivel de Karma. 
            Solicita una a alguien de confianza en tu comunidad.
          </p>
        </div>
        <button class="btn btn--primary btn--full mt-md" id="btnGoToRegister">
          Tengo un Código de Invitación
        </button>
        <button class="btn btn--secondary btn--full mt-sm" id="btnCloseModal">
          Cerrar
        </button>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════
// NOTIFICACIÓN UBER WAVE
// ═══════════════════════════════════════════════════════
function renderUberNotification() {
  const notif = state.uberNotification;
  if (!notif) return '';

  return `
    <div class="uber-notification" id="uberNotification">
      <div class="uber-notification__header">
        <div class="uber-notification__radar-beacon">
          <span class="radar-ping-ring"></span>
          <span>Despacho Radar · Ola 1 de Confianza</span>
        </div>
        <div class="uber-notification__timer-gauge">
          <svg viewBox="0 0 42 42">
            <circle cx="21" cy="21" r="18" stroke-dasharray="113" stroke-dashoffset="0" id="timerCircle" />
          </svg>
          <span class="uber-notification__countdown" id="timerCount">${notif.timeLeft}</span>
        </div>
      </div>

      <div class="uber-notification__skill-title">
        ${notif.skillIcon} ${notif.skillName}
      </div>

      <p style="font-size:0.85rem; color:rgba(251,248,243,0.92); line-height:1.45; margin-bottom:var(--space-sm);">
        ${notif.description}
      </p>

      <div class="uber-notification__meta-grid">
        <div class="uber-notification__meta-item">
          <span>📍</span> <span>${notif.zone} · ~${notif.distance}</span>
        </div>
        <div class="uber-notification__meta-item">
          <span>💰</span> <strong>${notif.compensation}</strong>
        </div>
        <div class="uber-notification__meta-item">
          <span>⭐</span> <span>${notif.requesterKarma} pts · ${notif.requesterLevel}</span>
        </div>
        <div class="uber-notification__meta-item">
          <span>${notif.categoryIcon}</span> <span>${notif.categoryLabel}</span>
        </div>
      </div>

      <div class="uber-notification__actions">
        <button class="btn btn--secondary btn--sm" id="btnRejectSeva">
          Dejar Pasar
        </button>
        <button class="btn btn--geru btn--sm pulse-geru" id="btnAcceptSeva">
          🙏 Aceptar Favor
        </button>
      </div>
    </div>
  `;
}

// ─── Aplicación del Motor de Karma Solidario tras Revelación Doble Ciego ───
function applySolidaryKarmaFlow(activeSeva) {
  const provider = state.users.find(u => u.id === activeSeva.providerId) || state.users[1];
  const requester = state.users.find(u => u.id === activeSeva.requesterId) || state.users[2];

  const requesterRev = activeSeva.reviews?.requesterReview;
  const providerRev = activeSeva.reviews?.providerReview;

  const providerRating = requesterRev ? requesterRev.rating : 5;
  const karmaGain = calculateKarmaForRating(providerRating);
  const prevPoints = provider.karmaPoints;

  provider.karmaPoints += karmaGain;
  provider.completedSevas += 1;

  // Asignar insignias Mudrā si fueron otorgadas
  if (requesterRev?.badge && !provider.badges.includes(requesterRev.badge)) {
    provider.badges.push(requesterRev.badge);
  }
  if (providerRev?.badge && !requester.badges.includes(providerRev.badge)) {
    requester.badges.push(providerRev.badge);
  }

  // Libro mayor para el prestador
  state.karmaLedger.unshift({
    userId: provider.id,
    event: 'seva_completed',
    points: karmaGain,
    detail: `Servicio completado · Calificación ${providerRating}★ (${activeSeva.skillName})`,
    relatedUser: requester.id,
    date: 'Hoy',
  });

  // Solicitante recibe +10 pts por cumplimiento de pago y respeto
  requester.karmaPoints += 10;
  state.karmaLedger.unshift({
    userId: requester.id,
    event: 'requester_fair_pay',
    points: 10,
    detail: `Pago exacto y buen trato comprobado como Solicitante`,
    relatedUser: provider.id,
    date: 'Hoy',
  });

  // Verificar ascenso de nivel (+3 llaves Dīkṣā exactas)
  const promo = checkLevelUp(provider, prevPoints);
  if (promo.leveledUp) {
    state.karmaLedger.unshift({
      userId: provider.id,
      event: 'level_promotion',
      points: 0,
      detail: `Ascenso a Nivel ${promo.newLevel.level} (${promo.newLevel.name}) · +3 Llaves Dīkṣā desbloqueadas`,
      relatedUser: provider.id,
      date: 'Hoy',
    });
    showNotification(`🕉️ ¡Ascenso de Nivel! ${provider.displayName} ahora es ${promo.newLevel.name} (+3 Llaves Dīkṣā otorgadas).`);
  }

  // Motor de Karma Solidario con el Guru
  if (provider.guruId) {
    const guru = state.users.find(u => u.id === provider.guruId);
    if (guru) {
      // 1. Bono Gurudakṣiṇā (+25 pts) si el ahijado completa 5 servicios con 5★
      if (provider.completedSevas === 5 && providerRating === 5) {
        guru.karmaPoints += 25;
        state.karmaLedger.unshift({
          userId: guru.id,
          event: 'shishya_bonus',
          points: 25,
          detail: `Gurudakṣiṇā: Su ahijado ${provider.displayName} completó 5 favores con 5★`,
          relatedUser: provider.id,
          date: 'Hoy',
        });
        checkLevelUp(guru, guru.karmaPoints - 25);
      }

      // 2. Penalización solidaria del 50% de los puntos perdidos si el ahijado falla (≤2★)
      if (karmaGain < 0) {
        const penalty = calculateGuruPenalty(karmaGain);
        guru.karmaPoints -= penalty;
        state.karmaLedger.unshift({
          userId: guru.id,
          event: 'shishya_penalty',
          points: -penalty,
          detail: `Penalización solidaria: Falla de su ahijado ${provider.displayName} (${providerRating}★)`,
          relatedUser: provider.id,
          date: 'Hoy',
        });
      }
    }
  }
}

// ═══════════════════════════════════════════════════════
// EVENTOS
// ═══════════════════════════════════════════════════════
function attachEventListeners() {
  // Conmutador de rol
  document.querySelectorAll('.role-switcher__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentRole = btn.dataset.role;
      setCurrentUserByRole();
      state.currentView = 'home';
      state.uberNotification = null;
      state.activeSeva = null;
      state.reviewState = { rating: 0, comment: '', privateAnswers: [null, null, null], submitted: false };
      window.location.hash = 'home';
      render();
    });
  });

  // Click en Logo para volver al Inicio
  const brandLogo = document.getElementById('brandLogoHome');
  if (brandLogo) {
    brandLogo.addEventListener('click', () => {
      state.currentView = 'home';
      window.location.hash = 'home';
      render();
    });
  }

  // Navegación Desktop Top Bar
  document.querySelectorAll('.top-bar__nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view === 'profile') state.selectedProfile = state.currentUser;
      state.currentView = view;
      window.location.hash = view;
      render();
    });
  });

  // Navegación inferior
  document.querySelectorAll('.bottom-nav__item').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view === 'profile') state.selectedProfile = state.currentUser;
      state.currentView = view;
      window.location.hash = view;
      render();
    });
  });

  // Botón ir a reseña desde chat
  const btnGoToReview = document.getElementById('btnGoToReview');
  if (btnGoToReview) {
    btnGoToReview.addEventListener('click', () => {
      state.currentView = 'review';
      window.location.hash = 'review';
      render();
    });
  }

  // Botón de nueva Sevā (Yajamāna)
  const btnNewSeva = document.getElementById('btnNewSeva');
  if (btnNewSeva) {
    btnNewSeva.addEventListener('click', () => {
      // Crear nueva solicitud de demo
      const newRequest = {
        id: 'seva_new_' + Date.now(),
        requesterId: state.currentUser.id,
        providerId: null,
        skillId: 'plomeria',
        skillName: 'Plomería General',
        skillIcon: '🔧',
        category: 'tan_seva',
        status: 'broadcasting',
        description: 'Fuga de agua en llave del lavaplatos. Necesito revisión urgente de empaquetadura.',
        compensationNote: '$50.000 – $70.000 COP en efectivo',
        zone: state.currentUser.zone,
        distance: '1.8 km',
        startPin: generatePin(),
        endPin: generatePin(),
        createdAt: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }),
        completedAt: null,
      };
      state.requests.push(newRequest);
      state.activeSeva = newRequest;

      // Simular que el prestador recibe la notificación
      setTimeout(() => {
        showNotification('📡 Tu solicitud ha sido emitida al radar. Prestadores cercanos están siendo notificados por oleadas de Karma.');
      }, 500);

      state.currentView = 'chat';
      state.chatMessages.push({
        id: 'msg_sys_' + Date.now(),
        sevaId: newRequest.id,
        senderId: 'system',
        text: '📡 Solicitud emitida al radar de la comunidad. Esperando respuesta de prestadores...',
        timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        type: 'sankalpa',
      });
      render();
    });
  }

  // Acciones Rápidas Bento (Explorar / Perfil)
  const btnExploreQuick = document.getElementById('btnExploreQuick');
  if (btnExploreQuick) {
    btnExploreQuick.addEventListener('click', () => {
      state.currentView = 'explore';
      render();
    });
  }

  const btnProfileQuick = document.getElementById('btnProfileQuick');
  if (btnProfileQuick) {
    btnProfileQuick.addEventListener('click', () => {
      state.selectedProfile = state.currentUser;
      state.currentView = 'profile';
      render();
    });
  }

  // Simular notificación Uber (Sevaka)
  const btnSimulate = document.getElementById('btnSimulateNotification');
  if (btnSimulate) {
    btnSimulate.addEventListener('click', () => {
      const broadcastRequest = state.requests.find(r => r.status === 'broadcasting');
      const requester = broadcastRequest ? state.users.find(u => u.id === broadcastRequest.requesterId) : state.users[2];
      const requesterLevel = requester ? getKarmaLevel(requester.karmaPoints) : KARMA_LEVELS[2];

      state.uberNotification = {
        skillIcon: broadcastRequest?.skillIcon || '🔧',
        skillName: broadcastRequest?.skillName || 'Plomería General',
        zone: broadcastRequest?.zone || 'Sabaneta',
        distance: '2.4 km',
        requesterKarma: requester?.karmaPoints || 520,
        requesterLevel: `${requesterLevel.emoji} ${requesterLevel.name}`,
        description: broadcastRequest?.description || 'Fuga de agua leve en la llave del lavaplatos.',
        compensation: broadcastRequest?.compensationNote || '$50.000 – $70.000 COP en efectivo',
        categoryIcon: '🛠️',
        categoryLabel: 'Tan-Sevā · Oficio Manual',
        timeLeft: 45,
        requestId: broadcastRequest?.id,
      };

      render();
      startUberTimer();
      playNotificationSound();
    });
  }

  // Aceptar Favor (desde notificación Uber)
  const btnAccept = document.getElementById('btnAcceptSeva');
  if (btnAccept) {
    btnAccept.addEventListener('click', () => {
      const reqId = state.uberNotification?.requestId;
      const req = state.requests.find(r => r.id === reqId) || state.requests.find(r => r.status === 'broadcasting');
      
      if (req) {
        req.status = 'negotiating';
        req.providerId = state.currentUser.id;
        req.startPin = generatePin();
        req.endPin = generatePin();
        state.activeSeva = req;

        state.chatMessages.push({
          id: 'msg_accept_' + Date.now(),
          sevaId: req.id,
          senderId: 'system',
          text: `✅ ${state.currentUser.displayName} ha aceptado la solicitud. Se ha abierto el chat seguro.`,
          timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
          type: 'sankalpa',
        });
      }

      state.uberNotification = null;
      state.currentView = 'chat';
      render();
    });
  }

  // Rechazar Favor
  const btnReject = document.getElementById('btnRejectSeva');
  if (btnReject) {
    btnReject.addEventListener('click', () => {
      state.uberNotification = null;
      render();
      showNotification('Has dejado pasar este favor. Sin penalización.');
    });
  }

  // Confirmar Sankalpa
  const btnSankalpa = document.getElementById('btnConfirmSankalpa');
  if (btnSankalpa) {
    btnSankalpa.addEventListener('click', () => {
      if (state.activeSeva) {
        state.activeSeva.status = 'sankalpa_agreed';
        state.chatMessages.push({
          id: 'msg_sankalpa_' + Date.now(),
          sevaId: state.activeSeva.id,
          senderId: 'system',
          text: '🤝 Acuerdo Sankalpa confirmado por ambas partes. El filtro anti-fuga se ha desactivado para esta conversación.',
          timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
          type: 'sankalpa',
        });
      }
      render();
    });
  }

  // PIN de Inicio
  const btnStartPin = document.getElementById('btnStartPin');
  if (btnStartPin) {
    btnStartPin.addEventListener('click', () => {
      state.pinVerification = {
        type: 'start',
        correctPin: state.activeSeva?.startPin || generatePin(),
        enteredDigits: ['', '', '', ''],
      };
      state.currentView = 'seva-flow';
      render();
    });
  }

  // PIN de Fin
  const btnEndPin = document.getElementById('btnEndPin');
  if (btnEndPin) {
    btnEndPin.addEventListener('click', () => {
      state.pinVerification = {
        type: 'end',
        correctPin: state.activeSeva?.endPin || generatePin(),
        enteredDigits: ['', '', '', ''],
      };
      state.currentView = 'seva-flow';
      render();
    });
  }

  // Verificar PIN
  const btnVerifyPin = document.getElementById('btnVerifyPin');
  if (btnVerifyPin) {
    btnVerifyPin.addEventListener('click', () => {
      const entered = state.pinVerification.enteredDigits.join('');
      const correct = state.pinVerification.correctPin;
      
      if (entered === correct) {
        if (state.pinVerification.type === 'start') {
          if (state.activeSeva) state.activeSeva.status = 'in_progress';
          showNotification('✅ PIN de inicio verificado. El servicio está en curso.');
          state.chatMessages.push({
            id: 'msg_pin_start_' + Date.now(),
            sevaId: state.activeSeva?.id,
            senderId: 'system',
            text: '🟢 PIN de Inicio verificado correctamente. El servicio está en curso.',
            timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
            type: 'sankalpa',
          });
          state.currentView = 'chat';
        } else {
          if (state.activeSeva) state.activeSeva.status = 'completed';
          showNotification('✅ Servicio completado. ¡Hora de evaluar!');
          state.chatMessages.push({
            id: 'msg_pin_end_' + Date.now(),
            sevaId: state.activeSeva?.id,
            senderId: 'system',
            text: '🏁 PIN de Finalización verificado. Servicio completado exitosamente.',
            timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
            type: 'sankalpa',
          });
          state.reviewState = { rating: 0, comment: '', privateAnswers: [null, null, null], submitted: false };
          state.currentView = 'review';
        }
        render();
      } else {
        showNotification('❌ PIN incorrecto. Verifica los 4 dígitos.');
      }
    });
  }

  // PIN digit inputs
  document.querySelectorAll('.pin-digit').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index);
      const val = e.target.value.replace(/\D/g, '');
      e.target.value = val;
      state.pinVerification.enteredDigits[idx] = val;
      
      if (val && idx < 3) {
        document.getElementById(`pinDigit${idx + 1}`)?.focus();
      }
      
      // Auto-validate mark
      const correct = state.pinVerification.correctPin;
      if (val === correct[idx]) {
        e.target.classList.add('valid');
      } else {
        e.target.classList.remove('valid');
      }
    });

    input.addEventListener('keydown', (e) => {
      const idx = parseInt(e.target.dataset.index);
      if (e.key === 'Backspace' && !e.target.value && idx > 0) {
        document.getElementById(`pinDigit${idx - 1}`)?.focus();
      }
    });
  });

  // Back from PIN
  const btnBackFromPin = document.getElementById('btnBackFromPin');
  if (btnBackFromPin) {
    btnBackFromPin.addEventListener('click', () => {
      state.currentView = 'chat';
      render();
    });
  }

  // Enviar mensaje de chat
  const btnSend = document.getElementById('btnSendChat');
  const chatInput = document.getElementById('chatInput');
  if (btnSend && chatInput) {
    const sendMessage = () => {
      const text = chatInput.value.trim();
      if (!text) return;

      const isSankalpaAgreed = state.activeSeva && 
        (state.activeSeva.status === 'sankalpa_agreed' || state.activeSeva.status === 'in_progress' || state.activeSeva.status === 'completed');
      
      const filtered = filterLeakedData(text, isSankalpaAgreed);

      if (filtered.blocked) {
        const reasonsStr = (filtered.reasons && filtered.reasons.length > 0) ? filtered.reasons.join(', ') : 'datos privados de contacto';
        state.chatMessages.push({
          id: 'msg_blocked_' + Date.now(),
          sevaId: state.activeSeva?.id || 'demo',
          senderId: 'system',
          text: `🚫 Mensaje interceptado: Se detectó ${reasonsStr}. Conforme a la política Habeas Data y el filtro anti-fuga de SevaSetu, los datos directos están restringidos hasta sellar el acuerdo de honor digital Sankalpa.`,
          timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
          type: 'blocked',
        });
      }

      state.chatMessages.push({
        id: 'msg_' + Date.now(),
        sevaId: state.activeSeva?.id || 'demo',
        senderId: state.currentUser.id,
        text: filtered.text,
        timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
      });

      chatInput.value = '';
      render();

      // Scroll to bottom
      setTimeout(() => {
        const chatMsgs = document.getElementById('chatMessages');
        if (chatMsgs) chatMsgs.scrollTop = chatMsgs.scrollHeight;
      }, 50);
    };

    btnSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
  }

  // Demo chat
  const btnDemoChat = document.getElementById('btnStartDemoChat');
  if (btnDemoChat) {
    btnDemoChat.addEventListener('click', () => {
      const demoReq = state.requests.find(r => r.status === 'completed') || state.requests[0];
      state.activeSeva = { ...demoReq, status: 'negotiating' };
      state.chatMessages = state.chatMessages.filter(m => m.sevaId === demoReq.id);
      render();
    });
  }

  // Kavacha
  const btnKavacha = document.getElementById('btnKavacha');
  if (btnKavacha) {
    btnKavacha.addEventListener('click', () => {
      state.kavachaActive = !state.kavachaActive;
      render();
      if (state.kavachaActive) {
        showNotification('🛡️ Modo Escudo Kavacha activado. Se ha compartido el enlace de seguimiento con tu contacto de confianza.');
      }
    });
  }

  // Badges en reseña
  document.querySelectorAll('.review-section .badge').forEach(b => {
    b.addEventListener('click', () => {
      const bId = b.dataset.badge;
      state.reviewState.selectedBadge = state.reviewState.selectedBadge === bId ? null : bId;
      render();
    });
  });

  // Reseñas - Estrellas
  document.querySelectorAll('.review-star').forEach(star => {
    star.addEventListener('click', () => {
      state.reviewState.rating = parseInt(star.dataset.rating);
      render();
    });
  });

  // Preguntas privadas
  document.querySelectorAll('.review-private-question__toggle .toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = parseInt(btn.dataset.q);
      const answer = btn.dataset.a === 'yes';
      state.reviewState.privateAnswers[q] = answer;
      render();
    });
  });

  // Enviar reseña (Flujo Doble Ciego)
  const btnSubmitReview = document.getElementById('btnSubmitReview');
  if (btnSubmitReview) {
    btnSubmitReview.addEventListener('click', () => {
      if (state.reviewState.rating === 0) {
        showNotification('⚠️ Por favor selecciona una calificación de 1 a 5 estrellas.');
        return;
      }

      const activeSeva = state.activeSeva || state.requests.find(r => r.status === 'completed') || state.requests[0];
      if (!activeSeva.reviews) {
        activeSeva.reviews = { providerReview: null, requesterReview: null, revealed: false };
      }

      const isProvider = state.currentUser.id === activeSeva.providerId || (state.currentRole === 'sevaka');
      const myRoleKey = isProvider ? 'providerReview' : 'requesterReview';
      const otherRoleKey = isProvider ? 'requesterReview' : 'providerReview';

      const commentEl = document.getElementById('reviewComment');
      const reviewObj = {
        rating: state.reviewState.rating,
        comment: commentEl?.value?.trim() || 'Servicio completado conforme a lo acordado con total respeto.',
        privateAnswers: [...state.reviewState.privateAnswers],
        badge: state.reviewState.selectedBadge || (state.reviewState.rating >= 5 ? (isProvider ? 'palabra_sagrada' : 'manos_maestro') : null),
        authorId: state.currentUser.id,
        authorName: state.currentUser.displayName,
        date: 'Hoy',
      };

      activeSeva.reviews[myRoleKey] = reviewObj;

      // Si la contraparte ya envió la suya -> Revelación simultánea
      if (activeSeva.reviews[otherRoleKey]) {
        activeSeva.reviews.revealed = true;
        applySolidaryKarmaFlow(activeSeva);
        showNotification('✨ ¡Revelación Doble Ciego completada! Ambas reseñas se han publicado simultáneamente.');
      } else {
        activeSeva.reviews.revealed = false;
        showNotification('🔒 Tu evaluación ha sido sellada en modo Doble Ciego. La contraparte no podrá verla hasta enviar la suya.');
      }

      state.reviewState = { rating: 0, comment: '', privateAnswers: [true, true, false], selectedBadge: null, submitted: true };
      render();
    });
  }

  // Simular envío de evaluación de la contraparte (Auditoría Doble Ciego)
  const btnSimCounter = document.getElementById('btnSimulateCounterReview');
  if (btnSimCounter) {
    btnSimCounter.addEventListener('click', () => {
      const activeSeva = state.activeSeva || state.requests.find(r => r.status === 'completed') || state.requests[0];
      if (!activeSeva.reviews) {
        activeSeva.reviews = { providerReview: null, requesterReview: null, revealed: false };
      }

      const isProvider = state.currentUser.id === activeSeva.providerId || (state.currentRole === 'sevaka');
      const otherRoleKey = isProvider ? 'requesterReview' : 'providerReview';
      const providerUser = state.users.find(u => u.id === activeSeva.providerId) || state.users[1];
      const requesterUser = state.users.find(u => u.id === activeSeva.requesterId) || state.users[2];
      const counterparty = isProvider ? requesterUser : providerUser;

      activeSeva.reviews[otherRoleKey] = {
        rating: 5,
        comment: isProvider 
          ? 'Trato extraordinario y muy respetuoso. Pago en efectivo acordado entregado de inmediato al terminar.'
          : 'Maestría impecable en la ejecución del favor. Muy puntual, pulcro y profesional.',
        privateAnswers: [true, true, false],
        badge: isProvider ? 'palabra_sagrada' : 'manos_maestro',
        authorId: counterparty.id,
        authorName: counterparty.displayName,
        date: 'Hoy',
      };

      activeSeva.reviews.revealed = true;
      applySolidaryKarmaFlow(activeSeva);
      showNotification('✨ ¡Contraparte evaluó! Revelación simultánea doble ciego desbloqueada.');
      render();
    });
  }

  // Volver a inicio desde reseña
  const btnBackHome = document.getElementById('btnBackHome');
  if (btnBackHome) {
    btnBackHome.addEventListener('click', () => {
      state.currentView = 'home';
      state.activeSeva = null;
      render();
    });
  }

  // Perfiles clickeables
  document.querySelectorAll('.seva-list-item').forEach(item => {
    item.addEventListener('click', () => {
      const userId = item.dataset.userId;
      const user = state.users.find(u => u.id === userId);
      if (user) {
        state.selectedProfile = user;
        state.currentView = 'profile-detail';
        render();
      }
    });
  });

  // Botón volver
  const btnBack = document.getElementById('btnBack');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      state.currentView = state.selectedProfile?.id === state.currentUser?.id ? 'home' : 'explore';
      state.selectedProfile = null;
      render();
    });
  }

  // Contactar para favor
  const btnContact = document.getElementById('btnContactSeva');
  if (btnContact) {
    btnContact.addEventListener('click', () => {
      const provider = state.selectedProfile;
      if (!provider) return;

      const newReq = {
        id: 'seva_contact_' + Date.now(),
        requesterId: state.currentUser.id,
        providerId: provider.id,
        skillId: provider.skills[0]?.id || 'general',
        skillName: provider.skills[0]?.name || 'Servicio General',
        skillIcon: provider.skills[0]?.icon || '🤝',
        category: provider.skills[0]?.category || 'tan_seva',
        status: 'negotiating',
        description: `Solicitud directa a ${provider.displayName}`,
        compensationNote: 'Por acordar en el chat',
        zone: provider.zone,
        distance: '~1.5 km',
        startPin: generatePin(),
        endPin: generatePin(),
        createdAt: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }),
        completedAt: null,
      };

      state.requests.push(newReq);
      state.activeSeva = newReq;
      state.chatMessages.push({
        id: 'msg_contact_' + Date.now(),
        sevaId: newReq.id,
        senderId: 'system',
        text: `💬 Chat seguro abierto con ${provider.displayName}. Recuerda: el filtro anti-fuga está activo hasta confirmar el acuerdo Sankalpa.`,
        timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        type: 'sankalpa',
      });
      
      state.currentView = 'chat';
      render();
    });
  }

  // Registro / Invitación
  const btnRegister = document.getElementById('btnRegister');
  if (btnRegister) {
    btnRegister.addEventListener('click', () => {
      state.currentView = 'register';
      render();
    });
  }

  // Validar código Dīkṣā
  const dikshaInput = document.getElementById('dikshaCodeInput');
  if (dikshaInput) {
    dikshaInput.addEventListener('input', () => {
      const code = dikshaInput.value.trim().toUpperCase();
      const errorEl = document.getElementById('dikshaError');
      const successEl = document.getElementById('dikshaSuccess');
      
      // Buscar en todas las llaves disponibles
      let found = false;
      state.users.forEach(u => {
        u.dikshaKeys.forEach(key => {
          if (key.code.toUpperCase() === code && key.status === 'available') {
            found = true;
          }
        });
      });

      if (code.length >= 6) {
        if (found) {
          errorEl?.classList.add('hidden');
          successEl?.classList.remove('hidden');
          const guru = state.users.find(u => u.dikshaKeys.some(k => k.code.toUpperCase() === code));
          if (guru && successEl) {
            successEl.innerHTML = `✓ Código válido — Tu padrino será <strong>${guru.displayName}</strong> (${getKarmaLevel(guru.karmaPoints).name})`;
          }
        } else {
          errorEl?.classList.remove('hidden');
          successEl?.classList.add('hidden');
        }
      } else {
        errorEl?.classList.add('hidden');
        successEl?.classList.add('hidden');
      }
    });
  }

  // Selección de habilidades en registro
  document.querySelectorAll('#skillSelector .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const selected = document.querySelectorAll('#skillSelector .filter-chip.active');
      if (chip.classList.contains('active')) {
        chip.classList.remove('active');
      } else if (selected.length < 2) {
        chip.classList.add('active');
      } else {
        showNotification('⚠️ Solo puedes seleccionar hasta 2 habilidades como Śramaṇa.');
      }
    });
  });

  // Completar registro
  const btnComplete = document.getElementById('btnCompleteRegister');
  if (btnComplete) {
    btnComplete.addEventListener('click', () => {
      const code = document.getElementById('dikshaCodeInput')?.value.trim().toUpperCase();
      const name = document.getElementById('regName')?.value.trim();
      const zone = document.getElementById('regZone')?.value.trim();
      const consent = document.getElementById('habeasDataConsent')?.checked;
      const selectedSkills = Array.from(document.querySelectorAll('#skillSelector .filter-chip.active')).map(el => el.dataset.skillId);

      if (!code || !name || !zone || !consent || selectedSkills.length === 0) {
        showNotification('⚠️ Completa todos los campos, selecciona al menos 1 habilidad y acepta el consentimiento Habeas Data.');
        return;
      }

      // Validar código
      let guru = null;
      let keyFound = null;
      state.users.forEach(u => {
        (u.dikshaKeys || []).forEach(key => {
          if (key.code.toUpperCase() === code && key.status === 'available') {
            guru = u;
            keyFound = key;
          }
        });
      });

      if (!guru || !keyFound) {
        showNotification('❌ Código Dīkṣā inválido o ya utilizado.');
        return;
      }

      const newUserId = 'user_' + Date.now();

      // 1. Marcar llave como usada y asociar al nuevo discípulo
      keyFound.status = 'used';
      keyFound.redeemedBy = newUserId;

      // 2. Construir árbol Paramparā heredado del Guru
      const paramparaChain = [
        ...(guru.parampara || []),
        `${guru.displayName} (${getKarmaLevel(guru.karmaPoints).name})`
      ];

      // 3. Crear el nuevo usuario Śramaṇa
      const catalogAll = [...SKILLS_CATALOG.tan_seva, ...SKILLS_CATALOG.man_seva];
      const newUser = {
        id: newUserId,
        displayName: name,
        avatar: '🌱',
        karmaPoints: 45, // Nivel 1: Śramaṇa (0–99 pts)
        karmaLevel: 1,
        completedSevas: 0,
        avgRating: 5.0,
        zone: zone,
        isAvailable: true,
        guruId: guru.id,
        shishyas: [],
        skills: selectedSkills.map(sid => {
          const item = catalogAll.find(s => s.id === sid);
          return {
            ...(item || { id: sid, name: sid, category: 'tan_seva', icon: '🛠️' }),
            status: 'declared',
            completedCount: 0
          };
        }),
        badges: [],
        dikshaKeys: [], // Śramaṇa inicia con 0 llaves hasta subir a Śiṣya
        parampara: paramparaChain,
      };

      // 4. Agregar al Guru como ahijado iniciado
      if (!guru.shishyas) guru.shishyas = [];
      guru.shishyas.push(newUserId);

      // 5. Agregar usuario a la red
      state.users.push(newUser);

      // 6. Asentar en el libro mayor de Karma
      state.karmaLedger.unshift({
        userId: newUserId,
        event: 'diksha_initiation',
        points: 45,
        detail: `Iniciación como Śramaṇa bajo el padrinazgo de ${guru.displayName} (Llave ${code})`,
        relatedUser: guru.id,
        date: 'Hoy',
      });

      // 7. Establecer como usuario actual en rol Śramaṇa
      state.currentUser = newUser;
      state.currentRole = 'shramana';
      state.currentView = 'home';

      showNotification(`🎉 ¡Bienvenido/a ${name}! Has sido iniciado/a como Śramaṇa bajo el linaje de ${guru.displayName}.`);
      render();
    });
  }

  // Modal de registro
  const btnGoRegister = document.getElementById('btnGoToRegister');
  if (btnGoRegister) {
    btnGoRegister.addEventListener('click', () => {
      state.registerModal = false;
      state.currentView = 'register';
      render();
    });
  }

  const btnCloseModal = document.getElementById('btnCloseModal');
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      state.registerModal = false;
      render();
    });
  }

  // Back from register
  const btnBackReg = document.getElementById('btnBackFromRegister');
  if (btnBackReg) {
    btnBackReg.addEventListener('click', () => {
      state.currentView = 'home';
      render();
    });
  }

  // Búsqueda
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      document.querySelectorAll('.seva-list-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // Filtros
  document.querySelectorAll('.filter-chip[data-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip[data-filter]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      
      const filter = chip.dataset.filter;
      document.querySelectorAll('.seva-list-item').forEach(item => {
        const userId = item.dataset.userId;
        const user = state.users.find(u => u.id === userId);
        if (!user) return;

        let show = true;
        if (filter === 'tan_seva') show = user.skills.some(s => s.category === 'tan_seva');
        if (filter === 'man_seva') show = user.skills.some(s => s.category === 'man_seva');
        if (filter === 'available') show = user.isAvailable;
        
        item.style.display = show ? '' : 'none';
      });
    });
  });
}

// ─── Timer de notificación Uber ───
let uberTimerInterval = null;
function startUberTimer() {
  if (uberTimerInterval) clearInterval(uberTimerInterval);
  
  const circumference = 2 * Math.PI * 18; // ~113
  
  uberTimerInterval = setInterval(() => {
    if (!state.uberNotification) {
      clearInterval(uberTimerInterval);
      return;
    }
    
    state.uberNotification.timeLeft--;
    const timerEl = document.getElementById('timerCount');
    const circleEl = document.getElementById('timerCircle');
    
    if (timerEl) timerEl.textContent = state.uberNotification.timeLeft;
    if (circleEl) {
      const offset = circumference * (1 - state.uberNotification.timeLeft / 45);
      circleEl.setAttribute('stroke-dashoffset', offset);
    }
    
    if (state.uberNotification.timeLeft <= 0) {
      clearInterval(uberTimerInterval);
      state.uberNotification = null;
      render();
      showNotification('⏰ El tiempo de respuesta ha expirado. El favor será ofrecido a otros prestadores.');
    }
  }, 1000);
}

// ─── Notificaciones Toast ───
function showNotification(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.style.cssText = `
    position: fixed;
    top: 68px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 500;
    background: var(--primary-nila);
    color: var(--bg-chandan);
    padding: 12px 20px;
    border-radius: var(--radius-md);
    font-size: 0.82rem;
    font-weight: 500;
    box-shadow: var(--shadow-lg);
    max-width: 90%;
    text-align: center;
    animation: slideDown 0.3s var(--ease-spring);
    line-height: 1.4;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeIn 0.3s reverse';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ─── Sonido de notificación (simple beep) ───
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 523.25; // C5
    osc.type = 'sine';
    gain.gain.value = 0.15;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.stop(ctx.currentTime + 0.4);
    
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.value = 659.25; // E5
      osc2.type = 'sine';
      gain2.gain.value = 0.15;
      osc2.start();
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc2.stop(ctx.currentTime + 0.6);
    }, 200);
  } catch(e) { /* silently fail */ }
}

// ─── Exponer estado global para debug y pruebas ───
window.__state = state;
window.__render = render;

// ─── Enrutamiento por Hash en URL ───
function handleHashRouting() {
  const hash = window.location.hash.replace('#', '');
  if (['home', 'explore', 'chat', 'profile', 'review', 'register', 'seva-flow'].includes(hash)) {
    if (state.currentView !== hash) {
      state.currentView = hash;
      if (hash === 'profile') state.selectedProfile = state.currentUser;
      render();
    }
  }
}
window.addEventListener('hashchange', handleHashRouting);

// ─── Inicializar ───
if (window.location.hash && ['#home', '#explore', '#chat', '#profile', '#review', '#register', '#seva-flow'].includes(window.location.hash)) {
  handleHashRouting();
} else {
  window.location.hash = 'home';
  render();
}
