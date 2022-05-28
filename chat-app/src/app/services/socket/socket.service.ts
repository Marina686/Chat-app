import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 

import { environment } from './../../../environments/environment';

/* importing interfaces starts */
import { Auth } from './../../interfaces/auth';
import { ChatListResponse } from './../../interfaces/chat-list-response';
import { MessageSocketEvent } from './../../interfaces/message-socket-event';
import { Message } from './../../interfaces/message'; 
import { io } from 'socket.io-client';
/* importing interfaces ends */

@Injectable({
	providedIn: 'root'
})
export class SocketService {

	private BASE_URL = environment.socketUrl;
	private socket:any;

	constructor() { }

	/*
	* Method to connect the users to socket
	*/
	connectSocket(userId: string): void {
		this.socket = io(this.BASE_URL +  `userId=${userId}` );
	}

 	/*
	* Method to emit the logout event.
	*/
	logout(userId: { userId: string}): Observable<Auth> {
		this.socket.emit('logout', userId);
		return new Observable(observer => {
			this.socket.on('logout-response', (data: Auth) => {
				observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			};
		});
	}

 	/*
	* Method to receive chat-list-response event.
	*/
	getChatList(userId: string ): Observable<ChatListResponse> {
		if (userId !== null) {
			this.socket.emit('chat-list', { userId: userId });
		}
		return new Observable(observer => {
			this.socket.on('chat-list-response', (data: ChatListResponse) => {
				observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			};
		});
	}

  	/*
	* Method to emit the add-messages event.
	*/
	sendMessage(message: MessageSocketEvent): void {
		this.socket.emit('add-message', message);
	}

  	/*
	* Method to receive add-message-response event.
	*/
	receiveMessages(): Observable<Message> {
		return new Observable(observer => {
			this.socket.on('add-message-response', (data:any) => {
				observer.next(data);
			});

			return () => {
				this.socket.disconnect();
			};
		});
	}
}
