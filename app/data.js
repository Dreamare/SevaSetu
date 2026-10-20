/* ═══════════════════════════════════════════════════════════════════
   SEVASETU · Wellness, Terapias Corporales y Consultas Holísticas
   Modelo de Datos, Taxonomía Sagrada, Linaje Paramparā y Motor de Karma
   ═══════════════════════════════════════════════════════════════════ */

// ─── 1. Niveles de Karma y Rangos de Maestría ───
export const KARMA_LEVELS = [
  {
    level: 1,
    name: 'Śramaṇa',
    title: 'Practicante / Aprendiz',
    min: 0,
    max: 99,
    invitations: 0,
    accumulated: 0,
    emoji: '🌱',
    iconImg: '/iconos/transparent/icon-rol-sramana.png',
    description: 'Habilitado para terapias básicas o virtuales (meditación guiada, tarot general). Masajes a domicilio restringidos hasta ganar confianza presencial.'
  },
  {
    level: 2,
    name: 'Śiṣya',
    title: 'Terapeuta Iniciado',
    min: 100,
    max: 299,
    invitations: 3,
    accumulated: 3,
    emoji: '🌿',
    iconImg: '/iconos/transparent/icon-rol-sramana.png',
    description: 'Desbloquea masajes a domicilio tras acumular mínimo 5 servicios presenciales sin reportes de incomodidad. +3 invitaciones Dīkṣā al ascender.'
  },
  {
    level: 3,
    name: 'Sevaka',
    title: 'Sanador Consagrado',
    min: 300,
    max: 699,
    invitations: 3,
    accumulated: 6,
    emoji: '✨',
    iconImg: '/iconos/transparent/icon-rol-sevaka.png',
    description: 'Habilita terapias corporales profundas y consultas astrales Jyotish avanzadas. Prioridad de 45 segundos en alertas tipo Uber / Radar de Bienestar.'
  },
  {
    level: 4,
    name: 'Ācārya',
    title: 'Maestro de Terapia',
    min: 700,
    max: 1499,
    invitations: 3,
    accumulated: 9,
    emoji: '🪷',
    iconImg: '/iconos/transparent/icon-nivel-acarya.png',
    description: 'Autoridad para auditar y otorgar el sello de habilidad validada (Guru-Śikṣā) a otros terapeutas de su linaje. +3 invitaciones Dīkṣā al ascender.'
  },
  {
    level: 5,
    name: 'Parama-Guru',
    title: 'Guardián del Espacio Sagrado',
    min: 1500,
    max: Infinity,
    invitations: 3,
    accumulated: 12,
    emoji: '🕉️',
    iconImg: '/iconos/transparent/icon-nivel-acarya.png',
    description: 'Máximo prestigio ético y técnico. Miembro del Consejo de Ética Comunitaria (Panchayat). Respaldo supremo del linaje.'
  },
];

// ─── 2. Insignias de Bienestar (Mudrās) ───
export const MUDRAS = {
  manos_sanadoras: {
    id: 'manos_sanadoras',
    name: 'Manos Sanadoras',
    icon: '🤲',
    iconImg: '/iconos/transparent/icon-mudra-maestro.png',
    description: 'Destreza técnica y sensibilidad táctil excepcional en masajes y terapias corporales'
  },
  vision_certera: {
    id: 'vision_certera',
    name: 'Visión Certera',
    icon: '👁️',
    iconImg: '/iconos/transparent/icon-mudra-ojo-sabiduria.png',
    description: 'Claridad arquetípica, intuición pura y discernimiento en tarot y astrología védica Jyotish'
  },
  espacio_zen: {
    id: 'espacio_zen',
    name: 'Espacio Zen',
    icon: '🪷',
    iconImg: '/iconos/transparent/icon-mudra-loto-servicio.png',
    description: 'Entorno sagrado impecable, silencioso, aromático y con alta vibración de paz'
  },
  palabra_sagrada: {
    id: 'palabra_sagrada',
    name: 'Palabra Sagrada',
    icon: '📜',
    iconImg: '/iconos/transparent/icon-mudra-palabra-sagrada.png',
    description: 'Cumplimiento milimétrico de horarios, límites éticos sagrados y retribución pactada'
  },
};

