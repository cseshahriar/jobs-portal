from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _

from django.dispatch import receiver
from django.db.models.signals import post_save

from account.models import User
from address.models import (Country, District, Thana, PostOffice)
from job.models import JobType, Industry


class AbstractBase(models.Model):
    """ Abstract Base Class """
    created_at = models.DateTimeField(
        _('Created At'), auto_now_add=True, blank=False, null=True
    )
    updated_at = models.DateTimeField(
        _('Updated At'), auto_now=True, blank=False, null=True
    )
    is_active = models.BooleanField(
        _('Is Application Active?'), default=True, null=True
    )

    class Meta:
        abstract = True


class CurriculumVitae(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def save_profile(sender, instance, created, **kwargs):
    if created:
        profile = CurriculumVitae(user=instance)
        profile.save()


# =================== Personal Details ====================
class Profile(models.Model):
    """ Personal Details """
    MALE = 'Male'
    FEMALE = 'Female'
    OTHER = 'Other'
    GENDER_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other'),
    ]
    RELIGION_CHOICES = [
        ("Buddhism", "Buddhism"),
        ("Christianity", "Christianity"),
        ("Hinduism", "Hinduism"),
        ("Islam", "Islam"),
        ("Jainism", "Jainism"),
        ("Judaism", "Judaism"),
        ("Sikhism", "Sikhism"),
        ("Others", "Others"),
    ]
    MARITAL_CHOICES = [
        ('Unmarried', 'Unmarried'),
        ('Married ', 'Married '),
        ('Single ', 'Single '),
    ]
    BLOOD_GROUP_CHOICES = [
        ("A+", "A(+ve)"),
        ("A-", "A(-ve)"),
        ("B+", "B(+ve)"),
        ("B-", "B(-ve)"),
        ("O+", "O(+ve)"),
        ("O-", "O(-ve)"),
        ("AB+", "AB(+ve)"),
        ("AB-", "AB(-ve)")
    ]
    cv = models.ForeignKey(CurriculumVitae, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100)
    father_name = models.CharField(max_length=100, null=True, blank=True)
    mothers_name = models.CharField(max_length=100, null=True, blank=True)
    dob = models.DateField(default='None')
    gender = models.CharField(
        max_length=50, choices=GENDER_CHOICES, null=True, blank=False
    )
    religion = models.CharField(
        max_length=50, choices=RELIGION_CHOICES, null=True, blank=False
    )
    marital_status = models.CharField(
        max_length=50, choices=MARITAL_CHOICES, null=True, blank=False
    )
    country = models.CharField(
        max_length=255, verbose_name="Nationality"
    )
    nid = models.CharField(
        _('National ID Number (NID)'), max_length=17, blank=False, null=True,
        help_text='Numeric 10/13/17 digits (ex: 1234567890)',
        validators=[RegexValidator(
                r'^(\d{10}|\d{13}|\d{17})$',
                message='Numeric 10/13/17 digits (ex: 1234567890)'
        )]
    )
    passport = models.CharField(
        _('Passport Number'), max_length=9, blank=False, null=True,
        help_text='Alphanumeric 9 characters (ex: PA3456789)',
        validators=[RegexValidator(
            r'^([A-Z]{2}\d{7}|[A-Z]{1}\d{8})$',
            message='Alphanumeric 9 characters (ex: PA3456789)'
        )]
    )
    email = models.EmailField(max_length=100)
    phone = models.CharField(
        _('Mobile Phone #'), max_length=12, blank=False, null=True,
        help_text='Format (ex: 0123456789)', validators=[RegexValidator(
            r'^[\d]{10,12}$', message='Format (ex: 0123456789)'
        )]
    )
    emergency_contact = models.CharField(
        _('Mobile Phone #'), max_length=12, blank=False, null=True,
        help_text='Format (ex: 0123456789)', validators=[RegexValidator(
            r'^[\d]{10,12}$', message='Format (ex: 0123456789)'
        )]
    )
    blood_group = models.CharField(
        max_length=100, choices=BLOOD_GROUP_CHOICES, null=True, blank=False
    )
    height = models.PositiveIntegerField(
        null=True, blank=True, verbose_name='Height(meters)'
    )
    height = models.FloatField(
        null=True, blank=True, verbose_name='weight(kg)'
    )
    bio = models.TextField(blank=True)
    image = models.ImageField(
        upload_to='profile/',
        default='profiles/avator.png',
        null=True
    )

    def __str__(self):
        return f"{self.first_name} {self.middle_name} {self.last_name}"

    def delete(self, *args, **kwargs):
        """Delete files from media before delete the object"""
        self.avator.delete()
        super().delete(*args, **kwargs)


