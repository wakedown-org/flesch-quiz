export class User {
    public id: number;
    public name: string = '';
    public email: string = '';
    public celular: string = '';
    public cidade: string = '';
    public instituicao: string = '';
    public curso: string = '';
    public aceitaTermos: boolean = true;
    public completed: boolean = false;

    constructor(values: { id?: number, name?: string, email?: string, celular?: string, cidade?: string, instituicao?: string, curso?: string, aceitaTermos?: boolean, completed?: boolean } = {}) {
        Object.keys(values).forEach((prop) => {
            if (values[prop] !== null) {
                this[prop] = values[prop];
            }
        });
    }
}