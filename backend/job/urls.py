from django.urls import path
from . import views

urlpatterns = [
    path('', views.job_list, name='job_list'),
    path('<str:pk>/detail', views.job_detail, name='job_detail'),
    path('create/', views.job_create, name='job_create'),
    path('<str:pk>/update/', views.job_update, name='job_update'),
    path('<str:pk>/delete/', views.job_delete, name='job_delete'),
]
