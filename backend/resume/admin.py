# Register your models here.
from django.contrib import admin
from .models import (
    CurriculumVitae, Skill, Experince, Academic, Referee, Profile
)


# Inline for Skill
class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1  # Number of extra empty forms to show


# Inline for Experience
class ExperienceInline(admin.TabularInline):
    model = Experince
    extra = 1


# Inline for Academic
class AcademicInline(admin.TabularInline):
    model = Academic
    extra = 1


# Inline for Referee
class RefereeInline(admin.TabularInline):
    model = Referee
    extra = 1


# Inline for Profile
class ProfileInline(admin.StackedInline):
    model = Profile
    extra = 0
    max_num = 1


# Curriculum Vitae Admin
@admin.register(CurriculumVitae)
class CurriculumVitaeAdmin(admin.ModelAdmin):
    inlines = [
        SkillInline,
        ExperienceInline,
        AcademicInline,
        RefereeInline,
        ProfileInline
    ]
    list_display = ('user',)
    search_fields = ('user__username',)
    list_filter = ('user__username', )
