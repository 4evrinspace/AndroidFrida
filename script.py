import frida
import sys
import time

attached_time = 30
device = frida.get_usb_device()
app_prev_pid = None
session = None
js_file = ""
if len(sys.argv) == 1:
    js_file = open("test.js").read()
elif sys.argv[1] == "-h" or sys.argv[1] == "--hash":
    js_file = open("hash_interceptor.js").read()
elif sys.argv[1] == "-c" or sys.argv[1] == "--crypto":
    js_file = open("crypto_interceptor.js").read()
elif sys.argv[1] == "-t" or sys.argv[1] == "--telegram":
    js_file = open("telegram_interceptor.js").read()
elif sys.argv[1] == "-u" or sys.argv[1] == "--universal":
    js_file = "var intercepted_package = '{}';\n".format(sys.argv[2]) + open("universal_interceptor.js").read()
start = time.perf_counter()
while time.perf_counter() - start < attached_time: ##Should be only like this, in other cases, ends after some iterations. That's bad for tracing
    app = device.get_frontmost_application(scope="full")
    
    ## MAKE SURE THAT FRIDA-SERVER IS RUNNING
    if app is not None:
        if app.pid != app_prev_pid:
            if session is not None:
                session.detach()
            print("Attached to :",app.name)
            session = device.attach(app.pid)
            script = session.create_script(js_file)
            script.load()
        app_prev_pid = app.pid
