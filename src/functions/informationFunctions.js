export const getMyTime = (seconds) =>{ // given seconds, returns an object of converted times.
    let days = 0;
    let hours = 0;
    let minutes = 0;
    if(seconds/86400 > 1){
        days = Math.floor(seconds / 86400);
        seconds = seconds % 86400;
    }
    if(seconds/3600 > 1){
        hours = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
    }
    if(seconds/60 > 1){
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
    }
    seconds = Math.floor(seconds);
    return {days, hours, minutes, seconds};
}