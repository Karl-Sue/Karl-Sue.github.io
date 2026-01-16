# Building Scalable Microservices with Node.js

Microservices architecture has become the de facto standard for building large-scale applications. In this post, I'll share my experience and best practices for building scalable microservices using Node.js.

## Why Microservices?

Microservices offer several advantages over monolithic architectures:

- **Scalability**: Each service can be scaled independently
- **Flexibility**: Different technologies can be used for different services
- **Resilience**: Failure in one service doesn't bring down the entire system
- **Team Autonomy**: Teams can work independently on different services

## Architecture Overview

Here's a typical microservices architecture I use:

```
API Gateway → Service Discovery → Individual Services
                                    ↓
                            Message Queue (Redis/RabbitMQ)
                                    ↓
                            Database per Service
```

## Key Components

### 1. API Gateway

The API Gateway acts as a single entry point for all clients:

```javascript
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Route requests to appropriate services
app.use('/users', createProxyMiddleware({ 
  target: 'http://user-service:3001',
  changeOrigin: true 
}));

app.use('/orders', createProxyMiddleware({ 
  target: 'http://order-service:3002',
  changeOrigin: true 
}));

app.listen(3000);
```

### 2. Service Discovery

I use Consul for service discovery, but you can also use:

- **Kubernetes DNS** for K8s deployments
- **AWS ECS Service Discovery**
- **Eureka** (Netflix OSS)

### 3. Inter-Service Communication

For synchronous communication, I use REST APIs with proper error handling:

```javascript
async function callUserService(userId) {
  try {
    const response = await fetch(`http://user-service/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    // Implement circuit breaker pattern here
    throw error;
  }
}
```

For asynchronous communication, I prefer message queues:

```javascript
const amqp = require('amqplib');

async function publishEvent(event) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  await channel.assertExchange('events', 'topic', { durable: true });
  channel.publish('events', event.type, Buffer.from(JSON.stringify(event)));
}
```

## Docker Configuration

Each service has its own Dockerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

## Docker Compose for Local Development

```yaml
version: '3.8'

services:
  user-service:
    build: ./user-service
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=postgresql://db:5432/users
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  order-service:
    build: ./order-service
    ports:
      - "3002:3000"
    environment:
      - DATABASE_URL=postgresql://db:5432/orders
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres-data:
```

## Kubernetes Deployment

For production, I deploy to Kubernetes:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: myregistry/user-service:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

## Best Practices

### 1. Database per Service

Each service should have its own database to ensure loose coupling:

- User Service → Users DB
- Order Service → Orders DB
- Product Service → Products DB

### 2. Implement Health Checks

```javascript
app.get('/health', (req, res) => {
  // Check database connection
  // Check external dependencies
  res.json({ status: 'healthy', timestamp: Date.now() });
});
```

### 3. Logging and Monitoring

Use structured logging:

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### 4. Circuit Breaker Pattern

Prevent cascading failures:

```javascript
const CircuitBreaker = require('opossum');

const options = {
  timeout: 3000, // 3 seconds
  errorThresholdPercentage: 50,
  resetTimeout: 30000 // 30 seconds
};

const breaker = new CircuitBreaker(callExternalService, options);

breaker.fallback(() => ({ data: 'cached-data' }));
```

## Performance Optimization

### 1. Caching

```javascript
const redis = require('redis');
const client = redis.createClient();

async function getUserWithCache(userId) {
  // Try cache first
  const cached = await client.get(`user:${userId}`);
  if (cached) return JSON.parse(cached);
  
  // Fetch from database
  const user = await db.users.findById(userId);
  
  // Store in cache
  await client.setex(`user:${userId}`, 3600, JSON.stringify(user));
  
  return user;
}
```

### 2. Load Balancing

Use Nginx or cloud load balancers to distribute traffic.

### 3. Connection Pooling

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

## Monitoring and Observability

I use the following stack:

- **Prometheus** for metrics
- **Grafana** for visualization
- **Jaeger** for distributed tracing
- **ELK Stack** for log aggregation

## Conclusion

Building microservices is challenging but rewarding. Key takeaways:

1. Start with a monolith if you're unsure
2. Split services by business domain, not technical layers
3. Invest in observability from day one
4. Automate deployment and testing
5. Document service contracts (OpenAPI/Swagger)

The journey to microservices is iterative. Start small, learn, and scale as needed.

## Resources

- [The Twelve-Factor App](https://12factor.net/)
- [Microservices.io](https://microservices.io/)
- [Martin Fowler's Microservices Guide](https://martinfowler.com/microservices/)

---

*Have questions or suggestions? Feel free to reach out!*
