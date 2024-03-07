export default class NodeCustomization {
    capatalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }  

    assignKeyboardFeatures(id: string, element: HTMLDivElement, fitView: Function) {
        element.addEventListener('click', (event: any) => {
            if (event?.altKey) {
                this.zoomIn(id, fitView);
            }
        });
    }

    zoomIn(id:string, fitView: Function) {
        fitView({ nodes: [{ id: id }], duration: 600, padding: 1 })
    }
}