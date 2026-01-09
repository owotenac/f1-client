import { ConstructorsStandingProps } from '@/model/constructors-standing-model';
import axios from 'axios';
import { formatInTimeZone } from 'date-fns-tz';
import { DriverProps } from '../model/driver-model';
import { DriversStandingProps } from '../model/drivers-standing-model';
import { RaceProps } from '../model/race-model';
import { SessionResultProps } from '../model/session-result-model';
import { SessionProps } from './../model/session-model';

export class OpenF1API {

  static api = axios.create({
    //baseURL: 'http://127.0.0.1:5001',
    baseURL: 'https://f1-server.vercel.app/',
    timeout: 8000,
    });

    static getDrivers = async()  => {
        const { data } = await OpenF1API.api.get('/v1/drivers',{
            params: {
                meeting_key: '1276',
                session_key: '9839'
            }
        });
        //console.log(data)
        return data as DriverProps[];
    };

    static getDriversWithSession = async(session: SessionProps)  => {
        const { data } = await OpenF1API.api.get('/v1/drivers',{
            params: {
                session_key: session.session_key
            }
        });
        return data as DriverProps[];
    };

    static getRaces = async(season: string)  => {
        const { data } = await OpenF1API.api.get('/v1/meetings',{
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

    static getSessions = async(race: RaceProps)  => {
        const { data } = await OpenF1API.api.get('/v1/sessions',{
            params: {
                year: race.year,
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

    static getSessionResult = async(session: SessionProps)  => {
        const { data } = await OpenF1API.api.get('/v1/session_result',{
            params: {
                year: session.year,
                meeting_key: session.meeting_key,
                session_key: session.session_key
            }
        });
        return data as SessionResultProps[];
    };

    static getDriversStanding = async()  => {
        const { data } = await OpenF1API.api.get('/v1/drivers_standing',{
            params: {
                year: '2025'
            }
        });
        return data['DriverStandings'] as DriversStandingProps[];
    };


    static getConstructorsStanding = async()  => {
        const { data } = await OpenF1API.api.get('/v1/constructors_standing',{
            params: {
                year: '2025'
            }
        });
        return data['ConstructorStandings'] as ConstructorsStandingProps[];
    }

}

