from flask import Flask,request,jsonify
import util
from flask_cors import CORS
import os



app = Flask(__name__)
CORS(app,origins="*")

@app.route('/transcript',methods = ['post'])
def classify_ferti():  
    data = request.json  
    type = data['input_type']
    i_data = data['input_data']

    
    response = jsonify({
        'Response':util.meeting_summarizer(input_type=type,input_data=i_data)
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    
    return response 

if __name__=='__main__':
    port = int(os.environ.get('PORT', 5000))  # Get port from environment variable
    app.run(host='0.0.0.0', port=port, debug=True)
