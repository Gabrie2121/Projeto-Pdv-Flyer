from flask_restful import Resource, reqparse
from models.usuario import UsuarioModel

class Usuarios(Resource):
    def get(self):
        return {'usuario': [usuario.json() for usuario in UsuarioModel.query.all()]}#select * from produtos

class Usuario(Resource):
    atributos = reqparse.RequestParser()
    atributos.add_argument('id')
    atributos.add_argument('senha')
    atributos.add_argument('nome_funcionario')

    def get(self,login):
        usuario = UsuarioModel.find_user(login)
        if usuario:
            return usuario.json()
        return {'message':'User not found'},404
    
    def post(self,login):
        if UsuarioModel.find_user(login):
            return {f'message':'User id {login} already exists.'},400
        dados = Usuario.atributos.parse_args()
        user = UsuarioModel(login,**dados)
        try:
            user.save_user()
        except:
            return {'message': 'An error ocurred trying to create user'},500
        return user.json(),201
    def put(self,login):
        dados = Usuario.atributos.parse_args()
        user = UsuarioModel(login, **dados)

        usuario_encontrado = UsuarioModel.find_produto(login)
        if usuario_encontrado:
            usuario_encontrado.update_user(**dados)
            usuario_encontrado.save_user()
            return usuario_encontrado.json(), 200
        user.save_user()
        return user.json(), 201

    def delete(self, login):
        user = UsuarioModel.find_user(login)
        if user:
            user.delete_user()
            return {'message': 'Usuario deletado.'}
        return {'message': 'Usuario não encontrado.'}, 404