# AndroidFrida
Small pet-project about intercepting into android processes using frida and self-made js scripts.

## Getting started
1. Set up frida on your computer
2. Set up AVD (android virtual device) or plug your own (Please, make sure it's rooted)
3. Set frida-server on your device and start it
(Fow more information about steps 1, 3 read https://learnfrida.info/java/#instrumenting-android-applications )
## Running 
To run a script written on js, you shuld execute command
```
frida -U <process> -l <script>
```
Where <process> is a process you want to attach your <script>

to exit from frida shell execute
```
exit
```
