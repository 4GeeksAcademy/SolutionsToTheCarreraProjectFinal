"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_mail import Mail, Message
from api.email_templates import service_inquiry_html
from flask_cors import CORS
from flask_jwt_extended import JWTManager


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)

app.config.update(dict(
    DEBUG=False,
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USE_SSL=False,
    MAIL_USERNAME='jjcarrera04@gmail.com',
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
))

mail = Mail(app)
app.url_map.strict_slashes = False


app.config["JWT_SECRET_KEY"] = os.getenv("jwt_KEY")
jwt = JWTManager(app)

CORS(app)

db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)


setup_admin(app)

setup_commands(app)

app.register_blueprint(api, url_prefix='/api')


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route('/send_email', methods=['POST', 'GET'])
def send_email():

    try:
        if request.method == 'POST':
            data = request.get_json()

            if not data.get('sender') or not data.get('recipient') or not data.get('message'):
                return jsonify({"msg": "Missing required fields: sender, recipient, message"}), 400

            # Usar la función para generar el HTML
            html_content = service_inquiry_html(
                data['sender'], data['recipient'], data['message'])

            msg = Message(
                subject="Service Inquiry",
                sender=data['sender'],
                recipients=[data['recipient']],
                html=html_content
            )
            mail.send(msg)
            return '', 200
        else:
            msg = Message(
                subject="Test mail",
                sender="jjcarrera04@gmail.com",
                recipients=["jjcarrera04@gmail.com"],
                body="This is a test email sent from Flask."
            )
            mail.send(msg)
            return '', 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"msg": "Failed to send email"}), 500

   # return jsonify({"message": "Email sent successfully!"}), 200


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
