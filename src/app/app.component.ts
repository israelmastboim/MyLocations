import { Component } from '@angular/core';
import { ManageToolbarService } from './services/manage-toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myLocations';
  constructor(private toolbarService: ManageToolbarService) {

  }
}
