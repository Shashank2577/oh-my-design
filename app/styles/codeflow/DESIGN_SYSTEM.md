# DESIGN SYSTEM: CODEFLOW

## Visual Ethos: "Spatial Data Narrative"
Codeflow is a cyber-noir, high-velocity design language that treats code and data as physical, spatial elements. It's built for developers and data architects who live in the stream. The interface isn't flat; it's a deep Z-axis void where data pulses and code flows directly toward the user.

- **Cyber-Noir Aesthetic**: Deep blacks, high contrast, and neon accents.
- **Data Density**: Information is presented in layers, using depth to manage complexity.
- **Spatial Depth**: Elements exist in a 3D space, utilizing Z-axis translations and parallax.
- **Velocity-Responsive**: The UI reacts to the speed of interaction (scrolling, moving).

## Tokens

### Colors
- **Background (Deep Void)**: `#050505`
- **Surface (Dark Glass)**: `#121212`
- **Primary (Neon Cyber Blue)**: `#00F0FF`
- **Secondary (Matrix Green)**: `#00FF41`
- **Accent (Pulse Purple)**: `#BC00FF`
- **Muted (Graphite)**: `#2A2A2A`
- **Text (High-Vis Silver)**: `#E0E0E0`

### Typography
- **Primary (Mono-Space)**: `JetBrains Mono` or `Fira Code` (Technical, precise).
- **Secondary (Sans-Serif)**: `Inter` (Readability, clean).

### Spacing & Grid
- **Gutter Width**: `64px` (Dedicated to Matrix rain/system status).
- **Z-Axis Layers**: 
    - `Layer 0 (Base)`: The deep background.
    - `Layer 1 (Data)`: Content and text.
    - `Layer 2 (Pulse)`: Glowing accents and interactive elements.

## Motion Language (Kinetic Design Protocol)

### Z-Axis Scroll Narrative
The primary navigation experience is a "fly-through" where content sections move along the Z-axis. As the user scrolls, code blocks and data visualizations should scale and fade in, moving from the horizon (distance) toward the screen (proximity).

### Velocity-Triggered Matrix Rain
The side gutters feature a "Matrix-style" digital rain. The intensity and speed of this rain are tied to the `useVelocity` of the user's scroll. Faster scrolling = faster, more chaotic data flow.

### Motion Constants
- **Spring (High Tension)**: `stiffness: 400, damping: 30` (For UI feedback).
- **Spring (Fluid)**: `stiffness: 100, damping: 20` (For Z-axis transitions).
- **Transition**: `ease: [0.23, 1, 0.32, 1]` (Smooth, deceleration).
