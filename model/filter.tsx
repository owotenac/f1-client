import { SessionResultProps } from "@/shared/f1/models/session-result-model";
import { create } from "zustand";
import { RaceProps } from "../shared/f1/models/race-model";
import { SessionProps } from "../shared/f1/models/session-model";

type FilterState = {
    currentRace: RaceProps;
    setCurrentRace: (race: RaceProps) => void;

    currentSession: SessionProps;
    setCurrentSession: (session: SessionProps) => void;

    currentSessionResults: SessionResultProps[];
    setCurrentSessionResults: (session_result: SessionResultProps[]) => void;
}

export const useAppStore = create<FilterState>((set) => ({
    currentRace: {} as RaceProps,
    setCurrentRace: (_race: RaceProps) => set({ currentRace: _race }),

    currentSession: {} as SessionProps,
    setCurrentSession: (_session: SessionProps) => set({ currentSession: _session }),

    currentSessionResults: [] as SessionResultProps[],
    setCurrentSessionResults: (_session_result: SessionResultProps[]) => set({ currentSessionResults: _session_result }),
}))