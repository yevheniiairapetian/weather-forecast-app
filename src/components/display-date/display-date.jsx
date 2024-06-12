export const DisplayDate = () =>{
    const time = Date.now();
  const date = new Date(time);
  const currentDate = date.toString();
  return(
    <span>Current Date and Time: {currentDate}</span>
  )
}