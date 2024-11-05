from flask import Flask, render_template, request, jsonify
import data
import random
app = Flask(__name__)
realHeadlines = data.realHeadlines
fakeHeadlines = data.fakeHeadlines

@app.route("/")
def index():
    return render_template("index.html")


@app.route('/get_headlines')
def get_headlines():
    
    headlineReal = random.choice(realHeadlines)
    headlineFake1 = random.choice(fakeHeadlines)
    headlineFake2 = random.choice(fakeHeadlines)
    
    
    headlines = [headlineReal, headlineFake1, headlineFake2]
    response = jsonify(headlines)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/correct.mp3")
def correct():
    return app.send_static_file("correct.mp3")

@app.route("/wrong.mp3")
def wrong():
    return app.send_static_file("wrong.mp3")

@app.route("/newspaper-texture.jpg")
def texture():
    return app.send_static_file("newspaper-texture.jpg")


if __name__ == '__main__':
    app.run()