#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
import os
import sys

# Change to the directory containing the HTML file
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Fawkes Energy website is running at:")
        print(f"   http://localhost:{PORT}")
        print(f"   http://127.0.0.1:{PORT}")
        print("\n✨ Features included:")
        print("   • Dark theme with ochre highlights")
        print("   • Mobile-first responsive design") 
        print("   • Smooth scroll animations")
        print("   • Interactive contact form")
        print("   • SEO optimized")
        print("\n🔧 Press Ctrl+C to stop the server")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped. Thanks for using Fawkes Energy website!")
            sys.exit(0)
