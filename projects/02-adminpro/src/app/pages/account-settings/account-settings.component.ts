import { Component } from '@angular/core';
import { getUrlTheme } from '../../helpers/get-url-theme';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
    `
      .selector {
        cursor: pointer;
        color: #fff !important;
        font-weight: 600;
        padding-right: 4px;

        text-align: right;
      }
      .selector:before {
        top: unset !important;
        left: unset !important;
        line-height: 75px !important;
        right: 4px;
        text-align: right !important;
      }
    `,
  ],
})
export class AccountSettingsComponent {
  // ANCHOR : Variables
  private _linkTheme = document.querySelector('#theme');
  private _links!: NodeListOf<Element>;

  // ANCHOR: Constructor

  ngOnInit(): void {
    this._links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  // ANCHOR : Métodos
  public changeTheme(theme: string): void {
    const urlTheme = getUrlTheme(theme);
    this._linkTheme?.setAttribute('href', urlTheme);
    localStorage.setItem('theme', urlTheme);
    this.checkCurrentTheme();
  }

  public checkCurrentTheme(): void {
    this._links.forEach((element) => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme')!;
      const btnThemeUrl = getUrlTheme(btnTheme);
      const currentTheme = this._linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) element.classList.add('working');
    });
  }
}
