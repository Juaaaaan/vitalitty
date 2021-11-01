import { Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, ViewController } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';
import { KeyValueModel } from '../providers/ui/ui.models';
import { NavHelperProvider } from './../providers/ui/nav-helper';
import { VitalittyHeaderComponent } from '../components/vitalitty-header/vitalitty-header';
import { HeaderOption } from '../components/vitalitty-logged-user/vitalitty-logged-user';
import { UserHeaderViewModel } from './../components/vitalitty-logged-user/viewModel';
import { CheckEnvDirective } from '../directives/check-env/check-env';

export interface KeyValueModelWithPage extends KeyValueModel {
  page?: string;
}
@Component({
  template: `<ion-menu [content]="content" type="overlay">
  <ion-header>
    <ion-toolbar>
      <ion-title>Pages</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
        {{p.title}}
      </button>
    </ion-list>
  </ion-content>

</ion-menu>
<ion-nav #content [root]="rootPage"></ion-nav>`,
  // templateUrl: 'app.html',
  providers: [
    CheckEnvDirective,
    NavHelperProvider
  ]
})
export class MyApp {

  @ViewChild(Nav) navCtrl: Nav;
  @ViewChild('referenceHeader') referenceHeader: VitalittyHeaderComponent;
  public rootPage = FirstRunPage;

  public userHeader: UserHeaderViewModel;
  public headerOptions: HeaderOption[] = [];
  private parsedHeaderOptions: KeyValueModelWithPage[] = [];
  public logo: string = './assets/imgs/mapfre-logo.svg';
  public nonLoggedOptions: HeaderOption[] = [];
  public menuIsOpened: boolean = false;

  // Control Vars
  private currentPage: string;
  private isUserInactive: boolean = false;
  private loggoutInterval: number = 600000;


    // Hostlistener
    @HostListener('document:mousemove', ['$event'])
    checkUserMouseEvent(e) {
      if (e) {
        this.isUserInactive = false;
      }
    }
  pages: any[] = [

    { title: 'Welcome', component: 'WelcomePage' },
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Login', component: 'WelcomePage' },
    { title: 'Signup', component: 'SignupPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' }
  ]

  constructor(private translate: TranslateService,
    platform: Platform,
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private navHelper: NavHelperProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#f0f0f0');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  ngOnInit() {
    console.log(this.currentPage);
    // registerLocaleData(es);
    this.navHelper.setNavController(this.navCtrl);
    this.listenUserMenuChanges();
    this.listenNavChanges();
    this.checkAutoLogout();
  }

  // *******************************************
  // UI Methods
  // *******************************************
  private listenNavChanges() {
    this.navCtrl.viewWillEnter.subscribe((view: ViewController) => this.currentPage = view.name);
  }

  private listenUserMenuChanges() {
    this.headerOptions.unshift({ id: 'dashboard', name: 'ACIE_MENU_OPTIONS.PROFILE.DASHBOARD', page: 'DashboardPage' });
    this.headerOptions.unshift({ id: 'profile', name: 'ACIE_MENU_OPTIONS.PROFILE.PROFILE', page: 'MyProfilePage' });
    this.headerOptions.push({ id: 'logout', name: 'ACIE_MENU_OPTIONS.PROFILE.LOGOUT' });
    // this.user.userInfoChanges().subscribe(user => {
    //   this.populateNotLoggedOptions();

    //   if (user) {
    //     // this.userHeader = this.userParser.parseMenuUserHeader(user);
    //     if (user.role === 'legal-representative') {
    //       // this.headerOptions.unshift({ id: 'management', name: 'ACIE_MENU_OPTIONS.PROFILE.USERS_MANAGEMENT', page: 'UserManagementPage' });
    //     }

    //   } else {
    //     this.userHeader = undefined;
    //   }
    //   this.parsedHeaderOptions = this.headerOptions.map(opt => this.parseOptions(opt));
    //   this.orderOptions();
    // });
  }

  populateNotLoggedOptions() {
    this.headerOptions = [];
    this.headerOptions.push({ id: 'access', name: 'ACIE_MENU_OPTIONS.ACCESS', page: 'WelcomePage' });
    this.headerOptions.push({ id: 'questions', name: 'ACIE_MENU_OPTIONS.QUESTIONS', page: 'FaqPage' });
    this.headerOptions.push({ id: 'security', name: 'ACIE_MENU_OPTIONS.SECURITY', page: 'SecurityPage' });
  }

  orderOptions() {
    if (this.userHeader) {
      this.parsedHeaderOptions = this.parsedHeaderOptions.filter(o => o.key !== 'access');
    }
  }


  public optionClicked(option: KeyValueModelWithPage) {
    if (option.page !== this.currentPage) {
      if (option.key === 'dashboard') {
        this.navigateTo('DashboardPage', 'dashboard');
      } else if (option.key === 'logout') {
        // this.auth.logOut();
        this.navigateTo('WelcomePage', 'rootPage');
      } else {
        this.navigateTo(option.page, 'page');
      }
    }

    // Close menu after go to page only if doesnt show menu options(small screen)
    if (!this.referenceHeader.showMenuOptions) {
      this.referenceHeader.revealMenu();
    }
  }

  public menuOpened(menuOpen: boolean) {
    menuOpen ? this.menuIsOpened = true : this.menuIsOpened = false;
  }


  public headerLogoClicked() {
    const page = 'WelcomePage';

    if (page !== this.currentPage) {
      this.navigateTo(page, 'dashboard');
    }
  }


  // *******************************************
  // SUPPORT Methods
  // *******************************************
  private navigateTo(nav: string, type: string) {
    switch (type) {
      case 'link': return this.navHelper.goToLink(nav);
      case 'page': return this.navHelper.push(nav);
      case 'rootPage': return this.currentPage !== nav ? this.navHelper.popToPage(nav) : null;
      case 'dashboard': return this.navHelper.popToPage(nav);
    }
  }


  private parseOptions(option: HeaderOption): KeyValueModelWithPage {
    const parsedOption = <KeyValueModelWithPage>{};

    parsedOption.key = option.id;
    parsedOption.value = option.name;
    parsedOption.page = option.page;

    return parsedOption;
  }


  private checkAutoLogout() {
    setInterval(() => {
      // if (this.auth.isLoggedIn() && this.isUserInactive) {
      //   this.auth.logOut();
      //   this.alert.showAlert({ title: this.translate.instant('ACIE_MENU_OPTIONS.SESION_EXPIRED_TITLE'), message: this.translate.instant('ACIE_MENU_OPTIONS.SESION_EXPIRED_SUBTITLE') });
      //   this.navigateTo('WelcomePage', 'rootPage');
      // }
      this.isUserInactive = true;
    }, this.loggoutInterval);
    this.isUserInactive = true;
  }


  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('es');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('es'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }
}
