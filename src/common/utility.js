
export const utility = {
    capitalizeFirstLetter,
    formatDate
}

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function formatDate(val,format){
    const d = new Date(val)
        const ye = new Intl.DateTimeFormat('en', { year: format.year }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: format.month }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: format.day }).format(d)
    if(format.sec===1){
        return `${da}-${mo}-${ye}`;
    }
    if(format.sec===2){
        return `${ye}-${mo}-${da}`;
    }
}

