from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password

from django.contrib.auth.models import User
from .serializers import SignupSerializer, UserSerializer


@api_view(['POST'])
def register(request):
    data = request.data
    serializer = SignupSerializer(data=data)

    if serializer.is_valid():
        email = data.get('email')  # Assuming 'email' is the username
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        if not User.objects.filter(username=email).exists():
            # Create the user with the email as the username
            User.objects.create(
                username=email, password=make_password(password),
                first_name=first_name, last_name=last_name
            )
            return Response(
                {'success': 'User created successfully'},
                status=status.HTTP_201_CREATED)
        else:
            return Response(
                {'error': 'User already exists'},
                status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST)
