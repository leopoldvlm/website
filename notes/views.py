from django.http import HttpResponse, HttpRequest
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import logout

from .models import Note
from .serializers import NoteSerializer

# /note
def index(request=HttpRequest):
    return HttpResponse("Hello, welcome to notes")


# /note/user
def user(request=HttpRequest):

    user = request.user
    if user.is_authenticated:
        return HttpResponse(f"Hello, logged in as {user.username}")
    else :
        return HttpResponse("Hello, not logged in rn")


# /note/logout
def logout(request=HttpRequest):

    request.session.delete()
    return HttpResponse("you were logged out (probably)")



# /api/notes/
@api_view(['GET','POST'])
def notes_list(request=HttpRequest):

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
def notes_detail(request, pk):

    # trying to get a note from id, 404 if non existant
    try:
        note = Note.objects.get(pk=pk)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
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

