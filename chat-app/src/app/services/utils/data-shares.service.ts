import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from './../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
   userId: string ='';
	 userName: string  = '';
	private user = new BehaviorSubject(null);
	selectedUser: any  = null;
     

	constructor() { }

	changeSelectedUser(message: User) {
		//this.user.next(message) ;
	}

	getUserId(): string {
		if (this.userId  === '') {
			this.userId = localStorage.getItem('userid') || '{}';
		}
		return this.userId;
	}

	getUserName(): string {
		if (this.userName === '') {
			this.userName = localStorage.getItem('username') || '{}';
		}
		return this.userName;
	}
}
