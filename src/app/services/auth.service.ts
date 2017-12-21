import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor() { }

    public authenticated(): boolean {
        return false;
    }

}
