# Prompt Técnico Maestro para Antigravity: Construcción Integral de SevaSetu (PWA)

Construye **SevaSetu** (también referenciada como **PranaSeva**), una plataforma web adaptable a móviles (*Mobile-First Progressive Web App*) completamente funcional e interactiva que registra personas con habilidades comprobadas y las conecta en tiempo real —al estilo Uber— con usuarios que necesitan favores, oficios o trámites, operando bajo una red cerrada de padrinazgo por invitación y prestigio comunitario (*Karma*) inspirada en la filosofía hindú.

Es para una comunidad local de confianza integrada por dos perfiles que interactúan entre sí —**Prestadores de servicios (*Sevakas* / discípulos *Śiṣyas* apadrinados por un *Guru*)** que ofrecen habilidades manuales (*Tan-Sevā*: carpintería, electricidad, soporte técnico) o de gestión (*Man-Sevā*: trámites bancarios, asesoría de visas, diligencias) y **Solicitantes (*Yajamānas*)** que requieren ayuda confiable sin exponer datos de contacto sensibles y acordando el pago directamente por fuera de la aplicación— y tiene que incluir las siguientes piezas:

1. **Sistema de Registro Exclusivo por Invitación (*Llaves Dīkṣā*) y Árbol Genealógico de Linaje (*Paramparā*)**:  
   - Flujo de registro bloqueado para nuevos prestadores a menos que ingresen un código de invitación *Dīkṣā* válido emitido por un miembro activo con nivel de Karma suficiente.  
   - Visualización interactiva del **Árbol *Paramparā*** en cada perfil (`Parama-Guru ➔ Ācārya ➔ Guru Directo ➔ Śiṣya Actual ➔ Discípulos Iniciados`), dejando trazabilidad pública e indeleble de quién apadrinó a quién.  
   - Motor de **Karma Solidario (*Skin in the Game*)**: el padrino (*Guru*) recibe un bono automático de `+25 pts de Karma` (*Gurudakṣiṇā*) cuando su ahijado (*Śiṣya*) completa sus primeros 5 favores con calificación perfecta, pero sufre una penalización automática del `50%` de los puntos que pierda su ahijado ante incumplimientos o calificaciones de 1 estrella (y `-150 pts` más congelamiento de invitaciones si el ahijado es expulsado).  
