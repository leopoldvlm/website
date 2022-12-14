from django import forms
from django.contrib.auth.models import User

class LoginUserForm(forms.Form):
    username = forms.CharField(label='Username', max_length='240', widget=forms.TextInput)
    password = forms.CharField(label='Password', widget=forms.PasswordInput)

class RegisterUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']
        widgets = {
            'password': forms.PasswordInput
        }