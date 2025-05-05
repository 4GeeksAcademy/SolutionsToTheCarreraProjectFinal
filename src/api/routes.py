from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Services, Category, Rating_cliente
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()

    if not body or not body.get("email") or not body.get("password"):
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=body["email"]).first()

    if not user or user.password != body["password"]:
        print("Invalid email or password")  # Traza para credenciales inválidas
        return jsonify({"msg": "Invalid email or password"}), 401
    access_token = create_access_token(identity=user.id)
    response = jsonify({
        "token": access_token,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name
        }
    })
    return response, 200


# ------------------- User Routes -------------------

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "image_Url": user.image_Url,
        "is_active": user.is_active
    } for user in users]), 200


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404
    return jsonify({
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "image_Url": user.image_Url,
        "is_active": user.is_active
    }), 200


@api.route('/users', methods=['POST'])
def create_user():
    body = request.get_json()
    new_user = User(
        email=body["email"],
        password=body["password"],
        name=body["name"],
        image_Url=body.get("image_Url"),
        is_active=True
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201


@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    body = request.get_json()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404
    user.email = body.get("email", user.email)
    user.name = body.get("name", user.name)
    user.image_Url = body.get("image_Url", user.image_Url)
    db.session.commit()
    return jsonify({"msg": "User updated successfully"}), 200


@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "User deleted successfully"}), 200


@api.route('/users/<int:user_id>/services', methods=['GET'])
def get_user_services(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    services = Services.query.filter_by(user_id=user_id).all()
    if not services:
        return jsonify({"msg": "No services found for this user"}), 404

    return jsonify([{
        "id": service.id,
        "name": service.name,
        "description": service.description,
        "time": service.time,
        "price": service.price,
        "image_Url": service.image_Url,
        "category_id": service.category_id
    } for service in services]), 200
# ------------------- Services Routes -------------------


@api.route('/services', methods=['GET'])
def get_services():
    services = Services.query.all()
    return jsonify([{
        "id": service.id,
        "name": service.name,
        "description": service.description,
        "time": service.time,
        "price": service.price,
        "image_Url": service.image_Url,
        "user_id": service.user_id,
        "category_id": service.category_id
    } for service in services]), 200


@api.route('/services/<int:service_id>', methods=['GET'])
def get_service(service_id):
    service = Services.query.get(service_id)
    if not service:
        return jsonify({"msg": "Service not found"}), 404
    return jsonify({
        "id": service.id,
        "name": service.name,
        "description": service.description,
        "time": service.time,
        "price": service.price,
        "image_Url": service.image_Url,
        "user_id": service.user_id,
        "category_id": service.category_id
    }), 200


@api.route('/services', methods=['POST'])
def create_service():
    body = request.get_json()
    new_service = Services(
        name=body["name"],
        description=body["description"],
        time=body["time"],
        price=body["price"],
        image_Url=body.get("image_Url"),
        user_id=body["user_id"],
        category_id=body["category_id"]
    )
    db.session.add(new_service)
    db.session.commit()
    return jsonify({"msg": "Service created successfully"}), 201


@api.route('/services/<int:service_id>', methods=['PUT'])
def update_service(service_id):
    body = request.get_json()
    service = Services.query.get(service_id)
    if not service:
        return jsonify({"msg": "Service not found"}), 404
    service.name = body.get("name", service.name)
    service.description = body.get("description", service.description)
    service.time = body.get("time", service.time)
    service.price = body.get("price", service.price)
    service.image_Url = body.get("image_Url", service.image_Url)
    db.session.commit()
    return jsonify({"msg": "Service updated successfully"}), 200


@api.route('/services/<int:service_id>', methods=['DELETE'])
def delete_service(service_id):
    service = Services.query.get(service_id)
    if not service:
        return jsonify({"msg": "Service not found"}), 404
    db.session.delete(service)
    db.session.commit()
    return jsonify({"msg": "Service deleted successfully"}), 200

# ------------------- Category Routes -------------------


@api.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{
        "id": category.id,
        "category": category.category
    } for category in categories]), 200


@api.route('/categories', methods=['POST'])
def create_category():
    body = request.get_json()
    new_category = Category(category=body["category"])
    db.session.add(new_category)
    db.session.commit()
    return jsonify({"msg": "Category created successfully"}), 201

# ------------------- Rating Routes -------------------


@api.route('/ratings', methods=['GET'])
def get_ratings():
    ratings = Rating_cliente.query.all()
    return jsonify([{
        "id": rating.id,
        "rating": rating.rating,
        "opinions": rating.opinions,
        "user_id": rating.user_id
    } for rating in ratings]), 200


@api.route('/ratings', methods=['POST'])
def create_rating():
    body = request.get_json()
    new_rating = Rating_cliente(
        rating=body["rating"],
        user_id=body["user_id"],
        opinions=body["opinions"]

    )
    db.session.add(new_rating)
    db.session.commit()
    return jsonify({"msg": "Rating created successfully"}), 201
