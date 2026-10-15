# 03\. Sistema de Diseño Visual (UI/UX) y Arquitectura Técnica Mobile-First

## 1\. Dirección de Arte: Estética *Sattva* (Antídoto contra la "Típica Web Hecha con IA")

Para cumplir con la premisa de una **identidad visual calmada, alusiva a la mitología hindú y radicalmente distinta de las plantillas genéricas generadas por IA**, se establecen reglas estrictas de diseño:

### Anti-Patrones Prohibidos (Qué NO hacer)

- **Prohibido el "AI Purple/Cyan Glow"**: Cero gradientes neón violeta, azul eléctrico o magenta sobre fondos negros (`#0F172A`).  
- **Prohibido el abuso de Glassmorphism e iconos 3D plásticos**: Sin tarjetas translúcidas flotantes ni ilustraciones vectoriales corporativas genéricas.  
- **Prohibido el blanco hospitalario puro (`#FFFFFF`) como fondo general**: Genera fatiga visual y aspecto de plantilla estándar de Bootstrap/Tailwind.

### Lenguaje Visual Propuesto: *Frescos Minerales y Sándalo*

La interfaz se inspira en los pigmentos minerales naturales de las pinturas murales de Ajanta, el papel artesanal de algodón (*Khadi*), la pasta de sándalo (*Chandan*) y el bronce antiguo de los templos del sur de la India. Transmite calma, oficio artesanal, calidez humana y respeto.

## 2\. Paleta de Colores Oficial (*Paleta Sattva*)

Todos los colores han sido seleccionados con códigos HEX precisos y relaciones de contraste verificadas bajo el estándar de accesibilidad web WCAG 2.1 AA ($\geq 4.5:1$ para texto normal):

| Rol en la Interfaz | Nombre Inspirado en la Tradición Hindú | Código HEX | Referencia Visual y Simbólica | Uso Específico en Componentes UI |
| :---- | :---- | :---- | :---- | :---- |
| **Fondo Principal (Canvas)** | **Sándalo Suave (*Chandan*)** | `#FBF8F3` | Tono crema cálido de la madera de sándalo y pergamino natural | Fondo general de pantallas móviles y escritorio; aporta serenidad inmediata |
| **Fondo de Tarjetas y Paneles** | **Algodón Crudo (*Khadi*)** | `#F2ECE1` | Textura cálida de lino y piedra arenisca clara | Contenedores de perfiles, tarjetas de favores, modales de acuerdo *Sankalpa* |
| **Bordes y Divisores** | **Arcilla Seca (*Mitti*)** | `#E0D5C1` | Líneas sutiles de arquitectura tradicional | Bordes finos de `1px solid`, separadores de listas y ramas del árbol *Paramparā* |
| **Color Primario (Acción y Confianza)** | **Índigo de Krishna (*Nīla*)** | `#23394D` | Azul índigo profundo y calmado asociado a Vishnu y Krishna (contraste `11.2:1`) | Botón principal *"Contactar en App"*, encabezados de navegación y textos destacados |
| **Color Secundario (Karma y Energía)** | **Terracota Ocre (*Geru*)** | `#B85A3A` | Pigmento mineral tierra rojiza/azafrán tostado de los templos | Indicadores de notificación tipo Uber, barras de progreso de Karma y llamadas a la acción |
| **Color de Validación (Habilidad Comprobada)** | **Hoja de Albahaca Sagrada (*Tulsī*)** | `#38664B` | Verde botánico apagado de la planta sagrada *Tulsī* | Sellos de habilidades comprobadas, estado "Disponible" y confirmación de PIN |
| **Color de Prestigio (Niveles Superiores)** | **Bronce de Templo (*Kāṃsya*)** | `#A67C37` | Dorado envejecido mate del latón ritual (nunca amarillo brillante) | Insignias de nivel *Ācārya* y *Parama-Guru*, llaves de invitación *Dīkṣā* |
| **Alerta / Precaución** | **Cinabrio Suave (*Sindoor*)** | `#A8383B` | Rojo mineral profundo y sobrio | Botón de escudo de emergencia (*Kavacha*), alertas de penalización de Karma |
| **Texto Principal** | **Carbón Ritual (*Kajal*)** | `#1F2421` | Negro orgánico ligeramente cálido (contraste `15.1:1` sobre `#FBF8F3`) | Lectura principal, nombres de perfiles y descripciones de tareas |
| **Texto Secundario** | **Ceniza Sagrada (*Vibhūti*)** | `#5A5D58` | Gris piedra cálido (contraste `6.1:1` sobre `#FBF8F3`) | Metadatos, tiempos de respuesta, etiquetas secundarias y distancias |

&nbsp;

## 3\. Tipografía e Iconografía con Identidad Propia

- **Tipografía de Títulos y Niveles de Karma (*Editorial y Humana*)**:  
  - **`Fraunces`** o **`Cormorant Garamond`** (Google Fonts, pesos 600 y 700): Una fuente serif con trazos orgánicos y cálidos que evoca sabiduría, tradición escrita y trato humano en los encabezados, nombres de niveles (*Śramaṇa*, *Śiṣya*, *Sevaka*, *Ācārya*, *Parama-Guru*) y certificados de linaje.  
- **Tipografía de Cuerpo y Controles Móviles (*Alta Legibilidad*)**:  
  - **`Plus Jakarta Sans`** o **`DM Sans`** (pesos 400, 500 y 600): Geométrica humanista muy limpia para botones, chat interno, etiquetas de habilidades y lectura rápida en pantallas pequeñas.  
