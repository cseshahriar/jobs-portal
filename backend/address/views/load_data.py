from django.shortcuts import render

from address.models import District, Thana, PostOffice


def load_district(request):
    divisiob_id = request.GET.get('division')
    object_list = District.objects.filter(
        divisiob_id=divisiob_id
    ).order_by('district_name')
    context = {
        'object_list': object_list
    }
    return render(request, 'dropdown_list.html', context)


def load_thana(request):
    district_id = request.GET.get('district_id')
    object_list = Thana.objects.filter(
        district_id=district_id
    ).order_by('thana_name')
    context = {'object_list': object_list}
    return render(request, 'dropdown_list.html', context)


def load_post_office(request):
    thana_id = request.GET.get('thana')
    object_list = PostOffice.objects.filter(
        thana_id=thana_id
    ).order_by('post_office_name')
    context = {'object_list': object_list}
    return render(request, 'dropdown_list.html', context)
