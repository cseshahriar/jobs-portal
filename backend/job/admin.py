from django.contrib import admin
from .models import Job, CandidateApplied
# Register your models here.


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'title', 'email', 'job_type', 'industry', 'experience',
        'salary', 'created_at'
    )
    list_filter = ('job_type', 'industry', 'experience', )
    search_fields = ('title', 'industry', )
    list_per_page = 20
    list_select_related = True


@admin.register(CandidateApplied)
class CandidateAppliedAdmin(admin.ModelAdmin):
    list_display = ('job', 'user', 'resume', 'created_at')
    list_filter = ('job', )
    search_fields = ('job__title', )
    list_per_page = 20
    list_select_related = ('job', 'user', )
