from datetime import timezone
from creatsqlalchemy import banco
from datetime import datetime
class ComandaModel(banco.Model):
    __tablename__ = "vendasi"
    codComanda = banco.Column(banco.String(), primary_key=True)
    codprod = banco.Column(banco.Integer())
    codvenda = banco.Column(banco.Integer())
    qtde = banco.Column(banco.Float(precision=3))
    vlvenda = banco.Column(banco.Float(precision=2))

    def __init__(self,codComanda,codprod,codvenda,qtde,vlvenda):
        self.codComanda = codComanda
        self.codprod = codprod
        self.codvenda = codvenda
        self.qtde = qtde
        self.vlvenda = vlvenda

    def json(self):
        return{
            'codComanda':self.codComanda,
            'codprod':self.codprod,
            'codvenda':self.codvenda,
            'qtde':self.qtde,
            'vlvenda':self.vlvenda
        }

    @classmethod
    def find_comanda(cls,codComanda):
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