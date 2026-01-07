import { DriverProps } from "./driver-model";

export type SessionResultProps = {
    position: number,
    driver_number: number,
    number_of_laps: number,
    dnf: boolean,
    dns: boolean,
    dsq: boolean,
    duration: number[],
    gap_to_leader: number[],
    meeting_key: number,
    session_key: number
    driver_info: DriverProps
}