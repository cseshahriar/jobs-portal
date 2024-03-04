from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Max, Min, Count
from rest_framework.pagination import PageNumberPagination
from .filters import JobFilter
from .serializers import JobSerializer
from .models import Job


@api_view(['GET'])
def job_list(request):
    jobs = Job.objects.all().order_by('id')
    filter_set = JobFilter(request.GET, queryset=jobs)

    count = filter_set.qs.count()

    # pagination
    res_per_page = 1

    paginator = PageNumberPagination()
    paginator.page_size = res_per_page
    queryset = paginator.paginate_queryset(filter_set.qs, request)

    serializer = JobSerializer(queryset, many=True)
    return Response({
        'count': count,
        'resPerPage': res_per_page,
        'jobs': serializer.data,
    })


@api_view(['GET'])
def job_detail(request, pk):
    job = get_object_or_404(Job, id=pk)
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def job_create(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PUT'])
def job_update(request, pk):
    job = get_object_or_404(Job, id=pk)
    serializer = JobSerializer(instance=job, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def job_delete(request, pk):
    job = get_object_or_404(Job, id=pk)
    job.delete()
    return Response({
        'message': 'Job deleted successfully'},
        status=status.HTTP_204_NO_CONTENT
    )


@api_view(['GET'])
def job_stats(request, topic):
    args = {'title__icontains': topic}
    jobs = Job.objects.filter(**args)
    if len(jobs) == 0:
        return Response({
            'message': f'No stats found for the given {topic}'},
            status=status.HTTP_404_NOT_FOUND
        )

    stats = jobs.aggregate(
        total_jobs=Count('title'),
        avg_position=Avg('positions'),
        avg_salary=Avg('salary'),
        min_salary=Min('salary'),
        max_salary=Max('salary'),
    )
    return Response(stats)
