from flask_restful import Resource, reqparse
from models.produtos import ProdutosModel

class Produtos(Resource):
    def get(self):
        return {'produtos': [produto.json() for produto in ProdutosModel.query.all()]}#select * from produtos


class Produto(Resource):
    atributos = reqparse.RequestParser()
    atributos.add_argument('nome')
    atributos.add_argument('valor')
    
    def get(self,codigo):
        produto = ProdutosModel.find_produto(codigo)
        if produto:
            return produto.json()
        return {'message': 'Produto not found'},404

    def post(self,codigo):
        if ProdutosModel.find_produto(codigo):
            return {'message': 'Produto id "{}" already exists.'.format(codigo)},400
            
        dados = Produto.atributos.parse_args()
        produto = ProdutosModel(codigo, **dados)
        try:
            produto.save_produto()
        except:
            return {"message": "An error ocurred trying to create produto"},500
        return produto.json(),201

    def put(self, codigo):
        dados = Produto.atributos.parse_args()
        produto = ProdutosModel(codigo, **dados)

        produto_encontrado = ProdutosModel.find_produto(codigo)
        if produto_encontrado:
            produto_encontrado.update_produto(**dados)
            produto_encontrado.save_produto()
            return produto_encontrado.json(), 200
        produto.save_produto()
        return produto.json(), 201

    def delete(self, codigo):
        produto = ProdutosModel.find_produto(codigo)
        if produto:
            produto.delete_produto()
            return {'message': 'Produto deletado.'}
        return {'message': 'Produto não encontrado.'}, 404