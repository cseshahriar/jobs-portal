from django.urls import path

from address import views

app_name = 'address'


urlpatterns = [
    path('load-district/', views.load_district, name='load_district'),
    path('load-thana/', views.load_thana, name='load_thana'),
    path('load-post-office/', views.load_post_office, name='load_post_office'),
]
