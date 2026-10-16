/* ═══════════════════════════════════════════════════════
   SEVASETU · Datos Semilla y Modelo de Estado
   Perfiles realistas con linajes coherentes
   ═══════════════════════════════════════════════════════ */

// ─── Niveles de Karma ───
export const KARMA_LEVELS = [
  { level: 1, name: 'Chela', title: 'Aprendiz', min: 0, max: 99, invitations: 0, accumulated: 0, emoji: '🌱', iconImg: '/iconos/transparent/icon-rol-sramana.png' },
  { level: 2, name: 'Sevak', title: 'Discípulo', min: 100, max: 299, invitations: 3, accumulated: 3, emoji: '🌿', iconImg: '/iconos/transparent/icon-rol-sramana.png' },
  { level: 3, name: 'Artesano', title: 'Artesano', min: 300, max: 699, invitations: 3, accumulated: 6, emoji: '🛠️', iconImg: '/iconos/transparent/icon-rol-sevaka.png' },
  { level: 4, name: 'Maestro', title: 'Maestro', min: 700, max: 1499, invitations: 3, accumulated: 9, emoji: '🏛️', iconImg: '/iconos/transparent/icon-nivel-acarya.png' },
  { level: 5, name: 'Gurú Mayor', title: 'Guardián', min: 1500, max: Infinity, invitations: 3, accumulated: 12, emoji: '🕉️', iconImg: '/iconos/transparent/icon-nivel-acarya.png' },
];

// ─── Insignias (Sellos) ───
export const MUDRAS = {
  manos_maestro: { id: 'manos_maestro', name: 'Manos de Maestro', icon: '🤲', iconImg: '/iconos/transparent/icon-mudra-maestro.png', description: 'Excelencia técnica demostrada' },
  palabra_sagrada: { id: 'palabra_sagrada', name: 'Palabra Sagrada', icon: '📜', iconImg: '/iconos/transparent/icon-mudra-palabra-sagrada.png', description: 'Cumplió exactamente lo pactado' },
  ojo_sabiduria: { id: 'ojo_sabiduria', name: 'Ojo de Sabiduría', icon: '👁️', iconImg: '/iconos/transparent/icon-mudra-ojo-sabiduria.png', description: 'Acierto diagnóstico y discernimiento' },
  loto_servicio: { id: 'loto_servicio', name: 'Loto de Servicio', icon: '🪷', iconImg: '/iconos/transparent/icon-mudra-loto-servicio.png', description: 'Entrega desinteresada y calidez' },
  guia_paciente: { id: 'guia_paciente', name: 'Guía Paciente', icon: '🧭', iconImg: '/iconos/transparent/icon-mudra-guia.png', description: 'Acompañamiento calmado en trámites' },
};

// ─── Habilidades Disponibles ───
export const SKILLS_CATALOG = {
  tan_seva: [
    { id: 'electricidad', name: 'Electricidad Residencial', category: 'tan_seva', icon: '⚡' },
    { id: 'carpinteria', name: 'Carpintería y Ebanistería', category: 'tan_seva', icon: '🪵' },
    { id: 'plomeria', name: 'Plomería General', category: 'tan_seva', icon: '🔧' },
    { id: 'soporte_pc', name: 'Soporte Técnico de PC', category: 'tan_seva', icon: '💻' },
    { id: 'pintura', name: 'Pintura y Acabados', category: 'tan_seva', icon: '🎨' },
    { id: 'cerrajeria', name: 'Cerrajería', category: 'tan_seva', icon: '🔑' },
  ],
  man_seva: [
    { id: 'tramite_bancario', name: 'Trámites Bancarios', category: 'man_seva', icon: '🏦' },
    { id: 'asesoria_visas', name: 'Asesoría de Visas', category: 'man_seva', icon: '🛂' },
    { id: 'diligencias', name: 'Diligencias Administrativas', category: 'man_seva', icon: '📋' },
    { id: 'tutoria', name: 'Tutoría Académica', category: 'man_seva', icon: '📚' },
  ],
};

