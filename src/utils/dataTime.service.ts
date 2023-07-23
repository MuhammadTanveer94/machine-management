import dayjs from 'dayjs';

const dateTimeService = (() => {
  const DATE_FORMATES = {
    DOT_NOTATION_DATE: 'DD.MM.YYYY',
  };
  function timeFormat(date = '', format = DATE_FORMATES.DOT_NOTATION_DATE) {
    if (!date) return '';
    return dayjs(date).format(format);
  }

  function dayjsObj(date = '') {
    if (!date) return dayjs();
    return dayjs(date);
  }
  function isInvalidDate(dateString: string) {
    const parsedDate = dayjs(dateString);
    return !parsedDate.isValid();
  }

  return {DATE_FORMATES, timeFormat, dayjsObj, isInvalidDate};
})();

export default dateTimeService;
