from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http.request import HttpRequest
from django.db.utils import IntegrityError
from django.forms import ValidationError

from .forms import LoginUserForm
from .utils import LoginError, AuthentificationError


def auth(request: HttpRequest):
    """
    Attempts to authenticate a user with username and password.\n
    Returns True if user could be authenticated or already was.\n
    Raises ValidationError if the form is not valid.\n
    Raises AuthentificationError if user could not be authentificated.\n
    Raises LoginError if user could not be logged in.
    """
    if request.user.is_authenticated:
        return

    form = LoginUserForm(request.POST)

    # tests form integrity
    if not form.is_valid():
        raise ValidationError
    
    # attempts to authenticate the user
    # form.username does not work idk why :(
    user = authenticate(username=request.POST['username'], password=request.POST['password'])
    if user is None :
        raise AuthentificationError
    
    try:
        login(request, user)
    except Exception :
        raise LoginError



def register_user(request: HttpRequest):
    """
    Attempts to create a user with specified fields.
    Returns True if user was successfully created, False otherwise.
    """
    if request.user.is_authenticated:
        return

    form = LoginUserForm(request.POST)
    if not form.is_valid():
        raise ValidationError

    User.objects.create_user(
        username =request.POST['username'],
        email = request.POST['email'],
        password = request.POST['password'],
        first_name = request.POST['first_name'],
        last_name = request.POST['last_name']
    )
    
    
