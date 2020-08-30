import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RouterEvent, ActivatedRoute } from '@angular/router';
import { CategoryMode } from '../enums/category.mode';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { IToolbar } from '../interfaces/itoolbar';
import { Store, select } from '@ngrx/store';
import { selectCurrentCategory } from '../store/reducers';



@Injectable({
  providedIn: 'root'
})
export class ManageToolbarService {
  private mode: CategoryMode;
  private categoryInContext: string = '';
  private actions: Array<any>; 

  private subject: BehaviorSubject<IToolbar>;
  constructor(private router: Router,private route: ActivatedRoute, private store$: Store<any>) {
    this.setActionObject();
    this.subject = new BehaviorSubject<IToolbar>({title: 'Categories', actions: [this.actions[CategoryMode.Add]]});
    this.listenToRouter();
    this.store$.pipe(
      select(selectCurrentCategory))
      .subscribe((categoryInContext: string) => {
        this.categoryInContext = categoryInContext; 
        this.setActionObject();
        this.manageCategoryMode(this.mode)});  
   }

  listenToRouter() {
    this.router.events.subscribe((eve: RouterEvent) => {
      if (eve instanceof NavigationEnd) {
        let child = this.route;
        while (child.firstChild) {
          if (child.firstChild) {
            child = child.firstChild;
          } 
        } 
        this.mode = child.snapshot.data.mode;
        this.manageCategoryMode(this.mode);    
      } 
  });
  }

  manageCategoryMode(mode: CategoryMode) {
    let actionsCopy = Array.from(this.actions);
    switch (mode) {
      case (CategoryMode.Add):        
        this.sendToolbarObject({title: 'Add Category', actions: [this.actions[CategoryMode.ViewList]]});
      break;
      case (CategoryMode.View):
        actionsCopy.splice(CategoryMode.View, 1);
        this.sendToolbarObject({title: 'View Category', actions: actionsCopy});
      break;
      case (CategoryMode.ViewList):
        if (this.categoryInContext) {
          actionsCopy.splice(CategoryMode.ViewList, 1);
          this.sendToolbarObject({title: 'Categories', actions: actionsCopy});
        }
        else {
          this.sendToolbarObject({title: 'Categories', actions: [this.actions[CategoryMode.Add]]});
        }        
      break;
      case (CategoryMode.Edit):
        actionsCopy.splice(CategoryMode.Edit, 1);
        this.sendToolbarObject({title: 'Edit Category', actions: actionsCopy});
      break;
      case (CategoryMode.Delete):
        actionsCopy.splice(CategoryMode.Delete, 1);
        this.sendToolbarObject({title: 'Delete Category', actions: actionsCopy});
      break;
      default:
      break;
  }
  }

  sendToolbarObject(toolbarObject: IToolbar) {
      this.subject.next(toolbarObject);
  }

  getToolbarObject(): Observable<IToolbar> {
      return this.subject.asObservable();
  }


  setActionObject() {
    this.actions = [{title: 'Add', link: '/category/add', icon: 'add_circal'},
    {title: 'View',link: '/category/view/' + this.categoryInContext , icon: 'remove_red_eye'},
     {title: 'List',link: '/category', icon: 'list'},
     {title: 'Edit',link: '/category/edit/' + this.categoryInContext, icon: 'edit'},
     {title: 'Delete', link: '/category/delete/'+ this.categoryInContext, icon: 'delete'}];
  }
}
