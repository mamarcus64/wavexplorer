# import json
# from flask import Flask, request
# from flask_cors import CORS
# app = Flask(__name__)
# CORS(app)
# # NOTE: This route is needed for the default EB health check route
# @app.route('/')
# def home():
#     return "ok"
# @app.route('/api/ping_backend')
# def get_topics():
#     return {"data": 'pong'}
# if __name__ == '__main__':
#     app.run(port=8080)

from flask import Flask
from flask_cors import CORS

# print a nice greeting.
def say_hello(username = "World"):
    return '<p>Hello %s!</p>\n' % username

# some bits of text for the page.
header_text = '''
    <html>\n<head> <title>EB Flask Test</title> </head>\n<body>'''
instructions = '''
    <p><em>Hint</em>: This is a RESTful web service! Append a username
    to the URL (for example: <code>/Thelonious</code>) to say hello to
    someone specific.</p>\n'''
home_link = '<p><a href="/">Back</a></p>\n'
footer_text = '</body>\n</html>'

# EB looks for an 'application' callable by default.
application = Flask(__name__)
CORS(application)

graph = None

# add a rule for the index page.
application.add_url_rule('/', 'index', (lambda: header_text +
    say_hello() + instructions + footer_text))

# add a rule when the page is accessed with a name appended to the site
# URL.
# application.add_url_rule('/<username>', 'hello', (lambda username:
#     header_text + say_hello(username) + home_link + footer_text))

# application.add_url_rule('/ping_backend', {'data' : 'pong'})
@application.route('/api/ping_backend')
def get_topics():
    return {"data": 'pong!'}

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    import os
    if 'final_graph.json' not in os.listdir(): # unzip file
        import zipfile
        with zipfile.ZipFile('./final_graph.zip', 'r') as zip_ref:
            zip_ref.extractall('.')
    graph = json.load(open('final_graph.json', 'r', encoding='utf-8'))
    application.run()
    print(os.listdir())