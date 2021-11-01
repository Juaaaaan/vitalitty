import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DateValidator {


    public static validateMinAge(minAge: number): ValidatorFn | null {
        let thisControl: AbstractControl;

        return function validate(control: AbstractControl) {
            const ageMillis = 3600 * 24 * 1000 * 365 * minAge + 345600000;
            const value: Date = new Date(control.value);

            if (!thisControl) {
                thisControl = control;
            }


            if (!!value) {
                if (((new Date()).getTime() - value.getTime() - ageMillis) >= 0) {
                    return null;
                } else {
                    return { minAge: true };
                }
            } else {
                return { minAge: true };
            }
        };
    }

}

