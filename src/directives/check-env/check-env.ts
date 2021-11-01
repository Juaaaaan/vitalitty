import { Directive, Input, ElementRef, OnInit, Injectable, Renderer2 } from '@angular/core';
import { Platform } from 'ionic-angular';





@Directive({
  selector: '[checkenv]' // Attribute selector
})
@Injectable()
export class CheckEnvDirective implements OnInit {

  // UI Vars
  @Input() checkenv: string;


  // *******************************************
  // LIFECYCLE Methods
  // *******************************************
  constructor(private platform: Platform, private renderer: Renderer2, private element: ElementRef) { }


  ngOnInit() {
    const classes: string[] = this.checkEnvironment().split('_');
    classes.forEach(c => this.renderer.addClass(this.element.nativeElement, c));
  }



  // *******************************************
  // Check different environments
  // *******************************************
  checkEnvironment(): string {
    let environment: string = '';

    if (this.checkenv) {
      environment = environment + this.checkenv;
    } else {
      if (this.platform.is('cordova')) {
        environment = environment + 'web';
        if (this.platform.is('ios')) {
          environment = environment + '_ios';
        }
        if (this.platform.is('android')) {
          environment = environment + '_android';
        }
      } else {
        environment = environment + 'web';
        if (/msie\s|trident\/|edge\//i.test(window.navigator.userAgent)) {
          environment = environment + '_ie';
          if (window.navigator.userAgent.indexOf('Edge/') > -1) {
            environment = environment + '_edge';
          }
        }
      }
    }
    return environment;
  }
}
