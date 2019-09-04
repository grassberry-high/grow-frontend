export interface Strain {
  name?: string;
  daysToHarvest?: number;
}

export interface Detector {
  _id?: string;
  detectorId?: string;
  forDetector?: string;
  sensor?: Sensor;
  name?: string; // TODO check duplicate of detectorName but maybe required for loading
  detectorName?: string;
  model?: string;
  label?: string;
  type?: string;
}

export interface Rule {
  _id?: string;
  device?: string;
  sensor?: Sensor;
  relay?: Relay;
  trigger?: string;
  detectorId?: string;
  forDetector?: string;
  startTime?: string;
  durationHOn?: string;
  durationMSOn?: string;
  durationMBlocked?: string;
  nightOff?: boolean;
  onValue?: string;
  offValue?: string;
  onPattern?: string;
}

export interface Chamber {
  _id?: string;
  strains?: Strain[];
  rules?: Rule[];
  cycle?: string;
}

export interface Sensor {
  _id?: string;
  technology?: string;
  model?: string;
  detectors?: Detector[];
}

export interface System {
  _id?: string;
  region?: string;
  units?: {
    temperature?: string;
  };
  __v?: number;
  timeZone?: string;
  lastConnect?: Date;
  licenses?: any;
  serial?: string;
}

export interface Relay {
  _id?: string;
  name?: string;
  address?: string;
  label?: string;
  __v?: string;
}

export interface DetectorOption {
  sensor?: Sensor;
  model?: string;
  label?: string;
  name?: string;
  type?: string;
  detectorName?: string;
  detectorId?: string;
  forDetector?: string;
}
