const DateTimeService = {
  getFormattedTodayDate: (): string => {
    if (new Date(Date.now()).getMinutes() >= 10) {
      return new Date(Date.now())
        .toISOString()
        .slice(0, 10)
        .concat('T', `${new Date(Date.now()).getHours()}`, ':')
        .concat(`${new Date(Date.now()).getMinutes()}`);
    } else {
      return new Date(Date.now())
        .toISOString()
        .slice(0, 10)
        .concat('T', `${new Date(Date.now()).getHours()}`, ':')
        .concat('0', `${new Date(Date.now()).getMinutes()}`);
    }
  },
  formatRecordDate: (date: string): string => {
    return date.replace('T', ' ');
  },
};

export default DateTimeService;
