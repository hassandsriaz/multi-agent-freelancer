from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

# Change directory to where this script is located
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Create the HTTP server
server_address = ('', 3001)
httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)

print("Server running at http://localhost:3001/")
httpd.serve_forever() 