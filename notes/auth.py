from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http.request import HttpRequest
from django.db.utils import IntegrityError


def auth(request: HttpRequest) -> bool:
    """
    Attempts to authenticate a user with username and password.
    Returns True if user could be authenticated or already was, False otherwise.
    """

    user = authenticate(username=request.POST['username'], password=request.POST['password'])
    if user is not None :
        try:
            login(request, user)
            return True
        except Exception :
            return False
    
    return False




def create_notes_user(request: HttpRequest) -> bool:
    """
    Attempts to create a user with specified fields.
    Returns True if user was successfully created, False otherwise.
    """

    try:
        user = User.objects.create_user(username = request.POST['username'], password = request.POST['password'])
    except IntegrityError:
        return False

    return user is not None