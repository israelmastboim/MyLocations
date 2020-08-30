import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";
import {ActionReducer, Action} from '@ngrx/store';

import * as categoryActions from "../actions/category.actions";
import { Category } from "../../models/category";
import { ReflectiveInjector } from "@angular/core";
import { PersistentStorageService } from "../../services/persistent-storage.service";

let injector = ReflectiveInjector.resolveAndCreate([PersistentStorageService]);
const persistentStorageService: PersistentStorageService =  injector.get(PersistentStorageService);


export interface State extends EntityState<Category> {
  currentCategory: any;
}

export const categoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialState: State = categoryAdapter.getInitialState({
  currentCategory: '',
  ids: persistentStorageService.getFromStorageByKey('categories') ? persistentStorageService.getFromStorageByKey('categories').ids : [],
  entities: persistentStorageService.getFromStorageByKey('categories') ? persistentStorageService.getFromStorageByKey('categories').entities : {},
});

export function categoryReducer(
  state: State = initialState,
  action: categoryActions.CategoryActions
) {
  switch (action.type) {
    case categoryActions.ADD_CATEGORY:
      console.log(state);
      return categoryAdapter.addOne(action.payload.category, state);
    case categoryActions.UPDATE_CATEGORY:
      return categoryAdapter.updateOne(
        { id: action.payload.id, changes: { name: action.payload.newCategory.name } },
        state
      );
    case categoryActions.DELETE_CATEGORY:
      return categoryAdapter.removeOne(action.payload.id, state);
    case categoryActions.UPDATE_CURRENT_CATEGORY:
      return Object.assign({}, state, {currentCategory: action.payload.id});
    default:
      return state;
  }
}

export function persistentStorageMetaReducer<S, A extends Action = Action> (reducer: ActionReducer<S, A>) {
  return function(state: S, action: A): S {
    const nextState = reducer(state, action);

    // @ts-ignore
    persistentStorageService.setToStorageByKey('categories', {ids: nextState.category.ids, entities: nextState.category.entities})
    return nextState;
  };
}