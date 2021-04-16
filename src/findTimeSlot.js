
export function findTimeSlot(pWeek)
{
    let foundDay = null;
    let foundTimeSlot = null;
    let latestEnd = 28800;

    for (let iDay = 1; iDay <= 5; iDay++)
    {
        if (pWeek[iDay].length !== 0)
        {
            //First slot available if first meeting start after 09H00
            if (pWeek[iDay][0].start >= (28800 + 3600) )
            {
                foundDay = iDay;
                foundTimeSlot = { start: 28800, end: (28800 + 3600) }
                return { foundDay, foundTimeSlot};
            }
            else latestEnd = pWeek[iDay][0].end;

            //If not we check after the first early meeting
            for (let yStart = 0; yStart < pWeek[iDay].length; yStart++)
            {
                if (pWeek[iDay][yStart].start >= latestEnd )
                {
                    if ((pWeek[iDay][yStart].start - latestEnd) >= 3600 )
                    {
                        foundDay = iDay;
                        foundTimeSlot = { start: latestEnd, end: (latestEnd + 3600) };
                        return { foundDay, foundTimeSlot};
                    }
                    if (pWeek[iDay][yStart].end > latestEnd ) latestEnd = pWeek[iDay][yStart].end;
                }
            }
        }
        latestEnd = 28800;
    }
    return { foundDay, foundTimeSlot};
}
