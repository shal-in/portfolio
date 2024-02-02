from flask import Flask, render_template, request, jsonify, redirect, url_for
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore
from url_shortener import (
        url_from_shortener
    )

cred = credentials.Certificate('misc/shalin-personal-website-d66ff24efaa9.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

active_collection_ref = db.collection('url-shortener-active')
deleted_collection_ref = db.collection('url-shortener-deleted')

app = Flask(__name__, static_folder='static')
app.config['SECRET_KEY'] = 'secret_key12'

# URL routes
@app.route('/')
def index():

    return render_template('index.html')

@app.route('/covid-model')
def covid_mode():

    return render_template('SEIQR Cellular Automata Model.html')

@app.route('/<shortener>')
def shortened_page(shortener):

    return render_template('shortener.html')




# APIs
@app.route('/api/check-shortener', methods=['POST'])
def check_shortener():
    shortener = request.get_json()

    url = url_from_shortener(active_collection_ref, shortener)

    if url is False:
        data = {
            'result': 'no shortener'
        }

        return jsonify(data)
    

    if 'http://' not in url or 'https://' not in url:
        url = 'https://' + url

    data = {
        'result': 'success',
        'url': url
    }

    return jsonify(data)



if __name__ == '__main__':
    app.run(port=1000, debug=True)