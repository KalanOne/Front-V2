export type { DamageWearsResponse, DamageStatistic, WearStatistic, Provider };

interface DamageWearsResponse {
  damage: any[];
  damageStatistics: DamageStatistic[];
  providers: string[];
  wear: any;
  wearStatistics: WearStatistic[];
}

interface WearStatistic {
  wear: string;
  statistics: number;
  percent: number;
  providers: Provider[];
}

interface DamageStatistic {
  damage: string;
  statistics: number;
  percent: number;
  providers: Provider[];
}

interface Provider {
  provider: string;
  statistics: number;
  percent: number;
}
