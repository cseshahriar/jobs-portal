from django.db import models

from address.models import District


class Thana(models.Model):
    '''Thana Model'''
    district = models.ForeignKey(
        District, on_delete=models.SET_NULL, null=True
    )
    thana_name = models.CharField(max_length=120)
    thana_name_bn = models.CharField(max_length=120, blank=True, null=True)
    thana_code = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        ordering = ['thana_name']

    def __str__(self):
        return self.upazila_name
