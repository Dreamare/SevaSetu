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
  botGuide: {
    isOpen: false,
    tourActive: false,
    activeTab: 'view', // 'view' | 'faq' | 'tour'
    tourStep: 0,
    currentPose: 'greeting', // 'greeting' | 'explaining' | 'celebrating' | 'thinking'
    hasSeenSpeechPill: false,
    faqOpenIndex: null,
  },
};

// ─── Poses del Bot Guía "Siddhi" (Estilo Hayao Miyazaki / Cultura Védica) ───
const BOT_POSES = {
  greeting: '/bot/siddhi-greeting.jpg',
  explaining: '/bot/siddhi-explaining.jpg',
  celebrating: '/bot/siddhi-celebrating.jpg',
  thinking: '/bot/siddhi-thinking.jpg',
  cloudPointing: '/bot/siddhi-cloud-pointing.png',
  cloudNamaste: '/bot/siddhi-cloud-namaste.png',
  cloudCelebrating: '/bot/siddhi-cloud-celebrating.png',
  cloudWisdom: '/bot/siddhi-cloud-wisdom.png',
};

// ─── Sabiduría Contextual de Siddhi ───
const BOT_KNOWLEDGE = {
  views: {
    home: {
      title: 'El Mandala y el Linaje Sagrado',
      subtitle: 'Vista de Inicio y Honor Comunitario',
      pose: 'explaining',
      badge: '🏛️ Tablero de Inicio',
      speech: '¡Namastē! Soy Siddhi, tu espíritu guía. En esta pantalla puedes ver tu Mandala de Karma y tu Árbol de Linaje. Tu puntaje no es dinero ni status vacío: es la confianza que has edificado favor tras favor en tu comunidad.',
      features: [
        {
          icon: '/iconos/transparent/icon-mudra-loto-servicio.png',
          title: 'Mandala de Karma y Trío Bento',
          desc: 'Mide tu honor acumulado. Cada favor completado impecablemente te acerca al siguiente rango y desbloquea +3 Llaves Mantra.'
        },
        {
          icon: '/iconos/transparent/icon-arbol-parampara.png',
          title: 'Árbol de Linaje',
          desc: 'Visualiza la cadena de confianza: quién fue tu Gurú padrino y quiénes son tus discípulos o ahijados. Tu Karma responde solidariamente por ellos.'
        },
        {
          icon: '/iconos/transparent/icon-mudra-palabra-sagrada.png',
          title: 'Libro Mayor de Honor',
          desc: 'Historial inmutable con hash de cada intercambio, Bonos Gurú (+25 pts) y penalizaciones si un ahijado comete falta grave.'
        }
      ]
    },
    explore: {
      title: 'Exploración de la Comunidad',
      subtitle: 'Encuentra prestadores avalados',
      pose: 'explaining',
      badge: '🔍 Directorio de Linajes',
      speech: '¡Bienvenido/a al mercado comunitario de favores! Aquí no hay algoritmos opacos que cobren comisiones abusivas. Encuentras vecinos calificados con habilidades verificadas por su maestro.',
      features: [
        {
          icon: '/iconos/transparent/icon-skill-tan-seva.png',
          title: 'Oficios (Servicios Manuales)',
          desc: 'Servicios físicos: plomería, electricidad, reparaciones domésticas, cuidado del hogar.'
        },
        {
          icon: '/iconos/transparent/icon-skill-man-seva.png',
          title: 'Asesorías (Gestión y Orientación)',
          desc: 'Servicios intelectuales: orientación en trámites de salud, visas, acompañamiento bancario a personas mayores.'
        },
        {
          icon: '/iconos/transparent/icon-nivel-acarya.png',
          title: 'Rangos por Karma',
          desc: 'Desde Chela (aprendiz) hasta Gurú Mayor (guardián). Puedes tocar cualquier perfil para ver sus Sellos e historial.'
        }
      ]
    },
    chat: {
      title: 'Chat Seguro y Filtro Anti-Fuga',
      subtitle: 'Comunicación protegida y Pacto de Honor',
      pose: 'thinking',
      badge: '💬 Canal Cifrado',
      speech: '¡Ojo avizor! Este chat cuenta con un Escudo Anti-Fuga y protección Habeas Data. Los datos sensibles de contacto están bloqueados hasta que ambas partes definan el pacto de honor.',
      features: [
        {
          icon: '/iconos/transparent/icon-escudo-kavacha.png',
          title: 'Filtro Anti-Fuga Inteligente',
          desc: 'Detecta números de teléfono, enlaces externos y correos para evitar transacciones clandestinas inseguras fuera de la red.'
        },
        {
          icon: '/iconos/transparent/icon-pacto-sankalpa.png',
          title: 'Pacto de Honor Digital',
          desc: 'Una vez acordada la compensación justa y el alcance, ambos confirman el pacto y se liberan los datos de contacto directo.'
        },
        {
          icon: '/iconos/transparent/icon-escudo-kavacha.png',
          title: 'Modo Escudo de Seguridad',
          desc: 'Si te sientes inseguro en una visita domiciliaria, activa el Modo Escudo para compartir tu ubicación en vivo con un contacto de confianza.'
        }
      ]
    },
    profile: {
      title: 'Tu Expediente de Honor y Sellos',
      subtitle: 'Prestigio, Llaves y Discípulos',
      pose: 'explaining',
      badge: '👤 Perfil de Confianza',
      speech: 'Este es tu espejo ante la comunidad. Aquí se condensan los reconocimientos que has recibido y las llaves que posees para apadrinar a nuevos miembros.',
      features: [
        {
          icon: '/iconos/transparent/icon-mudra-ojo-sabiduria.png',
          title: 'Sellos de Reconocimiento',
          desc: 'Condecoraciones especiales: Manos de Maestro (técnica), Palabra Sagrada (puntualidad/acuerdo), Guía Paciente y Loto de Servicio.'
        },
        {
          icon: '/iconos/transparent/icon-llave-diksha.png',
          title: 'Llaves Mantra Disponibles',
          desc: 'Son invitaciones exclusivas. Cada llave te convierte en el Gurú del nuevo usuario; su buen trato te otorga bonos y su negligencia te penaliza.'
        },
        {
          icon: '/iconos/transparent/icon-doble-ciego.png',
          title: 'Reseñas Verificadas',
          desc: 'Opiniones transparentes sin censura, reveladas bajo el protocolo simultáneo de Doble Ciego.'
        }
      ]
    },
    'profile-detail': {
      title: 'Detalle del Miembro Comunitario',
      subtitle: 'Auditoría de linaje y habilidades',
      pose: 'explaining',
      badge: '📜 Hoja de Vida Sagrada',
      speech: 'Estás consultando el linaje de este miembro. Puedes verificar qué maestro lo apadrinó, cuántos favores ha completado con éxito y contactarlo directamente para pedirle ayuda.',
      features: [
        {
          icon: '/iconos/transparent/icon-mudra-loto-servicio.png',
          title: 'Solicitud Directa',
          desc: 'Pulsa el botón inferior para abrir un chat de coordinación inmediata con este prestador.'
        },
        {
          icon: '/iconos/transparent/icon-arbol-parampara.png',
          title: 'Cadena de Linaje',
          desc: 'Revisa de qué maestro proviene para asegurarte de que cuenta con respaldo de honor en la zona.'
        }
      ]
    },
    review: {
      title: 'Protocolo de Reseña Doble Ciego',
      subtitle: 'Imparcialidad absoluta sin represalias',
      pose: 'thinking',
      badge: '🔒 Doble Ciego Activo',
      speech: '¡Aquí reside la máxima pureza de SevaSetu! La evaluación se rige por la teoría de juegos del Doble Ciego. Ninguna de las dos partes puede leer la opinión del otro hasta que ambos hayan calificado.',
      features: [
        {
          icon: '/iconos/transparent/icon-doble-ciego.png',
          title: 'Evaluación a Ciegas',
          desc: 'Elimina el miedo a que te califiquen mal por decir la verdad. Tu veredicto queda sellado y encriptado.'
        },
        {
          icon: '/iconos/transparent/icon-mudra-palabra-sagrada.png',
          title: 'Revelación Simultánea',
          desc: 'Cuando la contraparte califica (o usas el simulador), ambas reseñas se publican a la vez de forma indeleble.'
        },
        {
          icon: '/iconos/transparent/icon-escudo-kavacha.png',
          title: '3 Preguntas Confidenciales',
          desc: 'Respuestas privadas de seguridad que alimentan anónimamente el prestigio del usuario sin revelarse jamás al calificado.'
        }
      ]
    },
    'seva-flow': {
      title: 'Protocolo de Verificación por PIN',
      subtitle: 'Presencia física y cierre con pago justo',
      pose: 'explaining',
      badge: '🔢 Candado de 4 Dígitos',
      speech: 'El flujo de servicio utiliza dos códigos PIN de cuatro dígitos para garantizar la presencia física y certificar el pago:',
      features: [
        {
          icon: '/iconos/transparent/icon-doble-ciego.png',
          title: 'PIN de Llegada (Inicio)',
          desc: 'El solicitante le muestra este PIN al prestador cuando este arriba al domicilio. Valida que el servicio inició en persona.'
        },
        {
          icon: '/iconos/transparent/icon-pacto-sankalpa.png',
          title: 'PIN de Finalización (Cierre)',
          desc: 'El solicitante entrega este PIN solo después de comprobar el trabajo y entregar la compensación en mano. Cierra el favor y abre la evaluación.'
        }
      ]
    },
    register: {
      title: 'Iniciación con Llave Mantra',
      subtitle: 'Acceso por invitación y padrinazgo',
      pose: 'greeting',
      badge: '🌱 Rango Chela',
      speech: '¡Namastē futuro compañero! SevaSetu es una red protegida por la confianza. Para registrarte necesitas ingresar un código Mantra expedido por un miembro de la comunidad que responda por ti.',
      features: [
        {
          icon: '/iconos/transparent/icon-llave-diksha.png',
          title: 'Llave de Invitación',
          desc: 'Ingresa un código como DK-AP-001 para vincularte al linaje de un Maestro de tu zona.'
        },
        {
          icon: '/iconos/transparent/icon-rol-sramana.png',
          title: 'Iniciado en Observación',
          desc: 'Comenzarás con 45 puntos de Karma y hasta 2 habilidades declaradas. Conforme completes favores con 5★ ganarás autonomía.'
        }
      ]
    }
  },
  faqs: [
    {
      q: '¿Cómo subo de nivel y gano puntos de Karma?',
      a: 'Por cada favor completado con 5★ recibes +15 pts. Con 4★ recibes +10 pts. Además, como solicitante respetuoso y puntual ganas +10 pts en cada servicio. Al llegar a 100, 300, 700 y 1500 pts subes de rango y ganas +3 Llaves Mantra.'
    },
    {
      q: '¿Qué es el Padrinazgo Solidario y cómo me afecta?',
      a: 'Cuando invitas a alguien con tu Llave Mantra, eres su Gurú. Si tu ahijado completa 5 favores con 5★, recibes el Bono Gurú (+25 pts). Pero si tu ahijado comete una falta grave (≤2★), asumes una penalización solidaria del 50% de los puntos perdidos.'
    },
    {
      q: '¿Por qué el chat bloquea números de teléfono y correos?',
      a: 'Por el Escudo Anti-Fuga. Protege tu privacidad y asegura que los acuerdos se sellen bajo el Pacto de Honor antes de intercambiar números personales o verse en persona.'
    },
    {
      q: '¿Cómo funciona la reseña de Doble Ciego?',
      a: 'Ambas partes califican sin poder ver lo que escribió el otro. Solo cuando ambos han enviado su reseña (o se cumple el plazo), ambas opiniones se publican en el perfil al mismo instante, evitando chantajes.'
    },
    {
      q: '¿Puedo cambiar de rol para probar la app?',
      a: '¡Sí! En la barra superior tienes el conmutador: Prestador (Claudia, prestadora nivel 4), Solicitante (Ernesto, pide favores) y Aprendiz (nuevo iniciado). ¡Pruébalos para ver cómo cambia la experiencia!'
    }
  ],
  tour: [
    {
      step: 1,
      title: 'El Conmutador de Roles Sagrados',
      badge: '👑 Roles Comunitarios',
      location: 'Arriba a la derecha',
      view: 'home',
      target: '#roleSwitcher',
      sprite: '/bot/siddhi-cloud-pointing.png',
      text: '¡Namastē! Soy Siddhi y volaremos juntos en mi nube mágica. Aquí arriba a la derecha puedes alternar tu vocación: Prestador (quien ofrece servicios), Solicitante (quien pide favores) y Aprendiz (nuevo miembro). ¡Cada rol transforma las herramientas de la plataforma!',
      tip: 'Toca cualquier rol para probar su experiencia adaptada.'
    },
    {
      step: 2,
      title: 'El Mandala Circular de Karma',
      badge: '🕉️ Honor Acumulado',
      location: 'Zona superior central',
      view: 'home',
      target: '.mandala-gauge',
      sprite: '/bot/siddhi-cloud-wisdom.png',
      text: 'Tu honor no es dinero ni status vacío: es la confianza edificada en tu comunidad. El medidor circular refleja tus puntos de Karma. Al alcanzar los hitos (100, 300, 700 y 1500 pts) asciendes de rango y ganas nuevas Llaves Mantra.',
      tip: 'Cada favor impecable con 5★ te otorga +15 puntos de Karma.'
    },
    {
      step: 3,
      title: 'Trío Bento de Confianza',
      badge: '📊 Métricas Clave',
      location: 'Panel central',
      view: 'home',
      target: '.bento-metrics-grid',
      sprite: '/bot/siddhi-cloud-pointing.png',
      text: 'Tres métricas esenciales a golpe de vista: la cantidad de favores culminados, tu calificación de honor sin censura y tus Llaves Mantra activas para apadrinar a nuevos miembros de tu vecindario.',
      tip: 'Un perfil con 5★ inspira confianza inmediata en tu barrio.'
    },
    {
      step: 4,
      title: 'Radar de Oleadas y Acciones Rápidas',
      badge: '📡 Radar Comunitario',
      location: 'Deck de acciones',
      view: 'home',
      target: '.action-deck',
      sprite: '/bot/siddhi-cloud-pointing.png',
      text: 'Aquí está el pulso activo. Como solicitante puedes emitir pedidos directos al radar. Como prestador puedes simular el radar de despachos en tiempo real por oleadas de cercanía (Wave Uber).',
      tip: '¡Prueba a pulsar "Simular Notificación Entrante"!'
    },
    {
      step: 5,
      title: 'Árbol de Linaje',
      badge: '🌱 Cadena de Padrinazgo',
      location: 'Sección de linaje',
      view: 'home',
      target: '.parampara-thread',
      sprite: '/bot/siddhi-cloud-wisdom.png',
      text: 'La confianza tiene memoria. Aquí contemplas tu árbol de linaje: quién fue tu Gurú que respondió por ti, y quiénes son tus discípulos ahijados. El Karma se comparte: su excelencia te premia y sus faltas te comprometen solidariamente.',
      tip: 'Si tu ahijado completa 5 favores 5★, recibes el Bono Gurú (+25 pts).'
    },
    {
      step: 6,
      title: 'Directorio Comunitario de Linajes',
      badge: '🔍 Explorar Vecinos',
      location: 'Directorio de habilidades',
      view: 'explore',
      target: '#searchInput',
      sprite: '/bot/siddhi-cloud-pointing.png',
      text: 'Navega y encuentra vecinos calificados: Oficios (servicios manuales: plomería, electricidad) y Asesorías (gestión intelectual: trámites, salud, orientación). ¡Sin comisiones abusivas de plataformas intermediarias!',
      tip: 'Filtra por categoría y toca cualquier perfil para auditar su linaje.'
    },
    {
      step: 7,
      title: 'Chat Seguro con Filtro Anti-Fuga',
      badge: '🛡️ Habeas Data y Seguridad',
      location: 'Cabecera del chat',
      view: 'chat',
      target: '.chat-container',
      sprite: '/bot/siddhi-cloud-wisdom.png',
      text: 'El canal de comunicación está blindado con el Escudo Anti-Fuga. Si alguien intenta enviar números telefónicos o correos antes de acordar las condiciones, el mensaje se intercepta para evitar fraudes y proteger la privacidad.',
      tip: '¡Una vez pactado el favor, el Pacto de Honor libera los datos de contacto directo!'
    },
    {
      step: 8,
      title: 'Pacto de Honor y Verificación PIN',
      badge: '📜 Protocolo de 4 Dígitos',
      location: 'Flujo de servicio',
      view: 'chat',
      target: '.chat-container',
      sprite: '/bot/siddhi-cloud-pointing.png',
      text: 'El servicio se sella con el Pacto de Honor digital y dos códigos PIN de 4 dígitos: uno para certificar la llegada física al domicilio y otro para certificar el cierre del favor y la entrega de la compensación justa acordada.',
      tip: 'Cero intermediación bancaria: el pago es directo y transparente.'
    },
    {
      step: 9,
      title: 'Protocolo de Reseñas Doble Ciego',
      badge: '🔒 Teoría de Juegos Imparcial',
      location: 'Barra superior',
      view: 'home',
      target: '#brandLogoHome',
      sprite: '/bot/siddhi-cloud-celebrating.png',
      text: '¡La culminación del honor! Las evaluaciones se realizan a ciegas: nadie ve la opinión del otro hasta que ambos hayan calificado simultáneamente. Sin chantajes ni represalias. ¡Que el Dharma guíe siempre tus pasos en SevaSetu!',
      tip: '¡Has completado el gran tour volador con Siddhi!'
    }
  ]
};

