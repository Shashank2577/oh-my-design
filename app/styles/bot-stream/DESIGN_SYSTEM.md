# DESIGN_SYSTEM.md: BotStream

## 1. Visual Ethos & Philosophy
**Philosophy**: Harmonious, collaborative, and responsive. BotStream is centered around the human voice. The UI breathes with the participants, using fluid shapes to represent audio and sentiment. It’s designed to be non-intrusive yet highly informative, acting as a "silent observer."

## 2. Design Tokens
- **Background**: `#08090A` (Obsidian)
- **Surface**: `rgba(255, 255, 255, 0.03)` (Frosted Glass)
- **Accent 1**: `#3B82F6` (Stream Blue)
- **Accent 2**: `#F43F5E` (Pulse Rose)
- **Border**: `rgba(255, 255, 255, 0.1)`
- **Text High**: `#FFFFFF`
- **Text Low**: `#A0A0A0`

## 3. Typography System
- **Headings**: **Space Grotesk** (Modern, wide tracking)
- **Body**: **Inter** (Clean, high readability)
- **Data**: **JetBrains Mono** (For timestamps and sentiment scores)

## 4. Motion Architecture (Physics)
- **Orb Dynamics**: `stiffness: 50, damping: 10, mass: 2` (Heavy, liquid-like oscillation).
- **Waveform Mapping**: `stiffness: 800, damping: 50` (Ultra-responsive frequency tracking).
- **Sentiment Shift**: `stiffness: 100, damping: 40` (Slow, atmospheric color bleeding).

## 5. Signature Elements
- **The Breathing Background**: Subtle background gradient shifts that mimic a slow breathing rhythm (12-18 BPM).
- **Live Summary Ticker**: Key points slide in from the bottom, fading out as they lose relevance in the conversation.
- **Audio Proximity Glow**: Orbs brighten and move toward the center of the viewport as they become the dominant speaker.
- **Liquid Blobs**: SVG liquid blobs that merge/split on scroll.
- **Breathing Orb**: Central hero element reactive to scroll.
- **Velocity-driven Ripples**: Background ripple effects tied to scroll velocity.
