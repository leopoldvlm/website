from django import forms

class LoginUserForm(forms.Form):
    username = forms.CharField(label='Username', max_length='240', widget=forms.TextInput)
    password = forms.CharField(label='Password', widget=forms.PasswordInput)