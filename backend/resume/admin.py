from django.contrib import admin
from .models import (
    CurriculumVitae, Profile, Address, CarrerInformation, SkillConfig,
    PreferredArea, releventInformation, EducationDegree, EducationLevel,
    EducationResult, Academic, Training, ProfessionalCertificate,
    Employment, ExpertiseArea, Skill, LanguageProficiency,
    LinkAccount, Referee, Portfolio, Publication, Award, Project, Other
)


# =================== Inline Classes ====================

class ProfileInline(admin.StackedInline):
    model = Profile
    extra = 1


class AddressInline(admin.StackedInline):
    model = Address
    extra = 1


class CarrerInformationInline(admin.StackedInline):
    model = CarrerInformation
    extra = 1


class PreferredAreaInline(admin.StackedInline):
    model = PreferredArea
    extra = 1


class RelevantInformationInline(admin.StackedInline):
    model = releventInformation
    extra = 1


class AcademicInline(admin.StackedInline):
    model = Academic
    extra = 1


class TrainingInline(admin.StackedInline):
    model = Training
    extra = 1


class ProfessionalCertificateInline(admin.StackedInline):
    model = ProfessionalCertificate
    extra = 1


class EmploymentInline(admin.StackedInline):
    model = Employment
    extra = 1

    # Note: We cannot include ExpertiseAreaInline here due to Django admin limitations.


class SkillInline(admin.StackedInline):
    model = Skill
    extra = 1


class LanguageProficiencyInline(admin.StackedInline):
    model = LanguageProficiency
    extra = 1


class LinkAccountInline(admin.StackedInline):
    model = LinkAccount
    extra = 1


class RefereeInline(admin.StackedInline):
    model = Referee
    extra = 1


class PortfolioInline(admin.StackedInline):
    model = Portfolio
    extra = 1


class PublicationInline(admin.StackedInline):
    model = Publication
    extra = 1


class AwardInline(admin.StackedInline):
    model = Award
    extra = 1


class ProjectInline(admin.StackedInline):
    model = Project
    extra = 1


class OtherInline(admin.StackedInline):
    model = Other
    extra = 1

# =================== Admin Registration ====================

@admin.register(CurriculumVitae)
class CurriculumVitaeAdmin(admin.ModelAdmin):
    inlines = [
        ProfileInline,
        AddressInline,
        CarrerInformationInline,
        PreferredAreaInline,
        RelevantInformationInline,
        AcademicInline,
        TrainingInline,
        ProfessionalCertificateInline,
        EmploymentInline,
        SkillInline,
        LanguageProficiencyInline,
        LinkAccountInline,
        RefereeInline,
        PortfolioInline,
        PublicationInline,
        AwardInline,
        ProjectInline,
        OtherInline,
    ]
    list_display = ('user', )
    search_fields = ('user__username', 'user__email')

# =================== Registering Lookup Models ====================


# These are lookup tables and can be registered separately.
admin.site.register(EducationDegree)
admin.site.register(EducationLevel)
admin.site.register(EducationResult)
admin.site.register(SkillConfig)
