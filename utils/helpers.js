
// not currently used in app, but maintained here for future dev
module.exports = {
  format_date: (date) => {
    // format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },

};
