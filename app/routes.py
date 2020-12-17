from flask import render_template, request, render_template, url_for
from flask import current_app
from flask.helpers import flash, send_from_directory
from app import app
from app.functions import get_posts

@app.route('/')
def landing():
   return render_template('postwall/landing.html', title='Welcome to the Wall!')

@app.route('/documentation')
def documentation():
   return render_template('postwall/documentation.html', title='How to use')


@app.route('/home', methods=['GET', 'POST'])
def homepage():

    return render_template('postwall/main.html', title='Homepage')

@app.route('/user/<address>')
def user(address):
    posts = get_posts(address)

    return render_template('postwall/user.html', title='Profile', address = address, posts = posts)

@app.route('/static/Postwall.json')
def postwall_artifact():
   return send_from_directory('static', 'Postwall.json')