export interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface CountryProviders {
  link: string;
  free?: Provider[];
  rent?: Provider[];
  ads?: Provider[];
  buy?: Provider[];
  flatrate?: Provider[];
}

export interface Providers {
  id: number;
  results: Record<string, CountryProviders>;
}
