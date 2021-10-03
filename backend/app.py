#from resources.usuario import FindUser
from resources.comanda import pushComanda
from resources.usuario import Usuario, Usuarios
from resources.vendas import Venda, Vendas
from flask import Flask
from flask_restful import Api
from resources.produtos import Produto, Produtos
from resources.comanda import Comanda, Comandas

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app)

@app.before_first_request
def cria_banco():
    banco.create_all()

api.add_resource(Produtos,'/produtos')
api.add_resource(Produto,'/produto/<string:codigo>')

api.add_resource(Comanda, '/comanda/<string:codComanda>')
api.add_resource(Comandas,'/comandas')
api.add_resource(pushComanda,'/pushComanda/<string:codComanda>')

api.add_resource(Venda, '/venda/<string:cod_venda>')
api.add_resource(Vendas,'/vendas')

api.add_resource(Usuario,'/usuario/<string:login>')
api.add_resource(Usuarios,'/usuarios')


if __name__ == '__main__':
    from creatsqlalchemy import banco
    banco.init_app(app)
    app.run(debug=True,host='0.0.0.0')