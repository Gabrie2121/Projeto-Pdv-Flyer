import sqlite3

connection = sqlite3.connect('../banco.db')
cursor = connection.cursor()

#cria_table = 'CREATE TABLE IF NOT EXISTS produto (codigo integer PRIMARY KEY, codbarras);'

cria_prod = "INSERT INTO produto VALUES(null,'791293022567',15.50,'Rexona Men V8')"
#cursor.execute(cria_table)
cursor.execute(cria_prod)
connection.commit()
connection.close()