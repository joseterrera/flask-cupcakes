Below are the steps that should get one started using the app:

### Create a Virtual Environment

```console
$ python3 -m venv venv
$ source venv/bin/activate
```

### Install pachackes in requirements.txt
```console
pip3 install -r requirements.txt
```


### Create a database

```console
createdb cupcakes
```

### Create tables and rows

```console
python seed.py
```

### To run the app:

```console
flask run 
```