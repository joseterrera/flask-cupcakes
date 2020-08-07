Below are the steps that should get one started using the app:

### Create a Virtual Environment

```console
$ python3 -m venv venv
$ source venv/bin/activate
```

### Packages installed
```console
$ pip3 install flask  
$ pip3 install flask-debugtoolbar   
$ pip3 install psycopg2-binary    
$ pip3 install flask-sqlalchemy
```



### Create a database

```console
createdb cupcakes
```

### To run the app:

```console
flask run 
```