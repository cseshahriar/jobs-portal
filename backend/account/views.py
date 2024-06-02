from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import SignupSerializer, UserSerializer
from .validators import validate_file_extension


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
                email=email,
                username=email,
                password=make_password(password),
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    data = request.data
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_resume(request):
    user = request.user
    if 'resume' not in request.FILES:
        return Response(
            {'error': 'Please upload your resume.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    resume = request.FILES['resume']

    if not resume:
        return Response(
            {'error': 'Please upload your resume.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    is_valid_file = validate_file_extension(resume.name)
    if not is_valid_file:
        return Response(
            {'error': 'Please upload only pdf file.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user_profile, created = UserProfile.objects.get_or_create(user=user)
        user_profile.resume = resume
        user_profile.save()

        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)

    except Exception as e:
        # Log the exception details for debugging
        print(f"Error updating resume: {str(e)}")
        return Response(
            {'error': 'An error occurred while updating the resume.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
