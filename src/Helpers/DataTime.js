import moment from 'moment';
import { TIME_END_WORK, TIME_START_WORK, TIME_BETWEEN_SHIFT, DATA_FIXED } from 'Constants/dataTime';
/**
 *
 * @param {*} timeService type string thời gian dịch vụ
 * @returns trả về mảng của thời gian làm việc chia theo từng dịch vụ
 */
export const DataTimeService = (timeService) => {
  const timeArr = [];
  let timeFixedStart = new Date(`${DATA_FIXED} ${TIME_START_WORK}`);
  let timeChange = moment(timeFixedStart.getTime()).format('HH:mm');
  const timeAll = [];
  let resultTime = [];

  for (let i = 0; i < (10 * 66) / timeService + TIME_BETWEEN_SHIFT * 2; i++) {
    timeArr.push(
      moment(new Date(`${DATA_FIXED} ${timeChange}:00`).getTime() + timeService * 60000).format()
    );

    timeChange = moment(
      new Date(`${DATA_FIXED} ${timeChange}:00`).getTime() + timeService * 60000
    ).format('HH:mm');
  }

  timeArr.forEach((x, index) => {
    timeAll.push(
      moment(
        new Date(`${DATA_FIXED} ${moment(x).format('HH:mm')}:00`).getTime() +
          TIME_BETWEEN_SHIFT * 60000
      ).format('HH:mm') +
        ' - ' +
        moment(new Date(`${timeArr[index + 1]}`).getTime() + TIME_BETWEEN_SHIFT * 60000).format(
          'HH:mm'
        )
    );
  });

  timeAll.forEach((x) => {
    if (
      moment(new Date(`${DATA_FIXED} ${x.substring(0, 5).trim()}:00`)).format('HH:mm') <=
        moment(new Date(`${DATA_FIXED} ${TIME_END_WORK}:00`)).format('HH:mm') &&
      moment(new Date(`${DATA_FIXED} ${x.substring(0, 5).trim()}:00`)).format('HH:mm') >=
        moment(new Date(`${DATA_FIXED} ${TIME_START_WORK}:00`)).format('HH:mm') &&
      moment(new Date(`${DATA_FIXED} ${x.substring(8, 13).trim()}:00`)).format('HH:mm') <=
        moment(new Date(`${DATA_FIXED} ${TIME_END_WORK}:00`)).format('HH:mm') &&
      moment(new Date(`${DATA_FIXED} ${x.substring(0, 5).trim()}:00`)).format('HH:mm') <
        moment(new Date(`${DATA_FIXED} ${x.substring(8, 13).trim()}:00`)).format('HH:mm')
    ) {
      resultTime.push(x);
    }
  });
  resultTime = [...new Set(resultTime)];
  const itemDate = resultTime[resultTime.length - 1];
  resultTime.pop();
  resultTime.unshift(itemDate);
  const totalTimesStart = resultTime.filter((x) => {
    return (
      moment(new Date(`${DATA_FIXED} ${x.substring(8, 13).trim()}:00`)).format('HH:mm') <=
      moment(new Date(`${DATA_FIXED} 12:00:00`)).format('HH:mm')
    );
  });
  const totalTimesEnd = resultTime.filter((x) => {
    return (
      moment(new Date(`${DATA_FIXED} ${x.substring(0, 5).trim()}:00`)).format('HH:mm') >=
      moment(new Date(`${DATA_FIXED} 13:00:00`)).format('HH:mm')
    );
  });

  return [...totalTimesStart, ...totalTimesEnd];
};

/**
 *
 * @param {*} time type string thời gian đặt phòng
 * @param {*} timeArr type array mảng thời gian làm việc
 * @returns trả về mảng của thời gian làm việc chia theo từng dịch vụ
 */
export const filterTime = (time, timeArr) => {
  const times = [];
  const timeReality = moment(new Date()).format();

  if (moment(time).format().substring(0, 10) === moment(timeReality).format().substring(0, 10)) {
    if (typeof timeArr == 'object') {
      timeArr.forEach((x) => {
        if (x.substring(0, 2) > timeReality.substring(11, 13)) {
          times.push(x);
        }
      });
    }
    return times;
  }

  return timeArr;
};