- **Tipografía Monoespaciada (Códigos y PINs)**:  
  - **`JetBrains Mono`**: Exclusivamente para los códigos de invitación *Dīkṣā*, el PIN de 4 dígitos de inicio/fin de servicio y el identificador del acuerdo *Sankalpa*.  
- **Estilo Gráfico de Componentes**:  
  - Esquinas moderadamente redondeadas (`border-radius: 12px` en tarjetas, `8px` en botones), sombras cálidas muy difusas (`0 4px 20px rgba(35, 57, 77, 0.06)`) y motivos geométricos lineales sutiles inspirados en diagramas *Yantra* o flores de loto de trazo continuo (`1.5px`) para representar los 5 niveles de Karma.

## 4\. Arquitectura Técnica Recomendada (Web Adaptable a Móviles / PWA)

Dado que el requerimiento central es una **plataforma web adaptable a móviles con notificaciones en tiempo real al estilo Uber**, la arquitectura óptima en costo, velocidad de desarrollo y alcance es una **Progressive Web App (PWA) Mobile-First**:

| Capa Tecnológica | Tecnología Recomendada | Justificación para el Proyecto |
| :---- | :---- | :---- |
| **Frontend (Web \+ Móvil Instalable)** | **Next.js (React) \+ Tailwind CSS** configurado con tokens de la *Paleta Sattva* \+ **PWA Service Workers** | Permite instalar la web como app nativa en Android e iOS sin pagar ni depender inicialmente de tiendas de aplicaciones, manteniendo diseño 100% adaptable |
| **Motor de Tiempo Real y Chat** | **Supabase Realtime** (PostgreSQL \+ WebSockets) o **Firebase Cloud Messaging (FCM)** | Envía alertas instantáneas tipo Uber cuando surge un favor compatible con el perfil y sostiene el chat interno con enmascaramiento de datos sensibles |
| **Base de Datos y Grafo de Linaje** | **PostgreSQL** (con consultas recursivas `WITH RECURSIVE` para el árbol *Paramparā* y **PostGIS** para radio geográfico) | Permite calcular al instante los grados de separación entre padrinos y discípulos, y buscar prestadores en un radio de kilómetros sin exponer su dirección exacta |
| **Almacenamiento y Seguridad** | **Row Level Security (RLS)** \+ Cifrado de columnas sensibles (*pgcrypto*) | Garantiza técnicamente que ninguna consulta del frontend pueda leer el teléfono o documento de identidad de otro usuario, cumpliendo la [*Ley 1581 de 2012*](https://www.google.com/search?q=http%3A%2F%2Fwww.secretariasenado.gov.co%2Fsenado%2Fbasedoc%2Fley_1581_2012.html) |

&nbsp;

## 5\. Esquema Relacional de Base de Datos (Entidades Principales)

| Tabla / Entidad | Campos Clave | Reglas de Integridad y Negocio |
| :---- | :---- | :---- |
| **`users_public_profile`** | `id`, `display_name`, `avatar_url`, `karma_points`, `karma_level` (1..5), `guru_id` (FK a `users`), `approx_zone_geohash`, `is_available` | Visible para usuarios autenticados; `guru_id` es obligatorio para cualquier prestador (excepto los nodos semilla fundadores) |
| **`users_private_vault`** | `user_id` (PK/FK), `full_legal_name`, `document_id_encrypted`, `phone_encrypted`, `email_encrypted`, `habeas_data_consent_at` | Acceso bloqueado para clientes web; solo accesible por funciones seguras del servidor (*Edge Functions*) |
| **`diksha_invitations`** | `id`, `code_hash`, `issuer_guru_id`, `earned_at_karma_level`, `redeemed_by_user_id`, `status` (`available`, `used`, `frozen`) | Se insertan exactamente **3 registros** cada vez que `karma_level` incrementa por primera vez a los niveles 2, 3, 4 o 5 |
| **`user_skills`** | `id`, `user_id`, `skill_category` (`tan_seva` / `man_seva`), `skill_name`, `validation_status` (`declared`, `community_proven`, `acharya_certified`), `completed_count` | Cambia automáticamente a `community_proven` cuando `completed_count >= 3` con promedio $\geq 4.5$ |
| **`seva_requests`** | `id`, `requester_id`, `provider_id`, `skill_id`, `status` (`broadcasting`, `negotiating`, `sankalpa_agreed`, `in_progress`, `completed`, `cancelled`), `agreed_compensation_note`, `start_pin`, `end_pin` | Gestiona el ciclo de vida estilo Uber desde la notificación por oleadas hasta el cierre con PIN |
| **`bilateral_reviews`** | `id`, `seva_request_id`, `reviewer_id`, `reviewee_id`, `role_reviewed` (`provider` / `requester`), `public_rating` (1..5), `public_comment`, `private_safety_flags` (JSON), `is_revealed`, `submitted_at` | `is_revealed` pasa a `true` únicamente cuando existen los 2 registros del mismo `seva_request_id` o tras 7 días ([*doble ciego*](https://www.google.com/search?q=https%3A%2F%2Fwww.sharetribe.com%2Fmarketplace-glossary%2Fdouble-blind-reviews%2F)) |
| **`karma_ledger`** | `id`, `user_id`, `source_event_type` (`seva_completed`, `shishya_bonus`, `shishya_penalty`, `requester_fair_pay`), `points_delta`, `related_user_id`, `created_at` | Libro mayor inmutable (auditable) que calcula el saldo de Karma y ejecuta las bonificaciones o penalizaciones solidarias del padrino |

&nbsp;