// ─── 3. Modalidades de Servicio Obligatorias ───
export const SERVICE_MODALITIES = {
  domicilio: {
    id: 'domicilio',
    name: 'A Domicilio',
    icon: '🏡',
    badgeText: 'A Domicilio',
    description: 'El terapeuta se traslada al domicilio del consultante con aceites o instrumentos. Requiere aceptación previa del Código Ahiṃsā, PIN de 4 dígitos y Modo Escudo Kavacha.',
    requiresPin: true,
    requiresAhimsa: true,
  },
  estudio: {
    id: 'estudio',
    name: 'En Espacio del Terapeuta',
    icon: '🏛️',
    badgeText: 'En Estudio / Cabina',
    description: 'Sesión en el santuario o cabina privada del terapeuta en un entorno consagrado a la serenidad, silencio e higiene.',
    requiresPin: true,
    requiresAhimsa: true,
  },
  virtual: {
    id: 'virtual',
    name: 'Sesión Virtual en Vivo',
    icon: '📹',
    badgeText: 'Sesión Virtual en Vivo',
    description: 'Videollamada o llamada cifrada en vivo dentro de la plataforma para lecturas de tarot, astrología Jyotish o meditación guiada.',
    requiresPin: false,
    requiresAhimsa: true,
  }
};

// ─── 4. Taxonomía de Bienestar Integral y Armonía Holística ───
export const SKILLS_CATALOG = {
  tan_seva: [
    {
      id: 'masaje_ayurvedico',
      name: 'Masaje Ayurvédico (Abhyanga)',
      shortName: 'Abhyanga con Aceites',
      category: 'tan_seva',
      categoryLabel: 'Tan-Sevā · Terapia Corporal',
      icon: '🪔',
      description: 'Masaje tradicional con aceites herbales tibios según doshas (Vata, Pitta, Kapha). Nutrición profunda de tejidos, drenaje de toxinas (Ama) y equilibrio energético.',
      durationOptions: [60, 75, 90],
      typicalPriceCOP: 140000,
      allowedModalities: ['domicilio', 'estudio'],
      minLevel: 2, // Requiere nivel Śiṣya para domicilio
      tags: ['Aceites Tibios', 'Doshas', 'Nutrición Celular']
    },
    {
      id: 'masaje_descontracturante',
      name: 'Masaje Descontracturante / Tejido Profundo',
      shortName: 'Tejido Profundo',
      category: 'tan_seva',
      categoryLabel: 'Tan-Sevā · Terapia Corporal',
      icon: '💆',
      description: 'Liberación miofascial y disolución de contracturas crónicas. Alivio biomecánico de sobrecargas cervicales, escápulas y lumbares con presión modulada.',
      durationOptions: [45, 60, 90],
      typicalPriceCOP: 120000,
      allowedModalities: ['domicilio', 'estudio'],
      minLevel: 2,
      tags: ['Liberación Fascial', 'Alivio Cervical', 'Postura']
    },
    {
      id: 'drenaje_linfatico',
      name: 'Drenaje Linfático Manual',
      shortName: 'Drenaje Linfático',
      category: 'tan_seva',
      categoryLabel: 'Tan-Sevā · Terapia Corporal',
      icon: '🌿',
      description: 'Maniobras rítmicas sutiles tipo Vodder que activan los ganglios linfáticos, reducen retención de líquidos, edemas y potencian el sistema inmunitario.',
      durationOptions: [60, 75],
      typicalPriceCOP: 110000,
      allowedModalities: ['domicilio', 'estudio'],
      minLevel: 2,
      tags: ['Depuración Linfática', 'Antiinflamatorio', 'Suave']
    },
    {
      id: 'reflexologia_podal',
      name: 'Reflexología Podal y Zonas Reflejas',
      shortName: 'Reflexología Podal',
      category: 'tan_seva',
      categoryLabel: 'Tan-Sevā · Terapia Corporal',
      icon: '🦶',
      description: 'Estipulación digitopuntual en microzonas reflejas del pie correspondientes a órganos y meridianos sutiles. Restablece la homeostasis somática.',
      durationOptions: [45, 60],
      typicalPriceCOP: 90000,
      allowedModalities: ['domicilio', 'estudio'],
      minLevel: 2,
      tags: ['Digitopuntura', 'Puntos Reflejos', 'Sedación']
    },
    {
      id: 'yoga_pranayama',
      name: 'Clases Privadas de Yoga y Pranayama',
      shortName: 'Yoga & Pranayama',
      category: 'tan_seva',
      categoryLabel: 'Tan-Sevā · Terapia Corporal',
      icon: '🧘',
      description: 'Secuencias personalizadas de Hatha / Vinyasa terapéutico, alineación anatómica consciente y técnicas de respiración (Nadi Shodhana, Kapalabhati).',
      durationOptions: [60, 75],
      typicalPriceCOP: 95000,
      allowedModalities: ['domicilio', 'estudio', 'virtual'],
      minLevel: 1,
      tags: ['Alineación Postural', 'Prāṇa', 'Flexibilidad']
    }
  ],
  man_seva: [
    {
      id: 'tarot_terapeutico',
      name: 'Lectura de Tarot Terapéutico / Arquetípico',
      shortName: 'Tarot Arquetípico',
      category: 'man_seva',
      categoryLabel: 'Man-Sevā · Bienestar Espiritual',
      icon: '🔮',
      description: 'Abordaje junguiano y terapéutico sin determinismos predictivos. Espejo del inconsciente para integrar sombras, disolver dilemas y reconectar con la intuición.',
      durationOptions: [45, 60],
      typicalPriceCOP: 100000,
      allowedModalities: ['virtual', 'estudio', 'domicilio'],
      minLevel: 1,
      tags: ['Arquetipos Jung', 'Claridad Emocional', 'Inconsciente']
    },
    {
      id: 'astrologia_jyotish',
      name: 'Astrología Védica (Jyotish) y Carta Natal',
      shortName: 'Astrología Védica (Jyotish)',
      category: 'man_seva',
      categoryLabel: 'Man-Sevā · Bienestar Espiritual',
      icon: '🌌',
      description: 'Estudio sidéreo de la Carta Natal (Kundali), Nakshatras y períodos planetarios (Mahadashas). Comprensión del Dharma vital y remedios védicos (Upayas).',
      durationOptions: [60, 90],
      typicalPriceCOP: 150000,
      allowedModalities: ['virtual', 'estudio'],
      minLevel: 3, // Consulta avanzada requiere nivel Sevaka
      tags: ['Kundali Sidéreo', 'Dharma & Karma', 'Dashas']
    },
    {
      id: 'reiki_chakras',
      name: 'Armonización de Chakras y Reiki Usui',
      shortName: 'Reiki & Chakras',
      category: 'man_seva',
      categoryLabel: 'Man-Sevā · Bienestar Espiritual',
      icon: '✨',
      description: 'Canalización de Energía Vital Universal mediante imposición suave de manos y sintonización de los 7 centros energéticos principales. Paz áurica profunda.',
      durationOptions: [60, 75],
      typicalPriceCOP: 110000,
      allowedModalities: ['estudio', 'domicilio', 'virtual'],
      minLevel: 2,
      tags: ['Energía Universal', '7 Chakras', 'Paz Interior']
    },
    {
      id: 'meditacion_sonido',
      name: 'Meditación Guiada y Sonoterapia con Cuencos',
      shortName: 'Sonoterapia & Cuencos',
      category: 'man_seva',
      categoryLabel: 'Man-Sevā · Bienestar Espiritual',
      icon: '🥣',
      description: 'Inmersión acústica con cuencos tibetanos de 7 metales forjados a mano y cuarzo. Ondas binaurales que inducen estados theta de relajación y auto-sanación.',
      durationOptions: [45, 60],
      typicalPriceCOP: 90000,
      allowedModalities: ['estudio', 'domicilio', 'virtual'],
      minLevel: 1,
      tags: ['Frecuencias Alpha/Theta', 'Cuencos Tibetanos', 'Vibración']
    }
  ]
};

