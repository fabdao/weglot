
// Convert a hour-time into a second-stamp : '08:00' > '28800'
export function convertTimeToSecondStamp(sTime, pInclusive  )
{
    let includeMinute = pInclusive ? 60 : 0;
    let splitTime = sTime.split(":");
    return splitTime[0]*3600 + splitTime[1]*60 + includeMinute;
}

// Convert a second-stamp into a hour-time : '28800' > '08:00'
export function convertSecondStampToTime(sStamp, pInclusive)
{
    let excludeMinute = pInclusive ? 60 : 0;
    let hours = (sStamp - excludeMinute) / 3600;
    let minutes = ((sStamp - excludeMinute) % 3600) / 60;
    return Math.trunc(hours).toString().padStart(2,'0') + ':' + minutes.toString().padStart(2,'0');
}

// Convert a time-slot into a second-stamp object : '08:00-17:59' > { start: 28800, end: 64740 }
export function convertTimeSlotToObject(sSlot)
{
    let splitTimeSlot = sSlot.split("-");
    return {
        'start' : convertTimeToSecondStamp(splitTimeSlot[0], false),
        'end' : convertTimeToSecondStamp(splitTimeSlot[1], true)
    };
}

// Convert a second-stamp object into a time-slot : { start: 28800, end: 64740 } > '08:00-17:59'
export function convertObjectToTimeSlot(oStamp)
{
    return convertSecondStampToTime(oStamp.start, false) + '-' + convertSecondStampToTime(oStamp.end, true);
}