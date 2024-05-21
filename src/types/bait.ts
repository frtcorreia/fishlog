export interface CreateBaitDto {
  bait: string;
  rod: string;
  technique: string;
}

export interface UpdateBaitDto {
  bait?: string;
  rod?: string;
  technique?: string;
}

export interface BaitDto {
  id: number;
  bait: string;
  rod: string;
  technique: string;
}
