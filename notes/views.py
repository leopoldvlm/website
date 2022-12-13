from django.contrib.auth import logout
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from .forms import LoginUserForm
from .auth import auth


# /notes
def index(request: HttpRequest):
    return HttpResponse("Hello, welcome to notes")


# /notes/me
def user(request: HttpRequest):

    user = request.user
    if user.is_authenticated:
        return HttpResponse(f"Hello, logged in as {user.username}")
    else :
        return HttpResponse("Hello, not logged in rn")


# /notes/register
def register(request: HttpRequest):
    return HttpResponse("Hello, the register page is under construction")


# /notes/login
def login(request: HttpRequest):
    # starting by treating post requests
    if request.method == 'POST':
        form = LoginUserForm(request.POST)
        # if form is valid, attempts to login user.
        if form.is_valid() and auth(request):
            return HttpResponseRedirect("/notes/me")
        else :
            # TODO : will display error if cannot login sometimes.
            error = "Could not authenticate you. Please try again."



    # other requests : create blank form
    else :
        if request.user.is_authenticated :
            return HttpResponseRedirect("/notes/me")
        form = LoginUserForm()
        
    # if it got there, render the login template
    return render(request, 'login.html', {'form': form})



# /notes/logout
def logout(request: HttpRequest):

    request.session.delete()
    return HttpResponse("you were logged out (probably)")





