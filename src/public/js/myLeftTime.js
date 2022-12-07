const complement = function (value) {
  return value < 10 ? `0${value}` : value;
};
export default function getNewTime(timestamp) {
  let time = new Date(timestamp);
  const year = time.getFullYear();
  const month = complement(time.getMonth() + 1);
  const day = complement(time.getDate());
  const hour = complement(time.getHours());
  const minute = complement(time.getMinutes());
  const second = complement(time.getSeconds());
  return {
    hour,
    minute,
    second,
  };
}
