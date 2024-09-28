from django.db import models

from address.models import Division


class District(models.Model):
    '''District Model'''
    division = models.ForeignKey(
        Division, on_delete=models.SET_NULL, null=True
    )
    district_name = models.CharField(max_length=120)
    district_name_bangla = models.CharField(
        max_length=120, blank=True, null=True)
    district_code = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        ordering = ['district_name']

    def __str__(self):
        return self.district_name
