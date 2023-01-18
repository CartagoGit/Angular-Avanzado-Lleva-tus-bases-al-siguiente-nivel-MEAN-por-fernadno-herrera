import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent {
  public actualYear = new Date().getFullYear();
  private _urlTheme = document.querySelector('#theme');

  // ANCHOR : Constructor
  ngOnInit(): void {
    this._urlTheme?.setAttribute('href', localStorage.getItem('theme') || '');
  }
}
