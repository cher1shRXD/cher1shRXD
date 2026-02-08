export const formatDate = (dateString: string, cut?: number): string => {
  let hasTime = false;
  let timeString = "";

  if (dateString.includes("T")) {
    hasTime = true;
    const utcDate = new Date(dateString);
    const kstString = utcDate.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const [datePart, timePart] = kstString.split(" ");
    const [year, month, day] = datePart.replace(/\./g, "").split(" ");
    const monthNum = String(Number(month));
    const dayNum = String(Number(day));
    timeString = timePart;
    dateString = `${year}년 ${monthNum}월 ${dayNum}일`;
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
};
