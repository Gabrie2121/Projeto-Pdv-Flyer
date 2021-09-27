from datetime import timezone
from creatsqlalchemy import banco
from datetime import datetime
class ComandaModel(banco.Model):
    __tablename__ = "comandas"
    codComanda = banco.Column(banco.String())
    id = banco.Column(banco.Integer(), primary_key=True)
    codprod = banco.Column(banco.Integer())
    qtde = banco.Column(banco.Float(precision=3))
    id_vendedor = banco.Column(banco.Integer())
    status = banco.Column(banco.Integer(),default = 0)

    def __init__(self,codComanda,id,codprod,qtde,id_vendedor,status):
        self.codComanda = codComanda
        self.id = id
        self.codprod = codprod
        self.qtde = qtde
        self.id_vendedor = id_vendedor
        self.status = status

    def json(self):
        return{
            'codComanda':self.codComanda,
            'id':self.id,
            'codprod':self.codprod,
            'qtde':self.qtde,
            'id_vendedor':self.id_vendedor,
            'status':self.status
        }

    @classmethod
    def find_comanda(cls,codComanda):
        findComanda = cls.query.filter_by(codComanda=codComanda).all()
        if findComanda:
            return findComanda
        return None
    @classmethod
    def find_one_comanda(cls,codComanda):
        findComanda = cls.query.filter_by(codComanda=codComanda).first()
        if findComanda:
            return findComanda
        return None

    def save_venda(self):
        banco.session.add(self)
        banco.session.commit()

    def delete_venda(self):
        banco.session.delete(self)
        banco.session.commit()