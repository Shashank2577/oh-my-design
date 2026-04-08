# Maximalism - Design System

## Visual Ethos: Sensory Overload
The "Sensory Overload" theme is a celebration of abundance, complexity, and unapologetic vibrance. Inspired by maximalist principles, every pixel is an opportunity for expression. It rejects the "less is more" mantra in favor of "more is more," creating a digital experience that is dense, layered, and visually stimulating.

- **Abundance:** No empty space is left unadorned. Textures, patterns, and elements overlap to create a rich, tactile feel.
- **Eclecticism:** A mix of diverse styles—neon gradients, organic shapes, and brutalist typography—coexist in a chaotic but harmonious system.
- **Interactivity as Ornament:** Motion isn't just functional; it's a decorative layer that responds to every user action.

## Design Tokens

### Colors
- **Primary Background:** `#120458` (Deep Cosmic Purple)
- **Secondary Background:** `#000000` (Void Black)
- **Accent 1 (Neon Pink):** `#FF00FF` (Hyper-Pink)
- **Accent 2 (Neon Cyan):** `#00FFFF` (Electric Cyan)
- **Accent 3 (Vibrant Yellow):** `#FAFF00` (Solar Flare)
- **Text (High Contrast):** `#FFFFFF` (Pure White)
- **Text (Low Contrast):** `#A0A0A0` (Silver Mist)
- **Gradients:** Complex multi-stop gradients (Pink to Cyan to Yellow).

### Typography
- **Headlines:** `Syne` - Bold, wide, and aggressive.
- **Body:** `Inter` - For legibility amidst the chaos.
- **Accents:** `Space Mono` - For technical or data elements.

### Layout
- Overlapping grids, non-standard alignment, and elements that break the container boundaries.

## Motion Language (Kinetic Design Protocol)

### 1. Multi-Layered Parallax
- At least 5 layers of parallax at varying speeds (0.1x to 0.8x of scroll speed).
- Foregrounds move faster than backgrounds, creating a deep sense of 3D space.

### 2. Element "Collisions"
- As the user scrolls, certain elements "bump" into each other.
- Using `useTransform` and `useScroll`, elements change scale, rotation, or position when they reach specific scroll thresholds, simulating a "collision" or physical reaction.

### 3. High-Fidelity Springs
- All movements use spring physics with low damping for high energy.
- **Token:** `stiffness: 400, damping: 20, mass: 1`

### 4. Reactive Textures
- Background patterns (noise, scanlines, or grids) that shift opacity and scale based on scroll velocity.

## AI Asset Generation (Sensory Overload Engine)
The following assets were generated to match the "Sensory Overload" theme:

1. **Hero Asset:** "Maximalist sensory overload hero asset, neon explosion, holographic textures, complex geometric patterns, deep cosmic purple background, 8k, hyper-detailed, vibrant."
2. **Features Asset:** "Maximalist features background, overlapping organic shapes, fluid liquid metal, neon cyan and pink highlights, intricate details, 8k, surrealism."
3. **CTA Asset:** "Maximalist call to action, glowing energy core, solar flare yellow, digital glitch effects, hyper-vibrant, 8k, futuristic maximalism."
