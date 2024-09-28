from django.contrib import admin
from address.models import Country, Division, District, Thana, PostOffice


class DivisionAdmin(admin.ModelAdmin):
    list_display = ['pk', 'division_name', 'division_code']


class DistrictAdmin(admin.ModelAdmin):
    list_display = [
        'division', 'district_name', 'district_code'
    ]
    list_filter = ['division', ]


class ThanaAdmin(admin.ModelAdmin):
    list_display = [
        'district', 'thana_name', 'thana_code'
    ]
    list_filter = ['district']
    search_fields = ['thana_name', ]


class PostOfficeAdmin(admin.ModelAdmin):
    list_display = [
        'thana', 'post_office_name', 'post_office_code'
    ]
    list_filter = ['thana']
    search_fields = ['post_office_code', ]


class CountryAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'name', 'bn_name', 'alpha_code', 'numeric_code', 'is_active',
    )
    search_fields = ('name', 'bn_name', 'alpha_code', 'numeric_code', )
    list_filter = ('is_active', )
    list_display_links = ('name', )
    list_editable = ('is_active', )
    list_per_page = 20


admin.site.register(Country, CountryAdmin)
admin.site.register(Division, DivisionAdmin)
admin.site.register(District, DistrictAdmin)
admin.site.register(Thana, ThanaAdmin)
