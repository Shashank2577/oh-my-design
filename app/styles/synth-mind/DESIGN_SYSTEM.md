# SynthMind Design System: Latent Dreamscape

## Visual Ethos
SynthMind is an exploration of the **Latent Dreamscape**—the liminal space where human intent meets algorithmic subconscious. It rejects rigid geometry in favor of amorphous, fluid forms and ethereal aesthetics.

- **Ethereal Fluidity:** Soft gradients, blurred edges, and morphing shapes that feel organic and alive.
- **Neural Subconscious:** Visuals that evoke neural pathways, synaptic firing, and the "unblurring" of thoughts into reality.
- **Chromatic Depth:** High-contrast dark backgrounds with vibrant, pulsing accent colors that shift and bleed into each other.

## Design Tokens

### Colors (Synaptic Palette)
A palette designed to feel deep, immersive, and slightly otherworldly.

| Token | Value | Intent |
|-------|-------|--------|
| `bg-void` | `#03001C` | The deep, non-reflective base of the subconscious. |
| `surface-synapse` | `rgba(48, 25, 52, 0.4)` | Semi-transparent, blurred surfaces for content. |
| `accent-mint` | `#B6EADA` | A sharp, high-energy green for primary actions. |
| `accent-azure` | `#5B8FB9` | A deep, calming blue for secondary elements. |
| `text-high` | `#B6EADA` | Maximum legibility with a soft glow. |
| `text-muted` | `rgba(182, 234, 218, 0.6)` | Subdued secondary information. |
| `border-latent` | `rgba(182, 234, 218, 0.2)` | Subtle framing that feels like a whisper of a boundary. |

### Typography
- **Display:** `Syne` - Bold, expressive, and slightly avant-garde for headlines.
- **Body:** `Plus Jakarta Sans` - Clean, modern, and readable.
- **Metadata:** `Space Mono` - Technical and precise for labels and status indicators.

## Motion Language (Kinetic Protocol)

### 1. Cinematic Unblurring
As the user scrolls, images and containers transition from a heavy Gaussian blur (`blur(40px)`) to sharp focus, representing the "resolution" of a latent thought.

### 2. Chromatic Aberration Pulses
On hover, interactive elements trigger a brief chromatic aberration effect (RGB split) that pulses outward, simulating a sensory "glitch" or synaptic firing.

### 3. Velocity-Based Typography
The font weight of headlines shifts dynamically based on scroll velocity. Fast scrolling "thins" the weight (tracking speed), while stopping at a section "thickens" it (focusing intent).

### 4. High-Fidelity Fluidity
All transitions use custom cubic-beziers (e.g., `[0.16, 1, 0.3, 1]`) to ensure animations feel heavy yet responsive, like moving through a high-viscosity liquid.
