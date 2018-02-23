import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { FriendService } from '../../../services/friend.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public user: User = new User();
    public friends: Array<User> = [];

    public addingFriends: boolean = false;
    public searched: boolean = false;

    public loading: boolean = false;

    constructor(private _authService: AuthService,
                private _friendService: FriendService) { }

    ngOnInit() {
        this.getUser();
        this.getFriends();
    }

    private getUser(): void {
        this._authService.getUser().subscribe(response => {
            response.data.join_date = new Date(response.data.join_date);
            this.user = response.data;
        });
    }

    private getFriends(): void {
        this.loading = true;
        this._friendService.getFriends().subscribe(response => {
            this.friends = response.data;
            this.loading = false;
        });
    }

    public addFriends(): void {
        this.addingFriends = true;
    }

    public searchEmail(): void {
        this.searched = true;
    }


}
