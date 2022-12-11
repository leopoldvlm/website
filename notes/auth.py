from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http.request import HttpRequest


def authenticate(request=HttpRequest) -> bool:
    """
    Attempts to authenticate a user with username and password.
    TODO : ALSO ADD LOGIN!
    Returns True if user could be authenticated or already was, False otherwise.
    """

    if request.user.is_authenticated:
        return True

    user = authenticate(username=request.POST['username'], password=request.POST['password'])
    return user is not None



def create_notes_user(request=HttpRequest) -> bool:
    """
    Attempts to create a user with specified fields.
    Returns True if user was successfully created, False otherwise.
    """

    user = User.objects.create_user(username = request.POST['username'], password = request.POST['password'])
    return user is not None