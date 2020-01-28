export class User {
    public id: number;
    public name: string = '';
    public email: string = '';
    public telefone: string = '';
    public completed: boolean = false;

    constructor(values: { id?: number, name?: string, email?: string, telefone?: string, completed?: boolean } = {}) {
        Object.keys(values).forEach((prop) => {
            if (values[prop] !== null) {
                this[prop] = values[prop];
            }
        });
    }
}