# 02\. Flujo Operativo, Despacho Estilo Uber, Privacidad y Confianza Bilateral

## 1\. Privacidad por Diseño y Ocultamiento de Datos Sensibles

En cumplimiento estricto de los requerimientos del proyecto y del principio de circulación restringida de la [*Ley Estatutaria 1581 de 2012*](https://www.google.com/search?q=http%3A%2F%2Fwww.secretariasenado.gov.co%2Fsenado%2Fbasedoc%2Fley_1581_2012.html), ningún perfil muestra números telefónicos, enlaces a WhatsApp, correos electrónicos, número de documento ni direcciones exactas de residencia.

| Tipo de Dato | Visibilidad en Perfil Público | Visibilidad Durante Solicitud Activa | Almacenamiento Interno |
| :---- | :---- | :---- | :---- |
| **Nombre y Fotografía** | Nombre de pila \+ inicial del apellido (ej. *Alejandro H.*) y foto verificada con prueba de vida | Nombre completo visible únicamente tras aceptar el acuerdo *Sankalpa* | Cifrado AES-256 en base de datos |
| **Teléfono / WhatsApp / Email** | **100% Oculto** (Prohibida su visualización o publicación en biografía) | **Oculto**; toda la comunicación de texto, voz y fotos ocurre mediante el botón **"Contactar en App"** | Cifrado; usado solo por el servidor para envío de alertas OTP/Push |
| **Ubicación Geográfica** | Barrio o sector general (radio difuminado de 1.5 km) | Distancia estimada en kilómetros; la dirección exacta del servicio se revela solo al confirmar el encargo | Coordenadas procesadas en servidor sin exponer el punto exacto en la API pública |
| **Habilidades y Linaje** | Habilidades comprobadas, insignias, Nivel de Karma y árbol [*Paramparā*](https://www.google.com/search?q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGuru%25E2%2580%2593shishya_tradition) | Visible en todo momento | Público dentro de la comunidad autenticada |

&nbsp;

### Filtro Anti-Fuga en el Canal de Contacto Interno

Siguiendo las mejores prácticas documentadas por [*Hokodo para prevenir la desintermediación*](https://www.google.com/search?q=https%3A%2F%2Fwww.hokodo.co%2Fresources%2Fhow-to-prevent-disintermediation-on-your-b2b-marketplace), el chat interno de la aplicación aplica una expresión regular en tiempo real que **enmascara automáticamente secuencias numéricas de 7 a 10 dígitos, enlaces externos y palabras clave como "escríbeme al WhatsApp"** mientras la solicitud aún no ha sido formalmente aceptada y cerrada bajo acuerdo *Sankalpa*.

## 2\. Flujo de Solicitud y Despacho en Tiempo Real (Estilo Uber)

El sistema combina la exploración de perfiles con un motor de despacho por cercanía y afinidad de habilidades:

1. **Creación de la Solicitud (*Convocatoria de Sevā*)**:  
   - El solicitante (*Yajamāna*) puede elegir entre **dos modalidades**:  
     - **Modo Directo**: Visita el perfil de un prestador específico, revisa sus habilidades comprobadas y su Karma, y pulsa el botón **"Contactar para un Favor"**.  
     - **Modo Radar (Estilo Uber)**: Describe la tarea (ej. *"Revisión de cortocircuito en tomacorriente"* o *"Acompañamiento para trámite bancario y radicación de documentos"*), selecciona la categoría de habilidad requerida, indica el barrio/sector, la urgencia y una **propuesta de compensación o rango sugerido**.  
2. **Notificación Inteligente por Oleadas de Karma (*Wave Dispatch*)**:  
   - El motor de emparejamiento filtra a los prestadores activos en el radio geográfico que tengan esa habilidad comprobada y estado **"Disponible"**.  
   - Para premiar el mérito, la alerta Push / sonora llega primero (durante los primeros 45 segundos) a los niveles **Parama-Guru, Ācārya y Sevaka**, y luego se abre a **Śiṣya y Śramaṇa**.  
   - El prestador recibe una tarjeta emergente tipo Uber con: *Tipo de habilidad, Barrio aproximado (distancia en km), Calificación y Nivel de Karma del solicitante, Descripción del favor y Propuesta de compensación*.  
   - El prestador dispone de un temporizador para pulsar **"Aceptar Conversación"** o **"Dejar Pasar"** (sin penalización si decide no tomarla antes de comprometerse).  
3. **Negociación y Acuerdo de Honor Digital (*Sankalpa*)**:  
   - Al aceptar la notificación, se abre el chat seguro dentro de la app entre solicitante y prestador.  
   - Dado que el pago se realiza por fuera de la app, antes de iniciar el trabajo ambos deben pulsar el botón **"Confirmar Acuerdo (Sankalpa)"**, donde queda registrado en una tarjeta inmutable dentro del chat:  
     - *Descripción breve de lo que incluye el favor*.  
     - *Valor exacto acordado o modalidad de compensación externa (efectivo, transferencia directa al finalizar, etc.)*.  
     - *Fecha y hora de inicio*.  
4. **Ejecución con PIN de Seguridad y Cierre**:  
   - Cuando el prestador llega al lugar (o inicia el trámite), valida un **PIN de Inicio de 4 dígitos** que aparece en la pantalla del solicitante.  
   - Al concluir la tarea y realizarse el pago directo entre ellos, el solicitante entrega el **PIN de Finalización**, lo que marca el favor como completado y habilita inmediatamente las evaluaciones mutuas.

## 3\. Sistema de Calificación Bilateral Doble Ciego e Índice de Confianza

Para garantizar que tanto quien presta el servicio como quien pide el favor mantengan un comportamiento respetuoso, justo y seguro, la plataforma implementa un sistema híbrido basado en dos referentes de la industria:

### A. Reseñas Bilaterales Doble Ciego (*Double-Blind Reviews*)

Adoptando la arquitectura estándar de confianza descrita por [*Sharetribe (utilizada por Airbnb y Uber)*](https://www.google.com/search?q=https%3A%2F%2Fwww.sharetribe.com%2Fmarketplace-glossary%2Fdouble-blind-reviews%2F):

- Al cerrarse el favor, **ambas partes son evaluadas**:  
  - **El Solicitante evalúa al Prestador** en: Calidad técnica de la habilidad, Puntualidad, Comunicación y Respeto.  
  - **El Prestador evalúa al Solicitante** en: Claridad del requerimiento, Trato respetuoso, Seguridad del entorno y **Cumplimiento íntegro y puntual del pago acordado fuera de la app**.  
- **Revelación Simultánea**: Ninguna de las dos partes puede ver la calificación ni la reseña escrita que recibió hasta que **ambos hayan enviado su evaluación** (o hasta que transcurran 7 días calendario). Esto elimina por completo las reseñas vengativas o la extorsión reputacional.

### B. Evaluación Privada de Seguridad (*Community Standing*)

Inspirado en el modelo de [*Community Standing de Couchers.org*](https://www.google.com/search?q=https%3A%2F%2Fcouchers.org%2Fplan%2Freviews) para evitar que el miedo social impida reportar malas experiencias:

- Además del comentario público, cada usuario responde en privado 3 preguntas de "Sí / No" que **nunca se muestran al otro usuario de forma individual**, sino que se procesan con un ligero retardo aleatorio en el algoritmo de Karma:  
  1. *¿Volverías a contratar / atender a esta persona sin dudarlo?*  
  2. *¿Se respetó el acuerdo económico pactado sin presiones ni cambios de última hora?*  
  3. *¿Te sentiste incómodo/a o inseguro/a en algún momento del trato?* (Una respuesta afirmativa alerta de inmediato a moderación y congela preventivamente las notificaciones del perfil reportado si se repite el patrón).

## 4\. Funciones Adicionales Propuestas para Promover una Comunidad Amigable y Segura

2. **Insignias de Gratitud (*Mudrās*)**: Al evaluar, las partes pueden otorgar insignias simbólicas específicas: *Manos de Maestro* (excelencia técnica), *Palabra Sagrada* (cumplió exactamente lo pactado), *Hogar Hospitalario* (otorgada al solicitante que ofrece un trato amable y seguro) y *Guía Paciente* (ideal para quienes ayudan con trámites bancarios o visas).  
3. **Modo Escudo (*Kavacha*) y Check-in de Seguridad**: Durante un servicio presencial, tanto el solicitante como el prestador pueden compartir con un clic un enlace temporal de seguimiento con un familiar fuera de la app, mostrando quién es la contraparte, su linaje *Paramparā* y la hora estimada de finalización.  
4. **Filtro de Afinidad y Confianza Ampliada**: Las personas mayores o usuarias que solicitan servicios dentro de su hogar pueden activar el filtro *"Solo prestadores de mi propia red Paramparā (hasta 2 grados de separación)"* o *"Solo perfiles con insignia Hogar Seguro validada por otras mujeres/adultos mayores"*, replicando las sub-comunidades de confianza de [*Couchers.org*](https://www.google.com/search?q=https%3A%2F%2Fcouchers.org%2Fplan%2Freviews).