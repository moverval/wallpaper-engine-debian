export default class TypeWriter {
    updateElement: HTMLElement;
    running: boolean = true;

    onendtexting: (event?: string) => void = null;
    onendremoving: () => void = null;
    onbeginremoving: () => void = null;
    onbegintexting: () => void = null;

    constructor(element: HTMLElement) {
        this.updateElement = element;
    }

    private update(text: string, num: number): void {
        this.updateElement.innerText = text.substr(0, num);
    }

    writeOut(text: string, msUpdate: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let count = 0;
            this.callEvent(this.onbegintexting);
            const id = setInterval(() => {
                ++count;
                this.update(text, count);
                if(count === text.length) {
                    clearInterval(id);
                    this.callEvent(this.onendtexting, text);
                    return resolve();
                }
            }, msUpdate);
        });
    }

    writeReverse(text: string, msUpdate: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let count = text.length;
            this.callEvent(this.onbeginremoving);
            const id = setInterval(() => {
                --count;
                this.update(text, count);
                if(count === 0) {
                    clearInterval(id);
                    this.callEvent(this.onendremoving);
                    return resolve();
                }
            }, msUpdate);
        });
    }

    writeIteration(text: string, waitTimeWritten: number, msUpdate: number, eraseMultiplier: number): Promise<void> {
        return new Promise((resolve) => this.writeOut(text, msUpdate).then(() =>
            setTimeout(() => this.writeReverse(text, msUpdate * eraseMultiplier).then(() => resolve()), waitTimeWritten)));
    }

    writeTextRandom(text: string[], waitTime: number, waitTimeWritten: number, msUpdate: number, eraseMultiplier: number = 0.5, count: number = -1): void {
        let c: number = count;
        while(c === count) c = Math.floor(Math.random() * text.length);
        if(this.running) {
            setTimeout(() => this.writeIteration(text[c], waitTimeWritten, msUpdate, eraseMultiplier).then(() =>
                this.writeTextRandom(text, waitTime, waitTimeWritten, msUpdate, eraseMultiplier, c)), waitTime);
        }
    }

    writeText(text: string[], waitTime: number, waitTimeWritten: number, msUpdate: number, eraseMultiplier: number = 0.5, count: number = 0) {
        if(count >= text.length) {
            count = 0;
        }
        if(this.running) {
            setTimeout(() => this.writeIteration(text[count], waitTimeWritten, msUpdate, eraseMultiplier).then(() => {
                this.writeText(text, waitTime, waitTimeWritten, msUpdate, eraseMultiplier, count + 1);
            }), waitTime);
        }
    }

    callEvent(func: (event?: string|number) => void, param?: string|number) {
        if(func) {
            func(param);
        }
    }

};