// ─── 5. Protocolo de Respeto Sagrado (Ahiṃsā) ───
export const AHIMSA_CODE = {
  title: 'Código de Respeto Sagrado y Límites Terapéuticos (Ahiṃsā)',
  subtitle: 'Límites profesionales inviolables para la dignidad y seguridad de consultantes y terapeutas',
  intro: 'En SevaSetu consideramos el cuerpo como un templo y la terapia como un acto de reverencia y sanación. Antes de solicitar o aceptar cualquier sesión, ambas partes suscriben este compromiso moral solemne.',
  precepts: [
    {
      id: 'precept_1',
      title: 'Límites Terapéuticos Inviolables',
      text: 'Todos los masajes y terapias corporales tienen un fin exclusivamente fisioterapéutico, relajante y energético. Existe CERO TOLERANCIA a insinuaciones, solicitudes de carácter sexual o conductas que vulneren el decoro profesional. Cualquier transgresión causa expulsión inmediata de la red y reporte al Consejo de Ética (Panchayat).'
    },
    {
      id: 'precept_2',
      title: 'Técnica de Pañolaje y Cuidado de la Intimidad',
      text: 'El terapeuta respetará estrictamente las técnicas profesionales de drapeado (cubrimiento con sábanas/toallas), descubriendo únicamente la zona corporal que esté siendo tratada, resguardando la intimidad del consultante en todo instante.'
    },
    {
      id: 'precept_3',
      title: 'Protocolo de Seguridad en Domicilio y Modo Escudo (Kavacha)',
      text: 'En visitas a domicilio, se valida el PIN de 4 dígitos al llegar y al concluir. Tanto el terapeuta como el consultante cuentan con el botón de Modo Escudo para compartir en vivo la geolocalización y los detalles de la cita con un familiar de confianza.'
    },
    {
      id: 'precept_4',
      title: 'Acuerdo de Honor (Sankalpa) sin Sorpresas Económicas',
      text: 'La retribución honorífica pactada en el chat (efectivo, Nequi/Bancolombia o trueque directo) se honra con puntualidad al finalizar la sesión, sin presiones ni cobros indebidos.'
    }
  ]
};

