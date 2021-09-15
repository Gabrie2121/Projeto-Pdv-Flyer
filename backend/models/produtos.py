from creatsqlalchemy import banco

class ProdutosModel(banco.Model):
    __tablename__ = "produtos"
    
    produto_id = banco.Column(banco.String, primary_key=True)
    codigo = banco.Column(banco.String(13))
    nome = banco.Column(banco.String(80))
    valor = banco.Column(banco.Float(precision=2))


    def __init__(self,produto_id,codigo, nome, valor):
        self.produto_id = produto_id
        self.codigo = codigo
        self.nome = nome
        self.valor = valor

    def json(self):
        return{
            'produto_id':self.produto_id,
            'codigo':self.codigo,
            'nome':self.nome,
            'valor':self.valor
        }
    @classmethod
    def find_produto(cls,produto_id):
        produto = cls.query.filter_by(produto_id=produto_id).first() #SELECT * FROM produtos WHERE produto = produto
        if produto:
            return produto
        return None

    def save_produto(self):
        banco.session.add(self)#adicionar obj ao banco
        banco.session.commit()

    def update_produto(self, codigo, nome, valor):
        self.codigo = codigo
        self.nome = nome
        self.valor = valor

    def delete_produto(self):
        banco.session.delete(self)
        banco.session.commit()
