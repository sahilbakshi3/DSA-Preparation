export const SYSTEM_DESIGN_TOPICS = [
  {
    id: "scalability",
    label: "Scalability Fundamentals",
    color: "#aaff00",
    tag: "CORE",
    sections: [
      {
        title: "Vertical vs Horizontal Scaling",
        content: `VERTICAL (Scale Up):
  Add more CPU/RAM to one machine
  Simpler — no code changes needed
  Hard limit — can't scale forever
  Single point of failure
  Good for: DB servers, when latency is critical

HORIZONTAL (Scale Out):
  Add more machines, distribute load
  Requires: stateless services, load balancers
  No theoretical limit
  Fault tolerant — one node dies, others continue
  Good for: stateless web servers, microservices

RULE: Design for horizontal from day one.
      Vertical is a band-aid.`,
      },
      {
        title: "CAP Theorem",
        content: `Distributed system can only guarantee 2 of 3:
  C — Consistency    (all nodes see same data)
  A — Availability   (every request gets a response)
  P — Partition Tol  (system works despite network splits)

Network partitions ALWAYS happen → must choose C or A:

  CP systems: sacrifice availability during partition
    → MongoDB, HBase, Zookeeper, Redis (cluster)
    → Use for: banking, financial transactions

  AP systems: sacrifice consistency during partition
    → Cassandra, CouchDB, DynamoDB (eventually consistent)
    → Use for: shopping carts, social feeds, DNS

NUANCE: CAP is binary — real systems tune consistency
        levels. "Eventual consistency" is a spectrum.`,
      },
      {
        title: "Latency Numbers (Commit to Memory)",
        content: `L1 cache ref              ~0.5 ns
Branch misprediction      ~5 ns
L2 cache ref              ~7 ns
Mutex lock/unlock         ~25 ns
Main memory ref           ~100 ns
Compress 1KB (Snappy)     ~3,000 ns  = 3 μs
Send 1KB over 1Gbps       ~10,000 ns = 10 μs
SSD random read           ~150,000 ns = 150 μs
Round trip same DC        ~500,000 ns = 0.5 ms
HDD seek                  ~10 ms
Round trip CA→NL          ~150 ms

IMPLICATIONS:
→ Memory is 200x faster than SSD
→ SSD is 1000x faster than HDD
→ Network in same DC ~0.5ms → batch your calls
→ Cross-continent = 150ms → cache aggressively`,
      },
    ],
    traps: [
      "Don't say 'add more servers' without explaining how state/sessions are handled",
      "CAP theorem applies to distributed storage, not entire systems",
      "Vertical scaling first is often the right pragmatic choice early on",
    ],
    questions: [
      "Design a rate limiter",
      "How would you scale a single-server app to 1M users?",
    ],
  },
  {
    id: "load-balancing",
    label: "Load Balancing",
    color: "#4488ff",
    tag: "INFRA",
    sections: [
      {
        title: "Algorithms",
        content: `ROUND ROBIN
  → requests distributed sequentially
  → simple, works when all servers equal
  → fails when servers have different capacity

LEAST CONNECTIONS
  → route to server with fewest active connections
  → better for requests with variable duration
  → overhead: LB must track connection counts

IP HASH
  → hash(client_IP) % N → consistent server
  → same user always hits same server
  → breaks if server count changes (consistent hashing fixes this)
  → useful: session stickiness without shared session store

WEIGHTED ROUND ROBIN
  → assign weights based on server capacity
  → powerful server gets more requests
  → good for heterogeneous fleets

RANDOM WITH TWO CHOICES (Power of Two)
  → pick 2 random servers, route to least loaded
  → O(1) but near-optimal distribution
  → used by: Nginx, Envoy`,
      },
      {
        title: "Layer 4 vs Layer 7 LB",
        content: `LAYER 4 (Transport):
  Routes based on IP + TCP/UDP port only
  Doesn't look at content — very fast
  Can't do: URL-based routing, SSL termination
  Examples: AWS NLB, HAProxy L4 mode

LAYER 7 (Application):
  Routes based on HTTP headers, URL, cookies
  Can do: A/B testing, canary deploys, SSL termination
  Slightly more CPU overhead
  Examples: Nginx, AWS ALB, Caddy

USE L4 when: massive throughput, simple TCP proxying
USE L7 when: need content-based routing, HTTP features`,
      },
    ],
    traps: [
      "Sticky sessions with IP hash = capacity scaling nightmare (use consistent hashing or shared session store instead)",
      "Load balancer itself is a SPOF — run multiple LBs with DNS failover or active-passive",
      "Health checks must be meaningful — a 200 from a DB-disconnected server is useless",
    ],
    questions: [
      "Design a load balancer",
      "How do you handle session management at scale?",
    ],
  },
  {
    id: "caching",
    label: "Caching",
    color: "#ff7722",
    tag: "PERFORMANCE",
    sections: [
      {
        title: "Cache Strategies",
        content: `CACHE ASIDE (Lazy Loading) — most common
  1. App checks cache → miss → query DB
  2. App writes result to cache
  3. Next request → cache hit
  + Works for read-heavy, tolerates staleness
  - Cache miss penalty, possible stampede (thundering herd)
  - Cache may have stale data on write

WRITE THROUGH
  1. Write to cache AND DB simultaneously
  + Always consistent
  - Write latency (both must succeed), wasteful (write data may never be read)

WRITE BACK (Write Behind)
  1. Write to cache only → async flush to DB
  + Very fast writes
  - Risk of data loss if cache crashes before flush
  Use for: non-critical data, analytics

READ THROUGH
  Cache handles DB reads automatically
  Similar to Cache Aside but cache is responsible
  Used in: NHibernate 2nd level cache, CDN`,
      },
      {
        title: "Eviction Policies",
        content: `LRU (Least Recently Used) — most common
  → evict item not accessed for longest time
  → O(1) with HashMap + doubly linked list
  → great for temporal locality

LFU (Least Frequently Used)
  → evict item accessed least number of times
  → more complex, handles frequency better
  → good for: viral content caching

TTL (Time to Live)
  → expire items after fixed duration
  → simple, predictable
  → combine with LRU for best results

FIFO / Random
  → rarely used in practice
  → FIFO: first written is first evicted

REAL SYSTEMS:
  Redis: LRU, LFU, volatile-ttl, allkeys variants
  Memcached: pure LRU
  Browser: custom LRU variants`,
      },
      {
        title: "Thundering Herd & Cache Stampede",
        content: `PROBLEM: popular cache key expires → 10,000
  requests hit DB simultaneously → DB dies

SOLUTIONS:
  1. Mutex/Lock — only first miss queries DB,
     others wait. Simple but creates contention.

  2. Probabilistic Early Expiration (XFetch)
     Start refreshing slightly before TTL expires
     based on probability proportional to remaining TTL
     → Netflix uses this

  3. Background refresh (async)
     Serve stale data, refresh cache in background
     → No wait time, slightly stale is acceptable

  4. Jitter on TTL
     TTL = baseTTL + random(0, jitter)
     Spreads expiration across time window`,
      },
    ],
    traps: [
      "Cache invalidation is one of two hard problems in CS — don't hand-wave it",
      "Cache aside + write-through combined = stale data risk on concurrent writes",
      "Don't cache mutable per-user data in a shared L2 cache — session data belongs in Redis",
    ],
    questions: [
      "Design a cache system",
      "How would you implement a CDN?",
      "Design Redis",
    ],
  },
  {
    id: "databases",
    label: "Database Design & Sharding",
    color: "#ff4488",
    tag: "STORAGE",
    sections: [
      {
        title: "SQL vs NoSQL — When to Use Each",
        content: `USE SQL (PostgreSQL, MySQL) WHEN:
  → Data has clear relational structure
  → Need ACID transactions (money, inventory)
  → Schema is known and stable
  → Complex queries with JOINs
  → Reporting and analytics workloads
  Examples: user accounts, orders, financial records

USE NoSQL WHEN:
  → Schema is flexible or evolves rapidly
  → Massive write throughput needed
  → Data is hierarchical / document-like
  → Geographic distribution required
  → Key-value lookups dominate

NoSQL Types:
  Document (MongoDB, CouchDB) → JSON-like docs, flexible schema
  Key-Value (Redis, DynamoDB) → O(1) lookup by key
  Wide-Column (Cassandra, HBase) → time series, write-heavy
  Graph (Neo4j) → highly connected data, social graphs`,
      },
      {
        title: "Sharding",
        content: `Sharding = horizontal partitioning of data across DBs

HORIZONTAL SHARDING (most common):
  Split rows across shards by shard key
  e.g. user_id % N → shard N

VERTICAL SHARDING:
  Split by table/feature — users DB, orders DB, etc.
  Good first step, limited scalability

SHARD KEY SELECTION — most critical decision:
  ✓ High cardinality (many unique values)
  ✓ Even distribution (no hot shards)
  ✓ Query locality (avoid cross-shard queries)

  Bad: created_at (hotspot on latest shard)
  Bad: country (skewed — US vs Vatican)
  Good: user_id (random distribution)
  Good: hash(user_id) (even more uniform)

CONSISTENT HASHING:
  Use a ring — each node covers a range
  Adding/removing node = only neighbors rebalanced
  K/N keys move on average (vs K on naive hash)
  Virtual nodes = better load distribution`,
      },
      {
        title: "Replication",
        content: `PRIMARY-REPLICA (Master-Slave):
  Primary: handles all writes
  Replicas: handle reads (read scaling)
  Replication lag: replicas may be slightly behind
  
  On primary failure:
  → Promote replica (manual or automatic via Sentinel)
  → Risk: replica not fully caught up (data loss)

PRIMARY-PRIMARY (Multi-Master):
  Both nodes accept writes
  Must resolve conflicts (last-write-wins, CRDT)
  Complex, avoid unless geography requires it
  Used by: Google Spanner, CockroachDB

SYNCHRONOUS vs ASYNCHRONOUS:
  Sync: primary waits for replica ACK → no data loss, slower
  Async: fire and forget → fast, possible data loss
  Semi-sync: wait for at least one replica ACK (MySQL default)`,
      },
    ],
    traps: [
      "Hotspot sharding = one shard getting all traffic (e.g. celebrity user_id)",
      "Cross-shard transactions are a nightmare — design to avoid them",
      "Read replicas have replication lag — never read your own writes from replica",
    ],
    questions: [
      "Design a URL shortener",
      "Design Twitter's timeline",
      "How would you design a distributed database?",
    ],
  },
  {
    id: "message-queues",
    label: "Message Queues & Event Streaming",
    color: "#aa66ff",
    tag: "ASYNC",
    sections: [
      {
        title: "Message Queue vs Event Stream",
        content: `MESSAGE QUEUE (RabbitMQ, SQS, ActiveMQ):
  → Message consumed once, then deleted
  → Pull or push model
  → Good for: task distribution, job queues, email sending
  → Guaranteed delivery with ACKs
  → Consumer removes message from queue

EVENT STREAM (Kafka, Kinesis):
  → Events persisted for configurable retention
  → Multiple consumers can read same event
  → Ordered within partition
  → Good for: audit log, event sourcing, analytics pipeline
  → Replay capability (re-process from offset)

CHOOSE QUEUE WHEN: one consumer per message, work distribution
CHOOSE STREAM WHEN: many consumers, event replay, audit trail`,
      },
      {
        title: "Kafka Architecture",
        content: `CORE CONCEPTS:
  Topic: named category of events
  Partition: ordered log within topic, unit of parallelism
  Offset: position within partition (immutable)
  Consumer Group: set of consumers sharing work
    → each partition consumed by ONE consumer in group
    → different groups each get ALL messages independently

GUARANTEES:
  → Messages within partition are ordered
  → At-least-once delivery by default
  → Exactly-once with transactions (Kafka Streams)

THROUGHPUT TIPS:
  → More partitions = more parallelism (but more overhead)
  → Batch messages on producer side
  → Async sends with acks=1 (leader only) for max throughput
  → acks=all for durability (quorum write)

COMMON PATTERNS:
  Fan-out: one topic, many consumer groups
  Event sourcing: topic = source of truth
  CQRS: writes → Kafka → read model updated async`,
      },
    ],
    traps: [
      "Queue without a dead letter queue (DLQ) = poison pill messages crash your consumers forever",
      "Kafka partition count can only go up, never down — plan partition count carefully",
      "At-least-once delivery means idempotent consumers are required",
    ],
    questions: [
      "Design a notification system",
      "Design a real-time analytics pipeline",
    ],
  },
  {
    id: "api-design",
    label: "API Design & Rate Limiting",
    color: "#00ddbb",
    tag: "API",
    sections: [
      {
        title: "REST vs GraphQL vs gRPC",
        content: `REST:
  + Universal support, easy to cache (HTTP), simple
  + Stateless, great tooling (Swagger)
  - Over/under-fetching, N+1 problem
  - Versioning pain (/v1, /v2)
  Use: public APIs, simple CRUD, external partners

GRAPHQL:
  + Client specifies exactly what data it needs
  + Single endpoint, strongly typed schema
  - Harder to cache (POST requests)
  - Complex queries can be expensive (N+1 if not careful)
  - Overkill for simple apps
  Use: mobile apps, complex nested data, BFF pattern

gRPC:
  + Binary (Protobuf) = 5-10x smaller than JSON
  + Strongly typed, codegen for clients
  + Streaming support (bidirectional)
  - Not browser-native (needs gRPC-Web proxy)
  - Less human-readable
  Use: internal microservice communication, high throughput`,
      },
      {
        title: "Rate Limiting Algorithms",
        content: `TOKEN BUCKET (most common):
  Bucket has max N tokens, refills at rate R/sec
  Each request consumes one token
  Burst allowed up to bucket size
  Used by: AWS API GW, Stripe

LEAKY BUCKET:
  Requests enter bucket (queue), processed at fixed rate
  Excess spills over (dropped or queued)
  Smooths out traffic bursts
  Good for: output rate limiting, traffic shaping

FIXED WINDOW COUNTER:
  Count requests per time window (e.g. per minute)
  Edge case: 2x rate possible at window boundary
  Simple, used for basic quotas

SLIDING WINDOW LOG:
  Store timestamp of each request
  Count requests in last window duration
  Accurate but memory-intensive (O(rate) storage)

SLIDING WINDOW COUNTER:
  Hybrid: fixed windows + weighted average
  Memory efficient, near-accurate
  Used by: Cloudflare, Redis rate limiting patterns

DISTRIBUTED RATE LIMITING:
  Centralized: Redis with atomic INCR + EXPIRE
  Local: each node limits independently (less accurate)
  Gossip-based: share counters between nodes`,
      },
    ],
    traps: [
      "Idempotency keys are essential for any payment/mutation API — POST /charges without idempotency = duplicate charges",
      "Rate limit by user, not just IP — shared NATs can get many users rate-limited together",
      "API versioning via URL (/v1) vs headers — URL is more visible/cacheable, headers are cleaner",
    ],
    questions: ["Design a rate limiter", "Design an API gateway"],
  },
  {
    id: "consistent-hashing",
    label: "Consistent Hashing",
    color: "#ffaa00",
    tag: "DISTRIBUTED",
    sections: [
      {
        title: "The Problem",
        content: `NAIVE APPROACH: node = hash(key) % N
  Adding/removing node changes N
  → Remaps ~(N-1)/N keys → massive cache invalidation

CONSISTENT HASHING solves this:
  Map nodes and keys to positions on a ring (0 to 2^32-1)
  Key maps to first node clockwise on the ring
  Adding/removing node → only K/N keys remapped on average

VIRTUAL NODES:
  Each physical node has V virtual nodes on ring
  Spreads load more evenly
  When node removed, load distributed across ALL nodes
  Typical V: 100-300 virtual nodes per physical node

REAL USAGE:
  → Dynamo, Cassandra for partition routing
  → Memcached/Redis cluster for shard selection
  → CDN for edge server selection
  → Load balancers for sticky routing`,
      },
    ],
    traps: [
      "Without virtual nodes, uneven distribution is likely — especially with few nodes",
      "Consistent hashing doesn't solve data replication, just placement",
      "Hotspot problem still possible if one key gets extreme traffic",
    ],
    questions: [
      "Design a distributed cache",
      "How does Cassandra distribute data?",
    ],
  },
  {
    id: "design-patterns",
    label: "System Design Patterns",
    color: "#00cc88",
    tag: "PATTERNS",
    sections: [
      {
        title: "Core Patterns Cheatsheet",
        content: `SAGA PATTERN (distributed transactions):
  Break transaction into local txns with compensating txns
  Choreography: services emit events (decoupled)
  Orchestration: central coordinator (simpler to trace)
  Use when: need ACID-like behavior across microservices

CIRCUIT BREAKER:
  CLOSED → requests pass through
  OPEN → requests fail fast (no calls to failing service)
  HALF-OPEN → probe request to check recovery
  Prevents cascading failures
  Libraries: Hystrix, Resilience4j

BULKHEAD:
  Isolate failures in compartments (like a ship's hull)
  Thread pool per downstream service
  One slow service doesn't exhaust all threads

OUTBOX PATTERN:
  DB transaction + message in same ACID transaction
  Background poller reads outbox, publishes to queue
  Guarantees exactly-once publishing
  Solves dual-write problem

SIDECAR PATTERN:
  Deploy helper container alongside main app
  Handles: logging, service discovery, TLS, metrics
  Transparent to application code
  Foundation of service meshes (Istio, Linkerd)`,
      },
      {
        title: "Back-of-Envelope Estimation",
        content: `MEMORY:
  char = 1 byte
  int  = 4 bytes
  long = 8 bytes
  UUID = 36 bytes
  1 million = 1MB of chars / 4MB of ints

STORAGE:
  Average tweet: ~300 bytes
  Profile photo: ~200KB
  1 million tweets = 300MB
  1 billion tweets = 300GB

BANDWIDTH:
  1M users × 1 request/sec = 1M QPS
  1M QPS × 1KB = 1GB/s = 8Gbps (need multiple servers)
  
QUICK MATH:
  1 day = 86,400s ≈ 100,000s
  1M req/day = 10 QPS
  1B req/day = 10,000 QPS
  Twitter at peak: ~150,000 TPS
  
SERVERS:
  1 app server handles ~1000-5000 QPS (depending on work)
  1 MySQL server: ~1000 QPS (write) / 10,000 QPS (read)
  1 Redis: ~100,000+ ops/sec`,
      },
    ],
    traps: [
      "Microservices are a solution to an org scaling problem, not a technical one — don't split prematurely",
      "Event sourcing ≠ CQRS — they pair well but are independent patterns",
      "The outbox pattern is underused — most 'dual write' bugs can be fixed with it",
    ],
    questions: [
      "Design a payment system",
      "Design a distributed transaction system",
    ],
  },
];

