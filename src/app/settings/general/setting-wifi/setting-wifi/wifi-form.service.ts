import {Injectable} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class WifiFormService {

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  createWifiForm(wifi?) {
    const wifiForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      pass: [null, [Validators.required, Validators.minLength(3)]]
    });
    if (wifi) wifiForm.patchValue(wifi);
    return wifiForm;
  }

}
