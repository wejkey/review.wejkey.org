const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const projectActivity = {
  'InternationalMC': [0, 3, 2, 2, 5, 8, 8, 9, 6, 0, 0, 0],
  'MCUtility': [0, 0, 0, 0, 0, 7, 6, 0, 0, 0, 0, 0],
  'CNEP': [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 2, 0],
  'wejkey.org': [1, 0, 0, 0, 0, 0, 0, 0, 8, 10, 9, 10],
  'database.wejkey.org': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
};

const palette = ['#2f6fed', '#7c3aed', '#ef6c35', '#16a34a', '#0ea5e9'];

function initActivityChart() {
  const ctx = document.getElementById('activityChart');
  if (!ctx || typeof Chart === 'undefined') return;

  const datasets = Object.entries(projectActivity).map(([name, data], index) => ({
    label: name,
    data,
    borderColor: palette[index % palette.length],
    backgroundColor: `${palette[index % palette.length]}22`,
    fill: false,
    tension: 0.25,
    pointRadius: 3,
  }));

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: monthLabels,
      datasets,
    },
    options: {
      responsive: true,
      interaction: { mode: 'nearest', intersect: false },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { usePointStyle: true },
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.formattedValue}/10`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 10,
          ticks: {
            stepSize: 1,
          },
          title: {
            display: true,
            text: 'Activity level',
          },
        },
      },
    },
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initActivityChart();
});
