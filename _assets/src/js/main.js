import Terminal from './Components/Terminal/Terminal';

const terminal = new Terminal(
  document.getElementById('terminal'),
  document.getElementById('results'),
  {username: '@'+ window.username +' $'}
);

document.getElementById('help').addEventListener('click', function(e) {
  e.preventDefault();
  terminal.handleQuery('-help', true);
});

document.getElementById('about').addEventListener('click', function(e) {
  e.preventDefault();
  terminal.handleQuery('-about', true);
});
