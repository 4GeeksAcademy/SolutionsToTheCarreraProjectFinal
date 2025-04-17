from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    body_request=request.get_json()
    exist = User.query.filter_by(email=body_request["email"]).first()
    if exist:
        return jsonify({"msg": "Ya existe un registro con este email"}), 400
    new_user = User (id=body_request["id"],
                     email=body_request["email"],
                     password=body_request["password"]) 
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "Usuario Creado Existosamente"}), 200 

@api.route('/login', methods=['POST'])
def login():
       body_request = request.get_json()
       exist = User.query.filter_by(
              email=body_request["email"], password=body_request["password"]).first()
       if not exist:
              return jsonify ({"msg": "Email o Password son Incorrectos"}), 400
       token = create_access_token(identity=str(exist.id))
       return jsonify({"token": token}), 200


@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
       user_token_id = get_jwt_identity()
       exist_user = User.query.filter_by(id=user_token_id).first()
       if not exist_user:
              return jsonify({"Usuario No Encontrado"}), 400
       return jsonify({"msg": "Usuario Autenticado", "user_email": exist_user.email}), 200