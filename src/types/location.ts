export interface CreateLocationDto {
  latitude: number;
  longitude: number;
}

export interface UpdateLocationDto {
  latitude?: number;
  longitude?: number;
}

export interface LocationDto {
  id: number;
  latitude: number;
  longitude: number;
}
