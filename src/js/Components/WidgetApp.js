import '../../css/widgetApp.css';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';

export default class WidgetApp {
    constructor(parentEl) {
        this.parentEl = parentEl;
    }

    getWidgetMarkup() {
        return `
            <div class="widget-container">
                <h2 class="widget-title">Unread messages widget</h2>
                <span class="unread-messages-notification">Новые сообщения отсутствуют</span>
                <div class="unread-messages-container"></div>
            </div>
        `
    }

    getMessageMarkup(messageObj) {
        return `
            <div class="message-container">
                <label class="status-label">
                    <input type="checkbox" class="unread-status" checked/>
                    <span class="message-from">${messageObj.from}</span>
                    <span class="message-body">${messageObj.body}</span>
                    <span class="message-date">${messageObj.received}</span>
                </label>
            </div>
        `
    }

    init() {
        const widgetMarkup = this.getWidgetMarkup();
        this.parentEl.insertAdjacentHTML('afterbegin', widgetMarkup);

        this.widgetContainer = this.parentEl.querySelector('.widget-container');
        this.widgetTitle = this.parentEl.querySelector('.widget-title');
        this.unreadMessagesContainer = this.parentEl.querySelector('.unread-messages-container');
        this.notificationEl = this.parentEl.querySelector('.unread-messages-notification');
    }

    addListeners() {
        this.unreadMessagesContainer.addEventListener('change', this.onChange);
    }

    createMessage(response) {
        if (!response.success) {
            return;
        }
        const messagesArr = response.messages.messages;
        messagesArr.forEach(messageObj => {
            const from = messageObj.from;
            const body = this.substringMessageFrom(messageObj.body);
            const received = dayjs(messageObj.received).format('DD.MM.YYYY HH:mm');

            const messageMarkup = this.getMessageMarkup({from, body, received});
            this.unreadMessagesContainer.insertAdjacentHTML('afterbegin', messageMarkup);
        })
        this.unreadStatus = [...this.parentEl.querySelectorAll('.unread-status')];
        
        this.addListeners();
        this.createUnreadMessagesNotification(response.success);
    }

    createUnreadMessagesNotification(status) {
        const oldEl = this.widgetContainer.querySelector('.unread-messages-notification')
        // если элемент уже есть на странице - удаляем
        if (oldEl) {
            oldEl.remove();
        }

        if (status === false) {
            this.notificationEl.textContent = 'Новые сообщения отсутствуют'
        } else {
            this.notificationEl.textContent = 'У вас есть непрочитанные сообщения';
        }
        this.widgetTitle.after(this.notificationEl);
    }

    onChange = (e) => {
        const target = e.target;
        if (!target.classList.contains('unread-status')) {
            return;
        }

        this.changeFontWeight(target); 

        const isUnread = this.unreadStatus.some(box => box.checked === true);
        this.createUnreadMessagesNotification(isUnread);
    }

    changeFontWeight(targetEl) {
        const messageContainerEl = targetEl.closest('.message-container')
        messageContainerEl.classList.toggle('unchecked-message');
    }

    substringMessageFrom(str) {
        return str.length >= 15 ? str.substring(0, 15) + '...' : str;
    }
}