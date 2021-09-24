from creatsqlalchemy import banco

class UsuarioModel(banco.Model):
    __tablename__ = "usuario"
    
    id = banco.Column(banco.Integer,primary_key=True)
    login = banco.Column(banco.String())
    senha = banco.Column(banco.String())
    nome_funcionario = banco.Column(banco.String())


    def __init__(self,id,login,senha,nome_funcionario):
        self.id = id
        self.login = login
        self.senha = senha
        self.nome_funcionario = nome_funcionario
        

    def json(self):
        return{
            'id':self.id,
            'login':self.login,
            'senha':self.senha,
            'nome_funcionario':self.nome_funcionario
        }
    @classmethod
    def find_user(cls,login):
        user = cls.query.filter_by(login=login).first() #SELECT * FROM produtos WHERE produto = produto
        if user:
            return user
        return None

    def save_user(self):
        banco.session.add(self)#adicionar obj ao banco
        banco.session.commit()

    def update_user(self, id,login,senha,nome_funcionario):
        self.id =id
        self.login = login
        self.senha = senha
        self.nome_funcionario = nome_funcionario

    def delete_user(self):
        banco.session.delete(self)
        banco.session.commit()
