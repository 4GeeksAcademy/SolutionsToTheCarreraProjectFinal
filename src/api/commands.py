
import click
from api.models import db, User, Services, Category

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration
with youy database, for example: Import the price of bitcoin every night as 12am
"""


def setup_commands(app):
    """
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users")  # name of our command
    @click.argument("count")  # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        print("Inserting test data...")

        # Crear categorías de ejemplo
        category1 = Category(category="Technology")
        category2 = Category(category="Health")
        db.session.add_all([category1, category2])
        db.session.commit()

        # Crear usuarios de ejemplo
        user1 = User(email="john.doe@example.com",
                     password="123456", is_active=True)
        user2 = User(email="jane.smith@example.com",
                     password="123456", is_active=True)
        db.session.add_all([user1, user2])
        db.session.commit()

        # Crear servicios de ejemplo
        service1 = Services(
            name="Web Development",
            description="Building modern websites",
            time="2 hours",
            price=150,
            image_Url="https://via.placeholder.com/150",
            user_id=user1.id,
            category_id=category1.id
        )
        service2 = Services(
            name="Personal Training",
            description="One-on-one fitness coaching",
            time="1 hour",
            price=50,
            image_Url="https://via.placeholder.com/150",
            user_id=user2.id,
            category_id=category2.id
        )
        db.session.add_all([service1, service2])
        db.session.commit()

        print("Test data inserted successfully!")