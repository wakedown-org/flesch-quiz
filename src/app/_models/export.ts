import { User } from './user';
import { Answer } from './answer';

export class Export {
    public users: User[];
    public answers: Answer[];

    constructor(values: { users?: User[], answers?: Answer[] } = {}) {
        Object.keys(values).forEach((prop) => {
            if (values[prop] !== null) {
                this[prop] = values[prop];
            }
        });
    }
}