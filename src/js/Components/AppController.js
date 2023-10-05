import WidgetApp from './WidgetApp';
import WidgetAPI from './WidgetAPI';
import { apiUrl } from './globals';

import { map } from 'rxjs';


export default class AppController {
    constructor(container) {
        this.widgetApi = new WidgetAPI(apiUrl);
        this.widgetApp = new WidgetApp(container);

        this.widgetApp.init();
    }

    recieveUnreadMessages() {
        const unreadMessages$ = this.widgetApi.getUnreadMessages();
        unreadMessages$.pipe(
            map(response => {
                this.widgetApp.createMessage(response);
            })
        ).subscribe(console.log('!!!'))
    }
}