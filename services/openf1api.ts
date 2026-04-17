import { ConstructorsStandingProps } from '@/model/constructors-standing-model';
import axios from 'axios';
import { formatInTimeZone } from 'date-fns-tz';
import { Platform } from "react-native";
import { DriversStandingProps } from '../model/drivers-standing-model';
import { RaceProps } from '../model/race-model';
import { SessionResultProps } from '../model/session-result-model';
import { SessionProps } from './../model/session-model';

export const BASE_URL_BACKEND = 'https://f1-server.vercel.app/'
export const BASE_URL_BACKEND_LOCAL = 'http://127.0.0.1:5001'


const getBaseURL = () => {
    if (Platform.OS === 'android') {
        return BASE_URL_BACKEND;
    }
    if (Platform.OS === 'web') {
        return BASE_URL_BACKEND_LOCAL
    }
    // iOS or other platforms
    return BASE_URL_BACKEND;
};

export class OpenF1API {

    static api = axios.create({
        baseURL: getBaseURL(),
        //baseURL: '',
        timeout: 8000,
    });

    static getRaces = async (season: string) => {
        const { data } = await OpenF1API.api.get('api/v1/meetings', {
            params: {
                year: season
            }
        });

        const tempData = data as RaceProps[];
        // Map to add display_date
        const racesWithDisplayDate = tempData.map(r => ({
            ...r,
            display_date: new Date(r.date_start).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })
        }));
        return racesWithDisplayDate as RaceProps[];
    };

    static getSessions = async (race: RaceProps) => {
        const { data } = await OpenF1API.api.get('api/v1/sessions', {
            params: {
                meeting_key: race.meeting_key
            }
        });

        const tempData = data as SessionProps[];
        // Map to add display_date
        const racesWithDisplayDate = tempData.map(r => ({
            ...r,
            display_date: new Date(r.date_start).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }),
            local_start_time: formatInTimeZone(new Date(r.date_start), 'Europe/Paris', 'HH:mm')

        }));
        return racesWithDisplayDate as SessionProps[];
    };

    static getSessionResult = async (session: SessionProps) => {
        try {
            const { data } = await OpenF1API.api.get('api/v1/session_result', {
                params: {
                    meeting_key: session.meeting_key,
                    session_key: session.session_key
                }
            });
            return data['results'] as SessionResultProps[];

        } catch (error: any) {
            if (error.response) {
                const status = error.response.status
                const message = error.response.data?.error || 'Erreur inconnue du serveur'
                throw new Error(`Erreur ${status} : ${message}`)
            }
            throw new Error(`Erreur réseau : ${error.message}`)
        }
    };

    static getDriversStanding = async () => {
        const { data } = await OpenF1API.api.get('api/v1/drivers_standing', {
            params: {
                year: '2026'
            }
        });
        return data['DriverStandings'] as DriversStandingProps[];
    };


    static getConstructorsStanding = async () => {
        const { data } = await OpenF1API.api.get('api/v1/constructors_standing', {
            params: {
                year: '2026'
            }
        });
        return data['ConstructorStandings'] as ConstructorsStandingProps[];
    }

    static getLastRace = async () => {
        const { data } = await OpenF1API.api.get('api/v1/getLastResults');

        const race = data['Race'] as RaceProps
        const session_result = data['Results']['results'] as SessionResultProps[]

        return { race, session_result };
    }
    static getNextRace = async () => {
        const { data } = await OpenF1API.api.get('api/v1/getNextGP');
        const _race = data['next_gp'] as RaceProps
        _race.display_date = new Date(_race.date_start).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
        return _race;
    }
}

