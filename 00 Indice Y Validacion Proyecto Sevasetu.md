# 00\. Arquitectura Documental y Validación Estratégica del Proyecto: SevaSetu

## 1\. Propósito y Estructura del Sistema de Archivos Markdown

Este repositorio documental define la especificación funcional, cultural, legal y técnica de **SevaSetu** (del sánscrito [*Sevā*](https://www.google.com/search?q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSev%25C4%2581), servicio dedicado a los demás, y *Setu*, puente), una plataforma web progresiva (*Mobile-First PWA*) de intermediación de favores y oficios comprobados basada en redes de confianza por invitación y prestigio comunitario (*Karma*).

La arquitectura documental se divide en cuatro módulos Markdown independientes y complementarios para facilitar su lectura, mantenimiento e ingesta por equipos de desarrollo o asistentes de programación:

| Archivo del Sistema | Alcance Técnico y Funcional | Entregables Clave Incluidos |
| :---- | :---- | :---- |
| **`00_indice_y_validacion_proyecto_sevasetu.md`** | Evaluación de viabilidad, riesgos de negocio, marco legal y arquitectura del repositorio | Matriz de riesgos P2P, mitigación de pagos fuera de app, cumplimiento de [*Ley 1581 de 2012*](https://www.google.com/search?q=http%3A%2F%2Fwww.secretariasenado.gov.co%2Fsenado%2Fbasedoc%2Fley_1581_2012.html) y mapa de módulos |
| **`01_identidad_hindu_karma_y_linaje_parampara.md`** | Identidad cultural, gamificación ética, niveles de Karma y reglas de padrinazgo | Taxonomía [*Sevā*](https://www.google.com/search?q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSev%25C4%2581) (*Tan* y *Man*), los 5 niveles de Karma, linaje [*Guru–Śiṣya Paramparā*](https://www.google.com/search?q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGuru%25E2%2580%2593shishya_tradition) y fórmula matemática de puntuación |
| **`02_flujo_operativo_confianza_y_seguridad.md`** | Mecánicas de despacho tipo Uber, privacidad de contacto, pagos externos y reseñas | Emparejamiento en tiempo real, acuerdo [*Sankalpa*](https://www.google.com/search?q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSev%25C4%2581), [*reseñas doble ciego*](https://www.google.com/search?q=https%3A%2F%2Fwww.sharetribe.com%2Fmarketplace-glossary%2Fdouble-blind-reviews%2F) y [*Community Standing*](https://www.google.com/search?q=https%3A%2F%2Fcouchers.org%2Fplan%2Freviews) |
| **`03_sistema_diseno_ui_ux_y_arquitectura_tecnica.md`** | Guía de estilo visual *Sattva* (anti-cliché IA), componentes móviles y modelo de base de datos | Paleta de colores con códigos HEX y contraste WCAG, tipografía, esquema relacional de datos y arquitectura PWA |

&nbsp;

## 2\. Validación de Mercado y Aspectos Críticos a Tener en Cuenta

El análisis de plataformas globales de servicios entre pares (*peer-to-peer*), junto con estudios sobre [*desintermediación en marketplaces*](https://www.google.com/search?q=https%3A%2F%2Fwww.hokodo.co%2Fresources%2Fhow-to-prevent-disintermediation-on-your-b2b-marketplace) y sistemas de [*reputación comunitaria*](https://www.google.com/search?q=https%3A%2F%2Fcouchers.org%2Fplan%2Freviews), revela que el modelo propuesto posee una ventaja competitiva diferencial: **sustituir el costo de adquisición publicitario y el riesgo de desconocidos por una cadena de responsabilidad social trazable (padrinazgo)**. Sin embargo, para que un proyecto de esta envergadura sea sostenible y seguro, debe resolver cinco desafíos estructurales desde su diseño inicial:

| Desafío Detectado en la Investigación | Riesgo Operativo o Legal | Solución Arquitectónica Incorporada en SevaSetu |
| :---- | :---- | :---- |
| **Acuerdo de pago por fuera de la app** | Disputas sobre el monto acordado al terminar el favor o [*fuga de usuarios (desintermediación)*](https://www.google.com/search?q=https%3A%2F%2Fwww.hokodo.co%2Fresources%2Fhow-to-prevent-disintermediation-on-your-b2b-marketplace) tras el primer contacto | Registro previo de un **Acuerdo de Honor Digital (*Sankalpa*)** en el chat antes del servicio y cierre obligatorio con **PIN de 4 dígitos** para sumar Karma y desbloquear invitaciones |
| **Ocultamiento de datos de contacto sensibles** | Exposición prematura de teléfono o dirección exacta, o incumplimiento de la [*Ley Estatutaria 1581 de 2012 (Habeas Data)*](https://www.google.com/search?q=http%3A%2F%2Fwww.secretariasenado.gov.co%2Fsenado%2Fbasedoc%2Fley_1581_2012.html) | Enmascaramiento total de teléfono/correo en el perfil público, geolocalización aproximada por barrio y filtro automático en el chat interno que bloquea números telefónicos antes de aceptar el servicio |
| **Inflación de calificaciones y miedo a represalias** | En comunidades cerradas, los usuarios evitan calificar mal por temor a venganzas, distorsionando la confianza real según documenta [*Couchers.org*](https://www.google.com/search?q=https%3A%2F%2Fcouchers.org%2Fplan%2Freviews) | Implementación de [*evaluación bilateral doble ciego*](https://www.google.com/search?q=https%3A%2F%2Fwww.sharetribe.com%2Fmarketplace-glossary%2Fdouble-blind-reviews%2F) (revelación simultánea) combinada con 3 preguntas privadas de seguridad que alimentan el Karma de forma anónima |
| **Granjas de invitaciones o apadrinamiento irresponsable** | Usuarios que invitan a conocidos sin validar su ética o pericia técnica solo para expandir su red | **Karma Solidario (*Skin in the Game*)**: el padrino (*Guru*) recibe bonificaciones por el buen desempeño inicial de su ahijado (*Śiṣya*), pero sufre penalizaciones directas en su propio Karma si este comete faltas |
| **Seguridad física en servicios a domicilio y trámites** | Ingreso de terceros al hogar (carpintería, electricidad) o entrega de documentos sensibles (bancos, visas) sin respaldo | Clasificación de habilidades en categorías de riesgo, exigencia de nivel mínimo de Karma para trámites sensibles, verificación de identidad por documento y botón de escudo (*Kavacha*) para compartir el servicio en vivo |

&nbsp;

## 3\. Marco Legal y Protección de Datos Personales (Contexto Colombia / LatAm)

Al operar sin pasarela de pagos integrada y manejar datos de identidad y habilidades de personas naturales, la plataforma debe estructurarse jurídicamente bajo dos pilares:

1. **Cumplimiento de la [*Ley Estatutaria 1581 de 2012*](https://www.google.com/search?q=http%3A%2F%2Fwww.secretariasenado.gov.co%2Fsenado%2Fbasedoc%2Fley_1581_2012.html) (Protección de Datos Personales / Habeas Data)**:  
   - **Principio de Acceso y Circulación Restringida (Art. 4, literal f)**: Los datos personales no públicos no pueden estar disponibles masivamente en internet sin control técnico. Por ello, **SevaSetu** separa estrictamente la *Ficha Pública de Perfil* (alias o nombre de pila \+ inicial, foto, nivel de Karma, habilidades comprobadas y linaje de padrinazgo) de la *Bóveda Privada de Identidad* (cédula, teléfono móvil, correo electrónico y dirección exacta), la cual permanece cifrada en base de datos.  
   - **Autorización Previa, Expresa e Informada (Art. 9 y 12\)**: Durante el registro por invitación, el usuario acepta mediante casilla verificable el tratamiento de sus datos para recibir notificaciones de servicios compatibles con su perfil.  
2. **Delimitación de Responsabilidad Civil (Intermediación Tecnológica vs. Contrato de Obra/Mandato)**:  
   - Los Términos y Condiciones deben precisar que la plataforma actúa exclusivamente como un **directorio comunitario y canal de comunicación basado en reputación**, mientras que el acuerdo económico y la ejecución del favor constituyen un acuerdo privado directo entre el Solicitante (*Yajamāna*) y el Prestador (*Sevaka*).

## 4\. Propuesta de Sostenibilidad sin Pasarela de Pagos

Dado que el pago del favor se acuerda y ejecuta directamente entre las partes (efectivo, transferencia directa o trueque) para evitar la fricción regulatoria y las comisiones bancarias de una pasarela transaccional, el proyecto puede sostener su infraestructura técnica mediante tres vías opcionales y no intrusivas:

- **Certificación de Habilidades de Nivel Superior**: Cobro único administrativo por validar documentalmente o mediante prueba técnica oficios críticos (ej. certificación eléctrica o gestoría de visas).  
- **Recarga de Energía (*Prana*) para Solicitudes Urgentes**: Los solicitantes frecuentes pueden adquirir paquetes prepagados para destacar sus solicitudes urgentes en el radar de notificaciones.  
- **Membresía para Comercios o PyMEs Locales**: Pequeñas empresas u oficinas que requieran soporte técnico, mantenimiento locativo o mensajería bancaria recurrente pueden pagar una suscripción mensual fija por acceso prioritario a prestadores de nivel *Ācārya* o *Parama-Guru*.