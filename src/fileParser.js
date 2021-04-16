import { convertTimeSlotToObject } from './timeConverter.js';
import { promises as fs } from 'fs';

// Parse input file into an timeStamped object
/*
    Human readable version ( e.g )
    {
        '1': [ '08:45-12:59', '14:45-14:47' ],
        '2': [ '08:24-10:54' ]
    }
    Final TimeStamped expected output
    {
      '1': [ { start: 31500, end: 46740 }, { start: 53100, end: 53220 } ],
      '2': [ { start: 30240, end: 39240 } ]
    }
*/

export async function parseFileIntoWeeklyObject(indexFile)
{
    const data = await fs.readFile('./data/provided/inputs/input'+indexFile+'.txt', 'utf8');

    let week = {
        1 : [],
        2 : [],
        3 : [],
        4 : [],
        5 : []
    };

    let splitted = data.toString().split("\n");

    for (let i = 0; i < splitted.length; i++)
    {
        let splitLine = splitted[i].split(" ");

        //Human readable ( e.g )
        //week[splitLine[0]].push(splitLine[1].trim());

        //Timestamped output
        week[splitLine[0]].push(convertTimeSlotToObject(splitLine[1].trim()));
    }

    return week;
}

//Sort ascending time slots by start time for each days
export function sortWeekByAscStartTime(pWeek)
{
    for (let iDay = 1; iDay <= 5; iDay++)
    {
        pWeek[iDay].sort((a, b) => a.start - b.start);
    }
    return pWeek;
}

export async function writeResult (indexFile, result)
{
    const data = fs.writeFile('./data/generated/output'+indexFile+'.txt', result);
}
