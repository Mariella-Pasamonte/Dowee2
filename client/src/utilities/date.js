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
    var emptyParts = ['__','__','____'];
    // console.log("check:",parts.length===3&&parts[0]!==emptyParts[0] && parts[1]!== emptyParts[1] && parts[2]!== emptyParts[2])
    // console.log("length check:",parts.length===3);
    // console.log("is [0] empty:", parts[0]!==emptyParts[0]);
    // console.log("is [1] empty:", parts[1]!== emptyParts[1]);
    // console.log("is [2] empty:", parts[2]!== emptyParts[2]);
    // &&parts[0]!==emptyParts[0] && parts[1]!== emptyParts[1] && parts[2]!== emptyParts[2]
    if (parts.length===3){
        const [month, day, year] = parts;
        date = new Date(`${month}/${day}/${year}`);
        console.log('date:',date);
        if(date<today)
        { 
            calendarDate(date);
            showCalendar(true);
            isValidDateError(false);
        }
        else{
            isValidDateError(true);
        }
    }
}