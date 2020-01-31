export class Answer {
    public id: number;
    public userId: number;
    public questionIdx: number;
    public exatas: number = 0;
    public biologicas: number = 0;
    public saude: number = 0;
    public humanas: number = 0;
    public artes: number = 0;
    public comunicacao: number = 0;

    constructor(values: { 
        id?: number, 
        userId?: number, 
        questionIdx?: number, 
        exatas?: number, 
        biologicas?: number, 
        saude?: number, 
        humanas?: number, 
        artes?: number,
        comunicacao?: number
    }) {
        Object.keys(values).forEach((prop) => {
            if (values[prop] !== null) {
                this[prop] = values[prop];
            }
        })
    }
}