// ─── 6. Directorio Semilla de Terapeutas y Consultantes (Linaje Coherente) ───
export const SEED_USERS = [
  {
    id: 'user_001',
    displayName: 'Dayananda K.',
    title: 'Parama-Guru en Ayurveda y Jyotish Védico',
    avatar: '🕉️',
    avatarImg: '/avatars/avatar-user-001.jpg',
    karmaPoints: 1880,
    karmaLevel: 5,
    completedSevas: 86,
    avgRating: 4.95,
    zone: 'El Poblado — Medellín',
    isAvailable: true,
    guruId: null, // Guardián fundador del linaje
    shishyas: ['user_002', 'user_003'],
    school: 'Kerala Ayurvedic Healing Gurukula & Rishikesh Yoga Shala',
    certifications: [
      'Maestría Tradicional en Abhyanga y Panchakarma (Kerala, India)',
      'Certificación Superior en Astrología Védica Jyotish (Varanasi Shala)',
      'Guardián del Consejo Comunitario de Ética Panchayat'
    ],
    skills: [
      { ...SKILLS_CATALOG.tan_seva[0], status: 'acharya_certified', completedCount: 52 },
      { ...SKILLS_CATALOG.man_seva[1], status: 'acharya_certified', completedCount: 34 },
    ],
    badges: ['manos_sanadoras', 'vision_certera', 'espacio_zen', 'palabra_sagrada'],
    dikshaKeys: [
      { code: 'DK-DK-001', status: 'used', redeemedBy: 'user_002' },
      { code: 'DK-DK-002', status: 'used', redeemedBy: 'user_003' },
      { code: 'DK-DK-003', status: 'available' },
      { code: 'DK-DK-004', status: 'available' },
      { code: 'DK-DK-005', status: 'available' },
      { code: 'DK-DK-006', status: 'available' },
      { code: 'DK-DK-007', status: 'available' },
      { code: 'DK-DK-008', status: 'available' },
      { code: 'DK-DK-009', status: 'available' },
      { code: 'DK-DK-010', status: 'available' },
      { code: 'DK-DK-011', status: 'available' },
      { code: 'DK-DK-012', status: 'available' },
    ],
    parampara: ['Linaje Sagrado Gurukula Védico de Antioquia · Sello Fundador'],
    modalities: ['domicilio', 'estudio', 'virtual'],
  },
  {
    id: 'user_002',
    displayName: 'Maitri Devi S.',
    title: 'Ācārya en Masajes Terapéuticos y Reiki Usui',
    avatar: '🪷',
    avatarImg: '/avatars/avatar-user-002.jpg',
    karmaPoints: 940,
    karmaLevel: 4,
    completedSevas: 44,
    avgRating: 4.92,
    zone: 'Laureles — Medellín',
    isAvailable: true,
    guruId: 'user_001',
    shishyas: ['user_004', 'user_005'],
    school: 'Asociación Colombiana de Terapias Holísticas & Linaje Reiki Jin Kei Do',
    certifications: [
      'Maestría Reiki Usui Tradicional (3er Grado Shihan)',
      'Diplomado en Terapia Miofascial y Masaje Descontracturante Profundo',
      'Aval Guru-Śikṣā otorgado por Parama-Guru Dayananda K.'
    ],
    skills: [
      { ...SKILLS_CATALOG.tan_seva[1], status: 'acharya_certified', completedCount: 26 },
      { ...SKILLS_CATALOG.man_seva[2], status: 'acharya_certified', completedCount: 18 },
    ],
    badges: ['manos_sanadoras', 'espacio_zen', 'palabra_sagrada'],
    dikshaKeys: [
      { code: 'DK-MD-001', status: 'used', redeemedBy: 'user_004' },
      { code: 'DK-MD-002', status: 'used', redeemedBy: 'user_005' },
      { code: 'DK-MD-003', status: 'available' },
      { code: 'DK-MD-004', status: 'available' },
      { code: 'DK-MD-005', status: 'available' },
      { code: 'DK-MD-006', status: 'available' },
      { code: 'DK-MD-007', status: 'available' },
      { code: 'DK-MD-008', status: 'available' },
      { code: 'DK-MD-009', status: 'available' },
    ],
    parampara: ['Dayananda K. (Parama-Guru)'],
    modalities: ['domicilio', 'estudio'],
  },
  {
    id: 'user_003',
    displayName: 'Govinda N.',
    title: 'Sevaka en Tarot Arquetípico y Astrología Jyotish',
    avatar: '✨',
    avatarImg: '/avatars/avatar-user-003.jpg',
    karmaPoints: 560,
    karmaLevel: 3,
    completedSevas: 28,
    avgRating: 4.88,
    zone: 'Envigado — Jardines',
    isAvailable: true,
    guruId: 'user_001',
    shishyas: [],
    school: 'Círculo de Estudios Junguianos & Cosmología Védica',
    certifications: [
      'Terapeuta en Tarot Arquetípico y Simbología Sagrada',
      'Intérprete de Cartas Natales Sidéreas Jyotish',
      'Instructor de Sonoterapia y Meditación Sonora'
    ],
    skills: [
      { ...SKILLS_CATALOG.man_seva[0], status: 'community_proven', completedCount: 18 },
      { ...SKILLS_CATALOG.man_seva[1], status: 'community_proven', completedCount: 10 },
    ],
    badges: ['vision_certera', 'palabra_sagrada'],
    dikshaKeys: [
      { code: 'DK-GN-001', status: 'available' },
      { code: 'DK-GN-002', status: 'available' },
      { code: 'DK-GN-003', status: 'available' },
      { code: 'DK-GN-004', status: 'available' },
      { code: 'DK-GN-005', status: 'available' },
      { code: 'DK-GN-006', status: 'available' },
    ],
    parampara: ['Dayananda K. (Parama-Guru)'],
    modalities: ['virtual', 'estudio'],
  },
  {
    id: 'user_004',
    displayName: 'Kavita G.',
    title: 'Śiṣya en Masaje Descontracturante y Drenaje',
    avatar: '🌿',
    avatarImg: '/avatars/avatar-user-004.jpg',
    karmaPoints: 245,
    karmaLevel: 2,
    completedSevas: 12, // Acumula >5 servicios presenciales sin reportes -> Domicilio desbloqueado
    avgRating: 4.9,
    zone: 'Sabaneta — Zona Parque',
    isAvailable: true,
    guruId: 'user_002',
    shishyas: [],
    school: 'Academia de Masoterapia Terapéutica del Valle de Aburrá',
    certifications: [
      'Técnica en Drenaje Linfático Manual y Drenaje Poscirugía',
      'Iniciación en Masaje Descontracturante bajo supervisión de Maitri Devi'
    ],
    skills: [
      { ...SKILLS_CATALOG.tan_seva[1], status: 'community_proven', completedCount: 8 },
      { ...SKILLS_CATALOG.tan_seva[2], status: 'community_proven', completedCount: 4 },
    ],
    badges: ['manos_sanadoras', 'palabra_sagrada'],
    dikshaKeys: [
      { code: 'DK-KG-001', status: 'available' },
      { code: 'DK-KG-002', status: 'available' },
      { code: 'DK-KG-003', status: 'available' },
    ],
    parampara: ['Dayananda K. (Parama-Guru)', 'Maitri Devi S. (Ācārya)'],
    modalities: ['domicilio', 'estudio'],
  },
  {
    id: 'user_005',
    displayName: 'Arun M.',
    title: 'Śramaṇa en Meditación Guiada y Tarot Básico',
    avatar: '🌱',
    avatarImg: '/avatars/avatar-user-005.jpg',
    karmaPoints: 65,
    karmaLevel: 1, // Nivel 1: Terapias básicas o virtuales únicamente
    completedSevas: 3,
    avgRating: 5.0,
    zone: 'El Poblado — Provenza',
    isAvailable: true,
    guruId: 'user_002',
    shishyas: [],
    school: 'Seminario de Meditación Vipassana & Filosofía Advaita',
    certifications: [
      'Facilitador de Meditación Mindfulness y Respiración Consciente',
      'Estudiante iniciado de Tarot Terapéutico en formación'
    ],
    skills: [
      { ...SKILLS_CATALOG.man_seva[3], status: 'declared', completedCount: 2 },
      { ...SKILLS_CATALOG.man_seva[0], status: 'declared', completedCount: 1 },
    ],
    badges: [],
    dikshaKeys: [], // Śramaṇa inicia con 0 invitaciones hasta ascender a Śiṣya
    parampara: ['Dayananda K. (Parama-Guru)', 'Maitri Devi S. (Ācārya)'],
    modalities: ['virtual'],
  },
  {
    id: 'user_006',
    displayName: 'Santiago U.',
    title: 'Consultante (Yajamāna de Alta Confianza)',
    avatar: '🧘‍♂️',
    avatarImg: '/avatars/avatar-user-006.jpg',
    karmaPoints: 420,
    karmaLevel: 3,
    completedSevas: 20,
    avgRating: 5.0,
    zone: 'El Poblado — Castropol',
    isAvailable: false,
    guruId: null,
    shishyas: [],
    skills: [],
    badges: ['espacio_zen', 'palabra_sagrada'],
    dikshaKeys: [],
    parampara: ['Comunidad de Consultantes Dignos de Confianza'],
    modalities: ['domicilio', 'estudio'],
  },
  {
    id: 'user_007',
    displayName: 'Valentina P.',
    title: 'Consultante (Yajamāna Iniciada)',
    avatar: '🌺',
    avatarImg: '/avatars/avatar-user-007.jpg',
    karmaPoints: 165,
    karmaLevel: 2,
    completedSevas: 8,
    avgRating: 4.9,
    zone: 'Envigado — Zúñiga',
    isAvailable: false,
    guruId: null,
    shishyas: [],
    skills: [],
    badges: ['palabra_sagrada'],
    dikshaKeys: [],
    parampara: ['Comunidad de Consultantes Dignos de Confianza'],
    modalities: ['virtual', 'estudio'],
  },
];

