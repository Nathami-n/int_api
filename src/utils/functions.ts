import {format} from 'date-fns';
import {v4 as uuid} from 'uuid';
import fs from 'fs';
import path from 'path';

const {mkdir, appendFile} = fs.promises;

export const logger = (message: string, filename: string) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\t HH:mm:ss')}`;
    const item = `${uuid()}\t ${dateTime}\t ${message}`

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await 
        }
    }
}