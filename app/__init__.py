from flask import Flask
from config import Config
from flask_bootstrap import Bootstrap
from flask_moment import Moment



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    bootstrap = Bootstrap(app)
    moment = Moment(app)

    return app

app = create_app()

from app import routes

