from fastreact import FastReact

app = FastReact(
    react_dir="frontend",
    build_dir="frontend_build",
    react_prefix="ui",
)

# -- React page routes -- browser only
# Postman/curl -> 405 Not Allowed

@app.get("/ui/")
def home(): pass

@app.get("/ui/about")
def about(): pass


# -- Normal data routes -- everyone

@app.get("/status")
def status():
    return {"status": "online"}
