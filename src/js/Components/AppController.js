import WidgetApp from './WidgetApp';
import WidgetAPI from './WidgetAPI';
import { apiUrl, intervalTime } from './globals';

import { interval } from 'rxjs';


export default class AppController {
    constructor(container) {
        this.widgetApi = new WidgetAPI(apiUrl);
        this.widgetApp = new WidgetApp(container);

        this.widgetApp.init();
    }

    async recieveUnreadMessages() {
        const stream$ = await this.widgetApi.requestUnreadMessages();
        stream$.subscribe(response => {
            this.widgetApp.createMessage(response);
        })
    }

    intervalFunc() {
        const interval$ = interval(intervalTime);
        interval$.subscribe( () => {
            this.recieveUnreadMessages();
        })
    }
}