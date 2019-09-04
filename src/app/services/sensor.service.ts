import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ReplaySubject} from 'rxjs';
// http requests
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from 'src/app/services/http-error-handler.service';
import {catchError} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

import {Detector, Sensor} from 'src/app/interfaces/interfaces';
import {ConfirmDialogService} from '../confirm-dialog/confirm-dialog.service';

const httpOptions = {headers: new HttpHeaders({})};

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private handleError: HandleError;
  sensors: Sensor[];
  sensorsChanged: ReplaySubject<Sensor[]> = new ReplaySubject<Sensor[]>();
  sensorsRaw: Sensor[];
  sensorsRawChanged: ReplaySubject<Sensor[]> = new ReplaySubject<Sensor[]>();
  detectorOptions: Detector[] = [];

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private confirmDialogService: ConfirmDialogService,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('ChamberService');
    this.buildDetectorOptions();
    this.getSensors();
  }

  // ============================================= helpers ================================================
  /**
   * Copy values for a selected detector to a rule
   * @param rule is populated with the current detector from the service
   */
  refreshSensor(rule): void {
    for (const detectorOption of this.detectorOptions) {
      if (detectorOption['detectorId'] === rule['detectorId']) {
        Object.entries(detectorOption).forEach(
          ([key, value]) => {
            rule[key] = value;
          }
        );
      }
    }
  }

  filterDetectors = (types): Detector[] => {
    if (!this.detectorOptions) return [];
    return this.detectorOptions.filter(detector => {
      return types.some(type => detector.type === type);
    });
  };

  private buildDetectorOptions(): void {
    this.sensorsChanged.subscribe((sensors: Sensor[]) => {
      sensors.forEach(sensor => {
        sensor.detectors.forEach(detector => {
          // if the sensor has more than one detector, make it appear as two or more separate sensors
          this.detectorOptions.push(<Detector>{
            'sensor': {'_id': sensor._id},
            'model': sensor.model,
            'label': detector.label,
            'type': detector.type,
            'detectorName': detector.name,
            'detectorId': detector._id,
            'forDetector': detector.type
          });
        });
      });
    });
  }

  // ============================================= CRUD ================================================
  // get sensors registered in the system
  getSensors() {
    const url = environment.endpointBase + environment.endpoints.getSensors;
    return this.http.post(url, {}, httpOptions).pipe(
      catchError(this.handleError('getSensors', []))
    ).subscribe((sensors: Sensor[]) => {
      this.sensors = sensors;
      this.sensorsChanged.next(sensors);
    });
  }

  // basic sensor information
  getSensorsRaw(filter = {}, options = {}) {
    const url = environment.endpointBase + environment.endpoints.getSensorsRaw;
    const data = {
      filter: filter,
      options: options
    };
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError('getSensorsRaw', []))
    ).subscribe((sensors: Sensor[]) => {
      this.sensorsRaw = sensors;
      this.sensorsRawChanged.next(sensors);
    });
  }

  updateSensorTimeUnit(sensorId, newTimeUnit) {
    const url = environment.endpointBase + environment.endpoints.updateSensorTimeUnit;
    const data = {
      sensorId: sensorId,
      newTimeUnit: newTimeUnit
    };
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError('updateSensorTimeUnit', []))
    );
  }

  updateDetectorName(detectorId, newDetectorName) {
    const url = environment.endpointBase + environment.endpoints.updateDetectorName;
    const data = {
      detectorId: detectorId,
      newDetectorName: newDetectorName
    };
    console.log('sensor service upd detector name', data, this.http);
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError('updateDetectorName', false))
    ).subscribe(() => {
      this.sensors = this.sensors.map((sensor) => {
        sensor.detectors.map((detector) => {
          if (detector._id === detectorId) {
            detector.name = newDetectorName;
            console.log('chg name');
          }
          return detector;
        });
        return sensor;
      });
      this.sensorsChanged.next(this.sensors);
    });
  }

  upsertSensor(sensor) {
    const url = environment.endpointBase + environment.endpoints.upsertSensor;
    const data = {
      sensor: sensor
    };
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError('updateSensorTimeUnit', false))
    );
  }

  removeSensor = (sensorId) => {
    this.confirmDialogService.confirm('Do you really want to delete this sensor?', 'Please choose:')
      .then((confirmed) => {
        if (confirmed) {
          const url = environment.endpointBase + environment.endpoints.removeSensor + '/' + sensorId;
          return this.http.delete(url).pipe(
            catchError(this.handleError('removeSensor', false))
          ).subscribe((success) => {
            if (success) this.getSensors();
          });
        } else {
          console.log('User dismissed reset');
        }
      })
      .catch(() => console.log('User dismissed reset'));
  };

  broadcastSensors() {
    const url = environment.endpointBase + environment.endpoints.broadcastSensors;
    return this.http.get(url).pipe(
      catchError(this.handleError('broadcastSensors', false))
    );
  }

  fillWithDummy(sensor) {
    return sensor;
  }

}
