# AndroidFrida
Small pet-project about intercepting into android processes using frida and self-made js scripts.

## Getting started
1. Set up frida on your computer
2. Set up AVD (android virtual device) or plug your own (Please, make sure it's rooted)
3. Set frida-server on your device and start it
(Fow more information about steps 1, 3 read https://learnfrida.info/java/#instrumenting-android-applications )
## Running 
To run a script written on js, you should run script.py file
```
python script.py <flag to choice working mode>
```
## Flags (or working modes)
-h or --hash    logging some hash libraries

-c or --crypto  logging some crypto libraries

-t or --telegram  (TODO)

-u <package> or --universal <package>  logging all usage of <packege>

Example :
```
python script.py -u org.telegram.messenger
```

to exit from frida shell after command execute
```
exit
```
