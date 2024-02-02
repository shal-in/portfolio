from datetime import datetime
from firebase_admin import firestore

# retrieve url from shortener
def url_from_shortener(active_collection_ref, shortener):
    documents = active_collection_ref.get()

    for document in documents:
        doc_data = document.to_dict()

        if doc_data.get('shortener') == shortener:
            url = doc_data.get('url')

            return url
        
    return False