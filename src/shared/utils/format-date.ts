export const formatDate = (dateString: string, cut?: number): string => {
  let hasTime = false;
  let timeString = "";
  
  if(dateString.includes("T")) {
    hasTime = true;
    const parts = dateString.split("T");
    const timePart = parts[1].split(".")[0];
    const [hours, minutes] = timePart.split(":");
    timeString = `${hours}:${minutes}`;
    dateString = parts[0];
  }
  
  const tokens = dateString.split("-");
  if (tokens.length !== 3) return dateString;

  const year = tokens[0];
  const month = tokens[1];
  const day = tokens[2];

  switch (cut) {
    case 1:
      return `${year}년 ${Number(month)}월`;
    case 2:
      return `${year}년`;
  }

  const dateStr = `${year}년 ${Number(month)}월 ${Number(day)}일`;
  return hasTime ? `${dateStr} ${timeString}` : dateStr;
}