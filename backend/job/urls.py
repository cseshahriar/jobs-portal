from django.urls import path
from . import views

urlpatterns = [
    path('', views.job_list, name='job_list'),
    path('<str:pk>/detail', views.job_detail, name='job_detail'),
    path('create/', views.job_create, name='job_create'),
    path('<str:pk>/update/', views.job_update, name='job_update'),
    path('<str:pk>/delete/', views.job_delete, name='job_delete'),
    path('stats/<str:topic>/', views.job_stats, name='job_stats'),
    path('<str:pk>/apply/', views.apply_to_job, name='job_apply'),
    path(
        'me/applied/', views.get_current_user_applied_jobs,
        name='current_user_applied_jobs'
    ),
    path(
        'me/', views.get_current_user_jobs,
        name='current_user_jobs'
    ),
    path('<str:pk>/check/', views.is_applied, name='is_applied'),
    path('<str:pk>/check/', views.get_current_user_jobs, name='is_applied'),
]
