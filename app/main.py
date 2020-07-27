from flask import Flask, request
# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_folder='static')

@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')