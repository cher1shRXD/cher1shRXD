export const formatDate = (dateString: string, cut?: number): string => {
  const hasTime = dateString.includes("T");

  if (hasTime) {
    const utcDate = new Date(dateString);
    const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
    const year = kstDate.getUTCFullYear();
    const month = kstDate.getUTCMonth() + 1;
    const day = kstDate.getUTCDate();
    const hour = kstDate.getUTCHours();
    const minute = String(kstDate.getUTCMinutes()).padStart(2, "0");
    const meridiem = hour >= 12 ? "오후" : "오전";
    const displayHour = hour % 12 || 12;
    const timeString = `${meridiem} ${String(displayHour).padStart(2, "0")}:${minute}`;

    return `${year}년 ${month}월 ${day}일 ${timeString}`;
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

  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};
