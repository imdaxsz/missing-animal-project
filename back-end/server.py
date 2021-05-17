from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
	return "Hello World!"

if __name__ == "__main__":
	app.run()

# 여기에다가 미희가 로컬에서 썼던 코드를 옮겨 적으면 됨 