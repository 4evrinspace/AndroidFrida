import frida
##TODO: Make modes of working
device = frida.get_usb_device()
app_prev = None
session = None
hash_interceptor = open("hash_interceptor.js").read()
crypto_interceptor = open("crypto_interceptor.js").read()
while True: ## placeholder
    app = device.get_frontmost_application(scope="full")
    ## MAKE SURE THAT FRIDA-SERVER IS RUNNING
    if app is not None and app != app_prev:
        if session is not None:
            session.detach()
        session = device.attach(app.pid)
        script = session.create_script(crypto_interceptor) ##TODO: Choose from arguments
        script.load()

    app_prev = app