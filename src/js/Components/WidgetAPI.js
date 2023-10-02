import { ajax } from 'rxjs/ajax';
import { map, catchError, of } from 'rxjs';

export default class WidgetAPI {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    // async add(message) {
    //   const request = fetch(this.apiUrl + '/messages/add', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify( { message: message } )
    //     })
    //     const result = await request;
    
    //     if (!result.ok) {
    //       console.error('Error');
    //       return;
    //     }
    //     const json = await result.json();

    //     return json;
    // }
    // async getUnreadMessages() {
    //   const request = await fetch(this.apiUrl + '/messages/unread');
    //   const result = await request.json();

    //   if (!result.success) {
    //     //* Нет непрочитанных сообщений
    //     console.log('Новых сообщений нет');
    //     return result;
    //   }
    //   console.log(result);
    //   return result
    // }

    // async getUnreadMessages() {
    //   const request$ = ajax.getJSON(this.apiUrl + '/messages/unread').pipe(
    //       map((response) =>{
    //         if (!response.success) {
    //           console.log('Новых сообщений нет');
    //         }
    //         console.log(response);
    //         return response;
    //       }),
    //       catchError(error => {
    //         console.log('error: ', error);
    //         return of(error);
    //       })
    //     )

    //   request$.subscribe({
    //     next: value => value,
    //     error: err => console.log(err)
    //   });
    // }

    async requestUnreadMessages() {
      return ajax.getJSON(this.apiUrl + '/messages/unread').pipe(
          map((response) =>{
            return response;
          }),
          catchError(error => {
            console.log('error: ', error);
            return of(error);
          })
        )
    }
}