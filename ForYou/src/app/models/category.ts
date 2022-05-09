export class Category {
    name: string = '';
    id: string = '';
    icon: any = '';

    constructor(category: any) {
        this.name = category.name;
        this.id = category.id;
        this.icon = category.icon;
    }
}
