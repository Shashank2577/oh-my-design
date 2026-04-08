# Motion Manifesto - Design System

## Visual Ethos: Mechanical Inertia
The "Mechanical Inertia" theme is rooted in the physical reality of heavy machinery and high-precision engineering. Every element on the page behaves as if it has mass, momentum, and physical resistance. When the user interacts or scrolls, the interface doesn't just "move"—it accelerates, skews under pressure, and settles with the characteristic "jiggle" of a high-tension spring.

- **Weight & Mass:** UI components feel heavy. Their movement is deliberate and follows laws of momentum.
- **Precision Engineering:** Sharp borders, technical typography, and high-contrast color palettes (Electric Lemon and Cine Blue).
- **Distortion under Force:** Elements skew and distort based on velocity, simulating the physical stress of rapid movement.

## Design Tokens

### Colors
- **Background:** `#000000` (Deep Space)
- **Surface:** `#050505` (Carbon Matte)
- **Accent 1:** `#FAFF00` (Electric Lemon) - Primary action and highlights.
- **Accent 2:** `#00E0FF` (Cine Blue) - Secondary data and technical elements.
- **Border:** `#222222` (Industrial Steel)
- **Text (High):** `#FFFFFF` (Pure White)
- **Text (Low):** `#555555` (Muted Grey)

### Typography
- **Primary:** `Inter` - For readability and clean technical feel.
- **Display:** `Space Grotesk` - Bold, italic, and uppercase for headlines and labels to emphasize speed and aggression.

### Spacing & Layout
- Tight, grid-based layouts with heavy use of industrial-style borders and technical HUD elements.

## Motion Language (Kinetic Design Protocol)

### 1. Velocity-Based Distortion (Skew)
- Elements implement `useVelocity` from Framer Motion.
- Higher velocity leads to extreme skewing (up to 15 degrees) on the Y-axis.
- This creates a "stretching" effect as the user scrolls rapidly.

### 2. High-Stiffness Spring "Jiggles"
- When scrolling stops or an element enters the viewport, it uses a high-stiffness spring.
- **Token:** `stiffness: 600, damping: 15, mass: 1`
- This ensures that movements feel rigid but have a satisfying "rebound" or "jiggle" when they settle.

### 3. Background Pattern Shifting
- A background grid or noise pattern that transitions from **Static** (sharp, fixed) to **Flow** (blurred, moving) based on scroll speed.
- This provides visual feedback on the "speed" of the interface.

### 4. Mechanical Transitions
- Components use `AnimatePresence` for abrupt, high-energy entry/exit animations.
- Hover states include skewing and scaling that feels like a physical mechanical switch.

## AI Asset Generation (Mechanical Inertia Engine)
The following assets were generated to match the "Mechanical Inertia" theme:

1. **Hero Asset:** "Mechanical inertia hero asset, heavy machinery, high-precision engineering, dark industrial aesthetic, electric lemon highlights, cinematic lighting, 8k, hyper-realistic."
2. **Features Asset:** "Mechanical inertia features background, technical blueprints, rotating gears, high-tension springs, cine blue accents, dark matte finish, 8k, hyper-realistic."
3. **CTA Asset:** "Mechanical inertia call to action, powerful engine core, glowing energy, high-speed rotation, dark chrome, industrial excellence, 8k, hyper-realistic."
