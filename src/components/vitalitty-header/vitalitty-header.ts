import { Component, OnInit, HostListener, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { UserHeaderViewModel } from './../vitalitty-logged-user/viewModel';
import { KeyValueModelWithPage } from '../../app/app.component';

/**
 * Generated class for the VitalittyHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'vitalitty-header',
  templateUrl: 'vitalitty-header.html'
})
export class VitalittyHeaderComponent implements OnInit, AfterViewInit {

  text: string;

  // UI Vars
  public isWeb: boolean = false;
  public showMenuOptions: boolean = true;

  @Input() logo: string;
  @Input() userInfo: UserHeaderViewModel;
  @Input() options: KeyValueModelWithPage[];
  @Output() optionClicked: EventEmitter<KeyValueModelWithPage> = new EventEmitter<KeyValueModelWithPage>();
  @Output() menuOpenedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() logoClicked: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('menuOpenedReference') menuOpenedReference: ElementRef;
  @ViewChild('hamburgerReference') hamburgerReference: ElementRef;

  public menuRevealed: boolean = false;
  private emitOnceAfterResize: any = null;

  // Resize event
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizing();
  }

  // Document click event
  @HostListener('document:click', ['$event'])
  clickout(event) {

    // Only if is mobile(not showing menu options) and is logged(userInfo) we need 3 conditions (not clicked on the opened menu / not click on the burger (cause it has another click) / the menu has class reveal) So only is valid the click outside menu and burger
    if (!this.showMenuOptions && this.userInfo) {
      const conditionBurger: boolean = !this.hamburgerReference.nativeElement.contains(event.target);
      const conditionMenu: boolean = !this.menuOpenedReference.nativeElement.contains(event.target);
      const withClassReveal: boolean = this.menuOpenedReference.nativeElement.classList.contains('reveal');

      if (conditionBurger && conditionMenu && withClassReveal) {
        this.revealMenu();
      }
    }
  }

  constructor() {
    console.log('Hello VitalittyHeaderComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Consider show menu or not when page loads
    this.resizing();
  }

  resizing() {
    if (window.innerWidth > 480) {
      // In small screen if the menu is open, and we resize we have to emit false to the father to apply left 0 again (ONLY ONCE not every pixel resized)
      if (this.emitOnceAfterResize !== false) {
        this.emitOnceAfterResize = false;
        this.menuOpenedEmitter.emit(false);
      } else {
        this.emitOnceAfterResize = null;
      }
      this.showMenuOptions = true;
    } else {
      this.showMenuOptions = false;
    }
  }

  showPopOver() {
    console.log('flag');
    // const myPopover = this.popover.create(PopoverComponent, { options: this.options }, { cssClass: 'small-popover' });
    // myPopover.present({ ev: event });

    // myPopover.onDidDismiss((optionSelected: KeyValueModelWithPage) => {
    //   if (optionSelected) {
    //     this.emitOption(optionSelected);
    //   }
    // });
  }


  public revealMenu() {
    this.menuRevealed = !this.menuRevealed;
    if (!this.showMenuOptions) {
      // Only if small screen we emit false to father so can apply 60% left to move the ion-nav
      this.menuOpenedEmitter.emit(this.menuRevealed);
    }
  }

  goToPageFromMenu(optionSelected: KeyValueModelWithPage) {
    if (optionSelected) {
      this.emitOption(optionSelected);
    }
  }

  emitOption(optionSelected: KeyValueModelWithPage) {
    this.optionClicked.emit(optionSelected);
  }


  emitLogoClicked() {
    this.logoClicked.emit(true);
  }


}
