from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/introduction')
def introduction():
    return render_template('introduction.html')

@app.route('/resources')
def resources():
    return render_template('resources.html')

@app.route('/roadmap')
def roadmap():
    return render_template('roadmap.html')

@app.route('/videos')
def videos():
    return render_template('videos.html')

if __name__ == '__main__':
    app.run(debug=True) 