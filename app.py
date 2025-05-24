from flask import Flask, jsonify, render_template
import json

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/listings")
def listings():
    with open("data.json") as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
