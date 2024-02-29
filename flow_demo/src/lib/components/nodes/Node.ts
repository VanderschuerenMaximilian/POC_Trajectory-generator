export default class NodeOptions {
    colors = {
        trajectory: 'rgba(0, 150, 0, 0.75)',
        phase: 'crimson',
        event: '#62caed',
        step: 'hotpink',
        option: '',
        datapoint: ''
    }
    
    handleColors = {
        trajectory: 'rgba(0, 150, 0, 0.75)',
        phase: 'rgba(140, 20, 60)',
        event: 'rgba(75, 75, 255, 0.75)',
        step: 'rgba(230, 105, 180, 0.9)',
        option: '',
        datapoint: ''
    }

    capatalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }  
}