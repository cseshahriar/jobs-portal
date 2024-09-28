from django.db import models


class Country(models.Model):
    '''Country list Model'''
    name = models.CharField(max_length=255, db_index=True)
    bn_name = models.CharField(max_length=255, blank=True, null=True)
    alpha_code = models.CharField(max_length=5, blank=True, null=True)
    numeric_code = models.IntegerField(null=True, blank=True)
    phone_code = models.CharField(max_length=30, blank=True, null=True)
    capital = models.CharField(max_length=100, blank=True, null=True)
    currency = models.CharField(max_length=10, blank=True, null=True)
    is_active = models.BooleanField(default=False)

    class Meta:
        ordering = ['name']
        verbose_name = 'country'
        verbose_name_plural = 'countries'

    def __str__(self):
        return self.name
