

document.addEventListener('DOMContentLoaded', function () {
  var ctx = document.getElementById('myChart').getContext('2d');

  // Assuming 'transactions' is an array of objects with 'amount' and 'type' properties
  var expenseAmounts = transactions.filter(transaction => transaction.type === 'expense').map(transaction => transaction.amount);
  var incomeAmounts = transactions.filter(transaction => transaction.type === 'income').map(transaction => transaction.amount);

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Expense', 'Income'],
      datasets: [{
        label: 'Expense vs Income',
        data: [sum(expenseAmounts), sum(incomeAmounts)],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  function sum(arr) {
    return arr.reduce((acc, val) => acc + val, 0);
  }
});