// ─── 7. Solicitudes de Servicio Semilla de Bienestar ───
export const SEED_REQUESTS = [
  {
    id: 'seva_001',
    requesterId: 'user_006',
    providerId: 'user_002',
    skillId: 'masaje_ayurvedico',
    skillName: 'Masaje Ayurvédico (Abhyanga)',
    skillIcon: '🪔',
    category: 'tan_seva',
    modality: 'domicilio',
    durationMinutes: 75,
    status: 'completed',
    description: 'Sesión profunda de Abhyanga con aceites tibios medicinales de sésamo y lavanda para sobrecarga muscular cervical y fatiga energética.',
    compensationNote: '$140.000 COP en efectivo al finalizar',
    zone: 'El Poblado — Castropol',
    distance: '2.1 km',
    ahimsaAccepted: true,
    kavachaShared: true,
    startPin: '4829',
    endPin: '7156',
    createdAt: '2026-10-14 10:00',
    completedAt: '2026-10-14 11:30',
    reviews: {
      providerReview: {
        rating: 5,
        comment: 'Consultante impecable. Espacio preparado con música suave, temperatura cálida idónea y pago acordado en efectivo de inmediato.',
        privateAnswers: [true, true, false], // Respeto 100%, Ambiente seguro, Violación límites: NO
        badge: 'espacio_zen',
        authorName: 'Maitri Devi S.',
        date: '14 Oct'
      },
      requesterReview: {
        rating: 5,
        comment: 'Experiencia corporal transformadora. Maitri aplicó el Abhyanga con maestría técnica absoluta, pañolaje respetuoso y aceites herbales de primera calidad.',
        privateAnswers: [true, true, false],
        badge: 'manos_sanadoras',
        authorName: 'Santiago U.',
        date: '14 Oct'
      },
      revealed: true,
    }
  },
  {
    id: 'seva_002',
    requesterId: 'user_007',
    providerId: 'user_003',
    skillId: 'tarot_terapeutico',
    skillName: 'Lectura de Tarot Terapéutico / Arquetípico',
    skillIcon: '🔮',
    category: 'man_seva',
    modality: 'virtual',
    durationMinutes: 45,
    status: 'completed',
    description: 'Consulta arquetípica en vivo de 45 minutos para esclarecer dilemas de transición profesional y bloqueos creativos.',
    compensationNote: '$100.000 COP por transferencia Nequi directa',
    zone: 'Envigado — Zúñiga',
    distance: 'Sesión Virtual Cifrada',
    ahimsaAccepted: true,
    kavachaShared: false,
    startPin: null,
    endPin: null,
    createdAt: '2026-10-15 16:00',
    completedAt: '2026-10-15 16:50',
    reviews: {
      providerReview: {
        rating: 5,
        comment: 'Consultante muy receptiva, abierta a la reflexión simbólica y puntual en la conexión y transferencia.',
        privateAnswers: [true, true, false],
        badge: 'palabra_sagrada',
        authorName: 'Govinda N.',
        date: '15 Oct'
      },
      requesterReview: {
        rating: 5,
        comment: 'Govinda posee una visión clarísima y profunda. No hace predicciones vacías sino un acompañamiento terapéutico lúcido y conmovedor.',
        privateAnswers: [true, true, false],
        badge: 'vision_certera',
        authorName: 'Valentina P.',
        date: '15 Oct'
      },
      revealed: true,
    }
  },
  {
    id: 'seva_003',
    requesterId: 'user_006',
    providerId: null, // Emitido al radar abierto
    skillId: 'masaje_descontracturante',
    skillName: 'Masaje Descontracturante / Tejido Profundo',
    skillIcon: '💆',
    category: 'tan_seva',
    modality: 'domicilio',
    durationMinutes: 60,
    status: 'broadcasting',
    description: 'Requiero masaje descontracturante para hoy a las 5:00 PM en mi domicilio. Enfocado en dorsales y zona escapular. Camilla portátil y ambiente silencioso listos.',
    compensationNote: '$120.000 COP en efectivo o Nequi',
    zone: 'El Poblado — Castropol',
    distance: '1.8 km',
    ahimsaAccepted: true,
    kavachaShared: true,
    startPin: null,
    endPin: null,
    createdAt: 'Hoy, 15:20',
    completedAt: null,
    reviews: {
      providerReview: null,
      requesterReview: null,
      revealed: false,
    }
  },
  {
    id: 'seva_004',
    requesterId: 'user_007',
    providerId: 'user_001',
    skillId: 'astrologia_jyotish',
    skillName: 'Astrología Védica (Jyotish) y Carta Natal',
    skillIcon: '🌌',
    category: 'man_seva',
    modality: 'virtual',
    durationMinutes: 60,
    status: 'negotiating',
    description: 'Lectura de Carta Natal Sidérea Kundali para comprender el tránsito de Júpiter y recomendaciones de mantras de armonización.',
    compensationNote: '$150.000 COP por transferencia Bancolombia',
    zone: 'Envigado — Zúñiga',
    distance: 'Sesión Virtual',
    ahimsaAccepted: true,
    kavachaShared: false,
    startPin: null,
    endPin: null,
    createdAt: 'Hoy, 14:10',
    completedAt: null,
    reviews: {
      providerReview: null,
      requesterReview: null,
      revealed: false,
    }
  }
];