// ─── Usuarios Semilla (linajes coherentes) ───
export const SEED_USERS = [
  {
    id: 'user_001',
    displayName: 'Don Rafael M.',
    avatar: '👴',
    karmaPoints: 1820,
    karmaLevel: 5,
    completedSevas: 72,
    avgRating: 4.9,
    zone: 'Laureles — Medellín',
    isAvailable: true,
    guruId: null, // Nodo fundador
    shishyas: ['user_002', 'user_003', 'user_006'],
    skills: [
      { ...SKILLS_CATALOG.tan_seva[0], status: 'acharya_certified', completedCount: 45 },
      { ...SKILLS_CATALOG.tan_seva[1], status: 'community_proven', completedCount: 27 },
    ],
    badges: ['manos_maestro', 'palabra_sagrada'],
    dikshaKeys: [
      { code: 'DK-RM-001', status: 'used', redeemedBy: 'user_002' },
      { code: 'DK-RM-002', status: 'used', redeemedBy: 'user_003' },
      { code: 'DK-RM-003', status: 'used', redeemedBy: 'user_006' },
      { code: 'DK-RM-004', status: 'available' },
      { code: 'DK-RM-005', status: 'available' },
      { code: 'DK-RM-006', status: 'available' },
      { code: 'DK-RM-007', status: 'available' },
      { code: 'DK-RM-008', status: 'available' },
      { code: 'DK-RM-009', status: 'available' },
      { code: 'DK-RM-010', status: 'available' },
      { code: 'DK-RM-011', status: 'available' },
      { code: 'DK-RM-012', status: 'available' },
    ],
    parampara: ['Fundador del Linaje'],
  },
  {
    id: 'user_002',
    displayName: 'Claudia R.',
    avatar: '👩‍🔧',
    karmaPoints: 890,
    karmaLevel: 4,
    completedSevas: 38,
    avgRating: 4.8,
    zone: 'Estadio — Medellín',
    isAvailable: true,
    guruId: 'user_001',
    shishyas: ['user_004', 'user_005'],
    skills: [
      { ...SKILLS_CATALOG.tan_seva[0], status: 'acharya_certified', completedCount: 22 },
      { ...SKILLS_CATALOG.man_seva[0], status: 'community_proven', completedCount: 16 },
    ],
    badges: ['manos_maestro', 'guia_paciente'],
    dikshaKeys: [
      { code: 'DK-CR-001', status: 'used', redeemedBy: 'user_004' },
      { code: 'DK-CR-002', status: 'used', redeemedBy: 'user_005' },
      { code: 'DK-CR-003', status: 'available' },
      { code: 'DK-CR-004', status: 'available' },
      { code: 'DK-CR-005', status: 'available' },
      { code: 'DK-CR-006', status: 'available' },
      { code: 'DK-CR-007', status: 'available' },
      { code: 'DK-CR-008', status: 'available' },
      { code: 'DK-CR-009', status: 'available' },
    ],
    parampara: ['Don Rafael M. (Gurú Mayor)'],
  },
  {
    id: 'user_003',
    displayName: 'Ernesto V.',
    avatar: '👨‍💼',
    karmaPoints: 520,
    karmaLevel: 3,
    completedSevas: 21,
    avgRating: 4.6,
    zone: 'Belén — Medellín',
    isAvailable: false,
    guruId: 'user_001',
    shishyas: ['user_007'],
    skills: [
      { ...SKILLS_CATALOG.man_seva[1], status: 'community_proven', completedCount: 12 },
      { ...SKILLS_CATALOG.man_seva[2], status: 'community_proven', completedCount: 9 },
    ],
    badges: ['palabra_sagrada', 'guia_paciente'],
    dikshaKeys: [
      { code: 'DK-EV-001', status: 'used', redeemedBy: 'user_007' },
      { code: 'DK-EV-002', status: 'available' },
      { code: 'DK-EV-003', status: 'available' },
      { code: 'DK-EV-004', status: 'available' },
      { code: 'DK-EV-005', status: 'available' },
      { code: 'DK-EV-006', status: 'available' },
    ],
    parampara: ['Don Rafael M. (Gurú Mayor)'],
  },
  {
    id: 'user_004',
    displayName: 'Miguel Á. T.',
    avatar: '👨‍🔧',
    karmaPoints: 210,
    karmaLevel: 2,
    completedSevas: 9,
    avgRating: 4.7,
    zone: 'Envigado',
    isAvailable: true,
    guruId: 'user_002',
    shishyas: [],
    skills: [
      { ...SKILLS_CATALOG.tan_seva[2], status: 'community_proven', completedCount: 6 },
      { ...SKILLS_CATALOG.tan_seva[4], status: 'declared', completedCount: 2 },
    ],
    badges: [],
    dikshaKeys: [
      { code: 'DK-MT-001', status: 'available' },
      { code: 'DK-MT-002', status: 'available' },
      { code: 'DK-MT-003', status: 'available' },
    ],
    parampara: ['Don Rafael M. (Gurú Mayor)', 'Claudia R. (Maestro)'],
  },
  {
    id: 'user_005',
    displayName: 'Laura G.',
    avatar: '👩‍💻',
    karmaPoints: 45,
    karmaLevel: 1,
    completedSevas: 2,
    avgRating: 5.0,
    zone: 'Poblado — Medellín',
    isAvailable: true,
    guruId: 'user_002',
    shishyas: [],
    skills: [
      { ...SKILLS_CATALOG.tan_seva[3], status: 'declared', completedCount: 2 },
    ],
    badges: [],
    dikshaKeys: [],
    parampara: ['Don Rafael M. (Gurú Mayor)', 'Claudia R. (Maestro)'],
  },
  {
    id: 'user_006',
    displayName: 'Andrés P.',
    avatar: '👨‍🏫',
    karmaPoints: 380,
    karmaLevel: 3,
    completedSevas: 18,
    avgRating: 4.5,
    zone: 'Sabaneta',
    isAvailable: true,
    guruId: 'user_001',
    shishyas: [],
    skills: [
      { ...SKILLS_CATALOG.tan_seva[5], status: 'community_proven', completedCount: 10 },
      { ...SKILLS_CATALOG.man_seva[3], status: 'community_proven', completedCount: 8 },
    ],
    badges: ['guia_paciente'],
    dikshaKeys: [
      { code: 'DK-AP-001', status: 'available' },
      { code: 'DK-AP-002', status: 'available' },
      { code: 'DK-AP-003', status: 'available' },
      { code: 'DK-AP-004', status: 'available' },
      { code: 'DK-AP-005', status: 'available' },
      { code: 'DK-AP-006', status: 'available' },
    ],
    parampara: ['Don Rafael M. (Gurú Mayor)'],
  },
  {
    id: 'user_007',
    displayName: 'Sofía L.',
    avatar: '👩‍⚖️',
    karmaPoints: 130,
    karmaLevel: 2,
    completedSevas: 6,
    avgRating: 4.8,
    zone: 'El Poblado — Medellín',
    isAvailable: false,
    guruId: 'user_003',
    shishyas: [],
    skills: [
      { ...SKILLS_CATALOG.man_seva[0], status: 'community_proven', completedCount: 4 },
      { ...SKILLS_CATALOG.man_seva[2], status: 'declared', completedCount: 2 },
    ],
    badges: ['palabra_sagrada'],
    dikshaKeys: [
      { code: 'DK-SL-001', status: 'available' },
      { code: 'DK-SL-002', status: 'available' },
      { code: 'DK-SL-003', status: 'available' },
    ],
    parampara: ['Don Rafael M. (Gurú Mayor)', 'Ernesto V. (Artesano)'],
  },
];

