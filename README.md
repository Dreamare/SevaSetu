# SevaSetu · सेवासेतु · El Puente del Servicio
> **Plataforma comunitaria de confianza inspirada en la tradición védica de *Sevā* (servicio desinteresado), *Karma* (reputación matemática comunitaria) y *Paramparā* (linaje de padrinazgo indeleble).**

[![Licencia](https://img.shields.io/badge/Licencia-MIT-23394D?style=for-the-badge)](LICENSE)
[![Vite](https://img.shields.io/badge/Vite-5.4-B85A3A?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-A67C37?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Estética](https://img.shields.io/badge/Estética-Sattva%20Mineral-38664B?style=for-the-badge)](#-sistema-de-diseño-visual-sattva)
[![Auditoría](https://img.shields.io/badge/Auditoría-Adversarial%20Aprobada-23394D?style=for-the-badge)](#-informe-de-auditoría-adversarial)

---

## 📖 Índice y Documentación del Proyecto

El repositorio contiene tanto la especificación conceptual y operativa como el código fuente completo del MVP:

| Documento | Descripción |
| :--- | :--- |
| **[00 Indice Y Validacion Proyecto Sevasetu.md](./00%20Indice%20Y%20Validacion%20Proyecto%20Sevasetu.md)** | Diagnóstico del problema, validación social y fundamentación de la red comunitaria. |
| **[01 Identidad Hindu Karma Y Linaje Parampara.md](./01%20Identidad%20Hindu%20Karma%20Y%20Linaje%20Parampara.md)** | Filosofía védica de *Sevā*, *Paramparā* y motor de los 5 niveles de Karma solidario. |
| **[02 Flujo Operativo Confianza Y Seguridad.md](./02%20Flujo%20Operativo%20Confianza%20Y%20Seguridad.md)** | Flujo operativo estilo Uber, filtro anti-fuga, acuerdo *Sankalpa* y PINs de seguridad. |
| **[03 Sistema Diseno Ui Ux Y Arquitectura Tecnica.md](./03%20Sistema%20Diseno%20Ui%20Ux%20Y%20Arquitectura%20Tecnica.md)** | Especificaciones de UI/UX, tokens minerales *Sattva* y arquitectura técnica. |
| **[04 Prompt Tecnico Antigravity Sevasetu.md](./04%20Prompt%20Tecnico%20Antigravity%20Sevasetu.md)** | Prompt técnico maestro con especificaciones de ingeniería y criterios de auditoría. |
| **[app/README_ARQUITECTURA.md](./app/README_ARQUITECTURA.md)** | Arquitectura de código, registro de las 3 rondas de auditoría adversarial e instrucciones. |

---

## 🌟 Características Principales del MVP

1. **Registro Exclusivo por Invitación (*Llaves Dīkṣā*)**:
   - Registro restringido para prestadores a menos que ingresen un código de invitación legítimo emitido por un miembro activo.
   - Generación automática de **+3 invitaciones acumulativas** cada vez que el usuario asciende de nivel de Karma.
2. **Árbol Genealógico de Linaje (*Paramparā*)**:
   - Visualización interactiva en cada perfil (`Parama-Guru ➔ Ācārya ➔ Guru Directo ➔ Śiṣya Actual ➔ Discípulos Iniciados`).
   - Trazabilidad comunitaria pública de quién apadrinó a quién.
3. **Corresponsabilidad Solidaria (*Skin in the Game*)**:
   - **Gurudakṣiṇā (+25 pts)** para el padrino cuando su ahijado completa 5 servicios con 5★.
   - **Penalización del 50%** de los puntos perdidos por el ahijado ante calificaciones de 1 o 2 estrellas.
   - **-150 pts y congelamiento de llaves** si el ahijado es expulsado por falta grave.
4. **Despacho Wave en Tiempo Real estilo Uber**:
   - Notificación emergente con temporizador regresivo de 45 segundos, distancia en km, Karma del solicitante y compensación propuesta.
5. **Privacidad *Habeas Data* y Filtro Anti-Fuga Multi-Capa**:
   - Los perfiles ocultan totalmente teléfonos, emails y direcciones exactas (solo zona de ~1.5 km y nombre + inicial).
   - Filtro Regex en tiempo real que intercepta secuencias de 7 a 12 dígitos (con o sin espacios/guiones), correos electrónicos y palabras clave de evasión (`WhatsApp`, `llámame`, `celular`, `por fuera`) hasta que se formaliza el acuerdo *Sankalpa*.
6. **Acuerdo de Honor Digital (*Sankalpa*) y Cierre con PIN**:
   - Validación obligatoria de PIN de Inicio (4 dígitos) al llegar y PIN de Cierre (4 dígitos) tras efectuar el pago directo por fuera de la aplicación.
   - Botón de **Modo Escudo (*Kavacha*)** para compartir el seguimiento en vivo con un contacto de confianza.
7. **Evaluación Bilateral Doble Ciego (*Double-Blind Review*)**:
   - Ninguna parte puede leer la reseña recibida hasta que ambas hayan enviado su calificación.
   - Cuestionario confidencial de 3 preguntas de seguridad comunitaria (*Community Standing*) e insignias rituales (*Mudrās*).
8. **Conmutador Multi-Rol**:
   - Alternancia en tiempo real entre **Sevaka (Prestador)**, **Yajamāna (Solicitante)** y **Śramaṇa (Nuevo Invitado)**.

---

## 🎨 Sistema de Diseño Visual *Sattva*

Diseño con identidad propia basada en pigmentos minerales de la India, cumpliendo WCAG AA:

| Token | Color | HEX | Rol |
| :--- | :--- | :---: | :--- |
| `--bg-chandan` | Sándalo Suave | `#FBF8F3` | Fondo principal del ecosistema |
| `--surface-khadi` | Algodón Crudo | `#F2ECE1` | Tarjetas y contenedores de chat |
| `--border-mitti` | Arcilla Seca | `#E0D5C1` | Delimitadores y ramas del árbol *Paramparā* |
| `--primary-nila` | Índigo de Krishna | `#23394D` | Botones primarios, navegación y cabeceras |
| `--accent-geru` | Terracota Ocre | `#B85A3A` | Radar Uber, Karma meter y alertas |
| `--success-tulsi` | Albahaca Sagrada | `#38664B` | Sello verificado, disponibilidad y PINs |
| `--prestige-kamsya` | Bronce de Templo | `#A67C37` | Insignias de *Ācārya* e iconos de llaves *Dīkṣā* |
| `--danger-sindoor` | Cinabrio Ritual | `#A8383B` | Modo Escudo *Kavacha* y penalizaciones |
| `--text-kajal` | Carbón Ritual | `#1F2421` | Texto principal (contraste 15.1:1) |
| `--text-vibhuti` | Ceniza Sagrada | `#5A5D58` | Metadatos secundarios y marcas de tiempo |

---

## 🚀 Cómo Ejecutar la Aplicación Localmente

### Requisitos Previos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- `npm` (incluido con Node.js)

### Instalación y Puesta en Marcha

```bash
# 1. Clonar el repositorio
git clone https://github.com/Dreamare/SevaSetu.git

# 2. Entrar a la carpeta de la aplicación
cd SevaSetu/app

# 3. Instalar las dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación quedará disponible de inmediato en:
👉 **`http://localhost:5173/`**

---

## ⚖️ Licencia

Distribuido bajo la Licencia MIT. Consulte el archivo `LICENSE` para más información.
