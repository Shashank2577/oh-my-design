# Cyberpunk HUD Interface Design System

## Ethos: High-Tech, Low-Life (Kinetic Protocol)
The "HUD Interface" theme transforms the user interface into a tactical heads-up display. It's not just a website; it's a hacked military-grade terminal. The design prioritizes data density, technical precision, and the feeling of a "living" system that glitches under the pressure of data throughput.

- **Data as Aesthetics**: Numbers, coordinates, and system logs are decorative as much as they are functional.
- **Controlled Corruption**: Glitches aren't errors; they are the UI reacting to the "velocity" of the sprawl.
- **Tactical Clarity**: Despite the grit, critical information must be illuminated with neon precision.

## Tokens

### 1. Colors (The Void & The Neon)
- **Background (The Void)**: `#050508` (Deep, atmospheric black)
- **Surface (Terminal)**: `#0a0a12` (Raised industrial surfaces)
- **Primary (Neon Green)**: `#00ff88` (Standard HUD active state)
- **Secondary (Magenta)**: `#ff00ff` (Warning / High-alert states)
- **Tertiary (Cyan)**: `#00d4ff` (Data streams / Auxiliary info)
- **Error (Crimson)**: `#ff2a2a` (Critical failure / Breach)
- **Border**: `#1a1a2e` (Subtle mechanical structure)

### 2. Typography
- **Heading**: `Orbitron` (Futuristic, geometric sans-serif) - Used for system headers and product titles.
- **Body**: `JetBrains Mono` (Technical, readable monospaced) - Used for primary content and data logs.
- **Accent**: `Share Tech Mono` (Classic digital/LCD aesthetic) - Used for status indicators and micro-copy.

### 3. Surface & Structure
- **Chamfered Corners**: 45-degree angle cuts on all interactive containers.
- **Scanlines**: 2px horizontal overlays at 10% opacity.
- **Grid System**: 50px technical grid background representing a spatial HUD.

## Motion (The Kinetic Layer)

### 1. Scroll-Induced Glitch (useVelocity)
As the user scrolls faster, the text hierarchy begins to "corrupt." Characters swap with random symbols, and horizontal offsets increase proportionally to the scroll velocity. This simulates the UI struggling to render during high-speed data traversal.

### 2. HUD Initialization
Components don't just "fade in." They initialize via:
- **Frame Reveal**: Borders draw themselves first.
- **Data Flickering**: Text flickers rapidly before settling.
- **Chromatic Pop**: A split-second RGB separation on entry.

### 3. Micro-Interactions
- **Hover**: Intense neon glow and a "ping" animation (subtle scale-up with border pulse).
- **Active**: Skew transforms and momentary color inversion.
- **Idle**: Subtle pulsing of "online" status indicators.
