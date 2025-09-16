# Pretty Log

A log prettifier for structured JSON logs. Pretty Log transforms JSON log output into a readable, colorized format that's easier to analyze and understand.

_Based on [pino-pretty](https://github.com/pinojs/pino-pretty)_

## Features

- 🎨 Colorized output based on log levels
- 🔍 Intelligent parsing of JSON log entries
- 📏 Clean separation between log entries
- 🛡️ Secure JSON parsing
- 📝 Preserves non-JSON lines
- 🎯 Special handling for common log fields (level, message, timestamp, error)

## Installation

```bash
# Using npm
npm install -g @lukaskj/pretty-log
```

## Usage

Pipe your JSON logs directly to pretty-log:

```bash
# From a file
cat logs.txt | pretty-log

# From a process
your-app | pretty-log

# From Docker
docker logs your-container | pretty-log
```


## Input Format

The tool expects JSON objects, one per line. Each object can have the following fields:

```typescript
{
  level?: string;     // log level (e.g., "info", "error", "debug")
  message?: string;   // main log message
  timestamp?: string; // timestamp of the log
  error?: string;     // error information
  [key: string]: any; // any additional fields
}
```

## Output Format

The output is formatted with:
- Color-coded log levels
- Clear message highlighting
- Structured additional fields
- Visual separators between log entries

Example output:
```
 INFO  User logged in
       timestamp: 2025-09-15T10:30:00Z
       userId: 123
       ip: "192.168.1.1"
--------------------------------
 ERROR Failed to process request
       timestamp: 2025-09-15T10:30:01Z
       error: "Connection timeout"
       requestId: "abc-123"
--------------------------------
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


