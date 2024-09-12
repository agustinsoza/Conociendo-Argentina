from flask import Flask, render_template, request, redirect, url_for, send_from_directory, flash, session
from flask_mysqldb import MySQL
from datetime import datetime
import os
import secrets

app = Flask(__name__)
mysql = MySQL()

app.config['MYSQL_HOST'] = ''
app.config['MYSQL_USER'] = ''
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = ''
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['SECRET_KEY'] = 'codoacodo'

UPLOADS = os.path.join('src/uploads')
app.config['UPLOADS'] = UPLOADS #Guardamos la ruta como un valor en la app

PROVINCIAS = os.path.join('src/templates/auth/provincias')
app.config['PROVINCIAS'] = PROVINCIAS

mysql.init_app(app)

@app.route('/userpic/<nombreFoto>')
def userpic(nombreFoto):
    return send_from_directory(os.path.join('uploads'), nombreFoto)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/registro', methods=["GET", "POST"])
def registro():

    conn = mysql.connection
    cur = conn.cursor()

    if request.method == "GET":
        return render_template('registro.html')
    else:

        _usuario = request.form['usuario']
        _nombre = request.form['nombre']
        _apellido = request.form['apellido']
        _correo = request.form['correo']
        _pwd = request.form['pwd']
        _pwd2 = request.form['pwd2']
        _cumpleaños = request.form['birthdate']
        _sexo = request.form['gender']
        _provincia = request.form['province']
        _localidad = request.form['city']

        if _usuario == '' or _nombre == '' or _apellido == '' or _correo == '' or _pwd == '' or _pwd2 == '':
            flash(' Debe completar los campos obligatorios! ')
            return redirect(url_for('registro'))
        else:
            sql_consulta = f'SELECT Correo_Electronico FROM usuarios WHERE Correo_Electronico = "{_correo}"'
            cur.execute(sql_consulta)
            conn.commit()
            correo = cur.fetchone()
            if correo != None:
                flash('El correo ingresado ya se encuentra registrado!', 'formulario_registro-error')
                return redirect(url_for('registro'))
            else:
                sql_create = "INSERT INTO usuarios (Nombres, Apellidos, Usuario, Correo_Electronico, Contraseña, Fecha_Nac, Sexo, Provincia, Localidad) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);"
                datos = (_nombre, _apellido, _usuario, _correo, _pwd, _cumpleaños, _sexo, _provincia, _localidad)

                cur.execute(sql_create, datos)
                conn.commit()
                cur.close()

                flash(' Registrado Correctamente! ', 'formulario_registro-check')
                return redirect('/acceder')

@app.route('/terminos')
def terminos():
    return render_template('terminos.html')

@app.route('/acceder', methods=['GET', 'POST'])
def acceder():
    conn = mysql.connection
    cur = conn.cursor()

    if request.method == 'POST':

        _user = request.form['user']
        _pwd = request.form['pwd']

        if _user == '' or _pwd == '':
            flash(' Ingrese un usuario y contraseña válido ', 'formulario_registro-error')
            return redirect(url_for('acceder'))
        else:
            sql = "SELECT * FROM usuarios WHERE Usuario = %s OR Correo_Electronico = %s AND Contraseña = %s;"
            datos = (_user, _user, _pwd)
            cur.execute(sql, datos)
            conn.commit()
            user_log = cur.fetchone()
            cur.close()
            print(user_log)

            if user_log != None:
                    session['user'] = user_log
                    return redirect(url_for('home'))     
            else:
                flash(' El usuario o contraseña es incorrecto! ', 'formulario_registro-error')
                return redirect(url_for('acceder'))
    else:
        return render_template('acceder.html')

    
# INICIO DE RUTAS PARA USUARIOS LOGUEADOS
    
@app.route('/home')
def home():
    if 'user' in session:
        usuario = session['user']
        return render_template('auth/home.html', usuario=usuario)
    else:
        return redirect('/acceder')

@app.route('/perfil')
def perfil():
    if 'user' in session:
        usuario = session['user']
        return render_template('auth/perfil.html', usuario=usuario)
    else:
        return redirect('/acceder')

