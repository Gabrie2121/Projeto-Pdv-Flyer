from flask import Flask
from flask_restful import Api
from resources.produtos import Produto, Produtos

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app)

@app.before_first_request
def cria_banco():
    banco.create_all()

api.add_resource(Produtos,'/produtos')
api.add_resource(Produto,'/produto/<string:produto_id>')

if __name__ == '__main__':
    from creatsqlalchemy import banco
    banco.init_app(app)
    app.run(debug=True)