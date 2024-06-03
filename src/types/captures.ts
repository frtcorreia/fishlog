import { CreateBaitDto } from "./bait";
import { CreateLocationDto } from "./location";
import { CreateWaterDto } from "./water";
import { CreateWeatherDto } from "./weather";

export interface CreateCaptureDto {
  weight: number | null;
  size: number | null;
  photo: string | null;
  date: string | null;
  time: string | null;
  location: CreateLocationDto;
  weather: CreateWeatherDto;
  water: CreateWaterDto;
  bait: CreateBaitDto;
  userId: number;
  description: string | null;
}

export interface UpdateCaptureDto {
  weight: number | null;
  size: number | null;
  photo: string | null;
  date: string | null;
  time: string | null;
  locationId?: number;
  weatherId?: number;
  waterId?: number;
  baitId?: number;
  userId?: number;
  description: string | null;
}

export interface CaptureDto {
  id: number;
  weight: number | null;
  size: number | null;
  photo: string | null;
  date: string | null;
  time: string | null;
  locationId?: number;
  weatherId?: number;
  waterId?: number;
  baitId?: number;
  userId: number;
  description: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
