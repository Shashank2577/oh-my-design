# Academia Design System

## Visual Ethos
The "Academia" style channels the atmosphere of centuries-old university libraries, Victorian study halls, and Renaissance manuscripts. It combines rich material references (aged parchment, dark mahogany wood, polished brass hardware) with traditional typographic excellence and measured ornamentation.

It embodies scholarly gravitas meets timeless elegance, offering an intellectual, distinguished experience.

## Design Tokens

### Color Palette
- **Background**: `#1C1714` (Deep Mahogany) - The darkest wood tone.
- **BackgroundAlt**: `#251E19` (Aged Oak) - Surface elevation, cards, and panel backgrounds.
- **Foreground**: `#E8DFD4` (Antique Parchment) - Primary text.
- **Muted**: `#3D332B` (Worn Leather) - Tertiary backgrounds.
- **MutedForeground**: `#9C8B7A` (Faded Ink) - Secondary text.
- **Border**: `#4A3F35` (Wood Grain) - Subtle borders.
- **Accent**: `#C9A962` (Polished Brass) - Primary interactive color.
- **AccentSecondary**: `#8B2635` (Library Crimson) - Emphasis badges, hover transforms.
- **AccentForeground**: `#1C1714` (Dark on Brass) - Text on brass buttons.

### Typography System
- **Headings**: `Cormorant Garamond, serif` - High-contrast old-style serif.
- **Body**: `Crimson Pro, serif` - Book-style serif for extended reading.
- **Display/Labels**: `Cinzel, serif` - Engraved, all-caps display font.

### Radius & Border System
- **Default**: `4px` (rounded).
- **Arch-Top**: `40% 40% 0 0 / 20% 20% 0 0` - For specific images or focal points.

### Effects & Textures
- **Aged Paper**: Subtle SVG noise filter overlaid on the page.
- **Vignette**: Radial gradient darkening edges to mimic library lighting.
- **Brass Gradient**: `linear-gradient(180deg, #D4B872 0%, #C9A962 50%, #B8953F 100%)`.
- **Engraved Text**: Subtle dual text-shadow for a pressed-into-metal appearance.

## Motion Language
Motion should be dignified, deliberate, and smooth. Nothing snappy or playful.
- **Ink-Bleed Reveals**: Elements appear through organic, fluid masks mimicking ink spreading on parchment.
- **Paper Unfolding**: Sections slowly unroll or reveal on scroll, providing a sense of physical documents.
- **Timing**: Use `ease-out` natural decelerations. Standard transitions are `300ms`, dramatic reveals are `700ms`.
