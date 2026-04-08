# DESIGN SYSTEM: Layer Logic

## Visual Ethos
The "Layer Logic" aesthetic is built on the concept of **Information Architecture as physical space**. It emphasizes structure, hierarchy, and depth. The vibe is "Architectural Tech"—clean lines, stacked layers, and a sense that the interface is built from tangible, interlocking components. We move away from flat design into a 2.5D space where Z-index has physical meaning.

## Tokens
- **Background**: `#0F172A` (Slate Void - Deepest layer)
- **Surface**: `#1E293B` (Structural Slate)
- **Accent 1**: `#3B82F6` (Logic Blue - Primary actionable color)
- **Accent 2**: `#8B5CF6` (Neural Violet - For connections and data flow)
- **Border**: `rgba(255, 255, 255, 0.1)` (Subtle edges to define boundaries)
- **Glow**: `rgba(59, 130, 246, 0.3)`
- **Text High**: `#F8FAFC` (High contrast for primary information)
- **Text Low**: `#94A3B8` (Muted text for secondary data)

## Typography
- **Primary Font**: `Inter` (Functional, highly legible, used for structural text)
- **Secondary Font**: `Fira Code` (Monospaced, used for logical elements, data, and code-like interactions)
- **Headings Font**: `Public Sans` (Clean, geometric, strong presence for architecture)

## Motion Language (Kinetic Protocol)
1. **IA Stacking (Scroll Parallax)**: Sections don't just scroll; they stack. As the user scrolls, previous sections slightly recede (scale down) and darken, while the new section slides over them. 
2. **Depth Parallax**: Within cards, elements move at different speeds relative to the mouse or scroll position, creating a "diorama" effect. 
3. **Layer Separation**: `stiffness: 150, damping: 20` - Movements feel deliberate and structural. Elements "lift" off the page before moving, emphasizing their layered nature.
4. **Mechanical Assembly**: When new data appears, it "slides and snaps" into place like pieces of a server rack being installed.

## Signature Elements
1. **The Stacked Scroll**: Sections overlapping and pushing each other back in Z-space.
2. **Parallax Diorama Cards**: Cards where the background, content, and foreground icons exist on separate Z-planes, reacting to mouse movement.
3. **Blueprint Mode**: A toggle or hover state that reveals the wireframe/structure beneath the polished UI.