@app.route('/auth/provincias/<nombreProvincia>')
def provincias(nombreProvincia):
    if 'user' in session:
        Header = {
            'buenos_aires' : ' Buenos Aires',
            'catamarca' : ' Catamarca',
            'chaco' : ' Chaco',
            'chubut' : ' Chubut',
            'cordoba' : ' Córdoba',
            'corrientes' : ' Corrientes',
            'entre_rios' : ' Entre Ríos',
            'formosa' : ' Formosa',
            'jujuy' : ' Jujuy',
            'la_pampa' : ' La Pampa',
            'la_rioja' : ' La Rioja',
            'mendoza' : ' Mendoza',
            'misiones' : ' Misiones',
            'neuquen' : ' Neuquen',
            'rio_negro' : ' Río Negro',
            'salta' : ' Salta',
            'san_juan' : ' San Juan',
            'san_luis' : ' San Luis',
            'santa_cruz' : ' Santa Cruz',
            'santa_fe' : ' Santa Fe',
            's_del_estero' : ' Santiago del Estero',
            'tierra_del_fuego' : ' Tierra del Fuego',
            'tucuman' : ' Tucuman'
        }
        Titulo = {
            'buenos_aires' : 'Buenos Aires',
            'catamarca' : 'Catamarca',
            'chaco' : 'Chaco',
            'chubut' : 'Chubut',
            'cordoba' : 'Córdoba',
            'corrientes' : 'Corrientes',
            'entre_rios' : 'Entre Ríos',
            'formosa' : 'Formosa',
            'jujuy' : 'Jujuy',
            'la_pampa' : 'La Pampa',
            'la_rioja' : 'La Rioja',
            'mendoza' : 'Mendoza',
            'misiones' : 'Misiones',
            'neuquen' : 'Neuquen',
            'rio_negro' : 'Río Negro',
            'salta' : 'Salta',
            'san_juan' : 'San Juan',
            'san_luis' : 'San Luis',
            'santa_cruz' : 'Santa Cruz',
            'santa_fe' : 'Santa Fe',
            's_del_estero' : 'Santiago del Estero',
            'tierra_del_fuego' : 'Tierra del Fuego',
            'tucuman' : 'Tucuman'
        }

        if nombreProvincia in Header:
            return render_template(f'auth/provincias/{nombreProvincia}.html',header=Header[nombreProvincia], titulo=Titulo[nombreProvincia], imagen=nombreProvincia)
        else:
            return '<h1>Page not found</h1>', 404
    else:
        return redirect('/acceder')

@app.route('/update', methods=["POST"])
def update():
    if 'user' in session:
        if request.method == 'POST':

            _id = request.form['ID']
            _usuario = request.form['usuario']
            _nombre = request.form['nombre']
            _apellido = request.form['apellido']
            _correo = request.form['correo']
            _pwd = request.form['pwd']
            _pwd2 = request.form['pwd2']
            _cumpleaños = request.form['birthdate']
            _sexo = request.form['gender']
            _provincia = request.form['province']
            _localidad = request.form['city']

            conn = mysql.connection
            cur = conn.cursor()

            if _cumpleaños == '':
                if _usuario == '' or _nombre == '' or _apellido == '' or _correo == '' or _pwd == '' or _pwd2 == '':
                    flash(' Debe completar todos los campos para actualizar ', 'formulario_registro-error')
                    return redirect('/perfil')
                else:
                    sql_update = "UPDATE usuarios SET Usuario = %s, Nombres = %s, Apellidos = %s, Correo_Electronico = %s, Contraseña = %s, Sexo = %s, Provincia = %s, Localidad = %s WHERE ID = %s"
                    datos = (_usuario, _nombre, _apellido, _correo, _pwd, _sexo, _provincia, _localidad, _id)

                    cur.execute(sql_update, datos)
                    conn.commit()

                    sql = f'SELECT * FROM usuarios WHERE ID = {_id}'
                    cur.execute(sql)
                    conn.commit()
                    user_log = cur.fetchone()
                    cur.close()
                    session['user'] = user_log
                cur.close()
                flash(' Datos modificados correctamente! ', 'formulario_registro-check') 
                return redirect('/perfil')
            else:
                if _usuario == '' or _nombre == '' or _apellido == '' or _correo == '' or _pwd == '' or _pwd2 == '':
                    flash(' Debe completar todos los campos para actualizar ', 'formulario_registro-error')
                    return redirect('/perfil')
                else:
                    sql_update = "UPDATE usuarios SET Usuario = %s, Nombres = %s, Apellidos = %s, Correo_Electronico = %s, Contraseña = %s, Fecha_Nac = %s, Sexo = %s, Provincia = %s, Localidad = %s WHERE ID = %s"
                    datos = (_usuario, _nombre, _apellido, _correo, _pwd, _cumpleaños, _sexo, _provincia, _localidad, _id)

                    cur.execute(sql_update, datos)
                    conn.commit()

                    sql = f'SELECT * FROM usuarios WHERE ID = {_id}'
                    cur.execute(sql)
                    conn.commit()
                    user_log = cur.fetchone()
                    cur.close()
                    session['user'] = user_log
                cur.close()
                flash(' Datos modificados correctamente! ', 'formulario_registro-check')
                return redirect('/perfil')
    else:
        return redirect('/')