// ─── Solicitudes de Servicio Semilla ───
export const SEED_REQUESTS = [
  {
    id: 'seva_001',
    requesterId: 'user_003',
    providerId: 'user_002',
    skillId: 'electricidad',
    skillName: 'Electricidad Residencial',
    skillIcon: '⚡',
    category: 'tan_seva',
    status: 'completed',
    description: 'Revisión y reparación de cortocircuito en tomacorriente del estudio. Se fundió un breaker.',
    compensationNote: '$85.000 COP en efectivo al finalizar',
    zone: 'Belén — Medellín',
    distance: '2.3 km',
    startPin: '4829',
    endPin: '7156',
    createdAt: '2025-10-12 09:30',
    completedAt: '2025-10-12 11:45',
    reviews: {
      providerReview: {
        rating: 5,
        comment: 'Excelente solicitante, área despejada y pago acordado en efectivo al instante sin dilaciones.',
        privateAnswers: [true, true, false],
        badge: 'palabra_sagrada',
        authorName: 'Claudia R.',
        date: '12 Oct'
      },
      requesterReview: {
        rating: 5,
        comment: 'Trabajo técnico de maestría. Claudia identificó la sobrecarga y reemplazó el breaker con destreza.',
        privateAnswers: [true, true, false],
        badge: 'manos_maestro',
        authorName: 'Ernesto V.',
        date: '12 Oct'
      },
      revealed: true,
    }
  },
  {
    id: 'seva_002',
    requesterId: 'user_004',
    providerId: 'user_003',
    skillId: 'asesoria_visas',
    skillName: 'Asesoría de Visas',
    skillIcon: '🛂',
    category: 'man_seva',
    status: 'completed',
    description: 'Acompañamiento para diligenciar formulario DS-160 y preparar documentos para visa americana.',
    compensationNote: '$120.000 COP por transferencia Nequi',
    zone: 'Envigado',
    distance: '3.1 km',
    startPin: '3917',
    endPin: '6284',
    createdAt: '2025-10-13 14:00',
    completedAt: '2025-10-13 17:30',
    reviews: {
      providerReview: {
        rating: 5,
        comment: 'Solicitante muy atento y organizado con todos sus soportes laborales y bancarios.',
        privateAnswers: [true, true, false],
        badge: 'palabra_sagrada',
        authorName: 'Ernesto V.',
        date: '13 Oct'
      },
      requesterReview: {
        rating: 4,
        comment: 'Gran guía y paciencia durante las tres horas de revisión del formulario consular.',
        privateAnswers: [true, true, false],
        badge: 'guia_paciente',
        authorName: 'Miguel Á. T.',
        date: '13 Oct'
      },
      revealed: true,
    }
  },
  {
    id: 'seva_003',
    requesterId: 'user_006',
    providerId: null,
    skillId: 'plomeria',
    skillName: 'Plomería General',
    skillIcon: '🔧',
    category: 'tan_seva',
    status: 'broadcasting',
    description: 'Fuga de agua leve en la llave del lavaplatos de la cocina. Necesito alguien que revise la empaquetadura o cambie la llave.',
    compensationNote: '$50.000 – $70.000 COP en efectivo',
    zone: 'Sabaneta',
    distance: null,
    startPin: null,
    endPin: null,
    createdAt: '2025-10-15 08:15',
    completedAt: null,
    reviews: {
      providerReview: null,
      requesterReview: null,
      revealed: false,
    }
  },
];

