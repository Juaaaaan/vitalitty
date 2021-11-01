import { Component, OnInit, ViewChild, Renderer2, Input } from '@angular/core';

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit{

  private openAccordion: boolean = false;
  public isActive: boolean = false;

  @Input() text_title: string;
  @Input() text_description: string;
  @Input() optional_text: string;
  @Input() optional_text_2: string;


  @ViewChild('first') cardContent: any;


  constructor(public renderer: Renderer2) {
  }

  ngOnInit():void {
    this.renderer.setStyle(this.cardContent.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.cardContent.nativeElement, 'webkitTransition', 'max-height 500ms, padding 500ms')
  }


  public toggleAction(isClicked:boolean) {
    if (this.openAccordion) {
      if (isClicked) {
        this.openAccordion = false;
        this.isActive = false;
        this.renderer.setStyle(this.cardContent.nativeElement, 'display', 'none');
      }
    } else {
      if (isClicked) {
        this.openAccordion = true;
        this.isActive = true;
        this.renderer.setStyle(this.cardContent.nativeElement, 'max-height', '500px');
        this.renderer.removeStyle(this.cardContent.nativeElement, 'display');
      }
    }
  }

}
