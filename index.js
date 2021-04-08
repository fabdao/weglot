

import { parseFileIntoWeeklyObject, reduceIntersecWeek,sortWeekByAscStartTime, writeResult } from './src/fileParser.js';
import { findTimeSlot } from './src/findTimeSlot.js';
import { convertObjectToTimeSlot } from "./src/timeConverter.js";
import {  createInterface } from 'readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

let indexFile = 1;

rl.question('Witch input file do you wanna read ? (number between 1 and 5 expected...)\n', (answer) => {
    console.warn(`If output${answer}.txt already exist in the data/generated folder, your PC will explose... Mouhahahahaha...`);
    indexFile = Number(answer);

    parseFileIntoWeeklyObject(indexFile).then(data => {

        console.log(data);

        let parsedWeek = reduceIntersecWeek(data);
        let timeSlot = findTimeSlot(parsedWeek);

        writeResult(indexFile, timeSlot.foundDay + ' ' + convertObjectToTimeSlot(timeSlot.foundTimeSlot))
        .then(() =>{
            console.log(timeSlot.foundDay + ' ' + convertObjectToTimeSlot(timeSlot.foundTimeSlot))
        });
    });

    rl.close();
});



