from flask_restful import Resource, reqparse
from models.comanda import ComandaModel

class Comandas(Resource):
    def get(self):
        return{'comandas':[venda.json() for venda in ComandaModel.query.all()]}

class Comanda(Resource):
    atributos = reqparse.RequestParser()
    atributos.add_argument('codprod')
    atributos.add_argument('qtde')
    atributos.add_argument('id_vendedor')
    atributos.add_argument('status')

    def get(self,codComanda):
        comanda = ComandaModel.find_comanda(codComanda)
        if comanda:
            return comanda.json()
        return {'message':'Comanda not Found'},404
    
    def post(self,codComanda):
        dados = Comanda.atributos.parse_args()
        comanda = ComandaModel(codComanda,**dados)
        try:
            comanda.save_venda()
        except:
            return {'message': 'An Error Ocurred Trying to create comanda'},500
        return comanda.json(),201
        
    def delete(self,codComanda):
        comanda = ComandaModel.find_comanda(codComanda)
        if comanda:
            comanda.delete_venda()
            return {'message':'Comanda deletada'}
        return {'message':'Comanda não encontrada'},404