export const SYSTEM_DESIGN_FRAMEWORK = [
  {
    step: "01",
    title: "CLARIFY REQUIREMENTS",
    duration: "3–5 min",
    color: "#aaff00",
    items: [
      "Functional: what does the system DO? (core features only)",
      "Non-functional: scale? latency? consistency? availability?",
      "Back-of-envelope: DAU, QPS, storage in 5 years",
      "Out of scope: explicitly state what you're NOT designing",
    ],
  },
  {
    step: "02",
    title: "HIGH-LEVEL DESIGN",
    duration: "10–15 min",
    color: "#4488ff",
    items: [
      "Client → LB → API servers → DB/Cache",
      "Identify major components: web tier, app tier, data tier",
      "Pick SQL vs NoSQL — justify it",
      "Identify where read vs write heavy",
    ],
  },
  {
    step: "03",
    title: "DEEP DIVE",
    duration: "15–20 min",
    color: "#ff7722",
    items: [
      "Drill into 2-3 components interviewer is interested in",
      "Data model: tables/collections, indexes, partitions",
      "API design: endpoints, request/response contracts",
      "Handle edge cases: failures, hotspots, data loss",
    ],
  },
  {
    step: "04",
    title: "SCALE & WRAP UP",
    duration: "5 min",
    color: "#ff4488",
    items: [
      "Identify bottlenecks: where does it break at 10x?",
      "Add caching, CDN, sharding as needed",
      "Discuss tradeoffs made",
      "Mention monitoring, alerting, graceful degradation",
    ],
  },
];
