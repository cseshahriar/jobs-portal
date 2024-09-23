from django.db import models

from account.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save


class CurriculumVitae(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def save_profile(sender, instance, created, **kwargs):
    if created:
        profile = CurriculumVitae(user=instance)
        profile.save()


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


class Profile(models.Model):
    MALE = 'Male'
    FEMALE = 'Female'
    OTHER = 'Other'

    GENDER_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other'),
    ]

    cv = models.ForeignKey(CurriculumVitae, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=500)
    last_name = models.CharField(max_length=500)
    middle_name = models.CharField(max_length=500)
    gender = models.CharField(
        max_length=500, choices=GENDER_CHOICES
    )
    country = models.CharField(max_length=500)
    region = models.CharField(max_length=500)
    email = models.CharField(max_length=500)
    phone = models.CharField(max_length=500)
    occupation = models.CharField(max_length=500)
    dob = models.DateField(default='None')
    bio = models.TextField()
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
