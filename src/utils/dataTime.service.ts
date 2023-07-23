import dayjs from 'dayjs';

const dateTimeService = (() => {
  const DATE_FORMATES = {
    DOT_NOTATION_DATE: 'DD.MM.YYYY',
  };
  function timeFormat(date = '', format = DATE_FORMATES.DOT_NOTATION_DATE) {
    if (date) return dayjs(date).format(format);
    return '';
  }

  return {DATE_FORMATES, timeFormat};
})();

export default dateTimeService;
