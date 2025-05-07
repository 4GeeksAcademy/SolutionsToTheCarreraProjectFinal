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

    newPassword = body.get("password")
    if newPassword:
        user.password = newPassword

    db.session.commit()
    return jsonify({"msg": "User updated successfully"}), 200


@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    # Delete all ratings associated with the user
    ratings = Rating_cliente.query.filter_by(user_id=user_id).all()
    for rating in ratings:
        db.session.delete(rating)

    # Delete all services associated with the user
    services = Services.query.filter_by(user_id=user_id).all()
    for service in services:
        db.session.delete(service)

    # Delete the user
    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "User, associated services, and ratings deleted successfully"}), 200


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
        "user": {
            "id": service.user.id,
            "name": service.user.name,
            "email": service.user.email,
            "image_Url": service.user.image_Url,
            "is_active": service.user.is_active
        } if service.user else None,
        "category": {
            "id": service.category.id,
            "name": service.category.category
        } if service.category else None
    } for service in services]), 200


@api.route('/services/<int:service_id>', methods=['GET'])
def get_service(service_id):
    service = Services.query.get(service_id)
    if not service:
        return jsonify({"msg": "Service not found"}), 404

    user = User.query.get(service.user_id)
    category = Category.query.get(service.category_id)

    return jsonify({
        "id": service.id,
        "name": service.name,
        "description": service.description,
        "time": service.time,
        "price": service.price,
        "image_Url": service.image_Url,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "image_Url": user.image_Url,
            "is_active": user.is_active
        } if user else None,
        "category": {
            "id": category.id,
            "name": category.category
        } if category else None
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


@api.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '').lower()

    if not query:
        services = Services.query.all()
    else:
        services = Services.query.filter(
            (Services.name.ilike(f"%{query}%")) | (
                Services.description.ilike(f"%{query}%"))
        ).all()

    results = []
    for service in services:

        user = User.query.get(service.user_id)

        ratings = Rating_cliente.query.filter_by(user_id=service.user_id).all()
        if ratings:
            average_rating = sum(
                rating.rating for rating in ratings) / len(ratings)
        else:
            average_rating = 0

        results.append({
            "service": {
                "id": service.id,
                "name": service.name,
                "description": service.description,
                "time": service.time,
                "price": service.price,
                "image_Url": service.image_Url,
                "category_id": service.category_id
            },
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "image_Url": user.image_Url,
                "is_active": user.is_active,
                "average_rating": round(average_rating, 2)
            } if user else None
        })

    return jsonify(results), 200


@api.route('/insert-dummy-data', methods=['POST'])
def insert_dummy_data():
    try:
        # Crear categorías orientadas al sector industrial
        categories = [
            Category(category="Manufacturación"),
            Category(category="Construcción"),
            Category(category="Energía"),
            Category(category="Transporte"),
            Category(category="Salud"),
            Category(category="Tecnología"),
            Category(category="Agricultura"),
            Category(category="Comercio Minorista")
        ]
        db.session.add_all(categories)
        db.session.commit()

        # Lista de nombres y apellidos españoles
        nombres = [
            "Carlos García", "María Fernández", "José Martínez", "Ana López",
            "Luis Sánchez", "Carmen González", "Javier Rodríguez", "Laura Pérez",
            "Antonio Gómez", "Isabel Díaz", "Manuel Hernández", "Lucía Romero",
            "Francisco Torres", "Elena Ruiz", "Miguel Jiménez", "Sara Morales",
            "Juan Navarro", "Patricia Ortega", "Pedro Castro", "Sofía Delgado"
        ]

        image_urls = [
            "https://img.freepik.com/psd-gratis/retrato-estudio-joven-adolescente_23-2150162247.jpg?semt=ais_hybrid&w=740",
            "https://st3.depositphotos.com/1003642/16677/i/450/depositphotos_166778988-stock-photo-portrait-senior-man.jpg",
            "https://www.alimarket.es/media/images/2020/detalle_art/322119/197664_high_original.png",
            "https://upload.wikimedia.org/wikipedia/commons/d/d9/Roberto_Leal2013.jpg"
        ]

        users = []
        for i, nombre in enumerate(nombres):
            user = User(
                email=f"{nombre.split()[0].lower()}{i+1}@example.com",
                password="123456",
                name=nombre,
                # Alternar entre las URLs
                image_Url=image_urls[i % len(image_urls)],
                is_active=True
            )
            users.append(user)
        db.session.add_all(users)
        db.session.commit()

        services = []
        for user in users:
            for j in range(4):
                categoria = categories[j % len(categories)]
                service = Services(
                    name=f"Servicio de {categoria.category} por {user.name}",
                    description=f"{user.name} ofrece un servicio especializado en {categoria.category.lower()} con alta calidad y eficiencia.",
                    time="2 horas",
                    price=100 + j * 20,
                    # Alternar entre las URLs
                    image_Url=image_urls[(j + user.id) % len(image_urls)],
                    user_id=user.id,
                    category_id=categoria.id  # Asignar categorías cíclicamente
                )
                services.append(service)
        db.session.add_all(services)
        db.session.commit()

        # Añadir ratings a los usuarios
        ratings = []
        for user in users:
            for k in range(3):  # Cada usuario tiene 3 ratings
                rating = Rating_cliente(
                    rating=(k + 3) % 5 + 1,  # Generar ratings entre 1 y 5
                    opinions=f"Excelente servicio proporcionado por {user.name}.",
                    user_id=user.id
                )
                ratings.append(rating)
        db.session.add_all(ratings)
        db.session.commit()

        return jsonify({"msg": "Datos generados exitosamente con nombres reales"}), 200
    except Exception as e:
        print(f"Error al insertar datos: {e}")
        return jsonify({"msg": "Error al insertar datos"}), 500
