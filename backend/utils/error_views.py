from django.http import JsonResponse


def handler500(request):
    """ return json response for 500"""
    message = ('Internal Server Error')
    response = JsonResponse(data={'error': message})
    response.status_code = 500
    return response


def handler404(request, exception):
    """ return json response for 404"""
    message = ('Resource not found')
    response = JsonResponse(data={'error': message})
    response.status_code = 404
    return response
