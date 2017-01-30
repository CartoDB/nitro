export default `
  Usage:
    $ npm start [-- <options>]

  Options:
    -c, --cluster   Enable cluster mode (default: disable)
    -p, --port      Specific listening port (default: 3000)
    -l, --log-path  Path to log (default: current working directory)
    -o, --console   Include stdout as log output (true if NODE_ENV is undefined or 'development', otherwise false)
    --no-logger     Disable logger
    --no-metrics    Disable metrics

  Examples
    $ npm start -- -c -p 8000
`
