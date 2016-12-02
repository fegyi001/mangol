export class MangolLayergroup {

    name: string;
    children: any[];
    expanded: boolean;

    constructor(options: any) {
        this.name = options.name;
        this.children = [];
        this.expanded = options.hasOwnProperty('expanded') ? options.expanded : true;
    }

    public getName(): string {
        return this.name;
    }

    public getChildren(): any[] {
        return this.children;
    }

    public getExpanded(): boolean {
        return this.expanded;
    }

    public setExpanded(value: boolean): void {
        this.expanded = value;
    }
}
