from flask import Flask, render_template

app = Flask(__name__)
app.config["AUTO_RELOAD_TEMPLATES"] = True

@app.route("/")
def view_index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(port=8009)