// ─── 8. Mensajes de Chat Semilla (Holísticos & Filtro Activo) ───
export const SEED_CHAT_MESSAGES = [
  {
    id: 'msg_001',
    sevaId: 'seva_001',
    senderId: 'user_006',
    text: 'Namastē Maitri. Tengo mucha tensión acumulada en el cuello y trapecios por largas jornadas de trabajo. ¿El Abhyanga ayuda con eso?',
    timestamp: '09:15',
    type: 'text'
  },
  {
    id: 'msg_002',
    sevaId: 'seva_001',
    senderId: 'user_002',
    text: 'Namastē Santiago. Sí, utilizo aceite tibio de sésamo prensado en frío con aceites esenciales de lavanda y alcanfor para nutrir el tejido miofascial y calmar Vata dosha.',
    timestamp: '09:18',
    type: 'text'
  },
  {
    id: 'msg_003',
    sevaId: 'seva_001',
    senderId: 'user_006',
    text: 'Excelente. Acepté el Código Ahiṃsā en la app. Tengo una camilla portátil y toallas limpias preparadas en un cuarto tranquilo.',
    timestamp: '09:20',
    type: 'text'
  },
  {
    id: 'msg_004',
    sevaId: 'seva_001',
    senderId: 'user_002',
    text: 'Perfecto. Sellemos el Acuerdo Sankalpa de honor para fijar la sesión de 75 min a domicilio por $140.000 COP y activar el PIN de inicio.',
    timestamp: '09:22',
    type: 'text'
  },
  {
    id: 'msg_005',
    sevaId: 'seva_001',
    senderId: 'system',
    text: '🤝 Acuerdo Sankalpa Sellado: Masaje Ayurvédico (75 min) · A Domicilio · $140.000 COP acordados en efectivo.',
    timestamp: '09:25',
    type: 'sankalpa'
  },
];

