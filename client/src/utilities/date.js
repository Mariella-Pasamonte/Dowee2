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
    if (parts.length === 3){
        var [month, day, year] = parts;
        date = new Date(`${month}/${day}/${year}`);
    }
    return date;
}

export function convertToBirthDate(newDate, isValidDateError, calendarDate, showCalendar){
    var date = new Date();
    var today = new Date();
    var parts = newDate.split('/');
    if (parts.length === 3){
        const [month, day, year] = parts;
        date = new Date(`${month}/${day}/${year}`);
        console.log(date);
        if (!isNaN(date))
        {
            if(date<today)
            {
                calendarDate(date);
                showCalendar(false);
                isValidDateError(false);
            }
            else{
                isValidDateError(true);
            }
        }
    }
}