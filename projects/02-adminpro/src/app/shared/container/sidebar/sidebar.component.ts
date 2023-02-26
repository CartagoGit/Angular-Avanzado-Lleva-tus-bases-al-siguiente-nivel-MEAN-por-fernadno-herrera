import { Component } from '@angular/core';
import { SidebarService } from '../../services/settings/sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  public menuItems: any[];
  constructor(private _sidebarSvc: SidebarService) {
    this.menuItems = this._sidebarSvc.menu;
  }
}
