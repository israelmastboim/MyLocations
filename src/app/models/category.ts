import { ICategory } from "../interfaces/icategory";
import { v4 as uuidv4 } from 'uuid';

export class Category {
    id: string;
    name: string;
    constructor(category : ICategory) {
        this.name = category.name;
        if (!category.hasOwnProperty('id')) {
            this.id = uuidv4();
        }
    }
}
