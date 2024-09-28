from datetime import datetime, timedelta
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.gis.db import models as gis_models
from django.contrib.gis.geos import Point
from django.contrib.auth.models import User
# Create your models here.


class JobType(models.TextChoices):
    Permanent = 'Full Time'
    Temporary = 'Part Time'
    Internship = 'Internship'
    Freelance = 'Freelance'
    Contract = 'Contract'


class Education(models.TextChoices):
    HighSchool = 'High School'
    Bachelors = 'Bachelors'
    Masters = 'Masters'
    PhD = 'PhD'


class Industry(models.TextChoices):
    IT = 'Information Technology'
    Finance = 'Finance'
    HealthCare = 'Health Care'
    Education = 'Education'
    Manufacturing = 'Manufacturing'
    Government = 'Government'
    Retail = 'Retail'
    Business = 'Business'
    Other = 'Other'


class Experience(models.TextChoices):
    No_Experience = 'No Experience'
    ONE_YEAR = '1 Year'
    TWO_YEAR = '2 Years'
    THREE_YEAR_Plus = '3 Years above'


def return_date_time():
    now = datetime.now()
    return now + timedelta(days=10)


class Job(models.Model):
    title = models.CharField(max_length=200, null=True)
    description = models.TextField(null=True)
    email = models.EmailField(null=True)
    job_type = models.CharField(
        max_length=50, choices=JobType.choices, default=JobType.Permanent
    )
    education = models.CharField(
        max_length=50, choices=Education.choices, default=Education.Bachelors
    )
    industry = models.CharField(
        max_length=50, choices=Industry.choices, default=Industry.Business
    )
    experience = models.CharField(
        max_length=50, choices=Experience.choices,
        default=Experience.No_Experience
    )
    salary = models.IntegerField(
        default=1, validators=[
            MinValueValidator(1),
            MaxValueValidator(1000000)
        ]
    )
    positions = models.IntegerField(default=1)
    company = models.CharField(max_length=200, null=True)
    last_date = models.DateTimeField(default=return_date_time)
    user = models.ForeignKey(
        User, related_name='jobs', on_delete=models.SET_NULL, null=True
    )
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, default=0.0
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, default=0.0
    )
    address = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class CandidateApplied(models.Model):
    job = models.ForeignKey(
        Job, related_name='candidate_applies', on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, related_name='candidate_applies', on_delete=models.CASCADE)
    resume = models.FileField(upload_to='candidate/resumes/')
    created_at = models.DateTimeField(auto_now_add=True)
