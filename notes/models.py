from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=240, help_text='New note')
    emoji = models.CharField(max_length=1, help_text='🔥')
    creation = models.DateTimeField(help_text='Created on', auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField(help_text='Text of your note', default='')

    def __str__(self) -> str:
        return f"${self.emoji} - ${self.title}"