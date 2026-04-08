# Claymorphism Design System

## Ethos
Claymorphism is a design evolution that combines the friendliness of neumorphism with the depth of 3D design. It focuses on tactile, "squishy" interfaces that feel like premium digital silicone. The goal is to make digital interactions feel physical, playful, and deeply satisfying.

**Key Principles:**
- **Tactility:** Every element should look like it can be pressed, squeezed, or molded.
- **Softness:** Sharp corners are replaced with large, generous radii (32px to 60px).
- **Depth:** Multiple layers of inner and outer shadows create a sense of volume without harsh edges.
- **Buoyancy:** Elements don't just move; they float and react with physics-based spring logic.

## Tokens

### Colors (Candy Palette)
- **Background:** `#F4F1FA` (Soft Lavender Mist)
- **Foreground:** `#332F3A` (Deep Charcoal)
- **Accent (Primary):** `#7C3AED` (Vibrant Violet)
- **Accent (Secondary):** `#DB2777` (Deep Pink)
- **Accent (Tertiary):** `#0EA5E9` (Sky Blue)
- **Card Background:** `rgba(255, 255, 255, 0.7)` (Translucent Frost)

### Typography
- **Heading:** `Nunito` (ExtraBold/Black) - Rounded and friendly.
- **Body:** `DM Sans` (Medium) - Clean and legible.

### Elevation & Shadows (The Clay Secret)
- **Surface:** `30px 30px 60px #cdc6d9, -30px -30px 60px #ffffff`
- **Card:** `16px 16px 32px rgba(160, 150, 180, 0.2), -10px -10px 24px rgba(255, 255, 255, 0.9), inset 6px 6px 12px rgba(139, 92, 246, 0.03), inset -6px -6px 12px rgba(255, 255, 255, 1)`
- **Pressed:** `inset 10px 10px 20px #d9d4e3, inset -10px -10px 20px #ffffff`

## Motion (Kinetic Protocol)

### Buoyancy (The Physics)
All primary interactions use high-stiffness springs to simulate the resistance and rebound of physical clay.
- **Stiffness:** 400
- **Damping:** 25
- **Mass:** 1

### Scroll Interactions
- **Shadow Shifting:** As the user scrolls, the light source (simulated by shadows) shifts slightly to enhance the 3D effect.
- **Parallax Float:** Background elements drift at different speeds to create spatial depth.

### Component Behaviors
- **Buttons:** Shrink slightly (scale 0.95) and swap outer shadows for inner shadows to simulate being "pushed into" the clay.
- **Cards:** Lift on hover (y: -8) with shadow expansion.
- **Sections:** Fade in with a spring "pop" as they enter the viewport.
