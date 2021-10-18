from creatsqlalchemy import banco

class VendasModel(banco.Model):
    __tablename__= "vendas"

    cod_venda = banco.Column(banco.Integer(),primary_key=True)
    codcomanda = banco.Column(banco.String())
    desconto = banco.Column(banco.Float(precision=2))
    vlvenda = banco.Column(banco.Float(precision=2))
    valor_total = banco.Column(banco.Float(precision=2))
    id_vendedor = banco.Column(banco.Integer())
    pagamentos = banco.Column(banco.String())
    status = banco.Column(banco.Integer())

    def __init__(self, cod_venda,codcomanda,desconto,vlvenda,valor_total,id_vendedor,pagamentos,status):
        self.cod_venda = cod_venda
        self.codcomanda = codcomanda
        self.desconto = desconto
        self.vlvenda = vlvenda
        self.valor_total = valor_total
        self.id_vendedor = id_vendedor
        self.pagamentos = pagamentos
        self.status = status
    
    def json(self):
        return{
            'cod_venda':self.cod_venda,
            'codcomanda':self.codcomanda,
            'desconto':self.desconto,
            'vlvenda':self.vlvenda,
            'valor_total':self.valor_total,
            'id_vendedor':self.id_vendedor,
            'pagamentos':self.pagamentos,
            'status':self.status
        }
    @classmethod
    def find_venda(cls,cod_venda):
        findvenda = cls.query.filter_by(cod_venda=cod_venda).first()
        if findvenda:
            return findvenda
        return None

    def save_venda(self):
        banco.session.add(self)
        banco.session.commit()

    def update_venda(self, nome, valor):
        self.nome = nome
        self.valor = valor

    def delete_venda(self):
        banco.session.delete(self)
        banco.session.commit()