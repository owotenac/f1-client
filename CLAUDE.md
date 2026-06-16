# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **SectorF1**, a React Native mobile app built with Expo 55 that displays Formula 1 race schedules, session results, and championship standings. It consumes data from a separate F1 backend server.

## Development Commands

```bash
# Start development server
npx expo start

# Platform-specific
npx expo start --android
npx expo start --ios
npx expo start --web

# Lint
npx expo lint

# Build preview (Android)
npx expo-doctor
eas build --platform android --profile preview
```

## Architecture

### Navigation Structure (expo-router)
- `app/_layout.tsx` - Root Stack navigator with custom fonts and theme
- `app/(tabs)/` - Bottom tab navigation (Home, Races, Standings)
- `app/race-details.tsx` - Race session list (navigated from race cards)
- `app/race-results.tsx` - Session results (navigated from session cards)

### Shared Module (Git Submodule)
The `shared/` directory is a Git submodule containing code shared across projects:
- `shared/f1/models/` - TypeScript types for F1 data (RaceProps, SessionProps, DriverProps, etc.)
- `shared/f1/constants/theme.ts` - Color constants (BG_THEME, CARD_THEME, RED_THEME)
- `shared/f1/constants/config.ts` - API base URLs, current season
- `shared/f1/services/openf1api.ts` - Axios-based API client class
- `shared/f1/components/` - Shared F1 components (race-card)

### State Management
- Zustand store at `model/filter.tsx` (`useAppStore`) manages current race/session selection for navigation between screens

### API Layer
`OpenF1API` class in `shared/f1/services/openf1api.ts`:
- Uses axios with 15s timeout and error interceptor
- Web platform uses local backend (`localhost:5001`), native uses production Railway URL
- Key endpoints: getRaces, getSessions, getSessionResult, getDriversStanding, getConstructorsStanding, getLastRace, getNextRace

### Component Patterns
- UI components in `components/` (driver-card, session-card, standings, etc.)
- Skeleton loaders in `components/squeleton/` for loading states
- Custom fonts: `f1-bold`, `f1-regular`, `f1-wide` (currently mapped to Audiowide)

### Path Alias
`@/` maps to project root (configured in tsconfig.json)
