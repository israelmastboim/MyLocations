import { createFeatureSelector, ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromCategory from "./category.reducer";

export const reducers: ActionReducerMap<any> = {
  category: fromCategory.categoryReducer
};

export const selectCategoryState = createFeatureSelector<fromCategory.State>("category");

export const { selectAll: selectAllCategories } = fromCategory.categoryAdapter.getSelectors(
    selectCategoryState
);

export const selectCategoryById = (id: string) => createSelector(
  selectCategoryState,
  (state) => state.entities[id]
);

export const selectCurrentCategory = createSelector(
  selectCategoryState,
  (state) => state.currentCategory
);