// ─── 9. Libro Mayor de Karma (Ledger Inmutable) ───
export const SEED_KARMA_LEDGER = [
  {
    userId: 'user_002',
    event: 'seva_completed',
    points: 20,
    detail: 'Masaje Ayurvédico Abhyanga completado · 5★ con Sello Manos Sanadoras',
    relatedUser: 'user_006',
    date: '14 Oct'
  },
  {
    userId: 'user_006',
    event: 'requester_fair_pay',
    points: 10,
    detail: 'Consultante ejemplar: respeto a límites sagrados y retribución puntual',
    relatedUser: 'user_002',
    date: '14 Oct'
  },
  {
    userId: 'user_001',
    event: 'shishya_bonus',
    points: 25,
    detail: 'Bono Gurú: Su ahijada Maitri Devi S. completó 5 terapias consecutivas con 5★',
    relatedUser: 'user_002',
    date: '10 Oct'
  },
  {
    userId: 'user_003',
    event: 'seva_completed',
    points: 20,
    detail: 'Tarot Terapéutico virtual completado · 5★ con Sello Visión Certera',
    relatedUser: 'user_007',
    date: '15 Oct'
  },
  {
    userId: 'user_004',
    event: 'level_promotion',
    points: 0,
    detail: 'Ascenso a Nivel 2 (Śiṣya): Desbloqueo de masajes a domicilio (+3 Llaves Dīkṣā)',
    relatedUser: 'user_004',
    date: '5 Oct'
  }
];

