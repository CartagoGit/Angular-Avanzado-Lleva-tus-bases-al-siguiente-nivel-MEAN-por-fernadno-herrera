import { Component } from '@angular/core';

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

  // ANCHOR : Métodos
  public changeTheme(theme: string): void {
    const urlTheme = `./assets/css/colors/${theme}.css`;
    this._linkTheme?.setAttribute('href', urlTheme);
    localStorage.setItem('theme', urlTheme);
  }
}
