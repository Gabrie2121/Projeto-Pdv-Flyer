from flask_restful import Resource, reqparse
from models.usuario import UsuarioModel

class Usuarios(Resource):
    def get(self):
        return {'usuario': [usuario.json() for usuario in UsuarioModel.query.all()]}#select * from produtos

class Usuario(Resource):
    atributos = reqparse.RequestParser()
    atributos.add_argument('login')
    atributos.add_argument('senha')
    atributos.add_argument('nome_funcionario')

    def get(self,id):
        usuario = UsuarioModel.find_user(id)
        if usuario:
            return usuario.json()
        return {'message':'User not found'},404
    
    def post(self,id):
        if UsuarioModel.find_user(id):
            return {f'message':'User id {id} already exists.'},400
        dados = Usuario.atributos.parse_args()
        user = UsuarioModel(id,**dados)
        try:
            user.save_user()
        except:
            return {'message': 'An error ocurred trying to create user'},500
        return user.json(),201
    def put(self,id):
        dados = Usuario.atributos.parse_args()
        user = UsuarioModel(id, **dados)

        usuario_encontrado = UsuarioModel.find_produto(codigo)
        if usuario_encontrado:
            usuario_encontrado.update_user(**dados)
            usuario_encontrado.save_user()
            return usuario_encontrado.json(), 200
        user.save_user()
        return user.json(), 201

    def delete(self, id):
        user = UsuarioModel.find_produto(id)
        if user:
            user.delete_user()
            return {'message': 'Usuario deletado.'}
        return {'message': 'Usuario não encontrado.'}, 404