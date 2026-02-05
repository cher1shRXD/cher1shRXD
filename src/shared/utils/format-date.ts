export const formatDate = (dateString: string, cut?: number): string => {
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
}