from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import hashlib

# 初始化 Flask 应用
app = Flask(__name__)
CORS(app)  # 开启跨域

# 配置 SQLite 数据库
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

# 创建用户模型
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

# 创建数据库表
with app.app_context():
    db.create_all()

# 密码加密函数
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# 注册接口
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': '用户名和密码不能为空'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': '用户已存在'}), 400

    user = User(username=username, password_hash=hash_password(password))
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': '注册成功'}), 200

# 登录接口
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': '用户名和密码不能为空'}), 400

    user = User.query.filter_by(username=username, password_hash=hash_password(password)).first()
    if user:
        return jsonify({'message': '登录成功'}), 200
    else:
        return jsonify({'message': '用户名或密码错误'}), 401

# 启动应用
if __name__ == '__main__':
    app.run(debug=True)
