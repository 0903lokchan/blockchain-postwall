from flask import render_template, request, render_template, url_for
from flask import current_app
from flask.helpers import flash
from app import app
from app.functions import get_posts

@app.route('/', methods=['GET', 'POST'])
def homepage():

    return render_template('postwall/main.html', title='Homepage')

@app.route('/user/<address>')
def user(address):
    posts = get_posts(address)

    return render_template('postwall/user.html', title='Profile', address = address, posts = posts)