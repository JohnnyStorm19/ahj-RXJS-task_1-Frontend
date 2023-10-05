import { ajax } from "rxjs/ajax";
import { map, catchError, interval, of, switchMap } from "rxjs";
import { intervalTime } from "./globals";

export default class WidgetAPI {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }
  getUnreadMessages() {
    return interval(intervalTime).pipe(
      switchMap(() => ajax.getJSON(this.apiUrl + "/messages/unread")),
      map((response) => {
        if (!response.success) {
          console.log("Новых сообщений нет");
        }
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.log("error: ", error);
        return of(error);
      }),
    );
  }
}