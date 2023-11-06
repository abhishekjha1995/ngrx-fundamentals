import { Component } from '@angular/core';
import { FormGroupState, NGRX_UPDATE_ON_TYPE } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MyGroup } from './reducer/app.reducer';
import { resetForm } from './reducer/app.action';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="formState$ | async as formState">
      <form novalidate [ngrxFormState]="formState">
        <div class="form-element">
          <label>Login</label>
          <input
            id="username"
            type="text"
            [ngrxFormControlState]="formState.controls.username"
            [ngrxUpdateOn]="updateOn"
          />
        </div>
        <div class="form-element">
          <label>Password</label>
          <input
            id="password"
            type="password"
            [ngrxFormControlState]="formState.controls.password"
          />
        </div>
        <div class="form-element">
          <button (click)="reset()">Reset</button>
        </div>
      </form>
    </ng-container>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formState$: Observable<FormGroupState<MyGroup>>;
  updateOn = NGRX_UPDATE_ON_TYPE.BLUR;

  constructor(private store: Store<{ myForm: FormGroupState<MyGroup> }>) {
    this.formState$ = store.select(({ myForm }) => myForm);
  }

  reset() {
    this.store.dispatch(resetForm());
  }
}
