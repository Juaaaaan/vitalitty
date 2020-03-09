import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { KeyValueModel } from '../../providers/ui/ui.models';

/**
 * Generated class for the WritterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'writter',
  templateUrl: 'writter.html'
})
export class WritterComponent {

  @Input() model: KeyValueModel;
  @Input() value: any;
  @Input() type: string;
  @Input('info-label') infoLabel: string = '';


  // UI Vars
  public valueToWrite: string;
  public valueType: string;
  public valueTypeArgs: string;



  // *******************************************
  // LIFECYCLE Methods
  // *******************************************
  constructor() { }


  ngOnInit() {
    this.setValues();
  }


  ngOnChanges() {
    this.setValues();
  }





  // *******************************************
  // DATA Methods
  // *******************************************
  private setValues() {
    const type = (this.model ? this.model.type : this.type);
    const typeSplitted = type ? type.split('_') : undefined;

    this.valueToWrite = this.model ? this.model.value : this.value;

    if (typeSplitted) {
      this.valueType = typeSplitted[0];
      this.valueTypeArgs = typeSplitted[1];

      if (this.valueType === 'number') {
        if (this.valueTypeArgs) {
          this.valueTypeArgs = '1.' + this.valueTypeArgs[0] + '-' + this.valueTypeArgs[0];
        } else {
          this.valueTypeArgs = '1.0-0';
        }
      }
    } else {
      this.valueType = undefined;
      this.valueTypeArgs = undefined;
    }
  }

}
