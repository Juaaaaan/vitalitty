import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { KeyValueModel } from '../ui/ui.models';

/*
  Generated class for the FormHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FormHelperProvider implements OnDestroy {

  // Form Var
  private formGroup: FormGroup;


  // Data Vars
  private errorsMap: Map<string, KeyValueModel[]>;
  private formInnerValue: any = {};
  private formErrors: Map<string, string> = new Map<string, string>();


  // Handler Vars
  private errorHandler: Function;
  private submitHandler: Function;


  constructor() {

  }


  ngOnDestroy() {
    this.formGroup = null;
    this.errorsMap = null;
    this.errorHandler = null;
  }




  // *******************************************
  // FORM Methods
  // *******************************************
  public setFieldValidators(field: string, valids: ValidatorFn[]) {
    if (!valids || valids.length === 0) {
      this.formGroup.controls[field].clearValidators();
    } else {
      this.formGroup.controls[field].setValidators(valids);
    }
    this.update(field);
  }


  public setFieldValue(field: string, value: any) {
    if (!value || value === '') {
      this.formGroup.controls[field].setValue('');
    } else {
      this.formGroup.controls[field].setValue(value);
    }
    this.update(field);
  }


  public setField(field: string, value: string, valids?: ValidatorFn[]) {
    if (!valids) {
      this.formGroup.controls[field].clearValidators();
    } else {
      const validators: ValidatorFn[] = [Validators.required];

      if (valids.length > 0) {
        validators.push(...valids);
      }

      this.formGroup.controls[field].setValidators(validators);
    }
    if (value) {
      this.formGroup.controls[field].setValue(value !== 'clean' ? value : '');
    }
    this.formGroup.controls[field].updateValueAndValidity();
  }



  public checkErrors(fields?: string[]) {
    const fieldsToCheck = fields ? fields : Object.keys(this.formGroup.controls);
    const controlsToCheck: AbstractControl[] = fieldsToCheck.map(f => this.formGroup.controls[f]);

    if (this.errorsMap) {
      controlsToCheck.forEach((control, index) => {
        if (control.errors) {
          for (const error in control.errors) {
            if (error) {
              if (this.errorsMap.has(fieldsToCheck[index]) && this.errorsMap.get(fieldsToCheck[index]) && !!this.errorsMap.get(fieldsToCheck[index]).find(err => err.key === error)) {
                this.formErrors.set(fieldsToCheck[index], this.errorsMap.get(fieldsToCheck[index]).find(err => err.key === error).value);
              }
            }
          }
        } else {
          this.formErrors.delete(fieldsToCheck[index]);
        }
      });


      if (this.errorHandler) {
        this.errorHandler(this.formErrors);
      }

      return this.formErrors;
    } else {
      return null;
    }
  }




  // *******************************************
  // SUPPORT Methods
  // *******************************************
  private update(field?: string) {
    if (field) {
      this.formGroup.controls[field].updateValueAndValidity();
    } else {
      this.formGroup.updateValueAndValidity();
    }
  }





  // *******************************************
  // SETTER / GETTER Methods
  // *******************************************
  public setFormGroup(form: FormGroup, errors?: Map<string, KeyValueModel[]>, submitHandler?: Function) {
    this.formGroup = form;
    this.errorsMap = errors;
    this.formInnerValue = form.value;
    this.submitHandler = submitHandler;

    this.formGroup.valueChanges.subscribe(
      (value) => {
        if (this.errorHandler) {
          const fieldsChanged = Object.keys(this.formInnerValue).filter(k => this.formInnerValue[k] !== value[k]);
          this.checkErrors(fieldsChanged);
        }
        this.formInnerValue = value;
      }
    );
  }


  public getFormGroup(): FormGroup {
    return this.formGroup;
  }


  public subscribeErrors(handler: Function) {
    this.errorHandler = handler;
  }


  public getErrorsSubscription(): Function {
    return this.errorHandler;
  }


  public submit(extraCondition: boolean = true) {
    if (this.formGroup.valid && extraCondition && !!this.submitHandler) {
      this.submitHandler();
    }
  }
}
