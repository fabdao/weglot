console.log('Hello Weglot !');

import { parseFileIntoWeeklyObject, sortWeekByAscStartTime, writeResult } from './src/fileParser.js';
import { findTimeSlot } from './src/findTimeSlot.js';
import { convertObjectToTimeSlot } from "./src/timeConverter.js";

let indexFile = 1;

const name = prompt('What is your name?');
console.log(`Hey there ${name}`);

parseFileIntoWeeklyObject(indexFile).then(data => {

    let parsedWeek = sortWeekByAscStartTime(data);
    let timeSlot = findTimeSlot(parsedWeek);

    console.log(timeSlot.foundDay + ' ' + convertObjectToTimeSlot(timeSlot.foundTimeSlot))
    writeResult(indexFile, timeSlot.foundDay + ' ' + convertObjectToTimeSlot(timeSlot.foundTimeSlot));
});
