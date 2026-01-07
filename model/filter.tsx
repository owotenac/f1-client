import { create } from "zustand";
import { RaceProps } from "./race-model";
import { SessionProps } from "./session-model";

type FilterState = {
    currentRace: RaceProps;
    setCurrentRace: (race: RaceProps) => void;

    currentSession: SessionProps;
    setCurrentSession: (session: SessionProps) => void;
}

export const useAppStore = create<FilterState>((set) => ({
    currentRace: {} as RaceProps,
    setCurrentRace: (_race: RaceProps) => set({ currentRace: _race }),
    
    currentSession: {} as SessionProps,
    setCurrentSession: (_session: SessionProps) => set({ currentSession: _session  }),
}))