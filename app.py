from flask import Flask, jsonify, redirect, send_file
import io
import requests
import base64
import mimetypes

app = Flask(__name__)

@app.route("/")
def index():
    return "index"

# Define other routes above the shortener route 

@app.route("/<shortener>")
def shortener_page(shortener):
    api_url = 'http://localhost:7000/api/get-url'
    params = {"shortener": shortener}

    try:
        response = requests.get(api_url, params=params)

        if response.status_code == 200:
            data = response.json()

            if "url" in data:
                return redirect(data["url"])
            
            elif "file content" in data: 
                file_content_base64 = data["file content"]
                file_content_bytes = base64.b64decode(file_content_base64)
                file_name = data["file name"]


                file_obj = io.BytesIO(file_content_bytes)

                # Seek to the beginning of the file-like object (important for send_file)
                file_obj.seek(0)

                # Guess the MIME type based on the file name
                mimetype, _ = mimetypes.guess_type(file_name)
                if not mimetype:
                    mimetype = 'application/octet-stream'  # Default to binary/octet-stream if MIME type cannot be guessed

                # Serve the in-memory file using send_file
                return send_file(file_obj, mimetype=mimetype, as_attachment=False)
            
            else:
                return jsonify({"error": "URL not found in response"}), 404
        else:
            return jsonify({"error": "Failed to fetch data"}), response.status_code
        
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500  # Handle network errors

if __name__ == "__main__":
    app.run(debug=True)
