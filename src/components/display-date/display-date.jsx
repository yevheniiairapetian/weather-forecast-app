export const DisplayDate = () =>{
    const time = Date.now();
  const date = new Date(time);
  const currentDate = date.toDateString();
  let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
  const timestamp = date. getTime();
  return(
    <span className="time-date-data"> As of {currentDate} {hours}:{minutes}:{seconds}</span>
  )
}