// ─── Mensajes de Chat Semilla ───
export const SEED_CHAT_MESSAGES = [
  { id: 'msg_001', sevaId: 'seva_001', senderId: 'user_003', text: 'Hola Claudia, ¿estás disponible hoy para revisar un cortocircuito?', timestamp: '09:32', type: 'text' },
  { id: 'msg_002', sevaId: 'seva_001', senderId: 'user_002', text: 'Claro Ernesto, puedo ir después de las 10. ¿Qué pasó exactamente?', timestamp: '09:34', type: 'text' },
  { id: 'msg_003', sevaId: 'seva_001', senderId: 'user_003', text: 'Se fundió un breaker cuando conecté una regleta. Ahora no hay energía en el estudio.', timestamp: '09:35', type: 'text' },
  { id: 'msg_004', sevaId: 'seva_001', senderId: 'user_002', text: 'Entendido, llevo mi kit. ¿Puedes confirmar el acuerdo para salir?', timestamp: '09:37', type: 'text' },
  { id: 'msg_005', sevaId: 'seva_001', senderId: 'system', text: '🤝 Pacto de Honor confirmado por ambas partes', timestamp: '09:40', type: 'sankalpa' },
];

// ─── Historial de Karma (Ledger) ───
export const SEED_KARMA_LEDGER = [
  { userId: 'user_002', event: 'seva_completed', points: 20, detail: 'Reparación eléctrica completada · 5★', relatedUser: 'user_003', date: '12 Oct' },
  { userId: 'user_003', event: 'requester_fair_pay', points: 10, detail: 'Pago justo y buen trato como solicitante', relatedUser: 'user_002', date: '12 Oct' },
  { userId: 'user_001', event: 'shishya_bonus', points: 25, detail: 'Bono Gurú: Claudia R. completó 5 servicios impecables', relatedUser: 'user_002', date: '8 Oct' },
  { userId: 'user_004', event: 'seva_completed', points: 20, detail: 'Reparación de plomería completada · 5★', relatedUser: 'user_006', date: '5 Oct' },
  { userId: 'user_005', event: 'seva_completed', points: 10, detail: 'Formateo de PC completado · 4★', relatedUser: 'user_007', date: '3 Oct' },
];

