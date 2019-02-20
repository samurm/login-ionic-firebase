import { REGEXP } from '../constants/user.constant';

export class User {
    private _username: string;
    private _email: string;
    public uid: string;

    constructor(username, email, password1, password2) {
        this.username = username;
        this.email = email;
        this.checkSamePassword(password1, password2);
    }

    get username() {
        return this._username;
    }

    set username(newUsername) {
        if (!REGEXP.USERNAME.test(newUsername)) {
            throw ({FIELD: 'Usuario', MESSAGE: 'mínimo 6 carácteres, solo números y letras'});
        }
        this._username = newUsername;
    }

    get email() {
        return this._email;
    }

    set email(newEmail) {
        if (!REGEXP.EMAIL.test(newEmail)) {
            throw ({FIELD: 'Email', MESSAGE: 'fomato inválido'});
        }
        this._email = newEmail;
    }

    checkSamePassword(password1, password2) {
        if (password1 !== password2) {
            throw ({FIELD: 'Contraseña', MESSAGE: 'debe tener la misma palabra que la otra contraseña'});
        }
    }

}
