# GrowthGrid Design System (V3)

## Philosophy & Vibe
**Design Philosophy & Vibe**: Exponential, modular, and data-obsessed. GrowthGrid is about the "Science of Scale." It uses a rigid, mathematical grid that feels like it could expand infinitely in any direction. The vibe is "Silicon Valley Lab"—efficient, experimental, and hyper-optimized. It uses geometric patterns and "fractal" layouts to suggest organic but controlled growth.

## Design Token System
- **Background**: `#000000` (Grid Void)
- **Surface**: `#111111` (Module)
- **Accent 1**: `#00FF41` (Matrix Green)
- **Accent 2**: `#333333` (Graphite)
- **Border**: `1px solid #222222`
- **Grid Line**: `rgba(0, 255, 65, 0.05)`

## Typography System
- **Primary Font**: **IBM Plex Mono** (All Text - Technical/Engineering vibe)
- **Secondary Font**: **Archivo Black** (Headings - Heavy, "Industrial" weight)
- **Scale**: Hero (120px), H1 (80px), H2 (40px), Body (14px)

## Motion Architecture (The "Depth" Factor)
- **Grid Expansion**: `scale: [0.95, 1], opacity: [0, 1]`, `stiffness: 400, damping: 30, mass: 0.8`.
- **Exponential Slider**: `useTransform` to map slider value to `scale` of all grid elements simultaneously.
- **Data Pop**: Items "ping" into existence with a quick `scale: [0, 1.2, 1]` burst.

## Niche-Specific Section Requirements
- **Experiment Tracker**: A Kanban board where cards "snap" into place with high magnetic force. When an experiment is marked "Successful," it triggers a green "particle blast" that populates neighboring grid cells with new data points.

## Component Styling
- **Buttons**: Sharp 90-degree corners, "Scan-line" animation moving vertically on hover.
- **Cards**: Modular blocks with coordinate labels (e.g., A-1, B-4) in the corners.
- **Inputs**: Command-line style prompts with a blinking block cursor.

## Signature Elements
1. **The Infinite Grid Scroll**: A background grid that scales and pans based on mouse movement, creating a sense of navigating a massive data-map.
2. **Fractal Loading**: The site loads by "subdividing" large blocks into smaller and smaller modules until the full UI is revealed.
3. **Growth Pulse**: A global "heartbeat" animation that makes the grid lines glow slightly brighter every 2 seconds.
