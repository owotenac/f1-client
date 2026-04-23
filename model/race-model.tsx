export type FastestLapProps = {
	year: string
	time: string
	driver: string
}

export type RaceProps = {
	meeting_key: number
	meeting_code: string
	meeting_name: string
	meeting_official_name: string
	circuit_key: number,
	circuit_short_name: string
	circuit_image: string
	location: string
	country_key: number
	country_code: string
	country_name: string
	country_flag: string
	gmt_offset: string
	date_start: string
	year: number
	display_date: string
	pictureURL: string
	circuit_length_km: number
	number_of_laps: number
	race_distance_km: number
	number_of_corners: number
	fastest_lap: FastestLapProps
};

