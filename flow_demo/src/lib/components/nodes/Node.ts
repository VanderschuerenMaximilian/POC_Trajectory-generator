export default class NodeOptions {
    colors = {
        trajectory: 'rgba(0, 150, 0, 0.75)',
        phase: 'crimson',
        event: '#62caed',
        step: 'hotpink',
        option: 'orange',
        datapoint: '#f3ee09'
    }
    
    handleColors = {
        trajectory: 'rgba(0, 150, 0, 0.75)',
        phase: 'rgba(140, 20, 60)',
        event: 'rgba(75, 75, 255, 0.75)',
        step: 'rgba(230, 105, 180, 0.9)',
        option: '#ff8500',
        datapoint: '#e3e309'
    }

    capatalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }  
}