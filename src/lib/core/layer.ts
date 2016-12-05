export class MangolLayer {

    name: string;
    layer: any;
    opacity: number;
    visible: boolean;

    constructor(options: any) {
        this.name = options.name;
        this.layer = options.layer;

        let opacity = options.hasOwnProperty('opacity') ? options.opacity : 1.0;
        this.setOpacity(opacity);

        let visible = options.hasOwnProperty('visible') ? options.visible : true;
        this.setVisible(visible);
    }

    public getName(): string {
        return this.name;
    }

    public getLayer(): any {
        return this.layer;
    }

    public getOpacity(): number {
        return this.opacity;
    }

    public setOpacity(value: number): void {
        this.opacity = value;
        this.layer.setOpacity(value);
    }

    public getVisible(): boolean {
        return this.visible;
    }

    public setVisible(value: boolean): void {
        this.visible = value;
        this.layer.setVisible(value);
    }

}