// ─── Funciones de utilidad ───
export function getKarmaLevel(points) {
  return KARMA_LEVELS.find(l => points >= l.min && points <= l.max) || KARMA_LEVELS[0];
}

export function getKarmaProgress(points) {
  const level = getKarmaLevel(points);
  if (level.max === Infinity) return 100;
  const range = level.max - level.min;
  const progress = points - level.min;
  return Math.min(100, Math.round((progress / range) * 100));
}

export function getUserById(id) {
  return SEED_USERS.find(u => u.id === id);
}

export function getSkillStatusLabel(status) {
  switch(status) {
    case 'declared': return 'En validación';
    case 'community_proven': return 'Comprobada';
    case 'acharya_certified': return 'Avalada por Maestro';
    default: return status;
  }
}

export function getSkillStatusClass(status) {
  switch(status) {
    case 'declared': return 'skill-tag--declared';
    case 'community_proven': return 'skill-tag--proven';
    case 'acharya_certified': return 'skill-tag--certified';
    default: return '';
  }
}

// ─── Filtro Anti-Fuga (Motor Adversarial Multi-Capa) ───
// Detecta secuencias numéricas (7-12 dígitos con o sin espacios/guiones/puntos/prefijos),
// emails, enlaces directos (wa.me, t.me), usuarios de redes (@user) y palabras clave de evasión.
export function filterLeakedData(text, isSankalpaAgreed = false) {
  if (isSankalpaAgreed) return { text, blocked: false, reasons: [] };

  let blocked = false;
  let filtered = text;
  const reasons = [];

  // 1. Números telefónicos (secuencias de 7 a 12 dígitos con separadores opcionales, prefijo +57, etc.)
  // Ejemplos detectados: 3101234567, 310 123 4567, 310-123-4567, 310.123.4567, (310) 123 4567, +573101234567, 3 1 0 1 2 3 4 5 6 7
  const PHONE_PATTERN = /(?:\+?57[\s.-]*)?(?:\(?\d{2,4}\)?[\s.-]*)?\d(?:[\s.-]*\d){6,10}\b/gi;
  if (PHONE_PATTERN.test(filtered)) {
    PHONE_PATTERN.lastIndex = 0;
    filtered = filtered.replace(PHONE_PATTERN, '••••••••••');
    blocked = true;
    reasons.push('número telefónico');
  }

  // 2. Correos electrónicos
  const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
  if (EMAIL_PATTERN.test(filtered)) {
    EMAIL_PATTERN.lastIndex = 0;
    filtered = filtered.replace(EMAIL_PATTERN, '••••@••••.•••');
    blocked = true;
    reasons.push('correo electrónico');
  }

  // 3. Enlaces externos de evasión (wa.me, t.me, api.whatsapp.com, etc.)
  const LINK_PATTERN = /(?:https?:\/\/)?(?:www\.)?(?:wa\.me|t\.me|api\.whatsapp\.com|instagram\.com)\/[a-zA-Z0-9_.-]+/gi;
  if (LINK_PATTERN.test(filtered)) {
    LINK_PATTERN.lastIndex = 0;
    filtered = filtered.replace(LINK_PATTERN, '[enlace externo restringido]');
    blocked = true;
    reasons.push('enlace de contacto externo');
  }

  // 4. Menciones o handles de redes sociales (@usuario)
  const HANDLE_PATTERN = /@[a-zA-Z0-9_.]{3,}/gi;
  if (HANDLE_PATTERN.test(filtered)) {
    HANDLE_PATTERN.lastIndex = 0;
    filtered = filtered.replace(HANDLE_PATTERN, '@••••••');
    blocked = true;
    reasons.push('usuario de red social');
  }

  // 5. Palabras clave de desintermediación prematura
  const KEYWORD_PATTERN = /\b(whatsapp|whats\s*app|wsp|wasap|watsapp|wapp|telegram|ll[aá]mame|llamame|escr[ií]beme|escribeme|m[aá]rcame|marcame|celular|tel[eé]fono|telefono|mi\s*n[uú]mero|mi\s*numero|mi\s*contacto|mi\s*cel\b|mi\s*tel\b|por\s*fuera|por\s*interno|al\s*interno|inbox|hablemos\s*por)\b/gi;
  if (KEYWORD_PATTERN.test(filtered)) {
    KEYWORD_PATTERN.lastIndex = 0;
    filtered = filtered.replace(KEYWORD_PATTERN, '[contacto directo restringido]');
    blocked = true;
    reasons.push('solicitud de desintermediación');
  }

  return { text: filtered, blocked, reasons };
}

