import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManageToolbarService } from '../../services/manage-toolbar.service';
import { IToolbar } from '../../interfaces/itoolbar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit, OnDestroy {
  toolbarObject: IToolbar;
  toolbarSubscription: Subscription;
  constructor(private manageToolbarService: ManageToolbarService) { }

  ngOnInit(): void {
    this.toolbarSubscription = this.manageToolbarService.getToolbarObject()
    .subscribe ((toolbarObject: IToolbar) => this.toolbarObject = toolbarObject);
  }

  ngOnDestroy(): void {
    this.toolbarSubscription.unsubscribe();
  }

}
