export default function getTime(time:string){

    const createdAtDate = new Date(time); 
    const timeDifference = Date.now() - createdAtDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    let timeString = '';
    if (days > 0) {
        timeString = `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        timeString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        timeString = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        timeString = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  return timeString;
}

