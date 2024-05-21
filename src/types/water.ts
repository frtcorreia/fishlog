export interface CreateWaterDto {
  visibility: number;
  color: string;
}

export interface UpdateWaterDto {
  visibility?: number;
  color?: string;
}

export interface WaterDto {
  id: number;
  visibility: number;
  color: string;
}
