from django.db import models


class Division(models.Model):
    '''Division Model'''
    division_name = models.CharField(
        max_length=255, unique=True, db_index=True)
    division_name_bangla = models.CharField(
        max_length=120, blank=True, null=True)
    division_code = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        ordering = ['division_name']

    def __str__(self):
        return self.division_name
