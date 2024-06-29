from flask import Flask, jsonify, redirect, send_file
import io
import requests
import base64
import mimetypes
import os

app = Flask(__name__)

@app.route("/")
def index():
    return "index"

# Define other routes above the shortener route 

@app.route("/<shortener>")
def shortener_page(shortener):
    api_url = 'https://url.byshalin.com/api/get-url'
    params = {"shortener": shortener}

    try:
        response = requests.get(api_url, params=params)

        if response.status_code == 200:
            data = response.json()

            return redirect(data)
            
        else:
            return jsonify({"error": "Failed to fetch data"}), response.status_code
        
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500  # Handle network errors

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(debug=True, host='0.0.0.0', port=port)
