# Swiss Design System (Kinetic Implementation)

## 1. Visual Ethos

The Swiss (International Typographic Style) aesthetic is rooted in objectivity, clarity, and universal understanding. It rejects personal ornamentation in favor of functional communication. The grid is absolute law, serving as the visible skeleton of information. Asymmetrical organization creates dynamic visual rhythm and tension. Typography is the primary structural element, relying on scale, weight, and position to create hierarchy. White space is active, defining boundaries and giving weight to massive typography. Layered textures (grids, dots, lines) provide depth without breaking the strict flatness of the design.

## 2. Tokens

### Colors
- **Background (`#FFFFFF`)**: Pure White - The neutral canvas.
- **Foreground (`#000000`)**: Pure Black - Absolute text.
- **Muted (`#F2F2F2`)**: Light Gray - Secondary backgrounds for rhythm.
- **Accent (`#FF3000`)**: Swiss Red - The singular functional signal color (CTAs, emphasis, warnings).
- **Border (`#000000`)**: Pure Black - Visible structure.

### Typography
- **Font Family**: `Inter` (Sans-Serif, Grotesque).
- **Weights**: Black (900), Bold (700), Medium (500), Regular (400).
- **Style**: UPPERCASE for headings and labels.
- **Tracking**: `tracking-tighter` for large headlines, `tracking-widest` for small labels.
- **Alignment**: Strict flush-left, ragged-right.

### Geometry
- **Radius**: `0px` (Strictly Rectangular). No rounded corners.
- **Borders**: Thick, visible structure (`2px` or `4px`).
- **Shadows**: None. Flatness is maintained.

### Patterns (CSS-based)
- **Grid**: 24x24px lines at 3% opacity.
- **Dots**: 16x16px spacing, radial gradients at 4% opacity.
- **Diagonals**: 45-degree lines, 10px spacing at 2% opacity.
- **Noise**: SVG fractal noise at 1.5% opacity for paper texture.

## 3. Motion Language (Kinetic Protocol)

Motion in the Swiss style is instant, mechanical, snappy, and precise. There is no organic easing or bouncy spring physics.

- **Grid Alignment**: Elements snap to horizontal and vertical grid lines.
- **Typographic Shifts**: Text scales aggressively and snaps into place on scroll.
- **Interactions**:
  - Full color inversions (e.g., Black → White, White → Red).
  - Sharp scale transforms (1.0 → 1.05) without bouncing.
  - Precise icon rotations (e.g., plus signs rotating 90° or 45°).
  - Vertical slide animations for navigation and reveals.
- **Timing**: `ease-out` or `linear` transitions with short durations (150ms-200ms) for rapid feedback.
