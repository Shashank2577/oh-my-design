# TensorTrack Design System: Kinetic Industrial Neural Processing

## Visual Ethos
TensorTrack is built on the philosophy of **Industrial Neural Processing**. It combines the raw, gritty aesthetic of industrial automation with the fluid, high-velocity nature of neural network telemetry. 

- **Gritty Precision:** Sharp edges, mono-spaced typography, and heavy borders meet high-fidelity animations.
- **Hardware First:** The interface should feel like physical hardware—LED indicators, "cabled" connections, and mechanical responsiveness.
- **Velocity-Driven:** The UI reacts to user interaction speed, particularly scroll velocity, mirroring the throughput of data streams.

## Design Tokens

### Colors (LED Status Palette)
All components use LED-inspired status colors to indicate system health and activity.

| Token | Value | Intent |
|-------|-------|--------|
| `bg-industrial` | `#090A0C` | Deep void background, non-reflective. |
| `surface-rack` | `#12141A` | Elevated rack-mount surface. |
| `status-critical` | `#FF4D4D` | Red (LED On) - High priority, error, critical spike. |
| `status-active` | `#00F0FF` | Cyan (LED On) - Streaming data, active process. |
| `status-idle` | `#1F2937` | Dim Gray (LED Off) - Inactive, standby. |
| `status-success` | `#32FF7E` | Green (LED On) - Validation pass, system nominal. |
| `border-hard` | `rgba(255, 77, 77, 0.2)` | Industrial framing. |

### Typography
- **Headlines:** `Space Grotesk` - Bold, technical, wide tracking.
- **Data/Logs:** `JetBrains Mono` - High legibility for code and telemetry.
- **UI/Body:** `Inter` - Neutral, functional.

### Spacing & Grid
- **Module:** 8px base unit.
- **Borders:** 1px solid with 0px corner radius for a "machined" look.

## Motion Language (Kinetic Protocol)

### 1. Scroll-Coupled Connectivity (The Cables)
SVG paths representing data cables "plug in" (animate `pathLength`) as the user scrolls into a section, establishing a physical-logical link between modules.

### 2. 3D Dashboard Tilt
Main telemetry panels utilize a `perspective` transform that tilts based on **scroll velocity**. Rapid scrolling causes the panels to pitch forward/backward, creating a sense of physical mass and momentum.

### 3. LED Pulse
Status indicators use a subtle `brightness` and `box-shadow` pulse to simulate real-world hardware LEDs flickering under load.

### 4. Data Streams
Horizontal and vertical "scanning" lines move across the background, representing sub-millisecond data ingest.
