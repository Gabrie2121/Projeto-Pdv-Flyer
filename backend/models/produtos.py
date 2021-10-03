from creatsqlalchemy import banco

class ProdutosModel(banco.Model):
    __tablename__ = "produtos"
    
    codigo = banco.Column(banco.String(13), primary_key=True)
    nome = banco.Column(banco.String(80))
    valor = banco.Column(banco.Float(precision=2))


    def __init__(self,codigo, nome, valor):
        self.codigo = codigo
        self.nome = nome
        self.valor = valor

    def json(self):
        return{
            'codigo':self.codigo,
            'nome':self.nome,
            'valor':self.valor
        }
        
    @classmethod
    def find_produto(cls,codigo):
        produto = cls.query.filter_by(codigo=codigo).first() #SELECT * FROM produtos WHERE produto = produto
        if produto:
            return produto
        return None

    def save_produto(self):
        banco.session.add(self)#adicionar obj ao banco
        banco.session.commit()

    def update_produto(self, nome, valor):
        self.nome = nome
        self.valor = valor

    def delete_produto(self):
        banco.session.delete(self)
        banco.session.commit()