class Address(models.Model):
    """ Address Model"""
    cv = models.ForeignKey(CurriculumVitae, on_delete=models.CASCADE)
    country = models.ForeignKey(
        Country, on_delete=models.SET_NULL, null=True, blank=True)
    district = models.ForeignKey(
        District, on_delete=models.SET_NULL, null=True, blank=True)
    thana = models.ForeignKey(
        Thana, on_delete=models.SET_NULL, null=True, blank=True)
    post_office = models.ForeignKey(
        PostOffice, on_delete=models.SET_NULL, null=True, blank=True)
    village = models.TextField(
        blank=False, help_text="Type your House No/Road/Village"
    )
    inside_bangladesh = models.BooleanField(default=False)
    is_present = models.BooleanField(default=False)
    is_permanent = models.BooleanField(default=False)


class CarrerInformation(models.Model):
    JOB_LEVELS = [
        ('Entry Level', 'Entry Level'),
        ('Mid Level', 'Mid Level'),
        ('Top Level', 'Top Level'),
    ]
    cv = models.ForeignKey(CurriculumVitae, on_delete=models.CASCADE)
    objective = models.TextField(blank=False)
    present_salary = models.CharField(max_length=30, help_text="TK/Month")
    expected_salary = models.CharField(max_length=30, help_text="TK/Month")
    job_level = models.CharField(max_length=50, choices=JOB_LEVELS)
    job_type = models.CharField(
        max_length=50, choices=JobType.choices, default=JobType.Permanent
    )


class Skill(models.Model):
    """config models """
    name = models.CharField(max_length=255)
    functional_skill = models.BooleanField(default=False)
    special_skill = models.BooleanField(default=False)


class PreferredArea:
    cv = models.ForeignKey(CurriculumVitae, on_delete=models.CASCADE)
    preferred_job_location = models.ForeignKey(
        District, on_delete=models.SET_NULL, related_name='prerered_areas'
    )
    industry_type = models.CharField(
        max_length=50, choices=Industry.choices, default=Industry.Business
    )
    functional_skill = models.ManyToManyField(Skill, blank=True)
    special_skill = models.ManyToManyField(Skill, blank=False)


class releventInformation(models.Model):
    cv = models.ForeignKey(CurriculumVitae, on_delete=models.CASCADE)
    carrer_summery = models.TextField(blank=False)
    special_qualification = models.TextField(blank=False)
    special_qualification = models.TextField(blank=False)
    keywords = models.TextField(
        blank=False, help_text="Comma seperated Python, Django"
    )


# Education/Training
# ------------------
# academic summary
# trainning summary
# professional certificate summary

# Employment
# -----------
# employment history
# employment history(for retired armay person)


# others
# ---------------
# skills
# language proficiency
# link Account
# references

# accomplishment
# --------------
# portfolio
# publications
# Award/honors
# Projects
# Others

class Skill(models.Model):
    BEGINNER = 'Beginner'
    INTERMEDIATE = 'Intermediate'
    ADVANCED = 'Advanced'
    LEVEL_CHOICES = [
        (BEGINNER, 'Beginner'),
        (INTERMEDIATE, 'Intermediate'),
        (ADVANCED, 'Advanced'),
    ]
    cv = models.ForeignKey(CurriculumVitae, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    level = models.CharField(
        max_length=50, choices=LEVEL_CHOICES
    )

    def __str__(self):
        return self.name


class Experince(models.Model):
    cv = models.ForeignKey(CurriculumVitae, on_delete=models.CASCADE)
    office = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    duration = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.office} - {self.position} - {self.duration}"


class Academic(models.Model):
    cv = models.ForeignKey(CurriculumVitae, on_delete=models.CASCADE)
    institution = models.CharField(max_length=500)
    year = models.CharField(max_length=500)
    award = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.institution} - {self.year} - {self.award}"


class Referee(models.Model):
    cv = models.ForeignKey(CurriculumVitae, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    position = models.CharField(max_length=255)

    def __str__(self):
        return self.name
