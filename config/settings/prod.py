from config.settings.base import *
import os
import dj_database_url

SECRET_KEY = os.environ.get("SECRET_KEY", '19o(&#lf@$loi2z&!2j)bp20hrfr!gmizo6@&0=_75y!k0et5b')
DEBUG = os.environ.get('DJANGO_DEBUG') != "False"
EMAIL_PORT = 587
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = True

ALLOWED_HOSTS = ["https://ccs-laberinto.herokuapp.com/", "ccs-laberinto.herokuapp.com"]

db_from_env = dj_database_url.config(conn_max_age=90)
DATABASES['default'].update(db_from_env)