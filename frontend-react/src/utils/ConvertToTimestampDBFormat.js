export const ConvertToTimestampDBFormat = (tgl_pinjam) => {
  const year = tgl_pinjam.getFullYear();
  const month = String(tgl_pinjam.getMonth() + 1).padStart(2, "0");
  const day = String(tgl_pinjam.getDate()).padStart(2, "0");

  const hours = String(tgl_pinjam.getHours()).padStart(2, "0");
  const minutes = String(tgl_pinjam.getMinutes()).padStart(2, "0");
  const seconds = String(tgl_pinjam.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