// ─── Motor de Karma Solidario y Progresión de Niveles ───
export function calculateKarmaForRating(rating) {
  if (rating === 5) return 20;
  if (rating === 4) return 10;
  if (rating === 3) return 0;
  if (rating <= 2) return -30;
  return 0;
}

export function calculateGuruPenalty(shishyaPointsLost) {
  return Math.round(Math.abs(shishyaPointsLost) * 0.5);
}

// Verifica si un usuario sube de nivel y genera exactamente +3 Llaves Mantra
export function checkLevelUp(user, previousPoints) {
  const oldLevel = getKarmaLevel(previousPoints);
  const newLevel = getKarmaLevel(user.karmaPoints);

  if (newLevel.level > oldLevel.level) {
    const levelsGained = newLevel.level - oldLevel.level;
    const keysToAward = levelsGained * 3;
    const initialKeyCount = user.dikshaKeys ? user.dikshaKeys.length : 0;
    const prefix = user.displayName
      .replace(/[^a-zA-Z]/g, '')
      .slice(0, 2)
      .toUpperCase() || 'DK';

    const newKeys = [];
    if (!user.dikshaKeys) user.dikshaKeys = [];
    for (let i = 1; i <= keysToAward; i++) {
      const code = `DK-${prefix}-${String(initialKeyCount + i).padStart(3, '0')}`;
      const keyObj = { code, status: 'available' };
      user.dikshaKeys.push(keyObj);
      newKeys.push(keyObj);
    }

    user.karmaLevel = newLevel.level;
    return {
      leveledUp: true,
      oldLevel,
      newLevel,
      newKeys,
      keysAwarded: keysToAward,
    };
  }

  return { leveledUp: false, oldLevel, newLevel };
}

// ─── Generar PIN de 4 dígitos ───
export function generatePin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}
