from django.db import models

from address.models import Thana


class PostOffice(models.Model):
    '''Post Office Model'''
    thana = models.ForeignKey(
        Thana, on_delete=models.SET_NULL, null=True
    )
    post_office_name = models.CharField(max_length=120)
    post_office_name_bangla = models.CharField(
        max_length=120, blank=True, null=True)
    post_code = models.CharField(max_length=6, unique=True, db_index=True)

    class Meta:
        ordering = ['post_code']

    def __str__(self):
        return self.post_code
