"""greatwebsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from notes import views, api

urlpatterns = [
    path('admin/', admin.site.urls),
    path('notes/', views.index),
    path('notes/me/', views.user),
    path('notes/logout/', views.viewlogout),
    path('notes/login/', views.login),
    path('notes/register/', views.register),
    path('api/notes/', api.notes_list),
    path('api/notes/<int:pk>/', api.notes_detail),
]
