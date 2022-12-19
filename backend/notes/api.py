from django.http import HttpRequest
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Note
from .serializers import NoteSerializer

# /api/notes/
@api_view(['GET','POST'])
def notes_list(request: HttpRequest):

    if not request.user.is_authenticated:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    # GET method = list of all notes FROM THE USER
    if request.method == 'GET':
        userid = request.user.id
        data = Note.objects.filter(author=userid)
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