from django import forms
from django.contrib.auth.models import User

class LoginUserForm(forms.Form):
    username = forms.CharField(
        label='Username',
        max_length='240',
        widget=forms.TextInput
    )
    password = forms.CharField(
        label='Password',
        widget=forms.PasswordInput
    )

class RegisterUserForm(forms.Form):
    username = forms.CharField(
        label='Username',
        max_length='240',
        widget=forms.TextInput
    )
    password = forms.CharField(
        label='Password',
        widget=forms.PasswordInput,
    )
    email = forms.EmailField(
        label='Email',
        widget=forms.EmailInput,
        required=False,
        help_text='Optional'
    )
    first_name = forms.CharField(
        label='First name',
        widget=forms.TextInput,
        required=False,
        help_text='Optional'
    )
    last_name = forms.CharField(
        label='Last name',
        widget=forms.TextInput,
        required=False,
        help_text='Optional'
    )
