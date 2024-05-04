export function onChangeDate(newDate,setCalendarDate,setDate,setShowCalendar){
    setCalendarDate(newDate);
    var today = getClickedDate(newDate);
    setDate(today);
    setShowCalendar(false);
}

export function getClickedDate(newDate){
    var day = String(newDate.getDate()).padStart(2,'0');
    var year = newDate.getFullYear();
    var month = String(newDate.getMonth()+1).padStart(2,'0');

    var today=`${month}/${day}/${year}`;
    
    return today;
}

export function convertToDate(newDate){
    var date = new Date();
    var parts = newDate.split('/');
    console.log(newDate);
    if (parts.length === 3){
        var [month, day, year] = parts;
        date = new Date(`${month}/${day}/${year}`);
    }
    return date;
}

export function convertToBirthDate(newDate, isValidDateError, calendarDate, birthday, showCalendar){
    var date = new Date();
    var today = new Date();
    var parts = newDate.split('/');
    var emptyParts = ['__','__','____'];

    if (parts.length===3){
        const [month, day, year] = parts;
        if(month!==emptyParts[0]&&day!==emptyParts[1]&&year!==emptyParts[2])
        {
            date = new Date(`${month}/${day}/${year}`);
            if(date<today)
            {
                birthday(newDate);
                calendarDate(date);
                isValidDateError(false);
                showCalendar(false);
            }
            else{
                isValidDateError(true);
            }
        }
        else{
            console.log(parts);
        }
    }
}
