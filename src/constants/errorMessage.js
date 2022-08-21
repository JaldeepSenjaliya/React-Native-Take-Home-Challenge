  export default {
    errorMessage : () => {
        if (startDate === '' || endDate === '') {
          return 'Start date or/and end date is/are empty';
        } else if (startDate > endDate) {
          return 'Start date should be less than or equal to end date.';
        }
      }
  };
