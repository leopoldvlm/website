from django.contrib.auth import logout
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, HttpResponseBadRequest
from django.shortcuts import render
from django.forms import ValidationError

from .forms import LoginUserForm, RegisterUserForm
from .auth import auth
from .utils import LoginError, AuthentificationError


# /notes
def index(request: HttpRequest):
    return HttpResponse("Hello, welcome to notes")


# /notes/me
def user(request: HttpRequest):
    user = request.user
    return render(request, 'me.html', {'user': (user if user.is_authenticated else None)})


# /notes/register
def register(request: HttpRequest):
    error = None
    # treating post requests
    if request.method == 'POST':
        form = RegisterUserForm(request.POST)

    else:
        if request.user.is_authenticated:
            return HttpResponseRedirect("/notes/me")
        form = RegisterUserForm()

    return render(request, 'register.html', {'form': form, 'error': error})


# /notes/login
def login(request: HttpRequest):
    error = None
    # starting by treating post requests
    if request.method == 'POST':
        try:
            auth(request)
        except ValidationError:
            error = "Form could not be validated. Please try again."
        except AuthentificationError as e:
            error = f"Incorrect password or username."
        except LoginError:
            error = "Could not log you in. Please try again later."
        else :
            return HttpResponseRedirect("/notes/me/")

    # other requests : create blank form
    else :
        if request.user.is_authenticated :
            return HttpResponseRedirect("/notes/me/")
        
    # if it got there, render the login template
    form = LoginUserForm()
    return render(request,'login.html', {'form': form, 'error': error})



# /notes/logout
def viewlogout(request: HttpRequest):
    if request.method not in ('GET', 'POST'):
        return HttpResponseBadRequest
    logout(request)
    return HttpResponseRedirect('/notes')





