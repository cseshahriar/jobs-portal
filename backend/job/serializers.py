from rest_framework import serializers
from .models import Job, CandidateApplied


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class CandidateAppliedSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateApplied
        fields = '__all__'