2. **Motor de los 5 Niveles de Karma, Desbloqueo de Invitaciones y Validación de Habilidades (*Śikṣā*)**:  
   - Progresión matemática exacta a través de los **5 niveles de Karma hindúes**, otorgando exactamente **\+3 invitaciones (*Llaves Dīkṣā*)** cada vez que el usuario sube de nivel:  
     - **Nivel 1 — `Śramaṇa` (Buscador / Aprendiz)**: `0 – 99 pts` | `0 invitaciones` | Hasta 2 habilidades en observación.  
     - **Nivel 2 — `Śiṣya` ([Discípulo Iniciado](https://www.google.com/search?q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGuru%25E2%2580%2593shishya_tradition))**: `100 – 299 pts` (mín. 5 favores $\geq 4.5$) | **`+3 invitaciones`** (3 acumuladas) | Habilitado como padrino (*Guru*).  
     - **Nivel 3 — `Sevaka` ([Artesano del Servicio](https://www.google.com/search?q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSev%25C4%2581))**: `300 – 699 pts` (mín. 15 favores y $\geq 1$ *Śiṣya* activo sin faltas) | **`+3 invitaciones`** (6 acumuladas) | Desbloquea trámites de alta sensibilidad (bancos, visas) y prioridad de 45 segundos en notificaciones de radar.  
     - **Nivel 4 — `Ācārya` ([Maestro de Oficio](https://www.google.com/search?q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGuru%25E2%2580%2593shishya_tradition))**: `700 – 1,499 pts` (mín. 35 favores $\geq 4.7$) | **`+3 invitaciones`** (9 acumuladas) | Facultad de certificar técnicamente (*Guru-Śikṣā*) habilidades de otros miembros.  
     - **Nivel 5 — `Parama-Guru` ([Guardián del Linaje](https://www.google.com/search?q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGuru%25E2%2580%2593shishya_tradition))**: `1,500+ pts` (mín. 60 favores y $\geq 3$ *Śiṣyas* en Nivel $\geq 2$) | **`+3 invitaciones`** (12 acumuladas) | Miembro del Consejo de Mediación (*Panchayat*).  
   - Clasificación visual de habilidades en tres estados comprobables: *Declarada (0–2 servicios)*, *Comprobada por la Comunidad (automática al cumplir 3 servicios reales con nota $\geq 4.5$)* y *Avalada por un Maestro Ācārya*.  
3. **Perfiles con Privacidad *Habeas Data* y Canal de Contacto Interno con Filtro Anti-Fuga**:  
   - Cumplimiento de privacidad inspirado en la [Ley Estatutaria 1581 de 2012](https://www.google.com/search?q=http%3A%2F%2Fwww.secretariasenado.gov.co%2Fsenado%2Fbasedoc%2Fley_1581_2012.html): el perfil público muestra únicamente nombre de pila \+ inicial del apellido, foto verificada, barrio o zona aproximada (radio de 1.5 km sin dirección exacta), habilidades comprobadas, insignias y linaje *Paramparā*, ocultando al 100% teléfono, WhatsApp, correo electrónico y cédula.  
   - Botón **"Contactar en App / Solicitar Favor"** que abre un chat interno seguro con un **filtro Regex en tiempo real** que detecta, bloquea y enmascara secuencias numéricas de 7 a 10 dígitos, direcciones de correo o palabras como *"WhatsApp" / "llámame"* mientras no exista un acuerdo formal confirmado, evitando la [desintermediación prematura](https://www.google.com/search?q=https%3A%2F%2Fwww.hokodo.co%2Fresources%2Fhow-to-prevent-disintermediation-on-your-b2b-marketplace).  
4. **Despacho en Tiempo Real Estilo Uber (*Wave Dispatch*), Acuerdo de Pago Externo (*Sankalpa*) y Cierre con PIN**:  
   - Modal e interfaz de notificación emergente estilo Uber con alerta visual/sonora, temporizador de cuenta regresiva, distancia aproximada en km, categoría de habilidad (*Tan-Sevā* o *Man-Sevā*), Karma del solicitante, descripción de la tarea y propuesta de compensación, permitiendo al prestador pulsar **"Aceptar Favor"** o **"Dejar Pasar"**.  
   - Componente interactivo de **Acuerdo de Honor Digital (*Sankalpa*)** dentro del chat donde solicitante y prestador confirman con un clic el alcance de la tarea y el monto/modalidad de pago acordado por fuera de la app (efectivo, transferencia directa al terminar o trueque) antes de iniciar el desplazamiento.  
   - Validación de **PIN de Inicio (4 dígitos)** al llegar al lugar, botón de **Modo Escudo (*Kavacha*)** para compartir el seguimiento en vivo del servicio con un contacto de confianza, y cierre obligatorio mediante **PIN de Finalización (4 dígitos)** entregado por el solicitante tras efectuar el pago directo.  
5. **Sistema de Evaluación Bilateral Doble Ciego (*Double-Blind Review*), *Community Standing* e Insignias (*Mudrās*)**:  
   - Flujo de calificación mutua al cerrar el favor (el solicitante califica destreza y puntualidad; el prestador califica claridad, buen trato y cumplimiento del pago acordado), implementando [revelación simultánea doble ciego](https://www.google.com/search?q=https%3A%2F%2Fwww.sharetribe.com%2Fmarketplace-glossary%2Fdouble-blind-reviews%2F): ninguna de las partes puede leer la reseña recibida hasta que ambas hayan enviado la suya.  
   - Cuestionario privado de 3 preguntas de seguridad ([*Community Standing*](https://www.google.com/search?q=https%3A%2F%2Fcouchers.org%2Fplan%2Freviews)) que impacta el algoritmo de Karma sin exponer respuestas individuales, más otorgamiento de insignias (*Manos de Maestro*, *Palabra Sagrada*, *Hogar Hospitalario*, *Guía Paciente*).  
6. **Sistema de Diseño Visual *Sattva* (Identidad Hindú Calmada, Cero Clichés de IA) y Simulador Multi-Rol**:  
   - Aplicación estricta de la paleta mineral e histórica de la India (`#FBF8F3` Sándalo *Chandan*, `#F2ECE1` Algodón *Khadi*, `#E0D5C1` Arcilla *Mitti*, `#23394D` Índigo *Nīla*, `#B85A3A` Terracota *Geru*, `#38664B` Albahaca *Tulsī*, `#A67C37` Bronce *Kāṃsya*, `#A8383B` Cinabrio *Sindoor*, `#1F2421` Carbón *Kajal* y `#5A5D58` Ceniza *Vibhūti*) y combinación tipográfica (`Fraunces` o `Cormorant Garamond` para encabezados, `Plus Jakarta Sans` para interfaz y `JetBrains Mono` para códigos *Dīkṣā* y PINs).  
   - Conmutador interactivo de sesión en la barra superior que permita alternar al instante entre **Vista Prestador (*Sevaka*)**, **Vista Solicitante (*Yajamāna*)** y **Simulador de Nuevo Invitado (*Śramaṇa*)** para probar extremo a extremo las notificaciones tipo Uber, el chat con filtro anti-fuga, el acuerdo *Sankalpa*, los PINs y las reseñas doble ciego en una misma sesión.

## MÉTODO

Trabaja de forma autónoma: no te pares a preguntarme. Si algo es ambiguo, decide tú priorizando la coherencia con la filosofía *Sevā / Paramparā* y la seguridad comunitaria, y déjalo anotado en la documentación técnica. Trabaja en loop: planifica, construye, prueba, revisa, corrige y repite. No me entregues la primera versión.

Usa un árbitro que emplee técnicas adversariales para auditar y criticar el trabajo hecho: que no haya participado en construirlo y que busque fallos a propósito, como si quisiera tumbarlo (intentando colar números de teléfono en el chat antes del acuerdo, intentando registrarse sin código de invitación *Dīkṣā*, verificando si puede leer la reseña del otro antes de enviar la propia, probando el desbordamiento en pantallas móviles de `375px` y auditando cada código HEX del CSS para cazar colores por defecto de plantillas IA). Sigue mejorando hasta que lo dé por bueno.

## LISTÓN

El listón: **al nivel de un producto MVP de ingeniería de software listo para demostración ante inversores y lanzamiento en una comunidad real, con la solidez funcional de los flujos de confianza de Airbnb/Uber y una dirección de arte editorial propia que un director de diseño firmaría sin tocar una coma**.

El árbitro no puede dar el trabajo por terminado hasta comprobar, uno por uno, estos puntos:

- **Integridad matemática de los 5 niveles de Karma y llaves *Dīkṣā***: Cada umbral de puntos (`0–99`, `100–299`, `300–699`, `700–1499`, `1500+`), cada nombre sánscrito (`Śramaṇa`, `Śiṣya`, `Sevaka`, `Ācārya`, `Parama-Guru`) y la asignación exacta de `+3 invitaciones` por cada subida de nivel coinciden con la especificación y se actualizan dinámicamente al completar un favor o aplicar una bonificación/penalización solidaria al padrino (*Guru*).  
- **Privacidad estricta y filtro anti-fuga operativo**: Ninguna vista, tarjeta ni payload visible expone números de teléfono, correos electrónicos ni direcciones exactas; además, al escribir un número de 7 a 10 dígitos o la palabra *"WhatsApp"* en el chat antes de sellar el acuerdo *Sankalpa*, el sistema lo intercepta y enmascara en vivo.  
- **Ciclo completo tipo Uber \+ *Sankalpa* \+ PINs \+ Doble Ciego 100% funcional**: Es posible emitir una solicitud de favor (ej. electricidad, carpintería, trámite bancario o visa), recibir y aceptar la tarjeta emergente con cuenta regresiva en el rol de prestador, firmar digitalmente el acuerdo de pago externo (*Sankalpa*), validar el PIN de inicio y el PIN de finalización de 4 dígitos, y comprobar que la reseña de la contraparte permanece oculta hasta que ambos envían su calificación y las 3 respuestas privadas de seguridad.  
- **Fidelidad estética *Sattva* y adaptabilidad móvil impecable**: Los colores renderizados utilizan exclusivamente los códigos HEX de la paleta mineral hindú (con contraste WCAG AA $\geq 4.5:1$), sin rastro de gradientes violeta/cian de IA ni fondos blancos clínicos `#FFFFFF`, y todas las vistas se adaptan sin cortes ni scroll horizontal desde móviles (`375px`) hasta escritorio (`1440px`).  
- **Cero rellenos ni funcionalidades simuladas a medias**: No queda ningún hueco de relleno, ningún *"Lorem ipsum"*, ningún botón decorativo sin acción (`TODO` / `Coming soon`) ni ningún texto de ejemplo genérico; todos los perfiles semilla incluyen linajes *Paramparā* coherentes, habilidades *Tan-Sevā* y *Man-Sevā* realistas y estados de validación verificables.

## ENTREGABLE

Entrégame **una carpeta de proyecto completa y autocontenida (código fuente de la aplicación web adaptable a móviles \+ archivo `README_ARQUITECTURA.md` con las decisiones técnicas y el registro de auditoría)** lista para abrirse y ejecutarse directamente.

Restricciones que no se discuten:

- **En castellano**: Toda la interfaz de usuario, notificaciones, etiquetas, datos semilla de demostración y documentación deben estar íntegramente en español (conservando los términos sánscritos definidos con su respectiva explicación contextual en la UI).  
- **Sin placeholders**: Prohibido dejar textos tipo `[Insertar nombre]`, `Lorem ipsum`, funciones vacías `() => {}` o vistas estáticas que no respondan a los cambios de estado.  
- **Que funcione sin configuraciones externas complejas**: Debe poder abrirse y probarse de inmediato en local (con persistencia en estado/almacenamiento local pre-sembrado o base de datos embebida lista al arrancar) sin depender de claves de API de pago ni pasarelas bancarias externas.  
- **Fidelidad total a las reglas del proyecto**: Respeto absoluto por el registro exclusivo mediante invitación de padrinos con Karma suficiente, ocultamiento de datos sensibles de contacto, notificación de tareas compatibles al estilo Uber, acuerdo de pago por fuera de la app y sistema de reseñas mutuas para solicitantes y prestadores.

Al final, resume la revisión del árbitro: cuántas rondas hizo, qué rechazó en cada iteración (bugs funcionales, brechas de privacidad en el chat, fallos en el cálculo de Karma solidario o desviaciones estéticas) y qué se corrigió exactamente antes de dar el visto bueno definitivo.

## ANEXO DE REFERENCIA RÁPIDA: PARÁMETROS EXACTOS DEL SISTEMA

### 1\. Tabla Maestra de Niveles de Karma e Invitaciones (*Dīkṣā*)

| Nivel | Nombre Sánscrito | Rango de Karma | Requisitos de Desbloqueo | Nuevas Invitaciones | Invitaciones Acumuladas | Impacto Solidario del Padrino (*Guru*) |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **1** | **Śramaṇa** (Aprendiz) | `0 – 99 pts` | Ingreso con código *Dīkṣā* válido | `0` | `0` | N/A (Aún no puede apadrinar) |
| **2** | **Śiṣya** (Discípulo) | `100 – 299 pts` | $\geq 5$ favores completados (nota $\geq 4.5$) | `+3` | `3` | Bono `+25 pts` si su ahijado cumple 5 favores impecables; penalización del `50%` de los puntos perdidos por su ahijado |
| **3** | **Sevaka** (Artesano) | `300 – 699 pts` | $\geq 15$ favores y $\geq 1$ *Śiṣya* activo sin faltas | `+3` | `6` | Prioridad de 45 s en alertas tipo Uber y acceso a trámites sensibles (*Man-Sevā* bancario/visas) |
| **4** | **Ācārya** (Maestro) | `700 – 1,499 pts` | $\geq 35$ favores (nota $\geq 4.7$) y linaje limpio | `+3` | `9` | Puede otorgar aval técnico (*Guru-Śikṣā*) a habilidades de otros miembros |
| **5** | **Parama-Guru** (Guardián) | `1,500+ pts` | $\geq 60$ favores y $\geq 3$ *Śiṣyas* en Nivel $\geq 2$ | `+3` | `12` | Integra el Consejo *Panchayat* de mediación comunitaria |

&nbsp;

### 2\. Tokens de Color Oficiales (*Paleta Sattva*)

| Token CSS Sugerido | Nombre del Color | Valor HEX | Uso Obligatorio en la Interfaz |
| :---- | :---- | :---- | :---- |
| `--bg-chandan` | Sándalo Suave (*Chandan*) | `#FBF8F3` | Fondo principal de la aplicación (prohibido usar `#FFFFFF` puro como fondo general) |
| `--surface-khadi` | Algodón Crudo (*Khadi*) | `#F2ECE1` | Tarjetas de perfil, contenedores de chat y modales de acuerdo *Sankalpa* |
| `--border-mitti` | Arcilla Seca (*Mitti*) | `#E0D5C1` | Bordes sutiles de `1px solid` y líneas conectoras del árbol *Paramparā* |
| `--primary-nila` | Índigo de Krishna (*Nīla*) | `#23394D` | Botones primarios (*Contactar en App*, *Confirmar Sankalpa*), cabeceras y navegación |
| `--accent-geru` | Terracota Ocre (*Geru*) | `#B85A3A` | Radar de notificación estilo Uber, barras de progreso de Karma y alertas de acción |
| `--success-tulsi` | Albahaca Sagrada (*Tulsī*) | `#38664B` | Sellos de *Habilidad Comprobada*, estado *Disponible* y validación de PIN |
| `--prestige-kamsya` | Bronce de Templo (*Kāṃsya*) | `#A67C37` | Insignias de *Ācārya* y *Parama-Guru*, iconos de llaves de invitación *Dīkṣā* |
| `--danger-sindoor` | Cinabrio Suave (*Sindoor*) | `#A8383B` | Botón de emergencia (*Modo Escudo Kavacha*) y alertas de penalización de Karma |
| `--text-kajal` | Carbón Ritual (*Kajal*) | `#1F2421` | Texto principal de alta legibilidad (contraste `15.1:1`) |
| `--text-vibhuti` | Ceniza Sagrada (*Vibhūti*) | `#5A5D58` | Metadatos, distancias en kilómetros, etiquetas secundarias y marcas de tiempo |

&nbsp;