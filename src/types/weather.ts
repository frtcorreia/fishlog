export interface CreateWeatherDto {
  pressure: number;
  temperature: number;
  skyCoverage: string;
}

export interface UpdateWeatherDto {
  pressure?: number;
  temperature?: number;
  skyCoverage?: string;
}

export interface WeatherDto {
  id: number;
  pressure: number;
  temperature: number;
  skyCoverage: string;
}
