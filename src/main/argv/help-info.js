export default `
  Usage:
    $ npm start [-- <options>]

  Options:
    -v, --version   Return current version
    -p, --port      Specific listening port (default: 3000)
    -c, --cluster   Enable cluster mode (default: disabled)
    --no-cluster    Disable cluster
    -l, --logger    Enable logger (default: enabled)
    --no-logger     Disable logger
    --log-path      Path to log (default: current working directory)
    -o, --console   Include stdout as output (default: enable if NODE_ENV is undefined or 'development')
    -m, --metrics   Enable metrics (default: enabled)
    --no-metrics    Disable metrics

  Examples
    $ node app.js -log-path /tmp/app.log
    $ npm start -- -c -p 8000
`
