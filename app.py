from flask import Flask, jsonify, redirect, send_file, make_response, render_template
import requests
import os
import base64
import datetime

app = Flask(__name__)
DEFAULT_API_URL = 'https://short.byshalin.com/api'

if not os.path.exists("/date.txt"):
    date = datetime.datetime.now()
    formatted_date = date.strftime("%d/%m/%Y")
    

@app.route("/")
def index():
    return render_template("portfolio.html")

# Define other routes above the shortener route 
@app.route("/<shortener>")
def shortener_page(shortener):
    params = {"shortener": shortener}

    try:
        response = requests.get(f'{DEFAULT_API_URL}/get-shortener', params=params)

        if response.status_code == 200:
            data = response.json()

            if data["type"] == "url":
                url = data["content"]

                return redirect(url)
            
            elif data["type"] == "file":
                content = data["content"]
                file_name = data["file_name"]
                content_type = data["content_type"]

                print (f'content_type: {content_type}')
                print (f'file_name: {file_name}')

                decoded_content = base64.b64decode(content)

                file = make_response(decoded_content)
                file.headers['Content-Type'] = content_type
                file.headers['Content-Disposition'] = f'inline; filename="{file_name}"; filename*=UTF-8\'\'{file_name}'

                # Debug prints
                print(f'Response Headers: {file.headers}')

                return file

        else:
            return jsonify({"error": "Failed to fetch data"}), response.status_code
        
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500  # Handle network errors

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8081))
    app.run(debug=True, host='0.0.0.0', port=port)
