from flask import Flask
app = Flask(__name__)

@app.route('/login')
def hello():
    return {
        "login":"admin",
        "senha":"admin"
    }
if __name__ == '__main__':
    app.run(host='127.0.0.1',port=5000)