import frida
import sys

device = frida.get_usb_device()
app_prev = None
session = None
js_file = ""
if len(sys.argv) == 1:
    js_file = open("hash_interceptor.js").read() + open("crypto_interceptor.js").read()
elif sys.argv[1] == "hash":
    js_file = open("hash_interceptor.js").read()
elif sys.argv[1] == "crypto":
    js_file = open("crypto_interceptor.js").read()
while True: ## placeholder
    app = device.get_frontmost_application(scope="full")
    ## MAKE SURE THAT FRIDA-SERVER IS RUNNING
    if app is not None and app != app_prev:
        if session is not None:
            session.detach()
        session = device.attach(app.pid)
        script = session.create_script(js_file)
        script.load()
    app_prev = app