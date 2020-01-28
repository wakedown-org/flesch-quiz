export class Answer {
    public id: number;
    public userId: number;
    public questionIdx: number;
    public exatas: number = 0;
    public biologicas: number = 0;
    public engenhariatecnologia: number = 0;
    public saude: number = 0;
    public agrarias: number = 0;
    public sociais: number = 0;
    public humanas: number = 0;
    public linguistica: number = 0;
    public letras: number = 0;
    public artes: number = 0;

    constructor(values: { 
        id?: number, 
        userId?: number, 
        questionIdx?: number, 
        exatas?: number, 
        biologicas?: number, 
        engenhariatecnologia?: number, 
        saude?: number, 
        agrarias?: number, 
        sociais?: number, 
        humanas?: number, 
        linguistica?: number, 
        letras?: number, 
        artes?: number 
    }) {
        Object.keys(values).forEach((prop) => {
            if (values[prop] !== null) {
                this[prop] = values[prop];
            }
        })
    }
}