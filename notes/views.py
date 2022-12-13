from django.contrib.auth import logout
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Note
from .serializers import NoteSerializer
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



# /api/notes/
@api_view(['GET','POST'])
def notes_list(request: HttpRequest):

    # GET method = list of all notes
    if request.method == 'GET':
        data = Note.objects.all()
        serializer = NoteSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    # POST method = create a note
    elif request.method == 'POST':
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

    # other methods or incorrect POST = bad request
    return Response(status=status.HTTP_400_BAD_REQUEST)


# /api/notes/:id
@api_view(['GET', 'PUT', 'DELETE'])
def notes_detail(request: HttpRequest, pk=int):

    # if not authenticated, error :)
    if not request.user.is_authenticated:
        return Response(status=status.HTTP_418_IM_A_TEAPOT)

    # trying to get a note from id, 404 if non existant
    try:
        note = Note.objects.get(pk=pk)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # if the retrieved note's author is NOT the user that's
    # currently logged in, return 503

    if note.author.username != request.user.username:
        return Response(status=status.HTTP_403_FORBIDDEN)
    
    # GET method : return the note
    if request.method == 'GET':
        serializer = NoteSerializer(note, context={'request': request}, many=False)
        return Response(serializer.data)

    # PUT method : modify the note
    elif request.method == 'PUT':
        serializer = NoteSerializer(note, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE method : remove the note
    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_400_BAD_REQUEST)

