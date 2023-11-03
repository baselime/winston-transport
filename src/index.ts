import Transport from "winston-transport"
import Axios from 'axios';

type ClientOpts = {
    baselimeApiKey: string;
    service?: string;
    dataset?: string;
    namespace?: string;
}

function sendToBaselime(opts: ClientOpts, toSend: any[]) {
    return Axios.post(`https://events.baselime.io/v1/${opts.dataset}`, toSend, {
        headers: {
            'x-api-key': opts.baselimeApiKey,
            'x-service': opts.service,
            'x-namespace': opts.namespace,
        }
    });
}

export class BaselimeTransport extends Transport {
    options: ClientOpts;
    toSend: any[] = [];
    immediate: null | ReturnType<typeof setImmediate> = null;
    constructor(opts: any) {
        opts.dataset = opts.dataset || 'winston-logs';
        super(opts)
        this.options = opts;
    }

    log(info: any, callback: () => void) {
        this.toSend.push(info);
        if (!this.immediate) {
            this.immediate = setImmediate(() => {
                sendToBaselime(this.options, this.toSend).catch(console.error);
                this.toSend = [];
                this.immediate = null;
            });
        }
        callback();
    }

    async close() {
        if (this.toSend.length > 0) {
            clearImmediate(this.immediate);
            await sendToBaselime(this.options, this.toSend).catch(console.error);
        }
    }
}