// ─── 10. Funciones de Utilidad y Reglas del Dominio ───

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
    case 'declared': return 'En iniciación';
    case 'community_proven': return 'Comprobada';
    case 'acharya_certified': return 'Avalada por Ācārya (Guru-Śikṣā)';
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

// ─── Validación de Desbloqueo de Especialidades Sensibles ───
export function canPerformModality(user, skill, modality) {
  if (!user || !skill) return false;
  
  // 1. Consultas astrales avanzadas (Jyotish Kundali completa):
  // Regla: Requiere Nivel 3 (Sevaka) o superior para cualquier modalidad
  if (skill.id === 'astrologia_jyotish' && user.karmaLevel < 3) {
    return false;
  }

  // 2. Terapias corporales a domicilio (Tan-Sevā sensible: masajes con contacto directo):
  // Regla: Requiere mínimo Nivel 2 (Śiṣya) y al menos 5 terapias completadas sin quejas
  if (modality === 'domicilio' && skill.category === 'tan_seva') {
    const isLevel2Plus = user.karmaLevel >= 2;
    const hasEnoughSevas = (user.completedSevas || 0) >= 5;
    return isLevel2Plus && hasEnoughSevas;
  }

  // 3. Sesiones virtuales: permitidas si la terapia la soporta
  if (modality === 'virtual') {
    return (skill.allowedModalities || []).includes('virtual');
  }

  return (skill.allowedModalities || []).includes(modality);
}

// ─── Filtro Anti-Fuga (Motor Adversarial Multi-Capa Habeas Data) ───
// Detecta números telefónicos (7-12 dígitos con o sin espacios/guiones/puntos/prefijos),
// correos electrónicos, enlaces de evasión (wa.me, t.me), usuarios de redes (@user)
// y palabras clave de desintermediación previa al Acuerdo Sankalpa.
export function filterLeakedData(text, isSankalpaAgreed = false) {
  if (isSankalpaAgreed) return { text, blocked: false, reasons: [] };

  let blocked = false;
  let filtered = text;
  const reasons = [];

  // 1. Números telefónicos (secuencias de 7 a 12 dígitos, prefijo +57, 300 123 4567, etc.)
  const PHONE_PATTERN = /(?:\+?57[\s.-]*)?(?:\(?\d{2,4}\)?[\s.-]*)?\d(?:[\s.-]*\d){6,10}\b/gi;
  if (PHONE_PATTERN.test(filtered)) {
    PHONE_PATTERN.lastIndex = 0;
    filtered = filtered.replace(PHONE_PATTERN, '••••••••••');
    blocked = true;
    reasons.push('número telefónico privado');
  }

  // 2. Correos electrónicos
  const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
  if (EMAIL_PATTERN.test(filtered)) {
    EMAIL_PATTERN.lastIndex = 0;
    filtered = filtered.replace(EMAIL_PATTERN, '••••@••••.•••');
    blocked = true;
    reasons.push('correo electrónico personal');
  }

  // 3. Enlaces externos de evasión (wa.me, t.me, api.whatsapp.com, instagram.com, etc.)
  const LINK_PATTERN = /(?:https?:\/\/)?(?:www\.)?(?:wa\.me|t\.me|api\.whatsapp\.com|instagram\.com|facebook\.com)\/[a-zA-Z0-9_.-]+/gi;
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
  // Padrino pierde el 50% de los puntos perdidos por su ahijado
  return Math.round(Math.abs(shishyaPointsLost) * 0.5);
}

// Verifica si un usuario sube de nivel y genera exactamente +3 Llaves Dīkṣā
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