@app.route('/updatefoto', methods=["POST"])
def update_foto():
    if 'user' in session:
        if request.method == 'POST':

            usuario = session['user']
            _foto = request.files['foto']
            codigo_unico = secrets.token_hex(16)

            conn = mysql.connection
            cur = conn.cursor()

            if _foto.filename != '':
                nuevoNombreFoto = codigo_unico + '_' + _foto.filename
                _foto.save("src/uploads/" + nuevoNombreFoto)

                sql = f'SELECT Foto_Perfil FROM usuarios WHERE ID = {usuario['ID']}'
                cur.execute(sql)
                conn.commit()

                nombreFoto = cur.fetchone()
                borrarEstaFoto = os.path.join(app.config['UPLOADS'], nombreFoto['Foto_Perfil'])
                if nombreFoto['Foto_Perfil'] != 'perfil.jpg':
                    try:
                        os.remove(os.path.join(app.config['UPLOADS'], nombreFoto['Foto_Perfil']))
                    except:
                        pass

                sql_foto = f'UPDATE usuarios SET Foto_Perfil = "{nuevoNombreFoto}" WHERE ID = {usuario['ID']};'
                cur.execute(sql_foto)
                conn.commit()

                sql = f'SELECT * FROM usuarios WHERE ID = {usuario['ID']}'
                cur.execute(sql)
                conn.commit()
                user_log = cur.fetchone()
                cur.close()
                session['user'] = user_log
                cur.close()
                flash(' Foto modificada correctamente! ', 'formulario_registro-check') 
                return redirect('/perfil')

@app.route('/delete/<id>')
def delete(id):
    if 'user' in session:
        conn = mysql.connection
        cur = conn.cursor()

        sql = f'SELECT Foto_Perfil FROM usuarios WHERE ID = {id}'
        cur.execute(sql)
        nombreFoto = cur.fetchone()

        if nombreFoto['Foto_Perfil'] != 'perfil.jpg':
            try:
                os.remove(os.path.join(app.config['UPLOADS'], nombreFoto['Foto_Perfil']))
            except:
                pass

        sql_delete = f'DELETE FROM usuarios WHERE ID = {id};'

        cur.execute(sql_delete)
        conn.commit()
        cur.close()

        session.clear()
        flash(' Usuario eliminado correctamente ', 'formulario_registro-error')
        return redirect('/acceder')

@app.route('/delete_foto/<id>')
def delete_foto(id):
    if 'user' in session:
        conn = mysql.connection
        cur = conn.cursor()

        sql = f'SELECT Foto_Perfil FROM usuarios WHERE ID = {id}'
        cur.execute(sql)
        nombreFoto = cur.fetchone()

        if nombreFoto['Foto_Perfil'] != 'perfil.jpg':
            try:
                os.remove(os.path.join(app.config['UPLOADS'], nombreFoto['Foto_Perfil']))
            except:
                pass

        sql_foto = f'UPDATE usuarios SET Foto_Perfil = "perfil.jpg" WHERE ID = {id};'
        cur.execute(sql_foto)
        conn.commit()

        sql = f'SELECT * FROM usuarios WHERE ID = {id}'
        cur.execute(sql)
        conn.commit()
        user_log = cur.fetchone()
        cur.close()
        session['user'] = user_log
        cur.close()

        flash(' Foto modificada correctamente! ', 'formulario_registro-check') 
        return redirect(url_for('perfil'))


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/acceder')

if __name__ == '__main__':
    app.run(debug=True)
