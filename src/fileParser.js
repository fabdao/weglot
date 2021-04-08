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
    let debug = 0;

    for (let iDay = 1; iDay <= 5; iDay++)
    {
        for (let yStart = 0; yStart < pWeek[iDay].length-1; yStart++)
        {
            if (pWeek[iDay][yStart].start > pWeek[iDay][yStart+1].start)
            {
                pWeek[iDay].unshift(pWeek[iDay].splice(yStart+1, 1)[0]);
                yStart = -1;
            }
            debug++;
            console.info(debug);
        }
    }
    return pWeek;
}

//Sort ascending time slots by start time for each days
export function reduceIntersecWeek(pWeek, pTokenExit = 0)
{
    let iWeek = {
        1 : [],
        2 : [],
        3 : [],
        4 : [],
        5 : []
    };

    let tokenExit = 0;

    for (let iDay = 1; iDay <= 5; iDay++)
    {
        if ( pWeek[iDay].length !== 0 )
        {
            for (let yStart = 0; yStart < pWeek[iDay].length; yStart++)
            {
                if ( iWeek[iDay].length === 0)
                {
                    iWeek[iDay].push(pWeek[iDay][yStart]);
                    tokenExit++;
                }
                else
                {
                    for (let zStart = 0; zStart < iWeek[iDay].length; zStart++)
                    {
                        //Longer
                        if (pWeek[iDay][yStart].start < iWeek[iDay][zStart].start && pWeek[iDay][yStart].end > iWeek[iDay][zStart].end)
                        {
                            iWeek[iDay][zStart] = pWeek[iDay][yStart];
                            pWeek[iDay].splice(yStart, 1);
                            zStart = 0;
                            tokenExit++;
                            break;
                        }

                        //Shorter
                        if (pWeek[iDay][yStart].start > iWeek[iDay][zStart].start && pWeek[iDay][yStart].end < iWeek[iDay][zStart].end)
                        {
                            pWeek[iDay].splice(yStart, 1);
                            zStart = 0;
                            tokenExit++;
                            break;
                        }

                        //Earlier
                        if (pWeek[iDay][yStart].start < iWeek[iDay][zStart].start && pWeek[iDay][yStart].end > iWeek[iDay][zStart].start)
                        {
                            iWeek[iDay][zStart].start = pWeek[iDay][yStart].start;
                            pWeek[iDay].splice(yStart, 1);
                            zStart = 0;
                            tokenExit++;
                            break;
                        }
                        //Later
                        if(pWeek[iDay][yStart].end > iWeek[iDay][zStart].end && pWeek[iDay][yStart].start < iWeek[iDay][zStart].end)
                        {
                            iWeek[iDay][zStart].end = pWeek[iDay][yStart].end;
                            pWeek[iDay].splice(yStart, 1);
                            zStart = 0;
                            tokenExit++;
                            break;
                        }

                        //New slot
                        if (( pWeek[iDay][yStart].start > iWeek[iDay][zStart].end || pWeek[iDay][yStart].end < iWeek[iDay][zStart].start ))
                        {
                            iWeek[iDay].push(pWeek[iDay].splice(yStart, 1)[0]);
                            yStart = 0;
                            zStart = 0;
                            tokenExit++;
                            break;
                        }
                    }
                }
            }
        }
    }

    if ( tokenExit === pTokenExit ) return iWeek;
    else return reduceIntersecWeek(iWeek, tokenExit);
}

export async function writeResult (indexFile, result)
{
    const data = fs.writeFile('./data/generated/output'+indexFile+'.txt', result);
}
