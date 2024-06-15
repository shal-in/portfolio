from flask import Flask, jsonify, redirect
import requests

app = Flask(__name__)

@app.route("/")
def index():
    return "index"

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
            else:
                return jsonify({"error": "URL not found in response"}), 404
        else:
            return jsonify({"error": "Failed to fetch data"}), response.status_code
        
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500  # Handle network errors

if __name__ == "__main__":
    app.run(debug=True)
