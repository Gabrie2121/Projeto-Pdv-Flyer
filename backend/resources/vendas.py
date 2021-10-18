from flask_restful import Resource, reqparse
from models.vendas import VendasModel

class Vendas(Resource):
    def get(self):
        return {'vendas': [venda.json() for venda in VendasModel.query.all()]}

class Venda(Resource):
    atributos = reqparse.RequestParser()
    atributos.add_argument('codcomanda')
    atributos.add_argument('desconto')
    atributos.add_argument('vlvenda')
    atributos.add_argument('valor_total')
    atributos.add_argument('id_vendedor')
    atributos.add_argument('pagamentos')
    atributos.add_argument('status')

    def get(self,cod_venda):
        venda = VendasModel.find_venda(cod_venda)
        if venda:
            return venda.json()
        return {'message':'venda not found'},404

    def post(self,cod_venda):
        if VendasModel.find_venda(cod_venda):
            return {'message': 'venda id "{}" already exists.'.format(cod_venda)},400
            
        dados = Venda.atributos.parse_args()
        venda = VendasModel(cod_venda, **dados)
        try:
            venda.save_venda()
        except:
            return {"message": "An error ocurred trying to create venda"},500
        return venda.json(),201

    def delete(self, cod_venda):
        venda = VendasModel.find_venda(cod_venda)
        if venda:
            venda.delete_venda()
            return {'message': 'Venda deletada.'}
        return {'message': 'Venda não encontrada.'}, 404