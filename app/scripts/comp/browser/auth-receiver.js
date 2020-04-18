import { Features } from 'util/features';

const AuthReceiver = {
    receive() {
        if (!Features.isPopup) {
            return false;
        }
        const opener = window.opener || window.parent;
        const message = this.urlArgsToMessage(window.location.href);
        const hasKeys = Object.keys(message).filter(key => key !== 'config').length > 0;
        if (!hasKeys) {
            return false;
        }
        opener.postMessage(message, window.location.origin);
        window.close();
        return true;
    },

    urlArgsToMessage(url) {
        const message = {};
        url.split(/[?#&]/g).forEach(part => {
            const parts = part.split('=');
            if (parts.length === 2) {
                message[parts[0]] = decodeURIComponent(parts[1]);
            }
        });
        return message;
    }
};

export { AuthReceiver };
