from flask_restful import Resource
from creatsqlalchemy import banco

class vendasModel(banco.Model):
    __tablename__= "vendas"

    cod_venda = banco.Column(banco.string(),primary_key=True)
    valor_total = banco.Column(banco.Float(precision=2))
    codcomanda = banco.Column(banco.string())

    def __init__(self, cod_venda,valor_total,codcomanda):
        self.cod_venda = cod_venda
        self.valor_total = valor_total
        self.codcomanda = codcomanda
    
    def json(self):
        return{
            'cod_venda':self.cod_venda,
            'valor_total':self.valor_total,
            'codcomanda':self.codcomanda
        }
    @classmethod
    def find_venda(cls,cod_venda):
        venda = cls.query.filter_by(cod_venda=cod_venda).first()