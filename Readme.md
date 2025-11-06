# Bunpress 🚀

A lightweight, Express.js-inspired web framework built specifically for **Bun** - the fast all-in-one JavaScript runtime.

## Features

- 🚀 **Fast**: Built on top of Bun's native HTTP server
- 🪶 **Lightweight**: Minimal footprint with zero dependencies
- 🔧 **Simple**: Express.js-like API that's familiar and easy to use
- ⚡ **TypeScript**: Full TypeScript support out of the box
- 🎯 **Modern**: Uses modern JavaScript features and Web APIs

## Installation

Make sure you have [Bun](https://bun.sh) installed on your system.

```bash
# Clone the repository
git clone <repository-url>
cd bunpress

# Install dependencies
bun install
```

## Quick Start

Here's a simple example to get you started:

```typescript
import { Bunpress } from "./src";

const app = new Bunpress();

// Define routes
app.get("/", () => new Response("Hello from Bunpress!"));

app.get("/user", () =>
  new Response(JSON.stringify({ name: "Abhinay", role: "creator" }), {
    headers: { "Content-Type": "application/json" },
  })
);

// Start the server
app.listen(3000);
```

## API Reference

### Creating an App

```typescript
import { Bunpress } from "bunpress";

const app = new Bunpress();
```

### Route Methods

Currently supported HTTP methods:

#### GET Routes
```typescript
app.get(path: string, handler: Handler)
```

#### POST Routes
```typescript
app.post(path: string, handler: Handler)
```

### Handler Function

A handler function receives a `Request` object and should return a `Response` or a `Promise<Response>`:

```typescript
type Handler = (req: Request) => Response | Promise<Response>;
```

### Starting the Server

```typescript
app.listen(port: number)
```

Starts the server on the specified port and returns a Bun server instance.

## Examples

### Basic Server

```typescript
import { Bunpress } from "./src";

const app = new Bunpress();

app.get("/", () => new Response("Hello World!"));

app.listen(3000);
console.log("Server running on http://localhost:3000");
```

### JSON API

```typescript
import { Bunpress } from "./src";

const app = new Bunpress();

app.get("/api/users", () => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" }
  ];
  
  return new Response(JSON.stringify(users), {
    headers: { "Content-Type": "application/json" }
  });
});

app.post("/api/users", async (req) => {
  const body = await req.json();
  console.log("New user:", body);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
    status: 201
  });
});

app.listen(3000);
```

## Project Structure

```
bunpress/
├── src/
│   ├── index.ts          # Main export
│   ├── core/
│   │   ├── app.ts        # Main Bunpress class
│   │   ├── middleware.ts # Middleware system (planned)
│   │   ├── response.ts   # Response utilities (planned)
│   │   └── router.ts     # Advanced routing (planned)
│   └── utils/
│       ├── helper.ts     # Utility functions (planned)
│       └── mime.ts       # MIME type handling (planned)
├── examples/
│   ├── basic.ts          # Basic usage example
│   ├── middleware.ts     # Middleware example (planned)
│   └── routing.ts        # Advanced routing example (planned)
├── tests/
│   └── server.test.ts    # Test files (planned)
├── package.json
├── tsconfig.json
└── bunfig.toml
```

## Development

### Running Examples

```bash
# Run the basic example
bun run examples/basic.ts

# The server will start on http://localhost:3000
```

### Running Tests

```bash
bun test
```

## Roadmap

### Planned Features

- [ ] **Middleware Support**: Add middleware system for request/response processing
- [ ] **Advanced Routing**: Path parameters, wildcards, and route groups  
- [ ] **Static File Serving**: Built-in static file middleware
- [ ] **Request Parsing**: Built-in JSON, form data, and multipart parsing
- [ ] **Response Helpers**: Convenient methods for common response types
- [ ] **Error Handling**: Global error handling and custom error pages
- [ ] **CORS Support**: Cross-origin resource sharing middleware
- [ ] **Rate Limiting**: Built-in rate limiting capabilities
- [ ] **Logging**: Request/response logging middleware
- [ ] **WebSocket Support**: Real-time communication support

### HTTP Methods to Add

- [ ] PUT
- [ ] DELETE  
- [ ] PATCH
- [ ] HEAD
- [ ] OPTIONS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Requirements

- **Bun** 1.0 or higher
- **TypeScript** 5.0 or higher

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by [Express.js](https://expressjs.com/)
- Built for the [Bun](https://bun.sh) runtime
- Created by Abhinay Ambati

---

**Note**: Bunpress is currently in early development. Many features are planned but not yet implemented. Check the roadmap above for upcoming features.