// ─── Sonido armónico de celebración / campana mística ───
function playCelebrationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // Acorde C-E-G-C (brillo celestial)
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'triangle';
        gain.gain.value = 0.12;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);
        osc.stop(ctx.currentTime + 0.85);
      }, i * 90);
    });
  } catch (e) { /* audio silenciado si no interactuó */ }
}

// ─── Explosión de Pétalos de Caléndula y Partículas de Karma ───
function triggerKarmaCelebration() {
  playCelebrationSound();
  state.botGuide.currentPose = 'celebrating';
  
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const petals = [];
  const colors = ['#E68A00', '#FFB800', '#FFA000', '#D4AF37', '#FFD700', '#B85A3A'];

  for (let i = 0; i < 70; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.7,
      size: Math.random() * 12 + 10,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 + 2.5,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 4 - 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.4 + 0.6,
      wobble: Math.random() * Math.PI * 2,
    });
  }

  let startTime = Date.now();
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - startTime;

    petals.forEach(p => {
      p.y += p.speedY;
      p.wobble += 0.05;
      p.x += Math.sin(p.wobble) * 2 + p.speedX;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      // Silueta orgánica de pétalo de caléndula
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();

      // Centro dorado brillante
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.arc(0, 0, p.size * 0.22, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    if (elapsed < 4200) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

// ─── Renderizado del Bot Companion "Siddhi" ───
function renderBotCompanion() {
  const currentKnowledge = BOT_KNOWLEDGE.views[state.currentView] || BOT_KNOWLEDGE.views.home;
  const currentPoseImg = BOT_POSES[state.botGuide.currentPose] || BOT_POSES.greeting;

  return `
    <!-- WIDGET FLOTANTE DE SIDDHI -->
    <div id="botCompanionWidget">
      ${!state.botGuide.isOpen && !state.botGuide.hasSeenSpeechPill ? `
        <div class="bot-speech-pill" id="btnOpenBotPill" title="Preguntarle a Siddhi sobre esta pantalla">
          <span class="bot-speech-pill__spark">✨</span>
          <span>¿Dudas? Habla con Siddhi</span>
          <button id="btnClosePill" style="margin-left:4px; font-size:0.75rem; color:rgba(255,255,255,0.7); background:transparent; border:none; padding:0 4px; cursor:pointer;" title="Ocultar globo">✕</button>
        </div>
      ` : ''}

      <button class="bot-trigger-btn" id="btnToggleBot" title="Siddhi · Tu Guía del Dharma">
        <div class="bot-aura-ring"></div>
        <img class="bot-trigger-img" src="${currentPoseImg}" alt="Siddhi Guía" />
        <div class="bot-status-badge">🪷</div>
      </button>
    </div>

    <!-- MODAL DINÁMICO DE DIÁLOGO DE SIDDHI -->
    ${state.botGuide.isOpen ? `
      <div class="bot-dialog-overlay" id="botDialogOverlay">
        <div class="bot-dialog-card">
          <div class="bot-dialog-content-wrapper">
            <!-- Header con avatar dinámico -->
            <div class="bot-dialog-header">
              <div class="bot-dialog-avatar-box">
                <img class="bot-dialog-avatar-img" src="${currentPoseImg}" alt="Siddhi" />
              </div>
              <div class="bot-dialog-title-group">
                <div class="bot-dialog-title">
                  <span>Siddhi</span>
                  <span style="font-size:0.75rem; opacity:0.85; font-weight:400; font-family:var(--font-body);">(Espíritu Guía)</span>
                </div>
                <div class="bot-dialog-subtitle">
                  ${currentKnowledge.badge} · Sabiduría Comunitaria
                </div>
              </div>
              <button class="bot-dialog-close-btn" id="btnCloseBotDialog" title="Cerrar Guía">✕</button>
            </div>

            <!-- Tabs de navegación -->
            <div class="bot-tabs-nav">
              <button class="bot-tab-btn ${state.botGuide.activeTab === 'view' ? 'active' : ''}" data-tab="view" id="botTab-view">
                💡 Esta Vista
              </button>
              <button class="bot-tab-btn ${state.botGuide.activeTab === 'faq' ? 'active' : ''}" data-tab="faq" id="botTab-faq">
                ❓ Preguntas
              </button>
              <button class="bot-tab-btn ${state.botGuide.activeTab === 'tour' ? 'active' : ''}" data-tab="tour" id="botTab-tour">
                ✨ Tour Guiado
              </button>
            </div>

            <!-- Cuerpo de diálogo según Tab activa -->
            <div class="bot-dialog-body">
              ${state.botGuide.activeTab === 'view' ? `
                <div class="bot-speech-bubble">
                  <p><strong>${currentKnowledge.title}</strong></p>
                  <p>${currentKnowledge.speech}</p>
                </div>

                <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:var(--text-vibhuti); letter-spacing:0.05em; margin-bottom:8px;">
                  Elementos Clave de esta Pantalla:
                </div>

                ${(currentKnowledge.features || []).map(f => `
                  <div class="bot-feature-card">
                    <div class="bot-feature-icon-box">
                      <img class="icon-img icon-img--sm" src="${f.icon}" alt="${f.title}" />
                    </div>
                    <div>
                      <div class="bot-feature-title">${f.title}</div>
                      <div class="bot-feature-desc">${f.desc}</div>
                    </div>
                  </div>
                `).join('')}
              ` : state.botGuide.activeTab === 'faq' ? `
                <div class="bot-speech-bubble">
                  <p><strong>Reglas de Honor y Preguntas Frecuentes</strong></p>
                  <p>Toca cualquier duda para que te explique cómo funciona la filosofía de SevaSetu:</p>
                </div>

                ${BOT_KNOWLEDGE.faqs.map((faq, idx) => `
                  <div class="bot-faq-item">
                    <button class="bot-faq-question" data-faq-idx="${idx}">
                      <span>${faq.q}</span>
                      <span style="font-size:0.85rem; color:var(--accent-geru);">${state.botGuide.faqOpenIndex === idx ? '▲' : '▼'}</span>
                    </button>
                    ${state.botGuide.faqOpenIndex === idx ? `
                      <div class="bot-faq-answer">${faq.a}</div>
                    ` : ''}
                  </div>
                `).join('')}
              ` : `
                <!-- TAB TOUR GUIADO: LANZADOR DE VUELO EN NUBE -->
                <div class="bot-speech-bubble" style="text-align:center; padding: 18px 14px;">
                  <div style="width:130px; height:130px; margin: 0 auto 10px; animation: flyingCloudBob 3s ease-in-out infinite;">
                    <img src="/bot/siddhi-cloud-pointing.png" alt="Siddhi en Nube Voladora" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 8px 18px rgba(184,90,58,0.35));" />
                  </div>
                  <p style="font-family:var(--font-display); font-size:1.15rem; color:var(--primary-nila); font-weight:700; margin-bottom:6px;">
                    ¡Recorrido en Nube Voladora!
                  </p>
                  <p style="font-size:0.83rem; color:var(--text-kajal); line-height:1.45; margin-bottom:14px;">
                    Siddhi montará en su nube mágica con estela de partículas para mostrarte <strong>en vivo y en directo</strong> cada una de las 9 funciones esenciales de SevaSetu, <em>sin difuminar la pantalla</em>.
                  </p>
                  <button class="btn btn--primary btn--full shimmer-gold" id="btnStartFlyingTour" style="padding:12px; font-weight:700; font-size:0.92rem; display:flex; align-items:center; justify-content:center; gap:8px;">
                    <span>🚀</span>
                    <span>Iniciar Tour Volador en Nube Mágica</span>
                  </button>
                </div>
              `}
            </div>

            <!-- Footer con botón de celebración gamificada -->
            <div class="bot-dialog-footer">
              <button class="btn-celebrate-karma" id="btnCelebrateKarma">
                <span>🎉</span>
                <span>¡Celebrar con Pétalos de Marigold!</span>
              </button>
              <button class="btn btn--secondary btn--sm" id="btnDismissDialog" style="font-size:0.75rem; padding:6px 12px;">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    ` : ''}
  `;
}

// ─── Renderizado del Tour Volador con Siddhi en Nube Mágica ───
function renderFlyingTourGuide() {
  if (!state.botGuide.tourActive) return '';

  const stepIdx = state.botGuide.tourStep;
  const currentStep = BOT_KNOWLEDGE.tour[stepIdx] || BOT_KNOWLEDGE.tour[0];
  const spriteImg = currentStep.sprite || BOT_POSES.cloudPointing;

  return `
    <!-- SIDDHI EN NUBE VOLADORA INDEPENDIENTE (VUELA AL LADO DEL ELEMENTO) -->
    <div class="flying-siddhi-companion" id="flyingSiddhiCompanion">
      <div class="flying-cloud-character">
        <div class="flying-cloud-aura"></div>
        <img class="flying-cloud-img" src="${spriteImg}" alt="Siddhi en Nube Voladora" />
        
        <!-- Partículas y Destellos de Estrellas -->
        <div class="cloud-particles">
          <span class="particle-sparkle p1">✨</span>
          <span class="particle-sparkle p2">🌟</span>
          <span class="particle-sparkle p3">🪷</span>
          <span class="particle-sparkle p4">✦</span>
          <span class="particle-sparkle p5">✨</span>
          <span class="particle-dust d1"></span>
          <span class="particle-dust d2"></span>
          <span class="particle-dust d3"></span>
          <span class="particle-dust d4"></span>
        </div>
      </div>
    </div>

    <!-- TARJETA DE DIÁLOGO CENTRADA EN LA PANTALLA -->
    <div class="flying-tour-guide" id="flyingTourGuide">
      <div class="flying-tour-card">
        <div class="flying-tour-content">
          <div class="flying-tour-header">
            <div class="flying-tour-step-badge">
              <span>${currentStep.badge}</span>
              <span class="flying-tour-counter">${stepIdx + 1} / ${BOT_KNOWLEDGE.tour.length}</span>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <button class="btn btn--secondary btn--xs" id="btnFocusTourTarget" style="font-size:0.68rem; padding:2px 8px; border-radius:var(--radius-pill); cursor:pointer;" title="Ver y enfocar elemento">📍 Enfocar</button>
              <button class="flying-tour-close-btn" id="btnCloseFlyingTour" title="Cerrar Tour">✕</button>
            </div>
          </div>

          <h4 class="flying-tour-title">${currentStep.title}</h4>
          <p class="flying-tour-text">${currentStep.text}</p>

          ${currentStep.tip ? `
            <div class="flying-tour-tip">
              <span style="font-size:0.9rem;">💡</span>
              <span>${currentStep.tip}</span>
            </div>
          ` : ''}

          <div class="flying-tour-actions">
            <button class="btn btn--secondary btn--sm" id="btnFlyingTourPrev" ${stepIdx === 0 ? 'disabled style="opacity:0.4; pointer-events:none;"' : ''}>
              ← Anterior
            </button>

            <div class="flying-tour-progress-dots">
              ${BOT_KNOWLEDGE.tour.map((_, i) => `
                <span class="tour-dot ${i === stepIdx ? 'active' : ''}"></span>
              `).join('')}
            </div>

            <button class="btn btn--primary btn--sm shimmer-gold" id="btnFlyingTourNext">
              ${stepIdx === BOT_KNOWLEDGE.tour.length - 1 ? '🎉 ¡Finalizar Tour!' : 'Siguiente →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── Posicionamiento Dinámico de Siddhi al lado del Elemento Objetivo ───
function positionSiddhiNearTarget(targetEl) {
  const siddhi = document.getElementById('flyingSiddhiCompanion');
  if (!siddhi || !targetEl) return;

  const rect = targetEl.getBoundingClientRect();
  const siddhiW = 96;
  const siddhiH = 96;
  const vpW = window.innerWidth;
  const vpH = window.innerHeight;

  let top, left;
  let isFlipped = false;

  // Preferir ubicar a Siddhi a la izquierda del elemento
  if (rect.left >= siddhiW + 16) {
    left = rect.left - siddhiW - 8;
    top = rect.top + (rect.height / 2) - (siddhiH / 2);
    isFlipped = false; // Mira y apunta a la derecha hacia el elemento
  }
  // Si no cabe a la izquierda, intentar a la derecha
  else if (vpW - rect.right >= siddhiW + 16) {
    left = rect.right + 8;
    top = rect.top + (rect.height / 2) - (siddhiH / 2);
    isFlipped = true; // Invertir sprite para que mire y apunte a la izquierda hacia el elemento
  }
  // Si el elemento ocupa casi todo el ancho de la pantalla (móvil o contenedor muy ancho)
  else {
    top = rect.top - siddhiH - 6;
    left = Math.min(vpW - siddhiW - 12, Math.max(12, rect.right - siddhiW));
    if (top < 68) {
      top = rect.top + 6;
      left = Math.max(12, rect.left + 6);
    }
    isFlipped = false;
  }

  // Márgenes seguros en pantalla (no salirse arriba ni solaparse abajo)
  top = Math.max(68, Math.min(vpH - siddhiH - 180, top));
  left = Math.max(8, Math.min(vpW - siddhiW - 8, left));

  siddhi.style.top = `${Math.round(top)}px`;
  siddhi.style.left = `${Math.round(left)}px`;
  siddhi.style.opacity = '1';

  const charEl = siddhi.querySelector('.flying-cloud-character');
  if (charEl) {
    charEl.classList.toggle('flipped', isFlipped);
  }
}

// Configurar usuario actual según rol
function setCurrentUserByRole() {
  switch (state.currentRole) {
    case 'sevaka':
      state.currentUser = state.users.find(u => u.id === 'user_002'); // Claudia - Maestro
      break;
    case 'yajamana':
      state.currentUser = state.users.find(u => u.id === 'user_003'); // Ernesto - Solicitante
      break;
    case 'shramana':
      // Si el usuario actual ya es un Aprendiz registrado, mantenerlo; sino, default Laura
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
    ${renderBotCompanion()}
    ${renderFlyingTourGuide()}
    ${state.uberNotification ? renderUberNotification() : ''}
    ${state.registerModal ? renderRegisterModal() : ''}
    <canvas id="particlesCanvas"></canvas>
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
        <button class="top-bar__nav-link ${state.currentView === 'home' ? 'active' : ''}" data-view="home" id="topNavHome">
          <img class="icon-nav-img" src="/iconos/transparent/icon-nav-inicio.png" alt="Inicio" /> Inicio
        </button>
        <button class="top-bar__nav-link ${state.currentView === 'explore' ? 'active' : ''}" data-view="explore" id="topNavExplore">
          <img class="icon-nav-img" src="/iconos/transparent/icon-nav-explorar.png" alt="Explorar" /> Explorar
        </button>
        <button class="top-bar__nav-link ${state.currentView === 'chat' ? 'active' : ''}" data-view="chat" id="topNavChat">
          <img class="icon-nav-img" src="/iconos/transparent/icon-nav-chat.png" alt="Chat" /> Chat
        </button>
        <button class="top-bar__nav-link ${state.currentView === 'profile' ? 'active' : ''}" data-view="profile" id="topNavProfile">
          <img class="icon-nav-img" src="/iconos/transparent/icon-nav-perfil.png" alt="Mi Perfil" /> Mi Perfil
        </button>
      </nav>

      <div class="role-switcher" id="roleSwitcher">
        <button class="role-switcher__btn ${state.currentRole === 'sevaka' ? 'active' : ''}" data-role="sevaka" id="btnRoleSevaka" title="Modo Prestador">
          <img class="role-switcher__icon" src="/iconos/transparent/icon-rol-sevaka.png" alt="Prestador" /> Prestador
        </button>
        <button class="role-switcher__btn ${state.currentRole === 'yajamana' ? 'active' : ''}" data-role="yajamana" id="btnRoleYajamana" title="Modo Solicitante">
          <img class="role-switcher__icon" src="/iconos/transparent/icon-rol-yajamana.png" alt="Solicitante" /> Solicitante
        </button>
        <button class="role-switcher__btn ${state.currentRole === 'shramana' ? 'active' : ''}" data-role="shramana" id="btnRoleShramana" title="Modo Aprendiz">
          <img class="role-switcher__icon" src="/iconos/transparent/icon-rol-sramana.png" alt="Aprendiz" /> Aprendiz
        </button>
      </div>
    </header>
  `;
}

// ─── Modo Escudo ───
function renderKavachaBar() {
  return `
    <div class="kavacha-bar" id="kavachaBar">
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="kavacha-bar__pulse"></span>
        <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-escudo-kavacha.png" alt="Modo Escudo" />
        <span>Modo Escudo activo — Seguimiento en vivo compartido con tu contacto de confianza</span>
      </div>
      <button onclick="document.getElementById('kavachaBar').remove(); window.__state.kavachaActive = false;" style="background:transparent;color:var(--bg-chandan);font-weight:700;font-size:0.9rem;padding:2px 8px;">✕</button>
    </div>
  `;
}

// ─── Navegación Inferior ───
function renderBottomNav() {
  const items = [
    { id: 'home', iconImg: '/iconos/transparent/icon-nav-inicio.png', label: 'Inicio' },
    { id: 'explore', iconImg: '/iconos/transparent/icon-nav-explorar.png', label: 'Explorar' },
    { id: 'chat', iconImg: '/iconos/transparent/icon-nav-chat.png', label: 'Chat' },
    { id: 'profile', iconImg: '/iconos/transparent/icon-nav-perfil.png', label: 'Perfil' },
  ];
  return `
    <nav class="bottom-nav" id="bottomNav">
      ${items.map(item => `
        <button class="bottom-nav__item ${state.currentView === item.id ? 'active' : ''}" data-view="${item.id}" id="nav-${item.id}">
          <img class="icon-nav-img" src="${item.iconImg}" alt="${item.label}" />
          <span>${item.label}</span>
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

// ─── Renderizado de Avatar Circular Universal ───
function renderUserAvatar(user, sizeClass = 'avatar--md', extraStyle = '') {
  if (user && user.avatarImg) {
    return `
      <div class="user-avatar-circle ${sizeClass}" style="${extraStyle}">
        <img src="${user.avatarImg}" alt="${user.displayName || 'Usuario'}" class="user-avatar-img" onerror="this.parentElement.innerHTML='<span class=\\'avatar-fallback\\'>${user.avatar || '👤'}</span>'" />
      </div>
    `;
  }
  return `
    <div class="user-avatar-circle ${sizeClass}" style="${extraStyle}">
      <span class="avatar-fallback">${user?.avatar || '👤'}</span>
    </div>
  `;
}

// ─── Encontrar Usuario por Nombre o Texto en Linaje ───
function findUserByAncestorText(ancestorText) {
  if (!ancestorText) return null;
  return state.users.find(u => ancestorText.includes(u.displayName) || u.displayName.includes(ancestorText)) || null;
}

// ─── Renderizado del Árbol de Linaje Sagrado (Kalpavriksha) Gamificado y Vivo ───
function renderParamparaTree(user) {
  if (!user || (!user.parampara?.length && !user.shishyas?.length)) return '';
  const level = getKarmaLevel(user.karmaPoints);
  const totalGenerations = (user.parampara?.length || 0) + 1 + (user.shishyas?.length > 0 ? 1 : 0);

  return `
    <div class="parampara-tree card mb-md">
      <div class="parampara-tree__header">
        <div class="parampara-tree__title">
          <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-arbol-parampara.png" alt="Árbol Sagrado" />
          <span>Árbol de Linaje Sagrado · Kalpavriksha</span>
        </div>
        <div class="parampara-tree__gamified-bar">
          <span class="tree-stat-chip tree-stat-chip--gold">🌿 ${totalGenerations} Generaciones de Linaje</span>
          <span class="tree-stat-chip tree-stat-chip--tulsi">🛡️ Solidaridad 100% Sin Faltas</span>
          <span class="tree-stat-chip">✨ Bono Gurú (+25 pts) Activo</span>
        </div>
      </div>

      <div class="parampara-thread">
        ${user.parampara.map((ancestor, i) => {
          const guruUser = findUserByAncestorText(ancestor) || state.users.find(u => u.id === 'user_001');
          return `
            <div class="parampara-node">
              <div class="parampara-avatar-seal">
                <img src="${guruUser?.avatarImg || '/avatars/avatar-user-001.jpg'}" alt="${ancestor}" onerror="this.src='/avatars/avatar-user-001.jpg'" />
                <span class="seal-crest-badge">👑</span>
              </div>
              <div class="tree-branch-stem"></div>
              <div class="parampara-node__card">
                <div>
                  <div class="parampara-node__name">${ancestor}</div>
                  <div class="parampara-node__tier-tag">
                    <img class="icon-img icon-img--xs" src="/iconos/transparent/icon-nivel-acarya.png" alt="Gurú" />
                    <span>Ascendencia Nivel ${i + 1} · Gurú Padrino</span>
                  </div>
                </div>
                <span class="parampara-badge-pill parampara-badge-pill--guru">
                  👑 Gurú Fundador
                </span>
              </div>
            </div>
          `;
        }).join('')}

        <div class="parampara-node parampara-node--current">
          <div class="parampara-avatar-seal">
            <img src="${user.avatarImg || '/avatars/avatar-user-002.jpg'}" alt="${user.displayName}" onerror="this.src='/avatars/avatar-user-002.jpg'" />
            <span class="seal-crest-badge">✨</span>
          </div>
          <div class="tree-branch-stem"></div>
          <div class="parampara-node__card">
            <div>
              <div class="parampara-node__name">${user.displayName} (Tú)</div>
              <div class="parampara-node__tier-tag">
                <img class="icon-img icon-img--xs" src="${level.iconImg || '/iconos/transparent/icon-rol-sevaka.png'}" alt="${level.name}" />
                <span>${level.name} (${level.title}) · ${user.karmaPoints} pts</span>
              </div>
            </div>
            <span class="parampara-badge-pill parampara-badge-pill--active">
              ✨ Nodo Activo
            </span>
          </div>
        </div>

        ${user.shishyas && user.shishyas.length > 0 ? user.shishyas.map(sid => {
          const s = getUserById(sid);
          if (!s) return '';
          const sLevel = getKarmaLevel(s.karmaPoints);
          return `
            <div class="parampara-node parampara-node--disciple">
              <div class="parampara-avatar-seal">
                <img src="${s.avatarImg || '/avatars/avatar-user-004.jpg'}" alt="${s.displayName}" onerror="this.src='/avatars/avatar-user-004.jpg'" />
                <span class="seal-crest-badge">🌱</span>
              </div>
              <div class="tree-branch-stem"></div>
              <div class="parampara-node__card">
                <div>
                  <div class="parampara-node__name">${s.displayName}</div>
                  <div class="parampara-node__tier-tag">
                    <img class="icon-img icon-img--xs" src="${sLevel.iconImg || '/iconos/transparent/icon-rol-sramana.png'}" alt="${sLevel.name}" />
                    <span>Discípulo Iniciado · ${sLevel.name} · ${s.karmaPoints} pts</span>
                  </div>
                </div>
                <span class="parampara-badge-pill parampara-badge-pill--disciple" title="Cada 5 favores 5★ de tu ahijado te otorgan +25 pts">
                  🌱 Ahijado (+25 pts)
                </span>
              </div>
            </div>
          `;
        }).join('') : ''}
      </div>
    </div>
  `;
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

  // Cálculo de la posición del orbe luminoso en la punta del arco
  const p = Math.min(Math.max(progress, 1), 99) / 100;
  const angle = -Math.PI / 2 + (p * 2 * Math.PI);
  const tipX = (85 + radius * Math.cos(angle)).toFixed(1);
  const tipY = (85 + radius * Math.sin(angle)).toFixed(1);

  return `
    <!-- HERO: MANDALA SAGRADO DE KARMA -->
    <div class="karma-mandala-hero">
      <div class="hero-beacon-ribbon">
        <span class="beacon-dot"></span>
        <span>Red de Linaje Activa · ${user.zone}</span>
      </div>

      <!-- Medidor Circular Mandala SVG con Efectos y Partículas -->
      <div class="mandala-gauge glow-karma-pulse" id="mandalaKarmaGauge" title="Toca para irradiar bendiciones de Karma">
        <!-- Anillos áuricos pulsantes concéntricos -->
        <div class="mandala-pulse-ring ring-1"></div>
        <div class="mandala-pulse-ring ring-2"></div>

        <!-- Micro-partículas de Karma en órbita -->
        <div class="karma-particles-orbit">
          <span class="karma-sparkle kp-1">✦</span>
          <span class="karma-sparkle kp-2">✨</span>
          <span class="karma-sparkle kp-3">✦</span>
          <span class="karma-sparkle kp-4">✨</span>
          <span class="karma-sparkle kp-5">✦</span>
          <span class="karma-sparkle kp-6">🪷</span>
          <span class="karma-dust-orb kd-1"></span>
          <span class="karma-dust-orb kd-2"></span>
          <span class="karma-dust-orb kd-3"></span>
          <span class="karma-dust-orb kd-4"></span>
        </div>

        <svg viewBox="0 0 170 170">
          <defs>
            <linearGradient id="mandalaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFD700" />
              <stop offset="35%" stop-color="#E5A93C" />
              <stop offset="70%" stop-color="#B85A3A" />
              <stop offset="100%" stop-color="#38664B" />
            </linearGradient>
            <filter id="mandalaGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <circle class="mandala-track" cx="85" cy="85" r="${radius}" />
          <circle class="mandala-fill" cx="85" cy="85" r="${radius}" 
            stroke-dasharray="${circumference}" 
            stroke-dashoffset="${strokeDashoffset}" />
          <!-- Orbe luminoso indicador al final del arco -->
          <circle class="mandala-tip-orb" cx="${tipX}" cy="${tipY}" r="5" />
        </svg>

        <div class="mandala-center">
          <div class="mandala-avatar-frame">
            <img class="mandala-avatar-img" src="${user.avatarImg || '/avatars/avatar-user-002.jpg'}" alt="${user.displayName}" onerror="this.src='/avatars/avatar-user-002.jpg'" />
            <div class="mandala-avatar-glow"></div>
          </div>
          <div class="mandala-points-wrap">
            <div class="mandala-points">${user.karmaPoints}</div>
            <span class="mandala-spark-icon">✨</span>
          </div>
          <div class="mandala-pts-label">KARMA PTS</div>
        </div>
      </div>

      <div class="hero-user-name">${user.displayName}</div>
      <div class="hero-level-chip shimmer-gold ${level.level >= 4 ? 'hero-level-chip--kamsya' : 'hero-level-chip--sindhoor'}" style="display:inline-flex; align-items:center; gap:6px;">
        <img class="icon-img icon-img--xs" src="${level.iconImg || '/iconos/transparent/icon-rol-sevaka.png'}" alt="${level.name}" />
        <span>Nivel ${level.level} · ${level.name} (${level.title})</span>
      </div>

      <p class="hero-mantra-subtext">
        ${state.currentRole === 'shramana'
          ? 'Iniciado en observación comunitaria. Tu conducta en tus primeros favores edifica tu Karma y honra a tu padrino.'
          : state.currentRole === 'sevaka'
          ? 'Tu servicio desinteresado teje el puente de honor. Cada favor impecable desbloquea prestigio y Llaves Mantra.'
          : 'Solicitudes protegidas bajo Pacto de Honor digital. Calificaciones objetivas y sin intermediarios bancarios.'}
      </p>

      ${nextLevel ? `
        <div style="background: rgba(35, 57, 77, 0.04); border: 1px dashed var(--border-mitti); border-radius: var(--radius-md); padding: 8px 14px; margin-top: var(--space-xs); font-size: 0.75rem; color: var(--text-vibhuti); display: inline-flex; align-items: center; gap: 8px;">
          <img class="icon-img icon-img--xs" src="${nextLevel.iconImg || '/iconos/transparent/icon-nivel-acarya.png'}" alt="${nextLevel.name}" />
          <span>Próximo rango: <strong>${nextLevel.name}</strong> a los ${nextLevel.min} pts (+3 Llaves Mantra)</span>
        </div>
      ` : `
        <div style="background: rgba(166, 124, 55, 0.08); border: 1px solid var(--prestige-kamsya); border-radius: var(--radius-md); padding: 8px 14px; font-size: 0.75rem; color: var(--prestige-kamsya); font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
          <img class="icon-img icon-img--xs" src="/iconos/transparent/icon-nivel-acarya.png" alt="Consejo" />
          <span>Rango Máximo: Miembro del Consejo de Mediación Panchayat</span>
        </div>
      `}

      <!-- TRIO DE MÉTRICAS BENTO -->
      <div class="bento-metrics-grid">
        <div class="bento-metric-card">
          <div class="bento-metric-card__value" style="display:flex; align-items:center; justify-content:center; gap:6px;">
            <img class="bento-icon-img" src="/iconos/transparent/icon-mudra-loto-servicio.png" alt="Favores" />
            <span>${user.completedSevas}</span>
          </div>
          <div class="bento-metric-card__label">Favores Realizados</div>
        </div>
        <div class="bento-metric-card">
          <div class="bento-metric-card__value" style="display:flex; align-items:center; justify-content:center; gap:4px;">
            <span style="color:var(--prestige-kamsya); font-size:1.15rem;">★</span>
            <span>${user.avgRating.toFixed(1)}</span>
          </div>
          <div class="bento-metric-card__label">Honor Comunitario</div>
        </div>
        <div class="bento-metric-card">
          <div class="bento-metric-card__value" style="display:flex; align-items:center; justify-content:center; gap:6px;">
            <img class="bento-icon-img" src="/iconos/transparent/icon-llave-diksha.png" alt="Llaves" />
            <span>${user.dikshaKeys.filter(k => k.status === 'available').length}</span>
          </div>
          <div class="bento-metric-card__label">Llaves Mantra</div>
        </div>
      </div>
    </div>

    <!-- DECK DE ACCIONES RÁPIDAS (BENTO TILES) -->
    <div class="action-deck action-deck--dual">
      ${state.currentRole === 'yajamana' ? `
        <div class="action-tile action-tile--hero" id="btnNewSeva">
          <div class="action-tile__icon-box">
            <img class="icon-img icon-img--md" src="/iconos/transparent/icon-pacto-sankalpa.png" alt="Solicitar" />
          </div>
          <div class="action-tile__body">
            <h3 class="action-tile__title">Solicitar un Favor</h3>
            <p class="action-tile__desc">Emite una necesidad al radar comunitario de confianza.</p>
          </div>
        </div>
        <div class="action-tile" id="btnExploreQuick">
          <div class="action-tile__icon-box">
            <img class="icon-img icon-img--md" src="/iconos/transparent/icon-arbol-parampara.png" alt="Linajes" />
          </div>
          <div class="action-tile__body">
            <h3 class="action-tile__title">Explorar Linajes</h3>
            <p class="action-tile__desc">Descubre maestros y discípulos con habilidades avaladas.</p>
          </div>
        </div>
      ` : state.currentRole === 'sevaka' ? `
        <div class="action-tile action-tile--hero" id="btnSimulateNotification">
          <div class="action-tile__icon-box">
            <img class="icon-img icon-img--md" src="/iconos/transparent/icon-doble-ciego.png" alt="Radar" />
          </div>
          <div class="action-tile__body">
            <h3 class="action-tile__title">Radar de Sevā</h3>
            <p class="action-tile__desc">Simular favor entrante estilo Uber Wave en tu zona.</p>
          </div>
        </div>
        <div class="action-tile" id="btnProfileQuick">
          <div class="action-tile__icon-box">
            <img class="icon-img icon-img--md" src="/iconos/transparent/icon-llave-diksha.png" alt="Llaves" />
          </div>
          <div class="action-tile__body">
            <h3 class="action-tile__title">Tus Llaves Mantra</h3>
            <p class="action-tile__desc">Invita y apadrina miembros bajo tu prestigio solidario.</p>
          </div>
        </div>
      ` : `
        <div class="action-tile action-tile--hero" id="btnRegister">
          <div class="action-tile__icon-box">
            <img class="icon-img icon-img--md" src="/iconos/transparent/icon-llave-diksha.png" alt="Código" />
          </div>
          <div class="action-tile__body">
            <h3 class="action-tile__title">Ingresar Código Mantra</h3>
            <p class="action-tile__desc">Redime tu llave de invitación e iníciate con un Gurú.</p>
          </div>
        </div>
        <div class="action-tile" id="btnExploreQuick">
          <div class="action-tile__icon-box">
            <img class="icon-img icon-img--md" src="/iconos/transparent/icon-nivel-acarya.png" alt="Maestros" />
          </div>
          <div class="action-tile__body">
            <h3 class="action-tile__title">Conocer Maestros</h3>
            <p class="action-tile__desc">Explora los Maestros activos en la red comunitaria.</p>
          </div>
        </div>
      `}
    </div>

    <!-- LIBRO MAYOR DE KARMA (HISTORIAL VERIFICADO) -->
    <div class="card mb-md">
      <div class="flex justify-between items-center mb-md">
        <h3 style="font-family: var(--font-heading); font-size: 1.25rem; display:flex; align-items:center; gap:8px;">
          <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-mudra-palabra-sagrada.png" alt="Libro Mayor" />
          <span>Libro Mayor de Honor</span>
        </h3>
        <span class="text-vibhuti font-mono" style="font-size:0.7rem;">HASH COMUNITARIO</span>
      </div>
      ${state.karmaLedger
        .filter(e => e.userId === user.id)
        .slice(0, 5)
        .map(entry => `
          <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid var(--border-delicate);">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="width:36px; height:36px; border-radius:var(--radius-sm); background:var(--surface-khadi); border:1px solid var(--border-mitti); display:flex; align-items:center; justify-content:center;">
                ${entry.event === 'seva_completed' ? '<img class="icon-img icon-img--sm" src="/iconos/transparent/icon-mudra-loto-servicio.png" alt="Completado" />' : entry.event === 'shishya_bonus' ? '<img class="icon-img icon-img--sm" src="/iconos/transparent/icon-llave-diksha.png" alt="Bono" />' : entry.event === 'shishya_penalty' ? '<img class="icon-img icon-img--sm" src="/iconos/transparent/icon-doble-ciego.png" alt="Penalización" />' : '<img class="icon-img icon-img--xs" src="/iconos/transparent/icon-escudo-kavacha.png" alt="Evento" />'}
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

    <!-- ÁRBOL PARAMPARĀ (MAPA DE LINAJE SAGRADO VIVO Y GAMIFICADO) -->
    ${renderParamparaTree(user)}
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
      <p>Encuentra prestadores de confianza en tu red de linaje</p>
    </div>

    <div class="search-bar">
      <input type="text" placeholder="Buscar por habilidad, nombre o zona..." id="searchInput" />
    </div>

    <div class="filter-chips mb-md" id="filterChips">
      <button class="filter-chip active" data-filter="all">Todos</button>
      <button class="filter-chip" data-filter="tan_seva" style="display:inline-flex; align-items:center; gap:6px;">
        <img class="icon-img icon-img--xs" src="/iconos/transparent/icon-skill-tan-seva.png" alt="Oficios" />
        <span>Oficios</span>
      </button>
      <button class="filter-chip" data-filter="man_seva" style="display:inline-flex; align-items:center; gap:6px;">
        <img class="icon-img icon-img--xs" src="/iconos/transparent/icon-skill-man-seva.png" alt="Asesorías" />
        <span>Asesorías</span>
      </button>
      <button class="filter-chip" data-filter="available">🟢 Disponibles</button>
    </div>

    <div id="userList">
      ${otherUsers.map(user => {
        const level = getKarmaLevel(user.karmaPoints);
        return `
          <div class="seva-list-item" data-user-id="${user.id}" id="profile-${user.id}">
            <div class="seva-list-item__avatar">
              ${renderUserAvatar(user, 'avatar--md')}
            </div>
            <div class="seva-list-item__body">
              <div class="seva-list-item__name">${user.displayName}</div>
              <div class="seva-list-item__skill">
                ${user.skills.map(s => s.icon + ' ' + s.name).join(' · ')}
              </div>
              <div class="seva-list-item__meta">
                <span class="profile-level level-${level.level}" style="display:inline-flex; align-items:center; gap:4px;">
                  <img class="icon-img icon-img--xs" src="${level.iconImg || '/iconos/transparent/icon-rol-sevaka.png'}" alt="${level.name}" />
                  <span>${level.name}</span>
                </span>
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
        <div class="profile-avatar">
          ${renderUserAvatar(user, 'avatar--hero')}
        </div>
        <div class="profile-info">
          <div class="profile-name">${user.displayName}</div>
          <span class="profile-level level-${level.level}" style="display:inline-flex; align-items:center; gap:6px;">
            <img class="icon-img icon-img--xs" src="${level.iconImg || '/iconos/transparent/icon-rol-sevaka.png'}" alt="${level.name}" />
            <span>Nivel ${level.level} · ${level.name} (${level.title})</span>
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
          <div class="stat-card__value" style="display:flex; align-items:center; justify-content:center; gap:4px;">
            <img class="bento-icon-img" src="/iconos/transparent/icon-mudra-loto-servicio.png" alt="Favores" />
            <span>${user.completedSevas}</span>
          </div>
          <div class="stat-card__label">Favores</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" style="display:flex; align-items:center; justify-content:center; gap:4px;">
            <span style="color:var(--prestige-kamsya); font-size:1.15rem;">★</span>
            <span>${user.avgRating.toFixed(1)}</span>
          </div>
          <div class="stat-card__label">Calificación</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" style="display:flex; align-items:center; justify-content:center; gap:4px;">
            <img class="bento-icon-img" src="/iconos/transparent/icon-arbol-parampara.png" alt="Discípulos" />
            <span>${user.shishyas.length}</span>
          </div>
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

      <!-- Insignias (Sellos) -->
      ${user.badges.length > 0 ? `
        <div class="skills-section mt-sm">
          <div class="skills-section__title" style="display:flex; align-items:center; gap:6px;">
            <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-mudra-ojo-sabiduria.png" alt="Sellos" />
            <span>Sellos de Reconocimiento</span>
          </div>
          <div class="badges-row">
            ${user.badges.map(bId => {
              const b = MUDRAS[bId];
              return b ? `<span class="badge" style="display:inline-flex; align-items:center; gap:6px;"><img class="mudra-icon-img" src="${b.iconImg || '/iconos/transparent/icon-mudra-maestro.png'}" alt="${b.name}" /> <span>${b.name}</span></span>` : '';
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Linaje Sagrado Kalpavriksha Gamificado -->
      ${renderParamparaTree(user)}
    </div>

    <!-- Botón de contacto -->
    ${!isOwnProfile ? `
      <button class="btn btn--primary btn--full mt-md" id="btnContactSeva" style="display:flex; align-items:center; justify-content:center; gap:8px;">
        <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-mudra-loto-servicio.png" alt="Contactar" />
        <span>Contactar para un Favor</span>
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
          <div class="skills-section__title" style="margin-bottom: var(--space-sm); display:flex; align-items:center; gap:8px;">
            <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-doble-ciego.png" alt="Doble Ciego" />
            <span>Reseñas Comunitarias (Doble Ciego Verificado)</span>
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
                  ${rev.badge ? `<span class="badge" style="padding:2px 8px; font-size:0.7rem; display:inline-flex; align-items:center; gap:4px;"><img class="mudra-icon-img" src="${MUDRAS[rev.badge]?.iconImg || '/iconos/transparent/icon-mudra-maestro.png'}" alt="Sello" /> <span>${MUDRAS[rev.badge]?.name || ''}</span></span>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    })()}

    <!-- Llaves Mantra (solo propio perfil) -->
    ${isOwnProfile && user.dikshaKeys.length > 0 ? `
      <div class="diksha-section mt-md">
        <div class="skills-section__title" style="display:flex; align-items:center; gap:8px;">
          <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-llave-diksha.png" alt="Llaves" />
          <span>Llaves de Invitación Mantra</span>
        </div>
        <p class="text-vibhuti" style="font-size:0.78rem; margin-bottom:var(--space-sm);">
          Cada llave invita a un nuevo miembro bajo tu padrinazgo. Tu Karma responde por ellos.
        </p>
        ${user.dikshaKeys.map(key => `
          <span class="diksha-key ${key.status === 'available' ? 'diksha-key--available' : 'diksha-key--used'}" style="display:inline-flex; align-items:center; gap:6px;">
            <img class="icon-img icon-img--xs" src="/iconos/transparent/icon-llave-diksha.png" alt="Llave" />
            <span>${key.code}</span>
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
        <div class="empty-state__icon">
          <img class="icon-img icon-img--hero" src="/iconos/transparent/icon-nav-chat.png" alt="Chat" />
        </div>
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
          <div class="chat-header-avatar">
            ${renderUserAvatar(otherUser, 'avatar--sm')}
          </div>
          <div>
            <div style="font-weight:700; font-size:0.95rem; color:var(--primary-nila); font-family:var(--font-heading);">${otherUser?.displayName || 'Usuario'}</div>
            <div class="chat-security-status-badge" style="display:inline-flex; align-items:center; gap:6px;">
              <img class="icon-img icon-img--xs" src="${isSankalpaAgreed ? '/iconos/transparent/icon-pacto-sankalpa.png' : '/iconos/transparent/icon-escudo-kavacha.png'}" alt="Seguridad" />
              <span>${isSankalpaAgreed ? 'Pacto de Honor Sellado · Datos Abiertos' : 'Escudo Anti-Fuga Activo · Canal Cifrado'}</span>
            </div>
          </div>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn--danger btn--sm" id="btnKavacha" title="Modo Escudo de Seguridad" style="padding:6px 12px; font-size:0.75rem; display:inline-flex; align-items:center; gap:6px;">
            <img class="icon-img icon-img--xs" src="/iconos/transparent/icon-escudo-kavacha.png" alt="Escudo" />
            <span>Modo Escudo</span>
          </button>
        </div>
      </div>

      <!-- Mensajes -->
      <div class="chat-messages" id="chatMessages">
        ${messages.map(msg => {
          if (msg.type === 'sankalpa') {
            return `<div class="chat-bubble chat-bubble--system" style="display:flex; align-items:flex-start; gap:8px;"><img class="icon-img icon-img--xs" src="/iconos/transparent/icon-pacto-sankalpa.png" alt="Pacto" style="margin-top:2px;" /> <span>${msg.text}</span></div>`;
          }
          if (msg.type === 'blocked') {
            return `<div class="chat-bubble chat-bubble--blocked" style="display:flex; align-items:flex-start; gap:8px;"><img class="icon-img icon-img--xs" src="/iconos/transparent/icon-escudo-kavacha.png" alt="Escudo" style="margin-top:2px;" /> <span>${msg.text}</span></div>`;
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
          <button class="btn btn--geru btn--full btn--sm" id="btnConfirmSankalpa" style="display:flex; align-items:center; justify-content:center; gap:8px;">
            <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-pacto-sankalpa.png" alt="Pacto" />
            <span>Confirmar Pacto de Honor</span>
          </button>
        </div>
      ` : ''}

      ${isSankalpaAgreed && activeRequest.status === 'sankalpa_agreed' ? `
        <div style="padding: var(--space-sm) var(--space-md); border-top: 1px solid var(--border-mitti); background: var(--surface-khadi);">
          <button class="btn btn--primary btn--full btn--sm" id="btnStartPin" style="display:flex; align-items:center; justify-content:center; gap:8px;">
            <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-doble-ciego.png" alt="PIN" />
            <span>Verificar PIN de Inicio (Llegada)</span>
          </button>
        </div>
      ` : ''}

      ${activeRequest.status === 'in_progress' ? `
        <div style="padding: var(--space-sm) var(--space-md); border-top: 1px solid var(--border-mitti); background: var(--surface-khadi);">
          <button class="btn btn--geru btn--full btn--sm" id="btnEndPin" style="display:flex; align-items:center; justify-content:center; gap:8px;">
            <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-doble-ciego.png" alt="PIN" />
            <span>Ingresar PIN de Finalización (Cierre y Pago)</span>
          </button>
        </div>
      ` : ''}

      ${activeRequest.status === 'completed' ? `
        <div style="padding: var(--space-sm) var(--space-md); border-top: 1px solid var(--border-mitti); background: var(--surface-khadi);">
          <button class="btn btn--geru btn--full btn--sm" id="btnGoToReview" style="display:flex; align-items:center; justify-content:center; gap:8px;">
            <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-doble-ciego.png" alt="Evaluación" />
            <span>Ver / Gestionar Evaluación Doble Ciego</span>
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

// ─── Tarjeta de Pacto de Honor (Pergamino Sagrado Digital) ───
function renderSankalpaCard(request) {
  return `
    <div class="sankalpa-card shimmer-gold">
      <div class="sankalpa-card__title" style="display:flex; align-items:center; gap:8px;">
        <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-pacto-sankalpa.png" alt="Pacto" />
        <span>Pacto de Honor Digital</span>
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
        <div style="font-size:0.8rem; color:var(--text-vibhuti); font-weight:600; display:flex; align-items:center; gap:6px;">
          <img class="icon-img icon-img--xs" src="${request.category === 'tan_seva' ? '/iconos/transparent/icon-skill-tan-seva.png' : '/iconos/transparent/icon-skill-man-seva.png'}" alt="Categoría" />
          <span>${request.category === 'tan_seva' ? 'Oficio (Servicio Manual)' : 'Asesoría (Gestión y Orientación)'}</span>
        </div>
      </div>
      <div class="sankalpa-card__signatures">
        <div class="sankalpa-sig">
          <div class="sankalpa-sig__label">Sello Solicitante</div>
          <div class="sankalpa-sig__status" style="display:inline-flex; align-items:center; gap:4px;">
            <img class="icon-img icon-img--xs" src="/iconos/transparent/icon-pacto-sankalpa.png" alt="Sello" />
            <span>✓ Sancionado</span>
          </div>
        </div>
        <div class="sankalpa-sig">
          <div class="sankalpa-sig__label">Sello Prestador</div>
          <div class="sankalpa-sig__status" style="display:inline-flex; align-items:center; gap:4px;">
            <img class="icon-img icon-img--xs" src="/iconos/transparent/icon-pacto-sankalpa.png" alt="Sello" />
            <span>✓ Sancionado</span>
          </div>
        </div>
      </div>
      <div style="text-align:center; margin-top:10px; font-size:0.68rem; color:var(--prestige-kamsya); font-family:var(--font-mono); letter-spacing:0.05em;">
        PACTO-ID: ${request.id.toUpperCase()} · ${request.createdAt}
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
      <div style="margin-bottom:var(--space-sm);">
        <img class="icon-img icon-img--hero" src="/iconos/transparent/icon-doble-ciego.png" alt="PIN" />
      </div>
      <h2>${isStart ? 'PIN de Inicio (Llegada)' : 'PIN de Finalización (Cierre)'}</h2>
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
        <div style="margin-bottom:var(--space-sm);">
          <img class="icon-img icon-img--hero" src="/iconos/transparent/icon-doble-ciego.png" alt="Doble Ciego" />
        </div>
        <h2>Revelación Simultánea Doble Ciego</h2>
        <p class="text-vibhuti mt-xs" style="font-size:0.85rem; max-width:360px; margin:0 auto var(--space-md);">
          Ambas partes han enviado su evaluación. Conforme al principio de ecuanimidad de SevaSetu, las reseñas se revelan juntas e indelebles.
        </p>

        <div class="karma-impact-banner">
          <div class="karma-impact-banner__title" style="display:flex; align-items:center; gap:8px;">
            <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-mudra-palabra-sagrada.png" alt="Impacto" />
            <span>Impacto en el Libro Mayor de Karma</span>
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
                <span class="badge" style="display:inline-flex; align-items:center; gap:4px;"><img class="mudra-icon-img" src="${MUDRAS[rRev.badge]?.iconImg || '/iconos/transparent/icon-mudra-maestro.png'}" alt="Sello" /> <span>${MUDRAS[rRev.badge]?.name || ''}</span></span>
              </div>
            ` : ''}
            <div class="double-blind-card__security mt-xs" style="display:flex; align-items:center; gap:6px;">
              <img class="icon-img icon-img--xs" src="/iconos/transparent/icon-doble-ciego.png" alt="Seguro" />
              <span>3/3 respuestas de seguridad verificadas</span>
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
                <span class="badge" style="display:inline-flex; align-items:center; gap:4px;"><img class="mudra-icon-img" src="${MUDRAS[pRev.badge]?.iconImg || '/iconos/transparent/icon-mudra-maestro.png'}" alt="Sello" /> <span>${MUDRAS[pRev.badge]?.name || ''}</span></span>
              </div>
            ` : ''}
            <div class="double-blind-card__security mt-xs" style="display:flex; align-items:center; gap:6px;">
              <img class="icon-img icon-img--xs" src="/iconos/transparent/icon-doble-ciego.png" alt="Seguro" />
              <span>3/3 respuestas de seguridad verificadas</span>
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
        <div class="empty-state__icon">
          <img class="icon-img icon-img--hero" src="/iconos/transparent/icon-doble-ciego.png" alt="Sellado" />
        </div>
        <div class="empty-state__title">Evaluación Sellada en Doble Ciego</div>
        <div class="empty-state__text">
          Tu calificación para <strong>${counterparty.displayName}</strong> y tus 3 respuestas privadas han sido encriptadas.
          La reseña de la contraparte permanece estrictamente bloqueada hasta que ambas partes hayan enviado su evaluación.
        </div>
        <div class="review-blind-notice mt-md" style="display:flex; align-items:center; gap:8px;">
          <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-doble-ciego.png" alt="Doble Ciego" />
          <span>Mecanismo Doble Ciego: Ninguna parte lee antes de calificar para garantizar total imparcialidad</span>
        </div>

        <div style="background:var(--surface-khadi); border:1px dashed var(--border-mitti); border-radius:var(--radius-md); padding:var(--space-md); margin:var(--space-md) 0; text-align:left;">
          <div style="font-size:0.78rem; font-weight:600; color:var(--text-vibhuti); text-transform:uppercase; margin-bottom:var(--space-xs);">
            🧪 Simulador de Auditoría
          </div>
          <p style="font-size:0.8rem; color:var(--text-kajal); margin-bottom:var(--space-sm);">
            Puedes cambiar de rol arriba a <strong>${isProvider ? 'Solicitante' : 'Prestador'}</strong> para probar el flujo mutuo, o pulsar este simulador para emitir la evaluación de la contraparte:
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

      <div class="review-blind-notice mt-md" style="display:flex; align-items:center; gap:8px;">
        <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-doble-ciego.png" alt="Doble Ciego" />
        <span>Evaluación Doble Ciego — La contraparte no verá tu calificación hasta que también envíe la suya</span>
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
        <div class="skills-section__title" style="margin-bottom: var(--space-sm); display:flex; align-items:center; gap:8px;">
          <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-doble-ciego.png" alt="Seguridad" />
          <span>Preguntas Privadas de Seguridad (Community Standing)</span>
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

      <!-- Insignias opcionales (Sellos) -->
      <div class="mt-lg" style="text-align:left;">
        <div class="skills-section__title" style="display:flex; align-items:center; gap:8px;">
          <img class="icon-img icon-img--sm" src="/iconos/transparent/icon-mudra-ojo-sabiduria.png" alt="Sellos" />
          <span>Otorgar Sello de Reconocimiento</span>
        </div>
        <div class="badges-row mt-sm">
          ${Object.values(MUDRAS).map(m => `
            <button class="badge ${rev.selectedBadge === m.id ? 'active' : ''}" id="badge-${m.id}" data-badge="${m.id}" style="cursor:pointer; border:${rev.selectedBadge === m.id ? '2px solid var(--primary-nila)' : '1px solid var(--border-mitti)'}; display:inline-flex; align-items:center; gap:6px;">
              <img class="mudra-icon-img" src="${m.iconImg || '/iconos/transparent/icon-mudra-maestro.png'}" alt="${m.name}" />
              <span>${m.name}</span>
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
// VISTA: REGISTRO CON CÓDIGO MANTRA
// ═══════════════════════════════════════════════════════
function renderRegistrationView() {
  return `
    <div class="text-center" style="padding: var(--space-xl) 0;">
      <div style="margin-bottom:var(--space-sm);">
        <img class="icon-img icon-img--hero" src="/iconos/transparent/icon-llave-diksha.png" alt="Mantra" />
      </div>
      <h2>Registro por Invitación</h2>
      <p class="text-vibhuti mt-sm" style="font-size:0.85rem; max-width:320px; margin:var(--space-sm) auto;">
        SevaSetu es una red cerrada de confianza. Necesitas un código de invitación Mantra emitido por un miembro activo con Karma suficiente.
      </p>

      <div class="card mt-lg" style="text-align:left;">
        <div class="form-group">
          <label>Código de Invitación Mantra</label>
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

        <button class="btn btn--primary btn--full" id="btnCompleteRegister" style="display:flex; align-items:center; justify-content:center; gap:8px;">
          <img class="icon-img icon-img--xs" src="/iconos/transparent/icon-llave-diksha.png" alt="Llave" />
          <span>Completar Registro</span>
        </button>
      </div>

      <button class="btn btn--secondary btn--full mt-md" id="btnBackFromRegister">
        ← Volver
      </button>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════
// MODAL: ACCESO RESTRINGIDO (CÓDIGO MANTRA)
// ═══════════════════════════════════════════════════════
function renderRegisterModal() {
  return `
    <div class="modal-overlay" id="registerModalOverlay">
      <div class="modal">
        <div class="modal__title">🔒 Acceso Restringido</div>
        <div class="modal__subtitle">
          SevaSetu es una comunidad cerrada basada en la confianza del padrinazgo. 
          Para unirte necesitas un código de invitación <strong>Mantra</strong> emitido 
          por un miembro activo con nivel de Karma suficiente.
        </div>
        <div style="text-align:center; padding: var(--space-md); background: var(--bg-chandan); border-radius:var(--radius-md); border: 1px solid var(--border-mitti);">
          <div style="margin-bottom:var(--space-sm);">
            <img class="icon-img icon-img--hero" src="/iconos/transparent/icon-llave-diksha.png" alt="Llave" />
          </div>
          <p class="text-vibhuti" style="font-size:0.82rem;">
            Cada miembro recibe <strong>+3 Llaves Mantra</strong> al subir de nivel de Karma. 
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
          <img class="icon-img icon-img--xs" src="${notif.category === 'tan_seva' ? '/iconos/transparent/icon-skill-tan-seva.png' : '/iconos/transparent/icon-skill-man-seva.png'}" alt="Categoría" />
          <span>${notif.categoryLabel}</span>
        </div>
      </div>

      <div class="uber-notification__actions">
        <button class="btn btn--secondary btn--sm" id="btnRejectSeva">
          Dejar Pasar
        </button>
        <button class="btn btn--geru btn--sm pulse-geru" id="btnAcceptSeva" style="display:inline-flex; align-items:center; gap:6px;">
          <img class="icon-img icon-img--xs" src="/iconos/transparent/icon-mudra-maestro.png" alt="Aceptar" />
          <span>Aceptar Favor</span>
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

  // Asignar Sellos si fueron otorgados
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

  // Verificar ascenso de nivel (+3 Llaves Mantra exactas)
  const promo = checkLevelUp(provider, prevPoints);
  if (promo.leveledUp) {
    state.karmaLedger.unshift({
      userId: provider.id,
      event: 'level_promotion',
      points: 0,
      detail: `Ascenso a Nivel ${promo.newLevel.level} (${promo.newLevel.name}) · +3 Llaves Mantra desbloqueadas`,
      relatedUser: provider.id,
      date: 'Hoy',
    });
    triggerKarmaCelebration();
    showNotification(`🕉️ ¡Ascenso de Nivel! ${provider.displayName} ahora es ${promo.newLevel.name} (+3 Llaves Mantra otorgadas).`);
  }

  // Motor de Karma Solidario con el Gurú
  if (provider.guruId) {
    const guru = state.users.find(u => u.id === provider.guruId);
    if (guru) {
      // 1. Bono Gurú (+25 pts) si el ahijado completa 5 servicios con 5★
      if (provider.completedSevas === 5 && providerRating === 5) {
        guru.karmaPoints += 25;
        state.karmaLedger.unshift({
          userId: guru.id,
          event: 'shishya_bonus',
          points: 25,
          detail: `Bono Gurú: Su ahijado ${provider.displayName} completó 5 favores con 5★`,
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
  // ─── EVENTOS DEL BOT COMPANION "SIDDHI" ───
  // Alternar diálogo
  const btnToggleBot = document.getElementById('btnToggleBot');
  if (btnToggleBot) {
    btnToggleBot.addEventListener('click', () => {
      state.botGuide.isOpen = !state.botGuide.isOpen;
      if (state.botGuide.isOpen) {
        state.botGuide.hasSeenSpeechPill = true;
        const currentKn = BOT_KNOWLEDGE.views[state.currentView] || BOT_KNOWLEDGE.views.home;
        state.botGuide.currentPose = currentKn.pose || 'greeting';
        playNotificationSound();
      }
      render();
    });
  }

  // Abrir desde píldora
  const btnOpenPill = document.getElementById('btnOpenBotPill');
  if (btnOpenPill) {
    btnOpenPill.addEventListener('click', (e) => {
      if (e.target.id === 'btnClosePill') return;
      state.botGuide.isOpen = true;
      state.botGuide.hasSeenSpeechPill = true;
      const currentKn = BOT_KNOWLEDGE.views[state.currentView] || BOT_KNOWLEDGE.views.home;
      state.botGuide.currentPose = currentKn.pose || 'greeting';
      playNotificationSound();
      render();
    });
  }

  // Cerrar píldora
  const btnClosePill = document.getElementById('btnClosePill');
  if (btnClosePill) {
    btnClosePill.addEventListener('click', (e) => {
      e.stopPropagation();
      state.botGuide.hasSeenSpeechPill = true;
      render();
    });
  }

  // Cerrar diálogo
  const btnCloseBotDialog = document.getElementById('btnCloseBotDialog');
  if (btnCloseBotDialog) {
    btnCloseBotDialog.addEventListener('click', () => {
      state.botGuide.isOpen = false;
      render();
    });
  }

  const btnDismissDialog = document.getElementById('btnDismissDialog');
  if (btnDismissDialog) {
    btnDismissDialog.addEventListener('click', () => {
      state.botGuide.isOpen = false;
      render();
    });
  }

  // Cerrar tocando el fondo oscuro
  const botOverlay = document.getElementById('botDialogOverlay');
  if (botOverlay) {
    botOverlay.addEventListener('click', (e) => {
      if (e.target === botOverlay) {
        state.botGuide.isOpen = false;
        render();
      }
    });
  }

  // Cambiar pestaña del bot
  document.querySelectorAll('.bot-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      state.botGuide.activeTab = tab;
      if (tab === 'view') {
        const currentKn = BOT_KNOWLEDGE.views[state.currentView] || BOT_KNOWLEDGE.views.home;
        state.botGuide.currentPose = currentKn.pose || 'explaining';
      } else if (tab === 'faq') {
        state.botGuide.currentPose = 'thinking';
      } else if (tab === 'tour') {
        state.botGuide.currentPose = BOT_KNOWLEDGE.tour[state.botGuide.tourStep]?.pose || 'explaining';
      }
      render();
    });
  });

  // Acordeón FAQ
  document.querySelectorAll('.bot-faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.faqIdx);
      state.botGuide.faqOpenIndex = state.botGuide.faqOpenIndex === idx ? null : idx;
      state.botGuide.currentPose = 'thinking';
      render();
    });
  });

  // Iniciar Tour Volador en Nube Mágica
  const btnStartFlying = document.getElementById('btnStartFlyingTour');
  if (btnStartFlying) {
    btnStartFlying.addEventListener('click', () => {
      state.botGuide.isOpen = false;
      state.botGuide.tourActive = true;
      state.botGuide.tourStep = 0;
      const firstStep = BOT_KNOWLEDGE.tour[0];
      if (firstStep.view && state.currentView !== firstStep.view) {
        state.currentView = firstStep.view;
      }
      playCelebrationSound();
      render();
    });
  }

  // Cerrar Tour Volador
  const btnCloseFlying = document.getElementById('btnCloseFlyingTour');
  if (btnCloseFlying) {
    btnCloseFlying.addEventListener('click', () => {
      state.botGuide.tourActive = false;
      document.querySelectorAll('.tour-target-highlight').forEach(el => el.classList.remove('tour-target-highlight'));
      document.querySelectorAll('.tour-target-beacon').forEach(el => el.remove());
      if (window._tourScrollHandler) {
        window.removeEventListener('scroll', window._tourScrollHandler);
        window.removeEventListener('resize', window._tourResizeHandler);
        window._tourScrollHandler = null;
        window._tourResizeHandler = null;
      }
      render();
    });
  }

  // Tour Volador: Siguiente
  const btnFlyingNext = document.getElementById('btnFlyingTourNext');
  if (btnFlyingNext) {
    btnFlyingNext.addEventListener('click', () => {
      if (state.botGuide.tourStep < BOT_KNOWLEDGE.tour.length - 1) {
        state.botGuide.tourStep++;
        const nextStep = BOT_KNOWLEDGE.tour[state.botGuide.tourStep];
        if (nextStep.view && state.currentView !== nextStep.view) {
          state.currentView = nextStep.view;
        }
        playNotificationSound();
        render();
      } else {
        // Concluir tour volador con gran celebración
        state.botGuide.tourActive = false;
        state.botGuide.tourStep = 0;
        document.querySelectorAll('.tour-target-highlight').forEach(el => el.classList.remove('tour-target-highlight'));
        document.querySelectorAll('.tour-target-beacon').forEach(el => el.remove());
        if (window._tourScrollHandler) {
          window.removeEventListener('scroll', window._tourScrollHandler);
          window.removeEventListener('resize', window._tourResizeHandler);
          window._tourScrollHandler = null;
          window._tourResizeHandler = null;
        }
        state.currentView = 'home';
        triggerKarmaCelebration();
        showNotification('🎉 ¡Has completado el Gran Tour Volador con Siddhi! +10 Karma Pts de honor simbólico.');
        render();
      }
    });
  }

  // Tour Volador: Anterior
  const btnFlyingPrev = document.getElementById('btnFlyingTourPrev');
  if (btnFlyingPrev) {
    btnFlyingPrev.addEventListener('click', () => {
      if (state.botGuide.tourStep > 0) {
        state.botGuide.tourStep--;
        const prevStep = BOT_KNOWLEDGE.tour[state.botGuide.tourStep];
        if (prevStep.view && state.currentView !== prevStep.view) {
          state.currentView = prevStep.view;
        }
        playNotificationSound();
        render();
      }
    });
  }

  // Botón para re-enfocar el elemento activo si el usuario se desplazó
  const btnFocusTour = document.getElementById('btnFocusTourTarget');
  if (btnFocusTour) {
    btnFocusTour.addEventListener('click', () => {
      const curStep = BOT_KNOWLEDGE.tour[state.botGuide.tourStep];
      if (curStep && curStep.target) {
        const targetEl = document.querySelector(curStep.target);
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({ top: Math.max(0, rect.top + scrollTop - 95), behavior: 'smooth' });
          setTimeout(() => {
            positionSiddhiNearTarget(targetEl);
          }, 120);
        }
      }
    });
  }

  // Resaltado de Spotlight y Posicionamiento de Siddhi en su Nube al lado del elemento
  if (state.botGuide.tourActive) {
    const curStep = BOT_KNOWLEDGE.tour[state.botGuide.tourStep];
    if (curStep && curStep.target) {
      setTimeout(() => {
        // Limpiar marcas previas
        document.querySelectorAll('.tour-target-highlight').forEach(el => el.classList.remove('tour-target-highlight'));
        document.querySelectorAll('.tour-target-beacon').forEach(el => el.remove());

        const targetEl = document.querySelector(curStep.target);
        if (targetEl) {
          targetEl.classList.add('tour-target-highlight');

          // Desplazamiento inteligente al tercio superior
          const rect = targetEl.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetOffset = rect.top + scrollTop - 95;
          window.scrollTo({ top: Math.max(0, targetOffset), behavior: 'smooth' });

          // Posicionar al guía volador Siddhi físicamente al lado del elemento
          positionSiddhiNearTarget(targetEl);
          setTimeout(() => {
            positionSiddhiNearTarget(targetEl);
          }, 180);
        }
      }, 70);
    }

    // Mantener a Siddhi al lado del elemento ante cualquier scroll o cambio de tamaño
    if (window._tourScrollHandler) {
      window.removeEventListener('scroll', window._tourScrollHandler);
      window.removeEventListener('resize', window._tourResizeHandler);
    }
    window._tourScrollHandler = () => {
      const cur = BOT_KNOWLEDGE.tour[state.botGuide.tourStep];
      if (cur && cur.target) {
        const el = document.querySelector(cur.target);
        if (el) positionSiddhiNearTarget(el);
      }
    };
    window._tourResizeHandler = window._tourScrollHandler;
    window.addEventListener('scroll', window._tourScrollHandler, { passive: true });
    window.addEventListener('resize', window._tourResizeHandler, { passive: true });
  }

  // Celebración con pétalos y sonido
  const btnCelebrate = document.getElementById('btnCelebrateKarma');
  if (btnCelebrate) {
    btnCelebrate.addEventListener('click', () => {
      triggerKarmaCelebration();
    });
  }

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

  // Botón de nuevo favor (Solicitante)
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

  // Interacción táctil en el Medidor Circular de Karma (Efectos y Partículas)
  const mandalaGauge = document.getElementById('mandalaKarmaGauge');
  if (mandalaGauge) {
    mandalaGauge.addEventListener('click', () => {
      playNotificationSound();
      triggerMarigoldPetals();
      showNotification(`✨ ¡Aura de Karma radiante! Tienes ${state.currentUser.karmaPoints} puntos de honor y confianza comunitaria.`);
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

  // Confirmar Pacto de Honor
  const btnSankalpa = document.getElementById('btnConfirmSankalpa');
  if (btnSankalpa) {
    btnSankalpa.addEventListener('click', () => {
      if (state.activeSeva) {
        state.activeSeva.status = 'sankalpa_agreed';
        state.chatMessages.push({
          id: 'msg_sankalpa_' + Date.now(),
          sevaId: state.activeSeva.id,
          senderId: 'system',
          text: '🤝 Pacto de Honor confirmado por ambas partes. El filtro anti-fuga se ha desactivado para esta conversación.',
          timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
          type: 'sankalpa',
        });
        triggerKarmaCelebration();
        showNotification('✨ ¡Pacto de Honor sellado! El canal seguro se ha liberado.');
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
          text: `🚫 Mensaje interceptado: Se detectó ${reasonsStr}. Conforme a la política Habeas Data y el filtro anti-fuga de SevaSetu, los datos directos están restringidos hasta sellar el Pacto de Honor digital.`,
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

  // Modo Escudo
  const btnKavacha = document.getElementById('btnKavacha');
  if (btnKavacha) {
    btnKavacha.addEventListener('click', () => {
      state.kavachaActive = !state.kavachaActive;
      render();
      if (state.kavachaActive) {
        showNotification('🛡️ Modo Escudo activado. Se ha compartido el enlace de seguimiento con tu contacto de confianza.');
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
        triggerKarmaCelebration();
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
      triggerKarmaCelebration();
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
        text: `💬 Chat seguro abierto con ${provider.displayName}. Recuerda: el filtro anti-fuga está activo hasta confirmar el Pacto de Honor.`,
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

  // Validar código Mantra
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
        showNotification('⚠️ Solo puedes seleccionar hasta 2 habilidades como Aprendiz.');
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
        showNotification('❌ Código Mantra inválido o ya utilizado.');
        return;
      }

      const newUserId = 'user_' + Date.now();

      // 1. Marcar llave como usada y asociar al nuevo discípulo
      keyFound.status = 'used';
      keyFound.redeemedBy = newUserId;

      // 2. Construir árbol de linaje heredado del Gurú
      const paramparaChain = [
        ...(guru.parampara || []),
        `${guru.displayName} (${getKarmaLevel(guru.karmaPoints).name})`
      ];

      // 3. Crear el nuevo usuario Aprendiz (Chela)
      const catalogAll = [...SKILLS_CATALOG.tan_seva, ...SKILLS_CATALOG.man_seva];
      const newUser = {
        id: newUserId,
        displayName: name,
        avatar: '🌱',
        avatarImg: '/avatars/avatar-user-005.jpg',
        karmaPoints: 45, // Nivel 1: Chela (0–99 pts)
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
        dikshaKeys: [], // Chela inicia con 0 llaves hasta subir a Sevak
        parampara: paramparaChain,
      };

      // 4. Agregar al Gurú como ahijado iniciado
      if (!guru.shishyas) guru.shishyas = [];
      guru.shishyas.push(newUserId);

      // 5. Agregar usuario a la red
      state.users.push(newUser);

      // 6. Asentar en el libro mayor de Karma
      state.karmaLedger.unshift({
        userId: newUserId,
        event: 'diksha_initiation',
        points: 45,
        detail: `Iniciación como Chela bajo el padrinazgo de ${guru.displayName} (Llave ${code})`,
        relatedUser: guru.id,
        date: 'Hoy',
      });

      // 7. Establecer como usuario actual en rol Aprendiz
      state.currentUser = newUser;
      state.currentRole = 'shramana';
      state.currentView = 'home';

      showNotification(`🎉 ¡Bienvenido/a ${name}! Has sido iniciado/a como Chela bajo el linaje de ${guru.displayName}.`);
      triggerKarmaCelebration();
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
