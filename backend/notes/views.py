from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, HttpResponseBadRequest
from django.shortcuts import render
from django.forms import ValidationError
from django.utils.datastructures import MultiValueDictKeyError

from .forms import LoginUserForm, RegisterUserForm
from .auth import auth, register_user
from .utils import LoginError, AuthentificationError


# /notes
def index(request: HttpRequest):
    return HttpResponse("Hello, welcome to notes")


# /notes/me
@login_required
def user(request: HttpRequest):
    return render(request, 'notes/me.html')


# /notes/register
def register(request: HttpRequest):
    error = None
    # treating post requests
    if request.method == 'POST':
        try:
            register_user(request)
            auth(request)
        except ValidationError:
            error = 'Form is not valid. Please try again.'
        else:
            return HttpResponseRedirect("/notes/welcome")


    # for other requests, redirects
    else:
        if request.user.is_authenticated:
            return HttpResponseRedirect("/notes/me")

    # if all else fail, there shall be the form rendering
    form = RegisterUserForm(request.POST or None)
    return render(request, 'notes/register.html', {'form': form, 'error': error})


# /notes/login
def login(request: HttpRequest):
    error = None
    try:
        nexto = request.GET['next']
    except MultiValueDictKeyError:
        nexto = "/notes/me/"
        
    # starting by treating post requests
    if request.method == 'POST':
        try:
            auth(request)
        except ValidationError:
            error = "Form is not valid. Please try again."
        except AuthentificationError:
            error = f"Incorrect password or username."
        except LoginError:
            error = "Could not log you in. Please try again later."
        else :
            return HttpResponseRedirect(nexto)

    # other requests : create blank form
    else :
        if request.user.is_authenticated :
            return HttpResponseRedirect(nexto)
        
    # if it got there, render the login template
    form = LoginUserForm(request.POST or None)
    return render(request,'notes/login.html', {
        'form': form,
        'error': error,
        'next': nexto
    })



# /notes/logout
def viewlogout(request: HttpRequest):
    if request.method not in ('GET', 'POST'):
        return HttpResponseBadRequest
    logout(request)
    return HttpResponseRedirect('/notes')


# /notes/welcome
@login_required
def welcome(request: HttpRequest):
    return HttpResponse("Welcome to notes! :)")


# /notes/app
@login_required
def app(request: HttpRequest):
    return render(request, 'notes/app.html')
