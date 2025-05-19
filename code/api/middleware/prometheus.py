import time
from prometheus_client import Counter, Histogram
from starlette.middleware.base import BaseHTTPMiddleware

# Define metrics
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP Requests',
    ['method', 'endpoint', 'status_code']
)

REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds',
    'HTTP Request Latency',
    ['method', 'endpoint']
)

class PrometheusMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        start_time = time.time()
        
        # Process request
        response = await call_next(request)
        
        # Record metrics
        endpoint = request.url.path
        method = request.method
        status_code = response.status_code
        
        # Skip metrics routes
        if not endpoint.startswith("/metrics"):
            REQUEST_COUNT.labels(method=method, endpoint=endpoint, status_code=status_code).inc()
            REQUEST_LATENCY.labels(method=method, endpoint=endpoint).observe(time.time() - start_time)
        
        return response 