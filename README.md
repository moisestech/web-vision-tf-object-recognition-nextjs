# 🌊 SOP On-Device AI Demo

A one-day, visually impressive Next.js 15 demo with **on-device object detection** and **face anonymization** for the Stop Ocean Pollution mission.

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Setup](#-setup)
- [📱 Usage](#-usage)
  - [🏠 Home Page](#-home-page)
  - [📷 Camera Tracking Page](#-camera-tracking-page)
  - [✅ After Capturing](#-after-capturing)
  - [🎬 Demo Mode](#-demo-mode)
  - [🏛️ Municipality Selection](#️-municipality-selection)
  - [⚙️ Admin Panel](#️-admin-panel)
- [💻 Development](#-development)
- [🧪 Testing](#-testing)
- [⚠️ Known Limitations & 🔧 Troubleshooting](#️-known-limitations--troubleshooting)
- [📁 Project Structure](#-project-structure)
- [📚 Documentation](#-documentation)
- [📄 License](#-license)

## ✨ Features

- 🤖 **On-device AI**: All AI runs locally in the browser (no PII upload)
- 🔍 **Object Detection**: COCO-SSD detects bottles, cups, and utensils
- 👤 **Face Anonymization**: BlazeFace automatically blurs faces on capture
- 🔒 **Privacy-first**: All processing happens client-side
- ✏️ **Review & Save**: Adjust counts and fill percentage before saving
- 📊 **CSV Export**: Export all inspections as CSV
- 🎨 **Poster Generation**: Generate PNG posters for each inspection

## 🛠️ Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- TensorFlow.js (WebGL → WASM fallback)
- COCO-SSD (object detection)
- BlazeFace (face detection)
- Zustand (state management)
- LocalForage (IndexedDB storage)

## 🚀 Setup

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Copy TensorFlow.js WASM Files

The WASM backend requires binary files to be served from the `public` directory:

```bash
cp node_modules/@tensorflow/tfjs-backend-wasm/dist/*.wasm public/tfjs/
```

This step is **required** for WASM fallback to work.

### 3️⃣ Add Demo Assets (Optional)

For demo mode (`?demo=1`), add sample assets to `public/samples/`:

- `drain_closeup.jpg` - Sample image showing bottles/cups (720p recommended)
- `street_gutter_debris.mp4` - Sample video loop (<8s, 720p recommended)

If these are missing, demo mode will still work but may show errors.

### 4️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### 🏠 Home Page

The home page serves as the entry point to the application, featuring:

- **Municipality Showcase**: Display cards for each supported municipality
- **Quick Navigation**: Click any municipality card to start scanning for that specific municipality
- **Visual Design**: Clean, modern interface with ocean-themed styling
- **Responsive Layout**: Optimized for both desktop and mobile devices

<img width="1302" height="904" alt="sop-object-detection-tfjs-homepage" src="https://github.com/user-attachments/assets/0a919449-670a-4b6b-bd50-9757d86fe1c9" />

### 📷 Camera Tracking Page

The camera tracking page (`/scan`) is where the real-time object detection happens:

- **Live Camera Feed**: Access device camera or use demo video mode
- **Real-time Detection**: COCO-SSD model detects bottles, cups, and utensils in real-time
- **Visual Overlay**: Detection boxes and labels appear over detected objects
- **Municipality Selector**: Dropdown to switch between municipalities during scanning
- **Capture Button**: "Capture & Anonymize" button to capture the current frame
- **Face Blurring**: Automatic face detection and blurring on capture using BlazeFace
- **Performance Optimized**: Detection throttled to every 8 frames for smooth performance

**Key Features:**
- 🎥 Live video stream from camera or demo assets
- 🔍 Real-time object detection overlay
- 👤 Automatic face anonymization on capture
- 🏛️ Municipality selection during scanning
- 📊 Detection counter showing current counts

<img width="2056" height="1329" alt="sop-object-detection-tfjs-camera-tracking" src="https://github.com/user-attachments/assets/296e810d-56bc-4ffc-b22c-10c1851cb0fd" />

### ✅ After Capturing

After capturing an image, the review and save workflow begins:

- **Review Page**: Navigate to `/review` to see the captured image
- **Image Display**: View the captured image with detected objects
- **Count Adjustment**: Use counter pills to adjust object counts (bottles, cups, utensils)
- **Fill Gauge**: Adjust the fill percentage using the visual gauge slider
- **Municipality Info**: See which municipality the inspection is for
- **Validation**: Zod schema validation before saving
- **Save to IndexedDB**: Persist inspection data locally
- **Poster Generation**: Option to generate a PNG poster for the inspection

**Review Features:**
- ✏️ Adjustable object counts with counter pills
- 📊 Visual fill percentage gauge
- 💾 Save inspection to local storage
- 🎨 Generate poster PNG
- ✅ Data validation before saving

<img width="629" height="815" alt="sop-object-detection-tfjs-after-capturing" src="https://github.com/user-attachments/assets/53e523fb-b986-49a1-86a4-dc50a0260d10" />

### 🎬 Demo Mode

Navigate to `/scan?demo=1` to use sample video instead of camera (useful for testing without camera access).

### 🏛️ Municipality Selection

The app supports multiple municipalities for showcasing multi-tenant capabilities:

- **Homepage**: Click any municipality card to start scanning for that municipality
- **Scan Page**: Use the dropdown selector to switch municipalities
- **Query Parameter**: Use `?m={municipalityId}` to set municipality directly

**Supported Municipalities:**
- 🏖️ Miami (demo-miami) - Miami-Dade County coastal areas
- 🌴 Hallandale Beach (demo-hallandale) - Broward County beachfront
- 🏝️ Key Biscayne (demo-key-biscayne) - Island municipality
- 🚤 Fort Lauderdale (demo-fort-lauderdale) - Venice of America
- 🏛️ Miami Beach (demo-miami-beach) - Art Deco Historic District
- 🌳 Coral Gables (demo-coral-gables) - The City Beautiful

All inspections are tagged with their municipality ID for filtering and reporting.

### ⚙️ Admin Panel

Navigate to `/admin` to:
- 👀 View all saved inspections
- 📥 Export CSV of all inspections
- 🖼️ Download poster PNG for each inspection

## 💻 Development

For detailed development information, see the [Development Guide](./docs/DEVELOPMENT.md).

**Quick Overview:**
- 📝 **Structured Logging**: Comprehensive logging system with LogViewer component
- 💾 **Memory Monitoring**: DevHUD shows TensorFlow backend, tensor count, and memory usage
- 🔍 **Memory Leak Detection**: Utility functions for tracking memory usage
- 🛠️ **Development Tools**: TypeScript, ESLint, and debugging utilities

**Quick Commands:**
```bash
npm run dev          # Start development server
npm run lint         # Run ESLint
npm test             # Run unit tests
npm run test:e2e     # Run E2E tests
```

## 🧪 Testing

For complete testing documentation, see the [Testing Guide](./docs/TESTING.md).

**Test Coverage:**
- ✅ **6 Unit Tests**: Math utilities, CSV export, image processing, canvas operations
- ✅ **6 E2E Tests**: Complete workflows, municipality selection, CSV export, poster download, error handling
- ✅ **Total: 12 Tests** across the test suite

**Quick Commands:**
```bash
npm test             # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:e2e:ui  # Run E2E tests with UI
```

## ⚠️ Known Limitations & 🔧 Troubleshooting

For detailed troubleshooting and known limitations, see the [Troubleshooting Guide](./docs/TROUBLESHOOTING.md).

**Quick Reference:**
- 📱 **iOS Camera**: Requires HTTPS and user gesture
- 💾 **Storage Limits**: Safari has ~50MB IndexedDB limit
- ⏱️ **Model Loading**: First load takes 5-10 seconds (cached after)
- 👤 **Face Detection**: May miss side profiles or occluded faces
- 🔍 **Detection Accuracy**: Small/distant objects may be missed

**Common Issues:**
- 🎮 WebGL not available → Automatically falls back to WASM
- 📷 Camera not working → Check HTTPS and permissions, try demo mode
- 💾 Memory leaks → Monitor DevHUD, ensure TF ops in `tf.tidy()`
- 🤖 Models not loading → Check network, CDN availability

## 📁 Project Structure

```
src/
  app/              # Next.js pages
  components/       # React components
  lib/             # Core logic
    ai/            # Model loaders
    persistence/   # Storage utilities
    utils/dev/     # Dev tools
tests/
  unit/            # Unit tests
  e2e/             # E2E tests
public/
  tfjs/            # WASM binaries (required)
  samples/         # Demo assets (optional)
docs/              # Documentation
  agents/          # Agent prompts and handoff docs
```

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

### 📖 Core Documentation
- 🏗️ **[Architecture](./docs/ARCHITECTURE.md)** - System architecture and design decisions
- 📊 **[Data Model](./docs/DATA_MODEL.md)** - Complete data model with entity relationships and mermaid diagrams
- 🎨 **[Design System](./docs/DESIGN_SYSTEM.md)** - UI components, colors, typography, and design tokens
- 🖼️ **[Visual Design Plan](./docs/VISUAL_DESIGN_PLAN.md)** - Visual design specifications and implementation details
- ✅ **[Design Implementation Summary](./docs/DESIGN_IMPLEMENTATION_SUMMARY.md)** - Summary of design implementation work

### 🛠️ Development Documentation
- 💻 **[Development Guide](./docs/DEVELOPMENT.md)** - Development setup, tools, logging, and memory monitoring
- 🧪 **[Testing Guide](./docs/TESTING.md)** - Testing approach, coverage, and how to run tests
- 🔧 **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues, known limitations, and solutions
- 📝 **[Logging](./docs/LOGGING.md)** - Structured logging system documentation
- 🧩 **[shadcn/ui Setup](./docs/SHADCN_SETUP.md)** - shadcn/ui component library setup and configuration

### 🤖 Agent Documentation
- 📋 **[Agent Prompts](./docs/agents/AGENT_PROMPTS.md)** - Overview of all agent prompts and current status
- 🤝 **[Agent Handoff](./docs/agents/AGENT_HANDOFF.md)** - Protocol for agent handoffs and collaboration
- 🔧 **[Agent A Prompt](./docs/agents/AGENT_A_PROMPT.md)** - Bootstrapping & Infrastructure
- 🎥 **[Agent B Prompt](./docs/agents/AGENT_B_PROMPT.md)** - TensorFlow & Camera
- 💾 **[Agent C Prompt](./docs/agents/AGENT_C_PROMPT.md)** - Review & Data Management
- 🎨 **[Agent D Prompt](./docs/agents/AGENT_D_PROMPT.md)** - Poster & Polish
- 🧪 **[Agent E Prompt](./docs/agents/AGENT_E_PROMPT.md)** - Testing & CI

## 📄 License

MIT
